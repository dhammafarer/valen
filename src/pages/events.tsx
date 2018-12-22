import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  },
  data: {
    image: any;
    events: {
      edges: any[],
    }
  }
}
type Props = IndexPageProps;

class EventsPage extends React.Component<Props, {}> {
  render() {
    const { data, pageContext } = this.props;
    const events = data.events.edges.filter(({node}) => node.fields.lang === pageContext.locale);

    return (
      <Layout>
        Event List
      </Layout>
    );
  }
}

export default withIntl(EventsPage);

export const query = graphql`
  query EventsPageQuery {
    image: file(relativePath: {eq: "header/events-header-image.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    events: allMarkdownRemark(
      filter: {fields: {type: {eq: "events"}}}
      sort: {fields: frontmatter___dateStart, order: ASC}
    ) {
      edges {
        node {
          fields {
            lang
            slug
          }
          frontmatter {
            name
            address
            dateStart
            dateEnd
            image {
              childImageSharp {
                fluid(maxWidth: 1400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
