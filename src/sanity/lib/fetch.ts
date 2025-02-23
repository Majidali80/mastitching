import { createClient } from "next-sanity";

const client = createClient({
  projectId: "1foejx3i",
  dataset: "production",
  useCdn: true,
  apiVersion: '2024-03-19',
});

export async function sanityFetch({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>; // Changed 'any' to Record<string, unknown>
}) {
  return await client.fetch(query, params);
}
