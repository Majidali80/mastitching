import type { StructureResolver, StructureBuilder } from '@sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S: typeof StructureBuilder) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())

declare module '@sanity/structure' {
  export type StructureResolver = (S: typeof StructureBuilder) => unknown;
  // Add other types as needed
}
