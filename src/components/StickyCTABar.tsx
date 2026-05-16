import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const StickyCTABar = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-elegant grid grid-cols-3">
    <a href="tel:03173712950" className="flex flex-col items-center py-2.5 text-xs font-medium text-foreground hover:text-primary"><Phone className="w-5 h-5 mb-1" />Call</a>
    <a href="https://wa.me/923173712950" target="_blank" rel="noreferrer" className="flex flex-col items-center py-2.5 text-xs font-medium text-foreground hover:text-primary border-x border-border"><MessageCircle className="w-5 h-5 mb-1" />WhatsApp</a>
    <Link to="/contact" className="flex flex-col items-center py-2.5 text-xs font-medium text-foreground hover:text-primary"><Calendar className="w-5 h-5 mb-1" />Book</Link>
  </div>
);
