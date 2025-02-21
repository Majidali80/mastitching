import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import order from './order'
import customer from './customer'
import orderTracking from './orderTracking'
import inventory from './inventory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, customer, orderTracking, inventory],
}
