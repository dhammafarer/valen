import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";
import { EventBanner } from "../components/Event/EventBanner";
import { WineCard } from "../components/Wine/WineCard";
import { Flex, Box } from "primithemes";
import { Container } from "../components/Container";

interface EventNode {
  node: {
    fields: {
      lang: string;
      slug: string;
    };
    frontmatter: {
      name: string;
      summary: string;
      address: string;
      dateStart: string;
      dateEnd: string;
      image: any;
    };
    htmlAst: any;
  };
}

interface WineNode {
  node: {
    fields: {
      slug: string;
    };
    name: string;
    wineId: string;
    winery: {
      name: string;
      fields: {
        slug: string;
      };
    };
    image: any;
  };
}

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
  data: {
    events: {
      edges: EventNode[];
    };
    wines: {
      edges: WineNode[];
    };
  };
}
type Props = IndexPageProps & InjectedIntlProps;

const IndexPage: React.SFC<Props> = ({ pageContext, data, intl }) => {
  const events = data.events.edges;
  const nextEvent = events[0];
  return (
    <Layout>
      <Box m={3}>
        <Container>
          <EventBanner
            image={nextEvent.node.frontmatter.image}
            heading={nextEvent.node.frontmatter.name}
            subheading={nextEvent.node.frontmatter.summary}
            address={nextEvent.node.frontmatter.address}
            dateStart={nextEvent.node.frontmatter.dateStart}
            dateEnd={nextEvent.node.frontmatter.dateEnd}
            slug={nextEvent.node.fields.slug}
          />
        </Container>
      </Box>
      <Container>
        <Flex w={1} flexWrap="wrap">
          {data.wines.edges.map(({ node }) => (
            <Flex w={[1, 1 / 2, 1 / 3, 1 / 4]} p={3} key={node.wineId}>
              <WineCard
                name={node.name}
                winery={node.winery}
                image={node.image}
                slug={node.fields.slug}
              />
            </Flex>
          ))}
        </Flex>
      </Container>
    </Layout>
  );
};

export default withIntl(injectIntl(IndexPage));

export const query = graphql`
  query IndexPageQuery($locale: String!) {
    events: allMarkdownRemark(
      filter: { fields: { type: { eq: "events" }, lang: { eq: $locale } } }
      sort: { fields: frontmatter___dateStart, order: ASC }
    ) {
      edges {
        node {
          fields {
            lang
            slug
          }
          frontmatter {
            name
            summary
            address
            dateStart
            dateEnd
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    wines: allWines(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          wineId
          fields {
            slug
          }
          name
          winery {
            name
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
      }
    }
  }
`;
