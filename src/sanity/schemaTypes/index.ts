import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import perfume from './perfume'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, perfume],
}
