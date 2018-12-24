const siteMetadata = require("./src/data/siteMetadata");

module.exports = {
  siteMetadata,
  mapping: {
    "MarkdownRemark.frontmatter.winery": "MarkdownRemark.frontmatter.winery_id",
    "Wines.awards": "Awards",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: "./src/images/logos/logo.png",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "valen-international",
        short_name: "valen",
        start_url: "/",
        background_color: "#336699",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "./src/images/logos/logo.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images/`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/events/`,
        name: "events",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data/`,
        name: "data",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-root-import",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
    "gatsby-transformer-javascript-frontmatter",
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
  ],
};
