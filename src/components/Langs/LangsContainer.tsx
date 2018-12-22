import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { navigate } from "gatsby";
import { LangsList, LangsListClasses } from "./LangsList";
import { languages } from "../../i18n";

export type LangsContainerProps = {
  classes: LangsListClasses;
} & InjectedIntlProps;

export const LangsContainer = injectIntl(
  class Container extends React.Component<LangsContainerProps, {}> {
    handleClick = (code: string) => {
      localStorage.setItem("language", code);
      const path = window.location.pathname
        .split("/")
        .map((x,i) => (i===1) ? code : x)
        .join("/");
      return navigate(path);
    }
    render() {
      return (
        <LangsList
          classes={this.props.classes}
          locale={this.props.intl.locale}
          handleClick={this.handleClick}
          languages={languages}
        />
      );
    }
  }
);
