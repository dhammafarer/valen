import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

interface WineTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    wine: any;
  };
}

const WineTemplate: React.SFC<WineTemplateProps> = ({ data: { wine: w } }) => {
  console.log(w);
  return <Layout>{w.name}</Layout>;
};

export default withIntl(WineTemplate);

export const query = graphql`
  query($slug: String!, $locale: string!) {
    wine: wines(fields: { slug: { eq: $slug } }, lang: { eq: $locale }) {
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
      pairing
      aging
      nose
      mouth
      variety
      eye
      datasheet {
        publicURL
      }
    }
  }
`;
