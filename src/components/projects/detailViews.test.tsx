import { describe, expect, it, vi } from 'vitest';

// The image component asks this service for a backup URL, which would load Firebase.
// The related-projects grid pulls in site settings (Firestore); these tests pass no related items.
vi.mock('./ProjectGrid', () => ({ ProjectGrid: () => null }));
vi.mock('../../services/imgbbService', () => ({
  imgbbService: { getBackupImageUrl: async () => null },
}));

import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { ProjectDetailView } from './ProjectDetailView';
import { SchoolModelDetail } from '../schoolModels/SchoolModelDetail';
import { FactGrid } from '../detail/FactGrid';
import type { Project } from '../../types/project';
import type { SchoolModel } from '../../services/schoolModelService';

const render = (node: React.ReactNode) =>
  renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);

const ts = { toDate: () => new Date('2025-10-02') } as never;

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'p1', title: 'Greenhouse Controller', slug: 'greenhouse', shortDescription: 'Short summary.',
    description: 'Long description.', category: 'IoT', subcategory: null, status: 'completed',
    difficulty: 'intermediate', technologies: [], tags: [], objectives: [], features: [],
    problemStatement: '', solutionOverview: '', howItWorks: '', challenges: [], results: '',
    components: [], specifications: [], estimatedCost: { amount: null, currency: 'PKR', label: null },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: false, published: true, viewCount: 0, createdAt: ts, updatedAt: ts, completedAt: ts,
    ...overrides,
  } as Project;
}

function makeModel(overrides: Partial<SchoolModel> = {}): SchoolModel {
  return {
    id: 'm1', title: 'Heart Model', slug: 'heart-model', category: 'Science', subcategory: '', modelType: 'Working model',
    difficulty: 'Medium', status: 'Available', subject: 'Biology', gradeRange: 'Grades 7 to 10',
    shortDescription: 'A heart model.', description: 'About the model.', problemStatement: '', workingPrinciple: '',
    howToUse: '', setupInstructions: '', safetyNotes: '', maintenanceNotes: '', materials: [], objectives: [],
    features: [], customizationOptions: [], components: [], specifications: [], tags: [], dimensions: '',
    estimatedBuildTime: '', thumbnailUrl: '', heroImageUrl: '', galleryUrls: [], videoUrl: '', documentationUrl: '',
    featured: false, published: true, viewCount: 0, seoTitle: '', seoDescription: '', keywords: [],
    createdAt: ts, updatedAt: ts,
    ...overrides,
  } as SchoolModel;
}

describe('ProjectDetailView', () => {
  it('renders a sparse project without empty sections or jump links to nothing', () => {
    const html = render(<ProjectDetailView project={makeProject()} related={[]} />);
    expect(html).toContain('Greenhouse Controller');
    expect(html).toContain('Overview');
    expect(html).not.toContain('Project gallery');
    expect(html).not.toContain('Components used');
    expect(html).not.toContain('Related projects');
    // Only one group means no jump bar at all.
    expect(html).not.toContain('On this page');
  });

  it('adds a jump link for each section that has content', () => {
    const html = render(
      <ProjectDetailView
        project={makeProject({
          problemStatement: 'A problem.',
          solutionOverview: 'A solution.',
          results: 'Good results.',
          specifications: [{ label: 'Voltage', value: '12 V' }],
        })}
        related={[]}
      />,
    );
    for (const id of ['#overview', '#solution', '#results', '#specifications']) expect(html).toContain(`href="${id}"`);
    expect(html).not.toContain('href="#project-gallery"');
  });

  it('only renders http(s) external links', () => {
    const html = render(
      <ProjectDetailView
        project={makeProject({
          externalLinks: { github: 'javascript:alert(1)', documentation: 'https://example.com/docs', demo: 'data:text/html,x' },
          media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: 'javascript:void(0)' },
        })}
        related={[]}
      />,
    );
    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('data:text/html');
    expect(html).toContain('href="https://example.com/docs"');
    expect(html).not.toContain('Source code');
    expect(html).not.toContain('Watch the demo');
  });

  it('uses the gallery button without a duplicate real-photos text link', () => {
    const gallery = [{ url: 'https://example.com/a.jpg', alt: 'a', caption: null, order: 0 }];
    const withGallery = render(
      <ProjectDetailView
        project={makeProject({ media: { thumbnailUrl: 'https://example.com/h.jpg', heroImageUrl: 'https://example.com/h.jpg', gallery, videoUrl: null } })}
        related={[]}
      />,
    );
    expect(withGallery).toContain('View gallery');
    expect(withGallery).toContain('The gallery contains photographs of the project build.');
    expect(withGallery.indexOf('The gallery contains photographs of the project build.')).toBeLessThan(withGallery.indexOf('View gallery'));
    expect(withGallery).not.toContain('See the real photos');
    const without = render(
      <ProjectDetailView
        project={makeProject({ media: { thumbnailUrl: 'https://example.com/h.jpg', heroImageUrl: 'https://example.com/h.jpg', gallery: [], videoUrl: null } })}
        related={[]}
      />,
    );
    expect(without).not.toContain('See the real photos');
    expect(without).not.toContain('View gallery');
  });
});

describe('SchoolModelDetail', () => {
  it('renders a sparse model and always offers the quote request', () => {
    const html = render(<SchoolModelDetail model={makeModel()} related={[]} />);
    expect(html).toContain('Heart Model');
    expect(html).toContain('/request-school-model?slug=heart-model');
    expect(html).not.toContain('Handling and safety');
    expect(html).not.toContain('More school models');
  });

  it('shows safety notes as their own callout and builds chapters from content', () => {
    const html = render(
      <SchoolModelDetail
        model={makeModel({
          safetyNotes: 'Unplug before refilling.',
          howToUse: '- Fill\n- Switch on',
          heroImageUrl: 'https://example.com/model-preview.jpg',
          galleryUrls: ['https://example.com/1.jpg', 'https://example.com/1.jpg', 'https://example.com/2.jpg'],
          specifications: [{ label: 'Weight', value: '2 kg' }],
        })}
        related={[]}
      />,
    );
    expect(html).toContain('Handling and safety');
    expect(html).toContain('Unplug before refilling.');
    expect(html).toContain('href="#about"');
    expect(html).toContain('href="#photos"');
    expect(html).toContain('This preview may be illustrative. The gallery shows photographs of the model.');
    expect(html).toContain('View gallery');
    expect(html).toContain('href="#use"');
    expect(html).toContain('href="#details"');
    expect(html).not.toContain('href="#parts"');
  });

  it('drops unsafe video and resource links', () => {
    const html = render(
      <SchoolModelDetail model={makeModel({ videoUrl: 'javascript:alert(1)', documentationUrl: 'https://example.com/lesson' })} related={[]} />,
    );
    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('Watch demo');
    expect(html).toContain('Resources');
  });
});


describe('FactGrid', () => {
  it('fits three available facts into three desktop columns without a placeholder tile', () => {
    const html = render(<FactGrid facts={[
      { label: 'Status', value: 'Completed' },
      { label: 'Difficulty', value: 'Intermediate' },
      { label: 'Completed', value: '2 Oct 2025' },
      { label: 'Approx. cost', value: null },
    ]} />);
    expect(html).toContain('lg:grid-cols-3');
    expect(html).not.toContain('lg:grid-cols-4');
    expect(html).toContain('Completed');
    expect(html).toContain('Intermediate');
    expect(html).toContain('2 Oct 2025');
    expect(html).not.toContain('Approx. cost');
  });
});

describe('section numbering on the pages', () => {
  it('numbers the project sections consecutively, skipping missing ones', () => {
    const html = render(
      <ProjectDetailView
        project={makeProject({ description: 'About.', problemStatement: '', solutionOverview: 'Fix.', results: 'Done.' })}
        related={[]}
      />,
    );
    // overview, solution, results are shown; problem is not.
    expect(html).toContain('>01<');
    expect(html).toContain('>02<');
    expect(html).toContain('>03<');
    expect(html).not.toContain('>04<');
  });

  it('numbers the school model chapters', () => {
    const html = render(
      <SchoolModelDetail
        model={makeModel({ safetyNotes: 'Careful.', specifications: [{ label: 'Weight', value: '2 kg' }] })}
        related={[]}
      />,
    );
    expect(html).toContain('>01<');
    expect(html).toContain('>02<');
    expect(html).toContain('>03<');
  });
});
