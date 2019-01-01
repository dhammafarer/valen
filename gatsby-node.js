"use strict";

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

const {
  onCreatePage,
  createPages,
  onCreateNode,
  sourceNodes,
} = require("./gatsby-node/index.ts");

exports.sourceNodes = sourceNodes;
//exports.createPages = createPages;
//exports.onCreatePage = onCreatePage;
//exports.onCreateNode = onCreateNode;
const { isNil, isEmpty, either, mergeWith, defaultTo } = require("ramda");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const languages = [
  { value: "en", text: "English" },
  { value: "zh", text: "中文" },
];

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  const { image } = node;
  // tranform absolute path into relative path
  if (image) {
    if (node.internal.type.indexOf("Json") > -1) {
      if (image.indexOf("/assets") === 0) {
        node.image = path.relative(
          path.dirname(getNode(node.parent).absolutePath),
          path.join(__dirname, "/static/", image)
        );
      }
    }
  }

  if (node.internal.type === "Wines") {
    const slug = "/wines/" + node.wineId.replace(/ /g, "-");
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "Wineries") {
    const slug = "/wineries/" + node.wineryId.replace(/ /g, "-");
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);
    const [name, lang] = parent.name.split(".");
    const type = parent.sourceInstanceName;
    const slug = [type, parent.relativeDirectory].join("/");

    createNodeField({ node, name: "lang", value: lang });
    createNodeField({ node, name: "type", value: type });
    createNodeField({ node, name: "slug", value: "/" + slug });
  }
};

exports.createPages = ({ actions, graphql }) => {
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allWineries.edges.forEach(({ node }) => {
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allWines.edges.forEach(({ node }) => {
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

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path.includes("404")) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    const redirect = path.resolve("src/i18n/redirect.tsx");
    const redirectPage = {
      ...page,
      component: redirect,
      context: {
        languages,
        locale: "",
        routed: false,
        redirectPage: page.path,
      },
    };
    deletePage(page);
    createPage(redirectPage);

    languages.forEach(({ value }) => {
      const localePage = {
        ...page,
        originalPath: page.path,
        path: `/${value}${page.path}`,
        context: {
          languages,
          locale: value,
          routed: true,
          originalPath: page.path,
        },
      };
      createPage(localePage);
    });

    resolve();
  });
};

function matchTemplate(s) {
  switch (s) {
    case "events":
      return "eventTemplate.tsx";
    case "wines":
      return "wineTemplate.tsx";
    case "wineries":
      return "wineryTemplate.tsx";
    default:
      throw "unknown node type";
  }
}
