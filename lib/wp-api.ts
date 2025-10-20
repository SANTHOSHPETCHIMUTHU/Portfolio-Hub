const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface WPPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: Record<string, any>;
  slug: string;
}

export interface WPProject {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf?: {
    screenshot?: string | number | null;
    short_description?: string;
    github_link?: string;
    live_demo?: string;
    features?: string;
    challenges?: string;
    solutions?: string;
  };
}

export interface WPSkill {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    skill_name?: string;
    icon?: string | number | null;
  };
}

export async function getWPContent(endpoint: string) {
  if (!WP_API_URL) {
    console.warn('WordPress API URL not configured');
    return null;
  }

  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/${endpoint}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch WordPress data from ${endpoint}:`, res.statusText);
      return null;
    }

    const json = await res.json();
    try {
      if (Array.isArray(json) && json.length > 0) {
        // Print a small debug excerpt for development
        console.debug(`[WP API] ${endpoint} -> first item acf:`, json[0].acf || null);
      }
    } catch (e) {
      // ignore debug errors
    }
    return json;
  } catch (error) {
    console.error(`Error fetching WordPress content from ${endpoint}:`, error);
    return null;
  }
}

export async function getWPPage(slug: string): Promise<WPPage | null> {
  const data = await getWPContent(`pages?slug=${slug}`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getWPProjects(): Promise<WPProject[]> {
  const data = await getWPContent('projects');
  return data || [];
}

export async function getWPProject(slug: string): Promise<WPProject | null> {
  const data = await getWPContent(`projects?slug=${slug}`);
  return data && data.length > 0 ? data[0] : null;
}

export async function getWPSkills(): Promise<WPSkill[]> {
  const data = await getWPContent('skills');
  return data || [];
}

export async function getWPMedia(mediaId: number): Promise<string | null> {
  if (!WP_API_URL) return null;

  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/media/${mediaId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.source_url || null;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}
