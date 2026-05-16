import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'ejyo8kxs',  //process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  dataset: 'production',
  apiVersion: '2026-02-19',
  token: 'skA0fh6gHDtdF7VW180ytrlBB8BxshgsFQngNs5Evdz4oqNAitwBNtA3zNvGHAjcAHaUtP3Sj9Sb1Cz45Zq9oLBFnAUoWpDZyUUCtvIRvVWMY7MeNgWpfMShpKkNQSpo9qC1XYrLZyHnljBtUSYBUN92GRXumXImc9TJ4qyYe13loYzHKJWo', //process.env.NEXT_PUBLIC_SANITY_TOKEN
  useCdn: false,
})