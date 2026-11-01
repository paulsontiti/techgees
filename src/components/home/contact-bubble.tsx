'use client'

import { whatsappLink } from "@/lib/content";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import { MessageCircle } from "lucide-react";

export default function ContactBubble() {
  return (
    <a
      href={whatsappLink(
        "Hello The Global Genius! I'd like to ask about your online learning programs.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with The Global Genius on WhatsApp"
      className={`fixed z-40 bottom-5 right-5 sm:bottom-7 sm:right-7 group h-14 w-14 sm:h-[60px] sm:w-[60px] rounded-full bg-emerald-900 text-white flex items-center justify-center shadow-[0_12px_36px_rgba(32,191,117,.36)] hover:scale-110 transition-transform`}
    >
      <MessageCircle size={27} />
      <span className="absolute right-[calc(100%+12px)] bg-ink rounded-full px-4 py-2 text-xs font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Ask us a question
      </span>
    </a>
  );
}