import { PageLayout } from "@/components/layout/PageLayout";

const Legal = ({ title, body, slug }: { title: string; body: React.ReactNode; slug: string }) => (
  <PageLayout title={`${title} | AM Enterprises`} description={`${title} for AM Enterprises website.`} canonical={`/${slug}`}>
    <section className="gradient-royal text-primary-foreground py-16">
      <div className="container mx-auto"><h1 className="text-4xl md:text-5xl">{title}</h1></div>
    </section>
    <section className="py-16">
      <div className="container mx-auto max-w-3xl prose prose-slate">{body}</div>
    </section>
  </PageLayout>
);

export const PrivacyPolicy = () => (
  <Legal slug="privacy-policy" title="Privacy Policy" body={
    <div className="space-y-4 text-muted-foreground">
      <p>AM Enterprises respects your privacy. This policy explains how we collect, use, and protect your information when you use our website and services.</p>
      <h2 className="text-foreground text-xl mt-6">Information We Collect</h2>
      <p>We collect information you provide via forms (name, email, phone), and standard analytics data such as IP address and browser type.</p>
      <h2 className="text-foreground text-xl mt-6">How We Use It</h2>
      <p>To respond to enquiries, deliver services, improve our website, and send relevant updates (only if you opt in).</p>
      <h2 className="text-foreground text-xl mt-6">Your Rights</h2>
      <p>You may request access, correction, or deletion of your data at any time by emailing info@amenterprises.tech.</p>
    </div>
  } />
);

export const Terms = () => (
  <Legal slug="terms" title="Terms & Conditions" body={
    <div className="space-y-4 text-muted-foreground">
      <p>By using the AM Enterprises website or services, you agree to these terms.</p>
      <h2 className="text-foreground text-xl mt-6">Services</h2>
      <p>All services are delivered per a separate signed agreement (Statement of Work). This website is informational.</p>
      <h2 className="text-foreground text-xl mt-6">Intellectual Property</h2>
      <p>All website content is the property of AM Enterprises unless otherwise noted.</p>
      <h2 className="text-foreground text-xl mt-6">Liability</h2>
      <p>We provide this website "as is" and disclaim warranties to the extent permitted by law.</p>
    </div>
  } />
);
