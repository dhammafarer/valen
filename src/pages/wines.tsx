import * as React from "react";
import { withIntl } from "../i18n/withIntl";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { WineNode, WineBrowser } from "../components/Wine";
import { Container } from "../components/Container";

interface Props {
  pageContext: {
    locale: string;
  };
  data: {
    wines: {
      edges: WineNode[];
    };
  };
}

const Wines: React.SFC<Props> = ({ data }) => {
  return (
    <Layout>
      <Container>
        <WineBrowser wines={data.wines.edges} />
      </Container>
    </Layout>
  );
};

export default withIntl(Wines);

export const query = graphql`
  query WinesPageQuery($locale: String!) {
    wines: allWines(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          ...WinesQueryFragment
        }
      }
    }
  }
`;
