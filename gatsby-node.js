const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const languages = [
  { value: "en", text: "English" },
  { value: "zh", text: "中文" },
];

exports.sourceNodes = ({
  actions,
  getNodes,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // add translations to wines
  getNodes()
    .filter(n1 => n1.internal.type === "WinesJson")
    .forEach(n => {
      languages.forEach(({ value }) => {
        const intl = getNodes().find(
          n2 =>
            n2.internal.type === "WineTranslationsJson" &&
            n2.wine === n.wineId &&
            n2.lang === value
        );
        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          n,
          intl
        );
        const nodeMeta = {
          id: createNodeId(`${n.id}-${value}`),
          parent: n.parent,
          children: [],
          internal: {
            type: `Wines`,
            content: JSON.stringify(content),
            contentDigest: createContentDigest(content),
          },
        };
        const node = Object.assign({}, content, nodeMeta);
        createNode(node);
      });
    });

  // add translations to wineries
  getNodes()
    .filter(n1 => n1.internal.type === "WineriesJson")
    .forEach(n1 => {
      n1.data = {};
      getNodes()
        .filter(
          n2 =>
            n2.internal.type === "WineryTranslationsJson" &&
            n2.winery === n1.wineryId
        )
        .forEach(n2 => (n1.data[n2.lang] = n2));
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Wines") {
    const slug = "/wines/" + node.name.replace(/ /g, "-");
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "WineriesJson") {
    const parent = getNode(node.parent);
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
      allWineriesJson(limit: 1000) {
        edges {
          node {
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

    result.data.allWineriesJson.edges.forEach(({ node }) => {
      languages.forEach(l => {
        createPage({
          path: "/" + l.value + node.fields.slug,
          component: path.resolve(`src/templates/wineryTemplate.tsx`),
          context: {
            languages,
            locale: l.value,
            slug: node.fields.slug,
          },
        });
      });
    });
  });

  return graphql(`
    {
      allWinesJson(limit: 1000) {
        edges {
          node {
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

    result.data.allWinesJson.edges.forEach(({ node }) => {
      languages.forEach(l => {
        createPage({
          path: "/" + l.value + node.fields.slug,
          component: path.resolve(`src/templates/wineTemplate.tsx`),
          context: {
            languages,
            locale: l.value,
            slug: node.fields.slug,
          },
        });
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
