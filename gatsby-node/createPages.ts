import path from "path";
import { GatsbyCreatePages } from "./types";
import { languages } from "../src/i18n";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  graphql(`
    {
      allWineries(limit: 1000) {
        edges {
          node {
            lang
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allWineries.edges.forEach(({ node }: any) => {
      createPage({
        path: "/" + node.lang + node.fields.slug,
        component: path.resolve(`src/templates/wineryTemplate.tsx`),
        context: {
          languages,
          locale: node.lang,
          slug: node.fields.slug,
        },
      });
    });
  });

  return graphql(`
    {
      allWines(limit: 1000) {
        edges {
          node {
            lang
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allWines.edges.forEach(({ node }: any) => {
      createPage({
        path: "/" + node.lang + node.fields.slug,
        component: path.resolve(`src/templates/wineTemplate.tsx`),
        context: {
          languages,
          locale: node.lang,
          slug: node.fields.slug,
        },
      });
    });
  });
};
