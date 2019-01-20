import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { WinePage } from "../components/Wine/WinePage";

interface WineTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    wine: any;
  };
}

const WineTemplate: React.SFC<WineTemplateProps> = ({ data: { wine } }) => {
  return (
    <Layout>
      <WinePage wine={wine} />
    </Layout>
  );
};

export default withIntl(WineTemplate);

export const query = graphql`
  query($slug: String!, $locale: String!) {
    wine: wines(fields: { slug: { eq: $slug } }, lang: { eq: $locale }) {
      ...WineQueryFragment
    }
  }
`;
