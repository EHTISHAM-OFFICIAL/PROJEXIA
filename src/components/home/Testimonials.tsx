import { Star } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { usePublishedTestimonials } from '../../hooks/useTestimonials';

export function Testimonials() {
  const { data } = usePublishedTestimonials();

  // No loading skeleton and no empty state here on purpose: unlike projects
  // or requests, an empty testimonials section isn't something to reassure a
  // visitor about — it should just not exist until there's something real to
  // show. See ARCHITECTURE.md / the no-fake-content principle.
  if (!data || data.length === 0) return null;

  return (
    <Section className="border-b border-line">
      <SectionHeading title="What clients say" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((testimonial) => (
          <figure key={testimonial.id} className="card flex flex-col gap-4 p-6">
            {testimonial.rating && (
              <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className={index < testimonial.rating! ? 'fill-accent text-accent' : 'text-line-strong'}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
            <blockquote className="flex-1 text-sm leading-relaxed text-content-secondary">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-medium text-content">{testimonial.name}</span>
              {(testimonial.role || testimonial.company) && (
                <span className="text-content-muted">
                  {' — '}
                  {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
