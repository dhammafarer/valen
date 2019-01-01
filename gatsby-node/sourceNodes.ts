import { GatsbySourceNodes } from "./types";
import { mergeWith, isNil, either, isEmpty, defaultTo } from "ramda";
import { languages } from "../src/i18n";

const mergeTranslation = (a: any, b: any) =>
  mergeWith((a, b) => (either(isNil, isEmpty)(b) ? a : b))(a, defaultTo({}, b));

export const sourceNodes: GatsbySourceNodes = ({
  actions,
  getNodes,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  languages.forEach(({ code }) => {
    // add translations to awards
    getNodes()
      .filter(n1 => n1.internal.type === "AwardsJson")
      .forEach(awardNode => {
        const intl = getNodes().find(
          t =>
            t.internal.type === "AwardTranslationsJson" &&
            t.award === awardNode.id &&
            t.lang === code
        );

        const { id, parent, children, internal, ...content } = Object.assign(
          { lang: code, awardId: awardNode.id },
          awardNode,
          intl
        );

        const nodeMeta = {
          id: createNodeId(`${awardNode.id}-${code}`),
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
            t.lang === code &&
            t.wineryId === wineryNode.wineryId
        );
        const { id, parent, children, internal, ...content } = Object.assign(
          { wineryId: wineryNode.id, lang: code },
          mergeTranslation(wineryNode, intl),
          intl
        );
        const nodeMeta = {
          id: createNodeId(`${wineryNode.id}-${code}`),
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
            n2.wineId === wineNode.wineId &&
            n2.lang === code
        );

        const winery = getNodes().find(
          n =>
            n.internal.type === "Wineries" &&
            n.wineryId === wineNode.winery &&
            n.lang === code
        );

        const awards = wineNode.awards.map((a: any) => {
          const node = getNodes().find(
            n =>
              n.internal.type === "Awards" && n.awardId === a && n.lang === code
          );
          console.log(node.id);
          return node ? node.id : "";
        });

        const { id, parent, children, internal, ...content } = Object.assign(
          { wineId: wineNode.id, lang: code },
          mergeTranslation(wineNode, intl),
          { winery: winery ? winery.id : "", awards }
        );

        const nodeMeta = {
          id: createNodeId(`${wineNode.id}-${code}`),
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
            t.frontmatter.lang === code
        );

        const { id, parent, children, internal, ...content } = Object.assign(
          {},
          eventNode,
          { md: md.id }
        );

        const nodeMeta = {
          id: createNodeId(`${eventNode.id}-${code}`),
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
