import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import order from './order'
import customer from './customer'
import orderTracking from './orderTracking'
import inventory from './inventory'
import subscriber from './subscriber'
import review from './review'
import stitching from './stitching'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, customer, orderTracking, inventory, subscriber, review, stitching],
}
