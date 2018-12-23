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
  const locale = props.pageContext.locale;
  return (
    <Layout>
      <div>
        {props.data.wines.edges.map(({ node }) => (
          <div key={node.id}>
            <div>{node.data[locale].name}</div>
            <div>
              <a href={node.data[locale].datasheet.publicURL}>download</a>
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
    wines: allWinesJson {
      edges {
        node {
          id
          name
          data {
            en {
              name
              datasheet {
                publicURL
              }
            }
            zh {
              name
              datasheet {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`;
