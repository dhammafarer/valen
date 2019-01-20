import { graphql } from "gatsby";

export const query = graphql`
  fragment WinesQueryFragment on Wines {
    wineId
    fields {
      slug
    }
    name
    kind
    year
    winery {
      name
      id
      fields {
        slug
      }
    }
    image {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
