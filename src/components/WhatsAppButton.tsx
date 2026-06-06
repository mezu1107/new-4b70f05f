import { MessageCircle } from "lucide-react";
import { PRIMARY_PHONE } from "@/lib/contact";

export const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${PRIMARY_PHONE.wa}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);
