import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Link } from "gatsby";

export interface I18nLinkProps extends InjectedIntlProps {
  to: string;
  className?: string;
}

export const I18nLink: React.SFC<I18nLinkProps> = ({to, intl, children, ...rest}) => {
  const { locale } = intl;
  const toWithLang = locale ? `/${locale}${to}` : to;

  return (
    <Link to={toWithLang} {...rest}>
      {children}
    </Link>
  );
};

export default injectIntl(I18nLink);
