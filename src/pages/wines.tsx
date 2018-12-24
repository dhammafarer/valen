import * as React from "react";
import { withIntl } from "../i18n/withIntl";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";

interface Props {
  pageContext: {
    locale: string;
  };
  data: {
    wines: {
      edges: any[];
    };
  };
}

const Wines: React.SFC<Props> = props => {
  return (
    <Layout>
      <div>
        {props.data.wines.edges.map(({ node }) => (
          <div key={node.id}>
            <div>{node.name}</div>
            <div>
              <a href={node.datasheet.publicURL}>download</a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default withIntl(Wines);

export const query = graphql`
  query {
    wines: allWines {
      edges {
        node {
          id
          name
          winery {
            name
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
