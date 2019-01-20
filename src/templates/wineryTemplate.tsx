import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { WinesList } from "../components/Wine";
import { Container } from "../components/Container";
import { Box } from "primithemes";
import { Text } from "../components/Typography";

interface WineryTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    winery: {
      id: string;
      name: string;
    };
    wines: {
      edges: any[];
    };
  };
}

const WineryTemplate: React.SFC<WineryTemplateProps> = ({
  pageContext,
  data,
}) => {
  return (
    <Layout>
      <Container>
        <Box mt={3} p={3}>
          <Text color="text.dark" fontSize={6} is="h1">
            {data.winery.name}
          </Text>
        </Box>
        <Box p={3}>
          <Text color="text.main" is="h2" textAlign="center">
            Available from this winery
          </Text>
          <Box my={3}>
            <WinesList
              wines={data.wines.edges.filter(
                x => x.node.winery.id === data.winery.id
              )}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default withIntl(WineryTemplate);

export const query = graphql`
  query($slug: String!, $locale: String!) {
    winery: wineries(fields: { slug: { eq: $slug } }, lang: { eq: $locale }) {
      id
      name
    }
    wines: allWines(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          ...WinesQueryFragment
        }
      }
    }
  }
`;
