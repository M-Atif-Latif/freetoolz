import { Wrench, Linkedin, Facebook, MessageCircle, X } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/freetoolz/',
    icon: Linkedin,
    description: 'Career announcements & feature drops',
    gradient: 'from-blue-600 via-blue-500 to-sky-400',
    accent: 'text-blue-100',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/14PseuM8Yb9/',
    icon: Facebook,
    description: 'Community group & launch news',
    gradient: 'from-blue-700 via-indigo-600 to-purple-500',
    accent: 'text-indigo-100',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/R2WnXtm9A',
    icon: MessageCircle,
    description: 'Live support & roadmap votes',
    gradient: 'from-indigo-600 via-purple-500 to-pink-500',
    accent: 'text-purple-100',
  },
  {
    name: 'WhatsApp Channel',
    href: 'https://whatsapp.com/channel/0029VbBw4mg11ulYLNdJuk0v',
    icon: MessageCircle,
    description: 'Instant tips & tool-of-the-day',
    gradient: 'from-emerald-600 via-emerald-500 to-lime-400',
    accent: 'text-emerald-50',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/MuhammadAtif67?t=A6SSAB3Ii2nZEqV2zJbQpw&s=09',
    icon: X,
    description: 'Quick updates & micro tutorials',
    gradient: 'from-slate-900 via-gray-800 to-gray-600',
    accent: 'text-gray-200',
  },
];

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center gap-3 rounded-2xl border border-white/20 bg-gradient-to-r ${link.gradient} p-3 text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80`}
                    aria-label={link.name}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                      <link.icon className={`h-5 w-5 ${link.accent}`} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{link.name}</span>
                      <span className="text-[11px] text-white/80">{link.description}</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
                  </a>
                ))}
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
              <a
                href="https://www.linkedin.com/in/muhammadatiflatif/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-500 hover:underline font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Muhammad Atif Latif
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}