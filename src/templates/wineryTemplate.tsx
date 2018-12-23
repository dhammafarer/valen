import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

interface WineryTemplateProps {
  data: any;
}

const WineryTemplate: React.SFC<WineryTemplateProps> = ({ data }) => {
  return <Layout>{data.winery.name}</Layout>;
};

export default withIntl(WineryTemplate);

export const query = graphql`
  query($slug: String!) {
    winery: wineriesJson(fields: { slug: { eq: $slug } }) {
      name
    }
  }
`;
