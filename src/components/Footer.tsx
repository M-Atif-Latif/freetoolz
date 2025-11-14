<<<<<<< HEAD
import { Wrench, Linkedin, Facebook, MessageCircle, X } from 'lucide-react';
=======
import { Wrench, Linkedin, Facebook, MessageCircle } from 'lucide-react';
>>>>>>> aa3e61f57bc0e6bb8913839d355d975968937e99

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800 mt-12 sm:mt-16 md:mt-20 transition-all duration-300 safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Wrench className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-500" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full blur-md opacity-30"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Free<span className="text-blue-600 dark:text-blue-500">Toolz</span></span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Your ultimate collection of 120+ free online tools. No registration required, no API keys needed. Fast, simple, and always free.
            </p>
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">FreeToolz Cloud</p>
              <p className="text-2xs sm:text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Connect with FreeToolz on social media</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a 
                  href="https://www.linkedin.com/company/freetoolz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 transition-all duration-300 hover:scale-110 hover:shadow-lg btn-touch"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/share/14PseuM8Yb9/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg btn-touch"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://discord.gg/R2WnXtm9A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 hover:scale-110 hover:shadow-lg btn-touch"
                  aria-label="Discord"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029VbBw4mg11ulYLNdJuk0v" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-green-500 hover:to-green-700 transition-all duration-300 hover:scale-110 hover:shadow-lg btn-touch"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://x.com/MuhammadAtif67?t=A6SSAB3Ii2nZEqV2zJbQpw&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg btn-touch"
                  aria-label="X (Twitter)"
                >
<<<<<<< HEAD
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
=======
                  <span className="text-xs sm:text-sm font-semibold">X</span>
>>>>>>> aa3e61f57bc0e6bb8913839d355d975968937e99
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><button onClick={() => onNavigate('/')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Home</button></li>
              <li><button onClick={() => onNavigate('/blog')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Blog</button></li>
              <li><button onClick={() => onNavigate('/faq')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">FAQ</button></li>
              <li><button onClick={() => onNavigate('/about')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">About Us</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li><button onClick={() => onNavigate('/privacy')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('/disclaimer')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Disclaimer</button></li>
              <li><button onClick={() => onNavigate('/sitemap')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Sitemap</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0 gap-2">
            <p className="text-center md:text-left text-gray-600 dark:text-gray-400 text-2xs sm:text-xs md:text-sm">
              &copy; {new Date().getFullYear()} FreeToolz. All rights reserved.
            </p>
            <p className="text-center md:text-right text-gray-600 dark:text-gray-400 text-2xs sm:text-xs md:text-sm">
              Crafted with <span className="text-red-500 animate-pulse inline-block">♥</span> by{' '}
              <a href="https://github.com/muhammadatiflatif" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200">
                Muhammad Atif Latif
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}