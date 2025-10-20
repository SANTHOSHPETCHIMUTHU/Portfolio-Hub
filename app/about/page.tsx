import { getWPPage } from '@/lib/wp-api';
import { Button } from '@/components/ui/button';
import { Download, User } from 'lucide-react';

export const metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about my background, experience, and skills',
};

export default async function AboutPage() {
  const pageData = await getWPPage('about');
  const resumeUrl = pageData?.acf?.resume_file;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-300 rounded-full mb-6">
            <User className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            {pageData?.title?.rendered || 'About Me'}
          </h1>
          <p className="text-lg text-gray-500">
            Get to know more about my journey and expertise
          </p>
        </div>
        {/* Summary & Contact - like card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Professional Summary Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Summary</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              I&apos;m Santhoshkumar Petchimuthu, based in Virudhunagar, Tamil Nadu, with a strong passion for computer science and algorithms. Exploring complex problems and learning new techniques fuels my drive to build efficient and innovative solutions.
              <br /><br />
              I work extensively with tools like Python, Jupyter Lab, VS Code, Kali Linux, and machine learning libraries such as scikit-learn and TensorFlow. My dedication to clean, maintainable code and best practices ensures high-quality results.
              <br /><br />
              Beyond coding, I enjoy sharpening my analytical thinking, collaborating effectively, and adapting to evolving technologies to continuously grow as an AI/ML developer.
            </p>
            {resumeUrl && (
              <div className="pt-6 mt-auto">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                    <Download className="mr-2" size={20} />
                    Download Resume
                  </Button>
                </a>
              </div>
            )}
          </div>
          {/* Contact Details Card */}
          <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <div>
                <span className="font-semibold text-gray-800">Location: </span>
                Virudhunagar, Tamil Nadu
              </div>
              <div>
                <span className="font-semibold text-gray-800">Email: </span>
                <a href="mailto:santhoshkumar4058567@gmail.com" className="text-blue-700 hover:underline">
                  santhoshkumar4058567@gmail.com
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Phone: </span>
                +91 8637424695
              </div>
              <div>
                <span className="font-semibold text-gray-800">LinkedIn: </span>
                <a
                  href="https://www.linkedin.com/in/santhoshkumar-petchimuthu-47219a298/"
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom grid for experience, interests, tools, soft skills etc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Certifications</h3>
            <div className="text-gray-700">Python, Java, Power BI, Excel</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-100 to-white rounded-xl p-6 border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-600 mb-2">Interests</h3>
            <div className="text-gray-700">Deep Learning, Computer Vision, NLP</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Favorite Tools</h3>
            <div className="text-gray-700">Python, Jupyter Lab, VS Code, Kali Linux, scikit-learn, TensorFlow</div>
          </div>
        </div>
      </div>
    </div>
  );
}
