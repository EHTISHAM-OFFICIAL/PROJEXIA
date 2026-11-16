import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { SectionHeading, SubHeading } from './SectionHeading';
import { numberSections } from './sections';
import { CaseStudySection, Prose } from '../projects/CaseStudySection';

vi.mock('../../services/imgbbService', () => ({ imgbbService: { getBackupImageUrl: async () => null } }));

const render = (node: React.ReactNode) => renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);

describe('numberSections', () => {
  it('numbers only the sections that are shown, in order, with no gaps', () => {
    expect(
      numberSections([
        { id: 'overview', present: true },
        { id: 'problem', present: false },
        { id: 'solution', present: true },
        { id: 'gallery', present: false },
        { id: 'results', present: true },
      ]),
    ).toEqual({ overview: '01', solution: '02', results: '03' });
  });

  it('pads to two digits and handles an empty page', () => {
    expect(numberSections([])).toEqual({});
    const many = numberSections(Array.from({ length: 12 }, (_, i) => ({ id: `s${i}`, present: true })));
    expect(many.s0).toBe('01');
    expect(many.s11).toBe('12');
  });
});

describe('SectionHeading', () => {
  it('shows the number and title, and hides the decorative trace from assistive tech', () => {
    const html = render(<SectionHeading number="03">Components used</SectionHeading>);
    expect(html).toContain('03');
    expect(html).toContain('Components used');
    expect(html).toContain('<h2');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('<svg');
  });

  it('works without a number', () => {
    const html = render(<SectionHeading>Related projects</SectionHeading>);
    expect(html).toContain('Related projects');
    expect(html).not.toMatch(/font-mono[^>]*>\d/);
  });

  it('gives each trace its own gradient id so several can share a page', () => {
    const html = render(
      <>
        <SectionHeading number="01">A</SectionHeading>
        <SectionHeading number="02">B</SectionHeading>
      </>,
    );
    const ids = [...html.matchAll(/<linearGradient id="([^"]+)"/g)].map((match) => match[1]);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});

describe('SubHeading', () => {
  it('level 3 has the copper pad, level 4 does not', () => {
    expect(render(<SubHeading>Sensing</SubHeading>)).toContain('<h3');
    expect(render(<SubHeading>Sensing</SubHeading>)).toContain('bg-accent');
    const small = render(<SubHeading level={4}>Detail</SubHeading>);
    expect(small).toContain('<h4');
    expect(small).not.toContain('bg-accent');
  });
});

describe('CaseStudySection', () => {
  it('opens with the numbered header only when given a number', () => {
    const numbered = render(<CaseStudySection id="x" title="Overview" number="01">body</CaseStudySection>);
    expect(numbered).toContain('01');
    expect(numbered).toContain('<svg');

    // Other screens (admin preview, collections) keep the original accent-bar header.
    const plain = render(<CaseStudySection id="x" title="Overview">body</CaseStudySection>);
    expect(plain).not.toContain('<svg');
    expect(plain).toContain('border-t');
  });

  it('renders nothing when empty', () => {
    expect(render(<CaseStudySection title="Overview" number="01" empty>body</CaseStudySection>)).toBe('');
  });
});

describe('Prose heading scale', () => {
  it('reading text uses its own headings and opts out of the mobile.css overrides', () => {
    const html = render(<Prose text={'## Sensing\ntext'} size="reading" />);
    expect(html).not.toContain('prose-content');
    expect(html).toContain('<h3');
    expect(html).toContain('Sensing');
  });

  it('compact text keeps the original behaviour for blog and collections', () => {
    const html = render(<Prose text={'## Heading\ntext'} />);
    expect(html).toContain('prose-content');
    expect(html).toContain('<h2');
  });
});
