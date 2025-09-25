import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // add in .env
  dataset: import.meta.env.VITE_SANITY_DATASET,      // add in .env
  apiVersion: "2025-01-01", // use today’s date
  useCdn: true,             // `false` if you need fresh data
});

// Image builder
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
