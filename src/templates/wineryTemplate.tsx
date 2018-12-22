import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";

interface WineryTemplateProps {
  data: {
    markdownRemark: {
      html: any;
      frontmatter: {
        name: string;
      };
    };
  };
}

const WineryTemplate: React.SFC<WineryTemplateProps> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      {frontmatter.name}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default withIntl(WineryTemplate);

export const query = graphql`
  query($slug: String!, $locale: String!) {
    markdownRemark(fields: { slug: { eq: $slug }, lang: { eq: $locale } }) {
      html
      frontmatter {
        name
      }
    }
  }
`;
