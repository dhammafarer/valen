import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { withIntl } from "../i18n";
import { WinePage } from "../components/Wine/WinePage";

interface WineTemplateProps {
  pageContext: {
    locale: string;
  };
  data: {
    wine: any;
  };
}

const WineTemplate: React.SFC<WineTemplateProps> = ({
  pageContext,
  data: { wine: w },
}) => {
  const l = pageContext.locale;
  const wine = {
    name: w.data[l].name,
    kind: w.kind,
    year: w.year,
    image: w.image,
    datasheet: w.datasheet && w.datasheet.publicURL,
    variety: w.data[l].variety,
    aging: w.data[l].aging,
    origin: w.origin,
    bottle: w.bottle,
    pairing: w.data[l].pairing,
    eye: w.data[l].eye,
    nose: w.data[l].nose,
    mouth: w.data[l].mouth,
    awards: w.awards.map((a: any) => ({
      name: a.name,
      image: a.image,
    })),
    winery: {
      country: w.winery.country,
      name: w.winery.data[l].name,
      slug: w.winery.fields.slug,
    },
  };

  return (
    <Layout>
      <WinePage wine={wine} />
    </Layout>
  );
};

export default withIntl(WineTemplate);

export const query = graphql`
  query($slug: String!) {
    wine: winesJson(fields: { slug: { eq: $slug } }) {
      origin
      kind
      image {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      data {
        en {
          name
          pairing
          aging
          nose
          mouth
          variety
          eye
          datasheet {
            publicURL
          }
        }
      }
      winery {
        fields {
          slug
        }
        data {
          en {
            name
            country
          }
          zh {
            name
            country
          }
        }
      }
      awards {
        name
        image {
          childImageSharp {
            fixed(width: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
