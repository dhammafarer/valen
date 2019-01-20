import * as React from "react";
import { withIntl } from "../i18n/withIntl";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { WineNode, WineBrowser } from "../components/Wine";
import { Container } from "../components/Container";
import { Box } from "primithemes";
import { Text } from "../components/Typography";

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
        <Box my={4}>
          <Text fontSize={6} is="h1" color="text.dark" textAlign="center">
            Valen Selection
          </Text>
          <Text
            is="h3"
            fontSize={4}
            my={2}
            color="text.main"
            textAlign="center"
          >
            Browse Our Wines
          </Text>
        </Box>
        <Box>
          <WineBrowser
            search={location.search}
            wineries={data.wineries.edges}
            wines={data.wines.edges}
          />
        </Box>
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
