import type { NavGroup } from './SectionNav';

export interface SectionDef {
  id: string;
  present: boolean;
}

export interface GroupDef {
  label: string;
  sections: SectionDef[];
}

/**
 * Builds the jump-link list from what actually has content, so a page with no
 * gallery has no "Photos" chip and a link never points at a missing section.
 */
export function buildNavGroups(defs: GroupDef[]): NavGroup[] {
  return defs
    .map((def) => ({
      label: def.label,
      ids: def.sections.filter((section) => section.present).map((section) => section.id),
    }))
    .filter((group) => group.ids.length > 0);
}
