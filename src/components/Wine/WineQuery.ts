import { graphql } from "gatsby";

export const query = graphql`
  fragment WineQueryFragment on Wines {
    origin
    kind
    image {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    name
    winery {
      name
      country
      fields {
        slug
      }
    }
    pairing
    aging
    nose
    mouth
    variety
    eye
    awards {
      name
      image {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
