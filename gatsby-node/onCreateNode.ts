import path from "path";
import { GatsbyOnCreateNode } from "./types";

export const onCreateNode: GatsbyOnCreateNode = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  const { image } = node;
  // tranform absolute path into relative path
  if (image) {
    if (node.internal.type.indexOf("Json") > -1) {
      if (image.indexOf("/assets") === 0) {
        node.image = path.relative(
          path.dirname(getNode(node.parent).absolutePath),
          path.join(__dirname, "..", "/static/", image)
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
    const [, lang] = parent.name.split(".");
    const type = parent.sourceInstanceName;
    const slug = [type, parent.relativeDirectory].join("/");

    createNodeField({ node, name: "lang", value: lang });
    createNodeField({ node, name: "type", value: type });
    createNodeField({ node, name: "slug", value: "/" + slug });
  }
};
