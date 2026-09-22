import { Seo } from '../../components/ui/Seo';
import { Hero } from '../../components/home/Hero';
import { Intro } from '../../components/home/Intro';
import { FeaturedProjects } from '../../components/home/FeaturedProjects';
import { Services } from '../../components/home/Services';
import { Process } from '../../components/home/Process';
import { Technologies } from '../../components/home/Technologies';
import { WhyMectec } from '../../components/home/WhyMectec';
import { Testimonials } from '../../components/home/Testimonials';
import { RequestCta } from '../../components/home/RequestCta';
import { SITE } from '../../constants/site';

export default function Home() {
  return (
    <>
      <Seo
        title="Custom Electronics Design & Development in Pakistan"
        description="MECTEC designs and builds custom electronics in Pakistan, including embedded systems, IoT devices, automation, robotics, PCB work and working prototypes."
        path="/"
        keywords={[
          'custom electronics design Pakistan',
          'electronics development Pakistan',
          'embedded systems Pakistan',
          'IoT development Pakistan',
          'electronics prototyping Pakistan',
        ]}
      />
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Services />
      <Process />
      <Technologies />
      <WhyMectec />
      <Testimonials />
      <RequestCta />
    </>
  );
}
