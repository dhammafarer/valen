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
  location: any;
  data: {
    wines: {
      edges: WineNode[];
    };
    wineries: {
      edges: any[];
    };
  };
}

const Wines: React.SFC<Props> = ({ data, location }) => {
  return (
    <Layout>
      <Container>
        <WineBrowser
          search={location.search}
          wineries={data.wineries.edges}
          wines={data.wines.edges}
        />
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
    wineries: allWineries(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          name
        }
      }
    }
  }
`;
