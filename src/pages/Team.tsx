import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { TeamSection } from "@/components/TeamSection";

const Team = () => (
  <PageLayout title="Our Team — AM Enterprises" description="Meet the strategists, designers, developers and marketers powering AM Enterprises." canonical="/team" primaryKeyword="AM Enterprises team">
    <PageHero title="Meet Our Team" subtitle="The minds behind the growth — strategists, creators and engineers." />
    <section className="py-16 lg:py-24">
      <div className="container mx-auto">
        <TeamSection />
      </div>
    </section>
  </PageLayout>
);
export default Team;
