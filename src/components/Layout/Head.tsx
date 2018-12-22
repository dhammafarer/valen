import * as React from "react";
import Helmet from "react-helmet";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { app } from "./Layout.messages";

const HeadBase: React.SFC<InjectedIntlProps> = ({ intl }) => (
  <Helmet
    title={intl.formatMessage(app.title)}
    htmlAttributes={{lang: intl.locale}}
    meta={[
      {name: "description", content: "Valen International"},
    ]}
    link={[
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Muli:300,400,700"},
    ]}
  />
);

export const Head = injectIntl(HeadBase);
