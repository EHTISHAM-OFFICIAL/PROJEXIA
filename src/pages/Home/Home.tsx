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
import { SchoolModelsPromo } from '../../components/home/SchoolModelsPromo';
import { useEffect, useState } from 'react';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolSettings } from '../../services/schoolModelService';

export default function Home() {
  const [catalogSettings, setCatalogSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  useEffect(() => { let live = true; void schoolModelService.getSettings().then(s => { if (live) setCatalogSettings(s); }).catch(() => {}); return () => { live = false; }; }, []);
  return (
    <>
      <Seo
        title="ProjexiaHub — Custom Electronics Design & Development in Pakistan"
        description="ProjexiaHub designs and builds custom electronics in Pakistan, including embedded systems, IoT devices, automation, robotics, PCB work and working prototypes."
        path="/"
      />
      <Hero />
      <Intro />
      {catalogSettings.electronicsEnabled && catalogSettings.showElectronicsOnHome && <FeaturedProjects />
      <SchoolModelsPromo />
      <Services />
      <Process />
      <Technologies />
      <WhyMectec />
      <Testimonials />
      <RequestCta />
    </>
  );
}
