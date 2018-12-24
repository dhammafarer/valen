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

  languages.forEach(({ value }) => {
    // add translations to awards
    getNodes()
      .filter(n1 => n1.internal.type === "AwardsJson")
      .forEach(awardNode => {
        const intl = getNodes().find(
          t =>
            t.internal.type === "AwardTranslationsJson" &&
            t.award === awardNode.awardId &&
            t.lang === value
        );

        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          awardNode,
          intl
        );

        const nodeMeta = {
          id: createNodeId(`${awardNode.id}-${value}`),
          parent: awardNode.parent,
          children: [],
          internal: {
            type: `Awards`,
            content: JSON.stringify(content),
            contentDigest: createContentDigest(content),
          },
        };
        const node = Object.assign({}, content, nodeMeta);
        createNode(node);
      });

    // add translations to wineries
    getNodes()
      .filter(n1 => n1.internal.type === "WineriesJson")
      .forEach(wineryNode => {
        const intl = getNodes().find(
          t =>
            t.internal.type === "WineryTranslationsJson" &&
            t.winery === wineryNode.wineryId &&
            t.lang === value
        );
        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          wineryNode,
          intl
        );
        const nodeMeta = {
          id: createNodeId(`${wineryNode.id}-${value}`),
          parent: wineryNode.parent,
          children: [],
          internal: {
            type: `Wineries`,
            content: JSON.stringify(content),
            contentDigest: createContentDigest(content),
          },
        };
        const node = Object.assign({}, content, nodeMeta);
        createNode(node);
      });

    // add translations to wines
    getNodes()
      .filter(n1 => n1.internal.type === "WinesJson")
      .forEach(wineNode => {
        const intl = getNodes().find(
          n2 =>
            n2.internal.type === "WineTranslationsJson" &&
            n2.wine === wineNode.wineId &&
            n2.lang === value
        );

        const winery = getNodes().find(
          n =>
            n.internal.type === "Wineries" &&
            n.wineryId === wineNode.winery &&
            n.lang === value
        );

        const awards = wineNode.awards.map(a => {
          const node = getNodes().find(
            n =>
              n.internal.type === "Awards" && n.award === a && n.lang === value
          );
          return node ? node.id : null;
        });

        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          wineNode,
          intl,
          { winery: winery ? winery.id : null, awards }
        );

        const nodeMeta = {
          id: createNodeId(`${wineNode.id}-${value}`),
          parent: wineNode.parent,
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

    // add translations to events
    getNodes()
      .filter(n1 => n1.internal.type === "EventsJson")
      .forEach(eventNode => {
        const md = getNodes().find(
          t =>
            t.internal.type === "MarkdownRemark" &&
            t.frontmatter.event === eventNode.eventId &&
            t.frontmatter.lang === value
        );

        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          eventNode,
          { md: md.id }
        );

        const nodeMeta = {
          id: createNodeId(`${eventNode.id}-${value}`),
          parent: eventNode.parent,
          children: [],
          internal: {
            type: `Events`,
            content: JSON.stringify(content),
            contentDigest: createContentDigest(content),
          },
        };
        const node = Object.assign({}, content, nodeMeta);
        createNode(node);
      });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Wines") {
    const slug = "/wines/" + node.name.replace(/ /g, "-");
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
