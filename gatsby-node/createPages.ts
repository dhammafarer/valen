import path from "path";
import { GatsbyCreatePages } from "./types";
import { languages } from "../src/i18n";

export const createPages: GatsbyCreatePages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              type
              template
              slug
            }
            frontmatter {
              lang
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges
      .filter(({ node }: any) => node.fields.slug)
      .forEach(({ node }: any) => {
        createPage({
          path: `/${node.frontmatter.lang}${node.fields.slug}`,
          component: path.resolve(`src/templates/${node.fields.template}`),
          context: {
            languages,
            locale: node.frontmatter.lang,
            slug: node.fields.slug,
          },
        });
      });
  });
};
