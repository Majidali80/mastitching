import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

 

import { apiVersion, dataset, projectId } from '../env'

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
}

const client = createClient(config)

// Create a URL builder for images
const urlFor = (source: string | { _type: 'image'; asset: { _ref: string } }) => {
  return createImageUrlBuilder(client).image(source); //  Use the image builder to generate the URL
}

export { client, urlFor }

export default client;
