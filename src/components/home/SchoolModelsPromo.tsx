import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { Image } from '../ui/Image';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModel, SchoolSettings } from '../../services/schoolModelService';

export function SchoolModelsPromo() {
  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  const [items, setItems] = useState<SchoolModel[]>([]);

  useEffect(() => {
    let live = true;
    Promise.all([schoolModelService.getSettings(), schoolModelService.getPublished()])
      .then(([nextSettings, publishedModels]) => {
        if (!live) return;
        setSettings(nextSettings);
        setItems(publishedModels.filter((model) => model.featured));
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  if (!settings.enabled || !settings.showOnHome) return null;

  return (
    <section className="border-y border-line bg-surface/40 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium text-accent">For schools and young makers</p>
            <h2 className="text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">School charts and educational models</h2>
            <p className="mt-3 leading-relaxed text-content-secondary">
              Explore science charts, classroom models and creative school exhibition projects. Request a tailored quote.
            </p>
          </div>
          <ButtonLink
            to="/school-projects"
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-md hover:shadow-lg sm:w-auto"
          >
            View all school models <ArrowRight size={17} />
          </ButtonLink>
        </div>
        {items.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((model) => (
              <Link
                key={model.id}
                to={'/school-projects/' + model.slug}
                className="group overflow-hidden rounded-xl border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image src={model.thumbnailUrl} alt={model.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold transition-colors group-hover:text-accent">{model.title}</h3>
                  <p className="mt-1 text-sm text-content-secondary">{model.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
