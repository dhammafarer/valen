import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n/withIntl";

export interface IndexPageProps {
  pageContext: {
    locale: string;
  };
  data: {
    wineries: {
      edges: any[];
    };
  };
}
type Props = IndexPageProps;

class EventsPage extends React.Component<Props, {}> {
  render() {
    return <Layout>wineries: {this.props.data.wineries.edges.length}</Layout>;
  }
}

export default withIntl(EventsPage);

export const query = graphql`
  query WineriesPageQuery {
    wineries: allMarkdownRemark(
      filter: { fields: { type: { eq: "wineries" } } }
    ) {
      edges {
        node {
          fields {
            lang
            slug
          }
          frontmatter {
            name
          }
        }
      }
    }
  }
`;
