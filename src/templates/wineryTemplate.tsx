import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

interface WineryTemplateProps {
  pageContext: {
    locale: string;
  };
  data: any;
}

const WineryTemplate: React.SFC<WineryTemplateProps> = ({
  pageContext,
  data,
}) => {
  return <Layout>{data.winery.data[pageContext.locale].name}</Layout>;
};

export default withIntl(WineryTemplate);

export const query = graphql`
  query($slug: String!) {
    winery: wineriesJson(fields: { slug: { eq: $slug } }) {
      name
      data {
        en {
          name
        }
        zh {
          name
        }
      }
    }
  }
`;
