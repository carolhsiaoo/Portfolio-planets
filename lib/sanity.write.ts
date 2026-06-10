import { createClient } from "next-sanity";

export const writeClient = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});
