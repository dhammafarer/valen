import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

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
      <div>{data.winery.name}</div>
      <div>
        {data.wines.edges
          .filter(x => x.node.winery.id === data.winery.id)
          .map(({ node }) => (
            <div>{node.name}</div>
          ))}
      </div>
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
          name
          winery {
            id
          }
        }
      }
    }
  }
`;
