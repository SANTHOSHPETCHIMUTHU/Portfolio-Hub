import { getWPPage } from '@/lib/wp-api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react';

export default async function HomePage() {
  const pageData = await getWPPage('home');

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Prefer ACF fields if available (title, subtitle), otherwise fall back to WP title/content */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {pageData?.acf?.title || pageData?.title?.rendered || 'Hi, I\'m Santhosh Petchimuthu'}
            </h1>

            {pageData?.acf?.subtitle ? (
              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                {pageData.acf.subtitle}
              </p>
            ) : pageData?.content?.rendered ? (
              <div
                className="text-xl md:text-2xl text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150"
                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
              />
            ) : (
              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                Building exceptional digital experiences with modern technologies
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link href="/projects">
                <Button size="lg" className="text-lg px-8">
                  View My Work
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What I Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Code className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Web Development</h3>
              <p className="text-gray-600">
                Creating responsive, performant web applications using modern frameworks and best practices.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Palette className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI/ML Development</h3>
              <p className="text-gray-600">
              Crafting intelligent models and algorithms that enable systems to learn from data and deliver smart insights.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="text-gray-600">
                Optimizing applications for speed, scalability, and seamless user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start a Project?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let&apos;s work together to bring your ideas to life
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Contact Me
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
