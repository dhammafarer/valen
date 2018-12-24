import * as React from "react";
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
  return <Layout>winery</Layout>;
};

export default withIntl(WineryTemplate);
