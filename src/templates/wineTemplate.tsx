import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { WinePage } from "../components/Wine/WinePage";

interface WineTemplateProps {
  data: {
    wine: any;
  };
}

const WineTemplate: React.SFC<WineTemplateProps> = ({ data }) => {
  return (
    <Layout>
      <WinePage wine={data.wine} />
    </Layout>
  );
};

export default withIntl(WineTemplate);

export const query = graphql`
  query($slug: String!, $locale: String!) {
    wine: markdownRemark(
      fields: { slug: { eq: $slug }, lang: { eq: $locale } }
    ) {
      ...WineFragment
    }
  }
`;
