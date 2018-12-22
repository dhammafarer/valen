import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { EventPage } from "../components/Event/EventPage";

interface EventTemplateProps {
  data: {
    markdownRemark: any,
  };
}

const EventTemplate: React.SFC<EventTemplateProps> = (({ data }) => {
  const { markdownRemark: md } = data;
  return (
    <Layout>
      <EventPage
        name={md.frontmatter.name}
        summary={md.frontmatter.summary}
        dateStart={md.frontmatter.dateStart}
        dateEnd={md.frontmatter.dateEnd}
        image={md.frontmatter.image}
        www={md.frontmatter.www}
        address={md.frontmatter.address}
        htmlAst={md.htmlAst}
      />
    </Layout>
  );
});

export default withIntl(EventTemplate);

export const query = graphql`
  query($slug: String!, $locale: String!) {
    markdownRemark(fields: { slug: { eq: $slug }, lang: { eq: $locale } }) {
      fields {
        slug
        lang
      }
      htmlAst
      frontmatter {
        name
        summary
        dateStart
        dateEnd
        www
        image {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        address
      }
    }
  }`
;
