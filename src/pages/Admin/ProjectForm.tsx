import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown, Circle, Eye, Trash2 } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { Field, FieldSet } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { RichTextEditor } from '../../components/forms/RichTextEditor';
import { Checkbox } from '../../components/forms/Choice';
import { TableEditor } from '../../components/forms/ListEditor';
import { LibraryMultiSelect } from '../../components/forms/LibraryMultiSelect';
import { ImageUploadField } from '../../components/forms/ImageUploadField';
import { ProjectDraftPreview } from '../../components/projects/ProjectDraftPreview';
import { useProjectById } from '../../hooks/useProject';
import { projectService } from '../../services/projectService';
import { imgbbService } from '../../services/imgbbService';
import { projectLibraryService } from '../../services/projectLibraryService';
import { PROJECT_CATEGORIES, sortProjectCategories } from '../../constants/categories';
import {
  PROJECT_DIFFICULTIES,
  PROJECT_STATUSES,
} from '../../constants/projectOptions';
import { slugify } from '../../utils/slug';
import { toDateInputValue } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';
import type {
  GalleryImage,
  ProjectComponent,
  ProjectDifficulty,
  ProjectDraft,
  ProjectSpecification,
  ProjectStatus,
} from '../../types/project';

const EMPTY_DRAFT: ProjectDraft = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  category: 'Arduino',
  subcategory: null,
  status: 'completed',
  difficulty: 'intermediate',
  technologies: [],
  tags: [],
  objectives: [],
  features: [],
  problemStatement: '',
  solutionOverview: '',
  howItWorks: '',
  challenges: [],
  results: '',
  components: [],
  specifications: [],
  estimatedCost: { amount: null, currency: 'PKR' },
  media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
  externalLinks: { github: null, documentation: null, demo: null },
  seo: { metaTitle: null, metaDescription: null, keywords: [] },
  featured: false,
  published: false,
  completedAt: null,
};

const EMPTY_COMPONENT: ProjectComponent = { name: '', category: '', quantity: '1 pc', notes: '', optional: false };
const EMPTY_SPEC: ProjectSpecification = { label: '', value: '' };
const normalizeProjectText = (value: string) => value
  .replace(/^\s{0,3}#{1,3}\s+/gm, '')
  .replace(/^\s*-\s+/gm, '')
  .replace(/\*\*(.*?)\*\*/g, '$1')
  .replace(/\+\+(.*?)\+\+/g, '$1')
  .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .trim()
  .toLocaleLowerCase()
  .replace(/\s+/g, ' ');
const defaultComponentQuantity = (name: string, unit: string) => {
  const normalized = name.toLocaleLowerCase();
  if (unit.trim()) return `1 ${unit.trim()}`;
  if (/solder wire|solder wick|soldering wire/.test(normalized)) return '1 roll';
  if (/dupont|jumper wire|wire assortment|jumper wire set|connector set|assortment|assorted|kit|set|heat-shrink|heat shrink/.test(normalized)) return '1 set';
  if (/cable|wire spool|\bwire\b|tubing|sleeving/.test(normalized)) return '1 m';
  if (/resistor|capacitor|diode|transistor|led\b|fuse|screw|standoff|spacer|header pin|jumper cap/.test(normalized)) return '1 pc';
  if (/battery|cell|motor|sensor|module|board|display|controller|driver|relay|switch|adapter|regulator|connector|ic\b|integrated circuit|microcontroller|arduino|esp32|raspberry pi|stm32/.test(normalized)) return '1 pc';
  return '1 pc';
};

const specificationValue = (defaultValue: string, unit: string) => {
  const value = defaultValue.trim();
  const suffix = unit.trim();
  if (!value) return '';
  if (!suffix || value.toLocaleLowerCase().endsWith(suffix.toLocaleLowerCase())) return value;
  return `${value} ${suffix}`;
};


export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const existing = useProjectById(id);

  const [draft, setDraft] = useState<ProjectDraft>(EMPTY_DRAFT);
  const [completedDate, setCompletedDate] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryLibrary, setCategoryLibrary] = useState<string[]>([]);
  const [subcategoryLibrary, setSubcategoryLibrary] = useState<{ name: string; category: string }[]>([]);
  const [difficultyLibrary, setDifficultyLibrary] = useState<string[]>([]);
  const [statusLibrary, setStatusLibrary] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [subcategoryInput, setSubcategoryInput] = useState('');
  const [difficultyInput, setDifficultyInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [savingLibraryOption, setSavingLibraryOption] = useState(false);
  const [libraryNotice, setLibraryNotice] = useState('');
  const [initialSnapshot, setInitialSnapshot] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      projectLibraryService.listByKind('category'),
      projectLibraryService.listByKind('subcategory'),
      projectLibraryService.listByKind('difficulty'),
      projectLibraryService.listByKind('status'),
    ]).then(([categories, subcategories, difficulties, statuses]) => {
      if (cancelled) return;
      setCategoryLibrary(categories.filter((item) => item.active).map((item) => item.name));
      setSubcategoryLibrary(subcategories.filter((item) => item.active).map((item) => ({ name: item.name, category: item.category })));
      setDifficultyLibrary(difficulties.filter((item) => item.active).map((item) => item.name));
      setStatusLibrary(statuses.filter((item) => item.active).map((item) => item.name));
    }).catch(() => {
      // Existing built-in options remain available if the library cannot load.
    });
    return () => { cancelled = true; };
  }, []);

  const categoryOptions = sortProjectCategories([...PROJECT_CATEGORIES, ...categoryLibrary, draft.category]);
  const subcategoryOptions = [...new Set([
    ...subcategoryLibrary
      .filter((item) => !item.category || item.category === 'Project subcategories' || item.category === draft.category)
      .map((item) => item.name),
    ...(draft.subcategory ? [draft.subcategory] : []),
  ])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  const difficultyOptions = [
    ...PROJECT_DIFFICULTIES,
    ...difficultyLibrary
      .filter((name) => !PROJECT_DIFFICULTIES.some((option) => option.value.toLocaleLowerCase() === name.toLocaleLowerCase() || option.label.toLocaleLowerCase() === name.toLocaleLowerCase()))
      .map((name) => ({ value: name, label: name })),
    ...(draft.difficulty && !PROJECT_DIFFICULTIES.some((option) => option.value.toLocaleLowerCase() === draft.difficulty.toLocaleLowerCase() || option.label.toLocaleLowerCase() === draft.difficulty.toLocaleLowerCase()) && !difficultyLibrary.some((name) => name.toLocaleLowerCase() === draft.difficulty.toLocaleLowerCase())
      ? [{ value: draft.difficulty, label: draft.difficulty }]
      : []),
  ];
  const statusOptions = [
    ...PROJECT_STATUSES,
    ...statusLibrary
      .filter((name) => !PROJECT_STATUSES.some((option) => option.value.toLocaleLowerCase() === name.toLocaleLowerCase() || option.label.toLocaleLowerCase() === name.toLocaleLowerCase()))
      .map((name) => ({ value: name, label: name })),
    ...(draft.status && !PROJECT_STATUSES.some((option) => option.value.toLocaleLowerCase() === draft.status.toLocaleLowerCase() || option.label.toLocaleLowerCase() === draft.status.toLocaleLowerCase()) && !statusLibrary.some((name) => name.toLocaleLowerCase() === draft.status.toLocaleLowerCase())
      ? [{ value: draft.status, label: draft.status }]
      : []),
  ];

  useEffect(() => {
    if (!isEdit) {
      setInitialSnapshot(JSON.stringify({ draft: EMPTY_DRAFT, completedDate: '' }));
      return;
    }
    if (!existing.data) return;
    const { id: _ignored, viewCount: _viewCount, createdAt: _c, updatedAt: _u, ...rest } = existing.data;
    const dateValue = toDateInputValue(existing.data.completedAt);
    setDraft(rest);
    setCompletedDate(dateValue);
    setInitialSnapshot(JSON.stringify({ draft: rest, completedDate: dateValue }));
    setSlugTouched(true);
  }, [isEdit, existing.data]);

  const update = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const updateTitle = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  };

  const addLibraryOption = async (kind: 'category' | 'subcategory' | 'difficulty' | 'status', rawName: string) => {
    const name = rawName.trim().replace(/\s+/g, ' ');
    if (!name) return;
    setError(null);
    setLibraryNotice('');
    setSavingLibraryOption(true);
    try {
      const item = await projectLibraryService.addCustom({
        name,
        kind,
        category: kind === 'subcategory' ? draft.category : '',
        description: '',
        unit: '',
        defaultValue: '',
        active: true,
      });
      if (kind === 'category') {
        setCategoryLibrary((current) => sortProjectCategories([...current, item.name]));
        update('category', item.name);
        setCategoryInput('');
      } else if (kind === 'subcategory') {
        setSubcategoryLibrary((current) => {
          const next = current.filter((entry) => !(entry.name.trim().toLocaleLowerCase() === item.name.toLocaleLowerCase() && entry.category === draft.category));
          return [...next, { name: item.name, category: draft.category }].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
        });
        update('subcategory', item.name);
        setSubcategoryInput('');
      } else if (kind === 'difficulty') {
        setDifficultyLibrary((current) => [...new Set([...current, item.name])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })));
        update('difficulty', item.name as ProjectDifficulty);
        setDifficultyInput('');
      } else {
        setStatusLibrary((current) => [...new Set([...current, item.name])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })));
        update('status', item.name as ProjectStatus);
        setStatusInput('');
      }
      setLibraryNotice(`“${item.name}” is available in the reusable library.`);
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not save this option to the project library.'));
    } finally {
      setSavingLibraryOption(false);
    }
  };

  const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);
  const currentSnapshot = JSON.stringify({ draft, completedDate });
  const hasUnsavedChanges = initialSnapshot !== null && currentSnapshot !== initialSnapshot;
  const sectionItems = [
    { id: 'project-section-basics', label: 'Basics', required: true, complete: Boolean(draft.title.trim() && draft.shortDescription.trim()) },
    { id: 'project-section-media', label: 'Media', required: false, complete: Boolean(draft.media.thumbnailUrl || draft.media.heroImageUrl || draft.media.gallery.length || draft.media.videoUrl) },
    { id: 'project-section-story', label: 'Case study', required: false, complete: Boolean(draft.description.trim() || draft.problemStatement.trim() || draft.solutionOverview.trim() || draft.howItWorks.trim() || draft.results.trim() || draft.objectives.some(Boolean) || draft.features.some(Boolean) || draft.challenges.some(Boolean)) },
    { id: 'project-section-technical', label: 'Technical detail', required: false, complete: Boolean(draft.technologies.some(Boolean) || draft.tags.some(Boolean) || draft.components.some((item) => item.name.trim()) || draft.specifications.some((item) => item.label.trim()) || draft.estimatedCost.amount !== null) },
    { id: 'project-section-links', label: 'Links and SEO', required: false, complete: Boolean(draft.externalLinks.github || draft.externalLinks.documentation || draft.externalLinks.demo || draft.seo.metaTitle || draft.seo.metaDescription || draft.seo.keywords.some(Boolean)) },
  ];
  const requiredCompleted = [draft.title.trim(), draft.shortDescription.trim()].filter(Boolean).length;

  useEffect(() => {
    if (!hasUnsavedChanges || saving) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    const confirmInternalNavigation = (event: MouseEvent) => {
      if (previewOpen || !(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (!window.confirm('You have unsaved project changes. Leave this page and discard them?')) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('beforeunload', warnBeforeUnload);
    document.addEventListener('click', confirmInternalNavigation, true);
    return () => {
      window.removeEventListener('beforeunload', warnBeforeUnload);
      document.removeEventListener('click', confirmInternalNavigation, true);
    };
  }, [hasUnsavedChanges, saving, previewOpen]);

  const cancelEditing = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved project changes. Discard them and leave the editor?')) return;
    navigate('/admin/projects');
  };

  const openSection = (id: string) => {
    const section = document.getElementById(id);
    if (section instanceof HTMLDetailsElement) section.open = true;
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = async (publish?: boolean) => {
    setError(null);

    if (!draft.title.trim()) {
      setError('A project needs a title before it can be saved.');
      return;
    }
    if (!draft.shortDescription.trim()) {
      setError('Add a short description — it is what appears on project cards.');
      return;
    }

    setSaving(true);
    try {
      const payload: ProjectDraft = {
        ...draft,
        title: draft.title.trim(),
        slug: slugify(draft.slug || draft.title),
        technologies: cleanList(draft.technologies),
        tags: cleanList(draft.tags),
        objectives: cleanList(draft.objectives),
        features: cleanList(draft.features),
        challenges: cleanList(draft.challenges),
        components: draft.components.filter((component) => component.name.trim()),
        specifications: draft.specifications.filter((spec) => spec.label.trim()),
        completedAt: completedDate ? Timestamp.fromDate(new Date(completedDate)) : null,
        published: publish ?? draft.published,
      };

      if (isEdit && id) {
        await projectService.updateProject(id, payload);
      } else {
        await projectService.createProject(payload);
      }
      navigate('/admin/projects');
    } catch (caught) {
      setError(toUserMessage(caught, 'The project could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && existing.loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isEdit && existing.error) {
    return <ErrorState message={existing.error} onRetry={existing.reload} />;
  }

  return (
    <>
      <Seo title={isEdit ? 'Edit project' : 'New project'} noIndex />

      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? 'Edit project' : 'New project'}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-content-secondary">
            Only the title and short description are required. Every other section is optional and hidden on the public page when left empty. Open only the sections you need.
          </p>
        </div>
        <button type="button" onClick={() => setPreviewOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-3.5 py-2.5 text-sm font-medium text-content transition-colors hover:bg-surface-raised">
          <Eye size={16} aria-hidden="true" /> Preview draft
        </button>
      </header>

      <section className="mt-6 rounded-xl border border-line bg-surface/40 p-4 sm:p-5" aria-label="Project editor progress">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Editor progress</p>
            <p className="mt-1 text-xs text-content-muted">Required details: {requiredCompleted} of 2 completed. Other sections are optional.</p>
          </div>
          <span className={requiredCompleted === 2 ? 'inline-flex items-center gap-1.5 text-sm font-medium text-state-success' : 'inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary'}>
            {requiredCompleted === 2 ? <CheckCircle2 size={16} aria-hidden="true" /> : <Circle size={16} aria-hidden="true" />}
            {requiredCompleted === 2 ? 'Ready to save' : 'Required details remaining'}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised" role="progressbar" aria-label="Required project details" aria-valuemin={0} aria-valuemax={2} aria-valuenow={requiredCompleted}>
          <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${requiredCompleted * 50}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {sectionItems.map((section) => (
            <button key={section.id} type="button" onClick={() => openSection(section.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs transition-colors hover:bg-surface-raised">
              {section.required ? (section.complete ? <CheckCircle2 size={14} className="text-state-success" aria-hidden="true" /> : <Circle size={14} className="text-content-muted" aria-hidden="true" />) : (section.complete ? <CheckCircle2 size={14} className="text-state-success" aria-hidden="true" /> : <span className="h-3.5 w-3.5 rounded-full border border-line" aria-hidden="true" />)}
              <span>{section.label}</span>
              <span className="text-content-muted">{section.required ? (section.complete ? 'Complete' : 'Required') : (section.complete ? 'Added' : 'Optional')}</span>
            </button>
          ))}
        </div>
      </section>

      {hasUnsavedChanges && (
        <div className="mt-4 rounded-lg border border-state-warning/40 bg-state-warning/5 px-4 py-3 text-sm text-content-secondary" role="status">
          You have unsaved changes. Save your project before leaving, or discard them when prompted.
        </div>
      )}

      {previewOpen && <ProjectDraftPreview draft={draft} onClose={() => setPreviewOpen(false)} />}

      {(error || libraryNotice) && (
        <div className="mt-6">
          <Alert tone={error ? 'danger' : 'success'}>{error || libraryNotice}</Alert>
        </div>
      )}

      <div className="mt-8 flex max-w-5xl flex-col gap-5">
        <Group id="project-section-basics" title="Basics">
          <Field label="Title" htmlFor="title" required>
            <TextInput
              id="title"
              value={draft.title}
              onChange={(event) => updateTitle(event.target.value)}
            />
          </Field>

          <Field
            label="URL slug"
            htmlFor="slug"
            required
            hint={`Public address: /projects/${draft.slug || 'your-project'}`}
          >
            <TextInput
              id="slug"
              value={draft.slug}
              onChange={(event) => {
                setSlugTouched(true);
                update('slug', event.target.value);
              }}
              onBlur={(event) => update('slug', slugify(event.target.value))}
            />
          </Field>

          <Field
            label="Short description"
            htmlFor="shortDescription"
            required
            hint="One or two sentences. Shown on project cards and in search results."
          >
            <TextArea
              id="shortDescription"
              rows={3}
              value={draft.shortDescription}
              onChange={(event) => update('shortDescription', event.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Category" htmlFor="category" required>
              <Select
                id="category"
                options={categoryOptions}
                value={draft.category}
                onChange={(event) => update('category', event.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <TextInput value={categoryInput} maxLength={120} onChange={(event) => setCategoryInput(event.target.value)} placeholder="New category…" aria-label="New project category" />
                <Button type="button" variant="secondary" disabled={!categoryInput.trim() || savingLibraryOption} onClick={() => void addLibraryOption('category', categoryInput)}>
                  {savingLibraryOption ? 'Saving…' : 'Add to library'}
                </Button>
              </div>
            </Field>
            <Field label="Status" htmlFor="status" required>
              <Select
                id="status"
                options={statusOptions}
                value={draft.status}
                onChange={(event) => update('status', event.target.value as ProjectStatus)}
              />
              <div className="mt-2 flex gap-2">
                <TextInput value={statusInput} maxLength={120} onChange={(event) => setStatusInput(event.target.value)} placeholder="New status…" aria-label="New project status" />
                <Button type="button" variant="secondary" disabled={!statusInput.trim() || savingLibraryOption} onClick={() => void addLibraryOption('status', statusInput)}>
                  {savingLibraryOption ? 'Saving…' : 'Add to library'}
                </Button>
              </div>
            </Field>
            <Field label="Difficulty" htmlFor="difficulty" required>
              <Select
                id="difficulty"
                options={difficultyOptions}
                value={draft.difficulty}
                onChange={(event) => update('difficulty', event.target.value as ProjectDifficulty)}
              />
              <div className="mt-2 flex gap-2">
                <TextInput value={difficultyInput} maxLength={120} onChange={(event) => setDifficultyInput(event.target.value)} placeholder="New difficulty…" aria-label="New difficulty level" />
                <Button type="button" variant="secondary" disabled={!difficultyInput.trim() || savingLibraryOption} onClick={() => void addLibraryOption('difficulty', difficultyInput)}>
                  {savingLibraryOption ? 'Saving…' : 'Add to library'}
                </Button>
              </div>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Subcategory" htmlFor="subcategory">
              <Select
                id="subcategory"
                options={subcategoryOptions}
                placeholder="No subcategory"
                value={draft.subcategory ?? ''}
                onChange={(event) => update('subcategory', event.target.value || null)}
              />
              <div className="mt-2 flex gap-2">
                <TextInput value={subcategoryInput} maxLength={120} onChange={(event) => setSubcategoryInput(event.target.value)} placeholder="New subcategory…" aria-label="New project subcategory" />
                <Button type="button" variant="secondary" disabled={!subcategoryInput.trim() || savingLibraryOption} onClick={() => void addLibraryOption('subcategory', subcategoryInput)}>
                  {savingLibraryOption ? 'Saving…' : 'Add to library'}
                </Button>
              </div>
            </Field>
            <Field label="Completion date" htmlFor="completedAt">
              <TextInput
                id="completedAt"
                type="date"
                value={completedDate}
                onChange={(event) => setCompletedDate(event.target.value)}
              />
            </Field>
          </div>
        </Group>

        <Group id="project-section-media" title="Media">
          <FieldSet legend="Thumbnail" hint="Shown on project cards. A 16:10 image works best.">
            <ImageUploadField
              label="Thumbnail"
              value={draft.media.thumbnailUrl || null}
              onUpload={async (file) => {
                const uploaded = await imgbbService.upload(file);
                update('media', { ...draft.media, thumbnailUrl: uploaded.url });
              }}
              onClear={() => update('media', { ...draft.media, thumbnailUrl: '' })}
            />
          </FieldSet>

          <FieldSet legend="Hero image" hint="Large image at the top of the project page.">
            <ImageUploadField
              label="Hero image"
              value={draft.media.heroImageUrl}
              onUpload={async (file) => {
                const uploaded = await imgbbService.upload(file);
                update('media', { ...draft.media, heroImageUrl: uploaded.url });
              }}
              onClear={() => update('media', { ...draft.media, heroImageUrl: null })}
            />
          </FieldSet>

          <FieldSet legend="Gallery" hint="Extra photographs of the build.">
            <GalleryEditor
              gallery={draft.media.gallery}
              onChange={(gallery) => update('media', { ...draft.media, gallery })}
            />
          </FieldSet>

          <Field label="Video URL" htmlFor="videoUrl" hint="A YouTube or Vimeo link to a demo.">
            <TextInput
              id="videoUrl"
              type="url"
              value={draft.media.videoUrl ?? ''}
              onChange={(event) =>
                update('media', { ...draft.media, videoUrl: event.target.value || null })
              }
            />
          </Field>
        </Group>

        <Group id="project-section-story" title="The case study">
          <Field label="Overview" htmlFor="description" hint="Blank lines create new paragraphs.">
            <RichTextEditor
              id="description"
              rows={6}
              value={draft.description}
              onChange={(value) => update('description', value)}
              placeholder="Describe the project, its purpose, and the overall build."
            />
          </Field>

          <Field label="Problem statement" htmlFor="problemStatement">
            <RichTextEditor
              id="problemStatement"
              rows={4}
              value={draft.problemStatement}
              onChange={(value) => update('problemStatement', value)}
              placeholder="What problem does this project solve?"
            />
          </Field>

          <FieldSet legend="Objectives" hint="Choose reusable objectives or add project-specific ones.">
            <LibraryMultiSelect kind="objective" label="objectives" values={draft.objectives.filter(Boolean)} onChange={(values) => update('objectives', values)} />
          </FieldSet>

          <Field label="Solution overview" htmlFor="solutionOverview">
            <RichTextEditor
              id="solutionOverview"
              rows={4}
              value={draft.solutionOverview}
              onChange={(value) => update('solutionOverview', value)}
              placeholder="Summarize the design approach and solution."
            />
          </Field>

          <Field label="How it works" htmlFor="howItWorks">
            <RichTextEditor
              id="howItWorks"
              rows={5}
              value={draft.howItWorks}
              onChange={(value) => update('howItWorks', value)}
              placeholder="Explain the operation step by step."
            />
          </Field>

          <FieldSet legend="Features" hint="Select common features or add a custom feature.">
            <LibraryMultiSelect kind="feature" label="features" values={draft.features.filter(Boolean)} onChange={(values) => update('features', values)} />
          </FieldSet>

          <FieldSet legend="Challenges" hint="Reusable prompts are optional; describe the actual project challenge.">
            <LibraryMultiSelect kind="challenge" label="challenges" values={draft.challenges.filter(Boolean)} onChange={(values) => update('challenges', values)} />
          </FieldSet>

          <Field label="Results" htmlFor="results">
            <RichTextEditor
              id="results"
              rows={4}
              value={draft.results}
              onChange={(value) => update('results', value)}
              placeholder="Describe the outcome, testing, or measured results."
            />
          </Field>
        </Group>

        <Group id="project-section-technical" title="Technical detail">
          <FieldSet legend="Technologies" hint="Used for filtering on the projects page. Select from the shared library or add custom entries.">
            <LibraryMultiSelect kind="technology" label="technologies" values={draft.technologies} onChange={(values) => update('technologies', values)} />
          </FieldSet>

          <FieldSet legend="Tags" hint="Consistent tags improve project discovery and filtering.">
            <LibraryMultiSelect kind="tag" label="tags" values={draft.tags.filter(Boolean)} onChange={(values) => update('tags', values)} />
          </FieldSet>

          <FieldSet legend="Components" hint="Selecting a library component prefills its type and notes. Set the quantity and project-specific details, and check Optional for any component that is helpful but not required for the build.">
            <LibraryMultiSelect
              kind="component"
              label="components"
              values={draft.components.filter((component) => component.name.trim()).map((component) => component.name)}
              onChange={(names, _addedItem, selectedItems) => update('components', names.map((name) => {
                const existingComponent = draft.components.find((component) => normalizeProjectText(component.name) === normalizeProjectText(name));
                if (existingComponent) return { ...existingComponent, name };
                const libraryItem = selectedItems?.find((item) => normalizeProjectText(item.name) === normalizeProjectText(name));
                return {
                  ...EMPTY_COMPONENT,
                  name,
                  category: libraryItem?.category ?? '',
                  quantity: defaultComponentQuantity(name, libraryItem?.unit ?? ''),
                  notes: libraryItem?.description ?? '',
                };
              }))}
            />
            <TableEditor<ProjectComponent>
              label="Component"
              rows={draft.components}
              emptyRow={EMPTY_COMPONENT}
              onChange={(rows) => update('components', rows)}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'category', label: 'Type' },
                { key: 'quantity', label: 'Quantity', width: 'w-28' },
                { key: 'notes', label: 'Notes', type: 'richtext' },
                { key: 'optional', label: 'Optional', type: 'checkbox', width: 'w-28' },
              ]}
            />
          </FieldSet>

          <FieldSet legend="Specifications" hint="Selecting a library label can prefill its suggested value. Verify every value for this specific build; you can edit both label and value below.">
            <LibraryMultiSelect
              kind="specification"
              label="specifications"
              values={draft.specifications.filter((spec) => spec.label.trim()).map((spec) => spec.label)}
              onChange={(labels, _addedItem, selectedItems) => update('specifications', labels.map((label) => {
                const existingSpec = draft.specifications.find((spec) => normalizeProjectText(spec.label) === normalizeProjectText(label));
                if (existingSpec) return { ...existingSpec, label };
                const libraryItem = selectedItems?.find((item) => normalizeProjectText(item.name) === normalizeProjectText(label));
                return { ...EMPTY_SPEC, label, value: libraryItem ? specificationValue(libraryItem.defaultValue, libraryItem.unit) : '' };
              }))}
            />
            <TableEditor<ProjectSpecification>
              label="Specification"
              rows={draft.specifications}
              emptyRow={EMPTY_SPEC}
              onChange={(rows) => update('specifications', rows)}
              columns={[
                { key: 'label', label: 'Label' },
                { key: 'value', label: 'Value', type: 'richtext', inlineOnly: true },
              ]}
            />
          </FieldSet>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Approximate cost" htmlFor="cost" hint="Leave blank to hide it publicly.">
              <TextInput
                id="cost"
                type="number"
                min={0}
                value={draft.estimatedCost.amount ?? ''}
                onChange={(event) =>
                  update('estimatedCost', {
                    ...draft.estimatedCost,
                    amount: event.target.value === '' ? null : Number(event.target.value),
                  })
                }
              />
            </Field>
            <Field label="Currency" htmlFor="currency">
              <TextInput
                id="currency"
                value={draft.estimatedCost.currency}
                onChange={(event) =>
                  update('estimatedCost', { ...draft.estimatedCost, currency: event.target.value })
                }
              />
            </Field>
          </div>
        </Group>

        <Group id="project-section-links" title="Links and SEO">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="GitHub" htmlFor="github">
              <TextInput
                id="github"
                type="url"
                value={draft.externalLinks.github ?? ''}
                onChange={(event) =>
                  update('externalLinks', {
                    ...draft.externalLinks,
                    github: event.target.value || null,
                  })
                }
              />
            </Field>
            <Field label="Documentation" htmlFor="documentation">
              <TextInput
                id="documentation"
                type="url"
                value={draft.externalLinks.documentation ?? ''}
                onChange={(event) =>
                  update('externalLinks', {
                    ...draft.externalLinks,
                    documentation: event.target.value || null,
                  })
                }
              />
            </Field>
            <Field label="Live demo" htmlFor="demo">
              <TextInput
                id="demo"
                type="url"
                value={draft.externalLinks.demo ?? ''}
                onChange={(event) =>
                  update('externalLinks', {
                    ...draft.externalLinks,
                    demo: event.target.value || null,
                  })
                }
              />
            </Field>
          </div>

          <Field label="Meta title" htmlFor="metaTitle" hint="Defaults to the project title.">
            <TextInput
              id="metaTitle"
              value={draft.seo.metaTitle ?? ''}
              onChange={(event) =>
                update('seo', { ...draft.seo, metaTitle: event.target.value || null })
              }
            />
          </Field>

          <Field
            label="Meta description"
            htmlFor="metaDescription"
            hint="Defaults to the short description. Around 155 characters works best."
          >
            <TextArea
              id="metaDescription"
              rows={2}
              value={draft.seo.metaDescription ?? ''}
              onChange={(event) =>
                update('seo', { ...draft.seo, metaDescription: event.target.value || null })
              }
            />
          </Field>
        </Group>

        <Group title="Visibility">
          <div className="flex flex-col gap-3">
            <Checkbox
              id="published"
              label="Published"
              description="Visible to everyone on the public site."
              checked={draft.published}
              onChange={(event) => update('published', event.target.checked)}
            />
            <Checkbox
              id="featured"
              label="Featured"
              description="Appears in the selected work section on the homepage."
              checked={draft.featured}
              onChange={(event) => update('featured', event.target.checked)}
            />
          </div>
        </Group>

        <div className="sticky bottom-0 -mx-5 flex flex-wrap gap-3 border-t border-line bg-bg/95 px-5 py-4 backdrop-blur sm:mx-0 sm:px-0">
          <Button onClick={() => void handleSave()} loading={saving}>
            {saving ? 'Saving…' : 'Save project'}
          </Button>
          {!draft.published && (
            <Button variant="secondary" onClick={() => void handleSave(true)} disabled={saving}>
              Save and publish
            </Button>
          )}
          <Button variant="ghost" onClick={cancelEditing} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

function Group({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <details id={id} open={title === 'Basics'} className="group scroll-mt-24 rounded-xl border border-line bg-surface/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-surface-raised/60 [&::-webkit-details-marker]:hidden sm:px-5">
        <span className="min-w-0">
          <span className="block text-base font-semibold tracking-tight">{title}</span>
          <span className="mt-0.5 block text-xs text-content-muted">
            {title === 'Basics' ? 'Project title and classification' :
              title === 'Media' ? 'Thumbnail, hero image, gallery and video' :
              title === 'The case study' ? 'Project story, features and results' :
              title === 'Technical detail' ? 'Technologies, components and specifications' :
              title === 'Links and SEO' ? 'External resources and search metadata' :
              'Publishing and homepage visibility'}
          </span>
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-content-muted transition-transform group-open:rotate-180">
          <ChevronDown size={16} aria-hidden="true" />
        </span>
      </summary>
      <div className="border-t border-line px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </details>
  );
}

function GalleryEditor({
  gallery,
  onChange,
}: {
  gallery: GalleryImage[];
  onChange: (next: GalleryImage[]) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {gallery.map((image, index) => (
        <div key={image.url} className="flex flex-col gap-3 rounded-lg border border-line p-3 sm:flex-row">
          <img
            src={image.url}
            alt=""
            loading="lazy"
            className="h-24 w-32 shrink-0 rounded object-cover"
          />
          <div className="flex flex-1 flex-col gap-2">
            <TextInput
              value={image.alt}
              placeholder="Alt text — describe the image for screen readers"
              aria-label={`Gallery image ${index + 1} alt text`}
              onChange={(event) => {
                const next = [...gallery];
                next[index] = { ...image, alt: event.target.value };
                onChange(next);
              }}
            />
            <TextInput
              value={image.caption ?? ''}
              placeholder="Caption (optional)"
              aria-label={`Gallery image ${index + 1} caption`}
              onChange={(event) => {
                const next = [...gallery];
                next[index] = { ...image, caption: event.target.value || null };
                onChange(next);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange(gallery.filter((_, position) => position !== index))}
            aria-label={`Remove gallery image ${index + 1}`}
            className="shrink-0 self-start rounded-md p-2 text-content-muted transition-colors hover:text-state-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <ImageUploadField
        label="Gallery image"
        value={null}
        onUpload={async (file) => {
          const uploaded = await imgbbService.upload(file);
          onChange([
            ...gallery,
            {
              url: uploaded.url,
              storagePath: uploaded.deleteUrl, // imgBB's delete link, for admin reference
              alt: '',
              caption: null,
              order: gallery.length,
            },
          ]);
        }}
        onClear={() => undefined}
      />
    </div>
  );
}
