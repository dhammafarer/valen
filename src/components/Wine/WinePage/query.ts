import { graphql } from "gatsby";

export const query = graphql`
  fragment WineFragment on MarkdownRemark {
    frontmatter {
      name
      kind
      year
      image {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      datasheet {
        publicURL
      }
      winery {
        frontmatter {
          name
          country
        }
        fields {
          slug
        }
      }
      spec {
        variety
        origin
        aging
        bottle
      }
      pairing
      cata {
        eye
        nose
        mouth
      }
      awards {
        name
        image {
          childImageSharp {
            fixed(width: 64) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
