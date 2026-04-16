import { Share2, Twitter, Linkedin, MessageCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
  toolName: string;
}

export default function ShareButton({ title, description, url, toolName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2 items-center">
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
         className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 transition-colors" title="Share on Twitter">
        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer"
         className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 transition-colors" title="Share on LinkedIn">
        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"
         className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 transition-colors" title="Share on WhatsApp">
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <button onClick={copyLink} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={copied ? 'Copied!' : 'Copy link'}>
        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
