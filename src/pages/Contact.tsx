import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Have questions, suggestions, or feedback about FreeToolz? Want to collaborate on a project? 
        I'd love to hear from you! Feel free to reach out through any of the channels below.
      </p>
      
      {/* Direct Contact Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">📧 Direct Contact</h2>
        <p className="text-center text-blue-50 mb-6 text-sm">
          For the fastest response, feel free to email me directly or connect through social media.
        </p>
        <div className="text-center mb-6">
          <p className="text-lg mb-1 font-semibold">Muhammad Atif Latif</p>
          <p className="text-blue-100 mb-4 text-sm">Data Scientist & Machine Learning Engineer</p>
          <a 
            href="mailto:muhammadatiflatif67@gmail.com"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            <Mail className="h-5 w-5" />
            <span>muhammadatiflatif67@gmail.com</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-sm text-blue-100 mb-4 font-medium">Connect on Social Media</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="https://github.com/m-Atif-Latif" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium">GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-atif-latif-13a171318" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-sm font-medium">LinkedIn</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://www.kaggle.com/matiflatif" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
              </svg>
              <span className="text-sm font-medium">Kaggle</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://x.com/mianatif5867" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
            >
              <Twitter className="h-4 w-4" />
              <span className="text-sm font-medium">Twitter/X</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://www.instagram.com/its_atif_ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-sm font-medium">Instagram</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send a Message</h2>
        {submitted ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
            <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea required rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
