import { type SchemaTypeDefinition } from 'sanity'
import stitching from './stitching'
import review from './review'
import product from './product'
import sizeOption from './sizeOption'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [stitching, review, product, sizeOption],
}
