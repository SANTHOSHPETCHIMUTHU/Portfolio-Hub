import { Code2 } from 'lucide-react';
import { getWPSkills, getWPMedia } from '@/lib/wp-api';

export const metadata = {
  title: 'Skills | Portfolio',
  description: 'My technical skills and expertise',
};

const technicalSkills = [
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Java', icon: '/icons/java.svg' },
  { name: 'SQL', icon: '/icons/sql.svg' },
  { name: 'HTML5', icon: '/icons/html5.svg' },
  { name: 'CSS3', icon: '/icons/css3.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'VS Code', icon: '/icons/vscode.svg' },
  { name: 'Supabase', icon: '/icons/supabase.svg' },
  { name: 'WordPress', icon: '/icons/wordpress.svg' },
  { name: 'Power BI', icon: '/icons/powerbi.svg' },
  { name: 'Excel', icon: '/icons/excel.svg' },
  { name: 'MySQL', icon: '/icons/mysql.svg' }
];

const softSkills = [
  { name: 'Quick Learner', icon: '🧠' },
  { name: 'Team Management', icon: '👥' },
  { name: 'Adaptability', icon: '🧭' },
  { name: 'Problem Solving', icon: '💡' },
  { name: 'Communication', icon: '💬' }
];

export default async function SkillsPage() {
  // const skills = await getWPSkills(); // Omit for static demo as per user request
  const rawSkills = await getWPSkills();

  // Normalize icon field: if ACF returns a numeric media ID, fetch its URL
  const skills = await Promise.all(
    (rawSkills || []).map(async (skill) => {
      const icon = skill.acf?.icon;
      if (typeof icon === 'number') {
        const url = await getWPMedia(icon);
        return { ...skill, acf: { ...skill.acf, icon: url } };
      }
      return skill;
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-6">
            <Code2 className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing digital experiences
          </p>
        </div>

        {/* Technical Skills Grid */}
        <h2 className="text-2xl font-bold text-cyan-600 mb-6 mt-6">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {(() => {
            const source = skills && skills.length > 0 ? skills : technicalSkills;
            const displaySkills = (source as any[]).map((s) => {
              if (s && s.title && s.title.rendered) {
                const name = s.title.rendered;
                const icon = s.acf?.icon || `/icons/${name.toLowerCase().replace(/\s+/g, '')}.svg`;
                return { name, icon };
              }

              // fallback for local technicalSkills entries
              return { name: s.name, icon: s.icon };
            });

            return displaySkills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center relative">
                  {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <Code2 className="text-blue-600" size={32} />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
              </div>
            ));
          })()}
        </div>

        {/* Soft Skills Grid */}
        <h2 className="text-2xl font-bold text-cyan-600 mb-6 mt-12">Soft Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {softSkills.map(skill => (
            <div
              key={skill.name}
              className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-center border border-gray-100"
            >
              <span className="text-4xl mb-2">{skill.icon}</span>
              <h3 className="font-semibold text-gray-900">{skill.name}</h3>
            </div>
          ))}
        </div>

        {/* Always Learning Section */}
        <div className="mt-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Always Learning</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Technology evolves rapidly, and I&apos;m committed to continuous learning and staying
            up-to-date with the latest trends and best practices in web development.
          </p>
        </div>
      </div>
    </div>
  );
}
