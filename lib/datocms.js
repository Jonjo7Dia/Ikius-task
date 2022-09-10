import { GraphQLClient } from "graphql-request";

const NEXT_DATOCMS_API_TOKEN = '3522e9f4d5668a6f36509ebef1559e';
export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
}

export function sortBlogPosts(blogPosts){
  return blogPosts.sort((postA, postB)=>(new Date(postA.publishDate) - new Date(postB.publishDate)));
    
};