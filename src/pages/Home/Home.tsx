import { Seo } from '../../components/ui/Seo';
import { Hero } from '../../components/home/Hero';
import { Intro } from '../../components/home/Intro';
import { FeaturedProjects } from '../../components/home/FeaturedProjects';
import { Services } from '../../components/home/Services';
import { Process } from '../../components/home/Process';
import { Technologies } from '../../components/home/Technologies';
import { WhyMectec } from '../../components/home/WhyMectec';
import { RequestCta } from '../../components/home/RequestCta';
import { SITE } from '../../constants/site';

export default function Home() {
  return (
    <>
      <Seo title={SITE.name} description={SITE.description} path="/" />
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Services />
      <Process />
      <Technologies />
      <WhyMectec />
      <RequestCta />
    </>
  );
}
