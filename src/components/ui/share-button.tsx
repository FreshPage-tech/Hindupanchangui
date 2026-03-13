import { useState } from "react";
import { Button } from "./button";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  getWhatsAppShareLink,
  getFacebookShareLink,
  getTwitterShareLink,
  getTelegramShareLink,
  shareContent
} from "../../utils/deep-linking";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showSocialOptions?: boolean;
}

export function ShareButton({
  title,
  text,
  url,
  variant = "outline",
  size = "default",
  className = "",
  showSocialOptions = false
}: ShareButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const success = await shareContent({ title, text, url });
    
    if (success) {
      toast.success("Shared successfully!");
    } else {
      // If native share failed, show social options
      setShowOptions(!showOptions);
    }
  };

  const handleCopyLink = async () => {
    try {
      // Try modern clipboard API first
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (clipboardError) {
        // Clipboard API blocked - use fallback
        const success = copyToClipboardFallback(url);
        if (success) {
          setCopied(true);
          toast.success("Link copied to clipboard!");
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error("Fallback copy failed");
        }
      }
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy link");
    }
  };

  // Fallback method for copying text
  const copyToClipboardFallback = (text: string): boolean => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      
      textarea.focus();
      textarea.select();
      
      let success = false;
      try {
        success = document.execCommand('copy');
      } catch (err) {
        console.error('execCommand copy failed:', err);
      }
      
      document.body.removeChild(textarea);
      return success;
    } catch (error) {
      console.error('Fallback copy error:', error);
      return false;
    }
  };

  const handleSocialShare = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'telegram') => {
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = getWhatsAppShareLink(text, url);
        break;
      case 'facebook':
        shareUrl = getFacebookShareLink(url);
        break;
      case 'twitter':
        shareUrl = getTwitterShareLink(text, url);
        break;
      case 'telegram':
        shareUrl = getTelegramShareLink(text, url);
        break;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShowOptions(false);
    toast.success(`Sharing via ${platform}...`);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleShare}
        variant={variant}
        size={size}
        className={className}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {/* Social Share Options Dropdown */}
      {showOptions && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-card border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
          <div className="text-sm text-muted-foreground mb-2 font-medium">Share via</div>
          
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-foreground">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleSocialShare('whatsapp')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left"
          >
            <MessageCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-foreground">WhatsApp</span>
          </button>

          {/* Telegram */}
          <button
            onClick={() => handleSocialShare('telegram')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left"
          >
            <Send className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-foreground">Telegram</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleSocialShare('facebook')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left"
          >
            <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm text-foreground">Facebook</span>
          </button>

          {/* Twitter */}
          <button
            onClick={() => handleSocialShare('twitter')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors text-left"
          >
            <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="text-sm text-foreground">Twitter</span>
          </button>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
}