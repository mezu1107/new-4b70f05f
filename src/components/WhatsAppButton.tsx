import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/923173712950"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elegant flex items-center justify-center hover:scale-110 transition-smooth"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);
