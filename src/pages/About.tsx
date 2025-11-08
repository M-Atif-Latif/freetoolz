import { Github, Linkedin, Twitter, Instagram, Mail, ExternalLink, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-in fade-in duration-700">
        <div className="inline-block mb-4">
          <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 px-6 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-200 dark:border-blue-800">
            ✨ Our Mission
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">FreeToolz</span>
        </h1>
      </div>
      
      {/* About FreeToolz Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-10 space-y-8 mb-16 transition-all hover:shadow-2xl">
        <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
            FreeToolz is built on a simple yet powerful belief: <strong className="text-blue-600 dark:text-blue-400">essential digital utilities should be accessible to everyone, everywhere, at any time.</strong>
          </p>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          In today's digital age, we often find ourselves needing quick solutions—whether it's converting file formats, 
          calculating complex formulas, manipulating text, or processing images. Many online tools either require costly 
          subscriptions, force you through lengthy registration processes, or compromise your privacy by storing your data.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          <strong className="text-blue-600 dark:text-blue-400">FreeToolz changes that.</strong> We provide a comprehensive suite of 120+ professional-grade tools that are 
          completely free, require no registration, and respect your privacy. All processing happens directly in your browser, 
          ensuring your data never leaves your device.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="text-4xl mb-3">🔓</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">100% Free</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">No hidden costs, no premium features, no paywalls. Everything is free forever.</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-6 border-2 border-green-200 dark:border-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Privacy First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">All processing happens in your browser. Your data stays on your device, always.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Instant Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">No sign-ups, no downloads, no waiting. Just open and use any tool immediately.</p>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-10 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
              👨‍💻 About the Developer
            </h2>
            <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-xl font-bold mb-6 shadow-lg">
              Muhammad Atif Latif
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-2xl text-center mb-8 font-semibold">
              🚀 Data Scientist & Machine Learning Engineer
            </p>
            
            <p className="text-center text-blue-50 leading-relaxed mb-6 text-lg">
              With a deep passion for artificial intelligence and data science, I specialize in transforming complex data 
              into actionable insights and building intelligent systems that address real-world challenges. My expertise 
              spans the entire machine learning lifecycle—from initial data exploration and preprocessing to model development, 
              optimization, and production deployment.
            </p>

            <p className="text-center text-blue-50 leading-relaxed mb-10 text-lg">
              FreeToolz represents my commitment to democratizing technology and making powerful digital tools accessible 
              to everyone. Whether you're a student, professional, developer, or just someone who needs a quick utility, 
              these tools are designed to make your life easier.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">🤖 Machine Learning</span>
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">🧠 Deep Learning</span>
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">📊 Data Analytics</span>
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">🌐 MLOps</span>
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">💻 Full-Stack Development</span>
              <span className="bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-white/35 transition-all">🔬 Research & Innovation</span>
            </div>

            {/* Social Links */}
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold text-center mb-6">🌐 Connect & Collaborate</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <a 
                  href="https://github.com/m-Atif-Latif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-semibold">GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/muhammad-atif-latif-13a171318" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="font-semibold">LinkedIn</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                
                <a 
                  href="https://www.kaggle.com/matiflatif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                  </svg>
                  <span className="font-semibold">Kaggle</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                
                <a 
                  href="https://x.com/mianatif5867" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="font-semibold">Twitter/X</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                
                <a 
                  href="https://www.instagram.com/its_atif_ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-semibold">Instagram</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                
                <a 
                  href="mailto:muhammadatiflatif67@gmail.com" 
                  className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Email</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-blue-800 p-10 mb-12">
        <h3 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-6">📈 My Mission</h3>
        <p className="text-gray-700 dark:text-gray-300 text-center text-xl leading-relaxed max-w-4xl mx-auto mb-6">
          <em className="text-blue-600 dark:text-blue-400 font-semibold">
            "Bridging the gap between cutting-edge research and practical applications. 
            Every line of code is a step towards a more intelligent and automated future."
          </em>
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-center text-lg leading-relaxed max-w-3xl mx-auto">
          I believe in the power of technology to solve meaningful problems and improve lives. Through continuous 
          learning, innovation, and collaboration, I strive to create solutions that make a real impact.
        </p>
      </div>

      {/* Collaboration Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-10 text-center">
        <h3 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">💡 Open for Collaboration</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
          I'm always excited to collaborate on innovative projects and connect with like-minded professionals. 
          Whether you're working on groundbreaking research, developing industry solutions, or contributing to 
          open-source initiatives, I'd love to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-xl font-semibold border-2 border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transition-all hover:scale-105">🔬 Research Projects</span>
          <span className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-xl font-semibold border-2 border-green-200 dark:border-green-700 shadow-md hover:shadow-lg transition-all hover:scale-105">🏢 Industry Applications</span>
          <span className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-xl font-semibold border-2 border-purple-200 dark:border-purple-700 shadow-md hover:shadow-lg transition-all hover:scale-105">🌍 Open Source</span>
          <span className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 px-6 py-3 rounded-xl font-semibold border-2 border-orange-200 dark:border-orange-700 shadow-md hover:shadow-lg transition-all hover:scale-105">📚 Knowledge Sharing</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base max-w-2xl mx-auto">
          Feel free to reach out for project collaborations, technical discussions, mentorship opportunities, 
          or just to chat about the latest developments in AI and machine learning. Let's build something amazing together!
        </p>
      </div>
    </div>
  );
}
