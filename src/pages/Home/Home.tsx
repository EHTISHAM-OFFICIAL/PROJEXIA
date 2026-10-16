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

export default function Home() {
  return (
    <>
      <Seo
        title="ProjexiaHub — Custom Electronics Design & Development in Pakistan"
        description="ProjexiaHub designs and builds custom electronics in Pakistan, including embedded systems, IoT devices, automation, robotics, PCB work and working prototypes."
        path="/"
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
