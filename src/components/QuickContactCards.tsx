import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CONTACT, PRIMARY_PHONE, PRIMARY_EMAIL } from "@/lib/contact";

const cards = [
  { icon: Phone, title: "Call Us", value: PRIMARY_PHONE.display, href: `tel:${PRIMARY_PHONE.tel}` },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${PRIMARY_PHONE.wa}` },
  { icon: Mail, title: "Email Us", value: PRIMARY_EMAIL, href: `mailto:${PRIMARY_EMAIL}` },
  { icon: MapPin, title: "Visit Us", value: CONTACT.offices[0].name, href: "/contact" },
];

export const QuickContactCards = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {cards.map((c) => (
      <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
        <Card className="p-6 text-center hover:shadow-elegant hover:-translate-y-1 transition-smooth bg-white h-full">
          <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center mx-auto mb-3"><c.icon className="w-5 h-5" /></div>
          <div className="font-semibold text-sm mb-1">{c.title}</div>
          <div className="text-xs text-muted-foreground">{c.value}</div>
        </Card>
      </a>
    ))}
  </div>
);
