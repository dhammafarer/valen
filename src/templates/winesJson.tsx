import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

interface WineTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    wine: any;
    translation: any;
  };
}

class WinesJson extends React.Component<WineTemplateProps, {}> {
  render() {
    const { data } = this.props;

    return <Layout>{data.wine.id}</Layout>;
  }
}

export default withIntl(WinesJson);

export const query = graphql`
  query($slug: String!) {
    wine: winesJson(fields: { slug: { eq: $slug } }) {
      id
    }
  }
`;
