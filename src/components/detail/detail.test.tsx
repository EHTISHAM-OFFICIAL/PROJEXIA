import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { buildNavGroups } from './sections';
import { FactGrid } from './FactGrid';
import { SpecList } from './SpecList';
import { ComponentList } from './ComponentList';
import { BulletList, InlineText, Prose, isSafeLinkTarget } from '../projects/CaseStudySection';

const render = (node: React.ReactNode) =>
  renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);

describe('buildNavGroups', () => {
  it('keeps only groups with content and only the sections that exist', () => {
    const groups = buildNavGroups([
      { label: 'Overview', sections: [{ id: 'overview', present: true }, { id: 'problem', present: false }] },
      { label: 'Photos', sections: [{ id: 'gallery', present: false }] },
      { label: 'Results', sections: [{ id: 'challenges', present: false }, { id: 'results', present: true }] },
    ]);
    expect(groups).toEqual([
      { label: 'Overview', ids: ['overview'] },
      { label: 'Results', ids: ['results'] },
    ]);
  });

  it('links a group to its first existing section', () => {
    const [group] = buildNavGroups([
      { label: 'Solution', sections: [{ id: 'solution', present: false }, { id: 'how-it-works', present: true }] },
    ]);
    expect(group.ids[0]).toBe('how-it-works');
  });
});

describe('link safety', () => {
  it('allows web, mail, phone and in-site targets only', () => {
    for (const ok of ['https://example.com', 'http://example.com/a', 'mailto:a@b.co', 'tel:+923001234567', '/contact', '#specs']) {
      expect(isSafeLinkTarget(ok), ok).toBe(true);
    }
    for (const bad of ['javascript:alert(1)', ' JaVaScRiPt:alert(1)', 'data:text/html,x', 'vbscript:x', '//evil.example', 'ftp://x.co', '']) {
      expect(isSafeLinkTarget(bad), bad).toBe(false);
    }
  });

  it('renders an unsafe markdown link as plain text, not an anchor', () => {
    const html = render(<InlineText text="see [the docs](javascript:alert(1)) now" />);
    expect(html).not.toContain('href');
    expect(html).toContain('the docs');
  });

  it('renders a safe markdown link as an anchor', () => {
    expect(render(<InlineText text="[docs](https://example.com)" />)).toContain('href="https://example.com"');
  });
});

describe('Prose sizes', () => {
  const text = '## Sensing\nParagraph text.\n\n- one\n- two';

  it('keeps the compact look unchanged by default', () => {
    const html = render(<Prose text={text} />);
    expect(html).toContain('text-sm');
    expect(html).toContain('<h2');
  });

  it('reading size is 16px on phones, with sub-headings one level down', () => {
    const html = render(<Prose text={text} size="reading" />);
    expect(html).toContain('text-base leading-[1.8]');
    expect(html).not.toContain('text-sm');
    expect(html).toContain('<h3');
    expect(html).not.toContain('<h2');
  });
});

describe('FactGrid', () => {
  it('drops facts without a value and renders nothing when none remain', () => {
    const html = render(<FactGrid facts={[{ label: 'Status', value: 'Completed' }, { label: 'Cost', value: '  ' }, { label: 'Date', value: null }]} />);
    expect(html).toContain('Status');
    expect(html).not.toContain('Cost');
    expect(html).not.toContain('Date');
    expect(render(<FactGrid facts={[{ label: 'Cost', value: '' }]} />)).toBe('');
  });
});

describe('SpecList and BulletList', () => {
  it('renders label and value rows', () => {
    const html = render(<SpecList items={[{ label: 'Voltage', value: '12 V' }]} />);
    expect(html).toContain('Voltage');
    expect(html).toContain('12 V');
  });

  it('check lists use readable text and an icon per item', () => {
    const html = render(<BulletList items={['First', 'Second']} variant="check" />);
    expect(html).toContain('text-base');
    expect(html.match(/<svg/g)?.length).toBe(2);
  });
});

describe('ComponentList', () => {
  const parts = [
    { name: 'ESP32 module', category: 'Microcontroller', quantity: 2, notes: 'Runs the loop.', optional: false },
    { name: 'Enclosure', category: '', quantity: 1, notes: '', optional: true },
  ];

  it('provides a stacked list for phones and a table from md, never a fixed-width table', () => {
    const html = render(<ComponentList components={parts} />);
    expect(html).toContain('md:hidden'); // phone list
    expect(html).toContain('hidden overflow-hidden'); // table wrapper hidden below md
    expect(html).toContain('<table');
    expect(html).not.toContain('min-w-[720px]');
  });

  it('shows quantity, notes and the optional badge on the phone list', () => {
    const html = render(<ComponentList components={parts} />);
    expect(html).toContain('Qty 2');
    expect(html).toContain('Runs the loop.');
    expect(html).toContain('Optional');
  });
});
