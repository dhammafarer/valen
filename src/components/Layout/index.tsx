import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Flex, Box, styled } from "primithemes";
import { FormattedMessage } from "react-intl";
import * as m from "./Layout.messages";
import { theme } from "../../theme";

import { Normalize } from "styled-normalize";
import { Head } from "./Head";
import { Header } from "./Header";
import { Footer } from "./Footer";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Root = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const Content = styled(Flex)`
  flex-direction: column;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Main = styled(Box)`
  width: 100%;
  margin: 0 auto;
  background: ${props => props.theme.colors.background.main};
  flex-grow: 1;
`;

interface Data {
  logo: any;
  logoWhite: any;
}

const navItems = [
  { to: "/wines", label: <FormattedMessage {...m.nav.wines} /> },
  { to: "/about", label: <FormattedMessage {...m.nav.about} /> },
  { to: "/contact", label: <FormattedMessage {...m.nav.contact} /> },
];

const title = <FormattedMessage {...m.app.title} />;
const phone = <FormattedMessage {...m.contact.phoneNumber} />;
const email = <FormattedMessage {...m.contact.emailAddress} />;

export const Layout: React.SFC<{}> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query Layout2Query {
        logo: file(relativePath: { eq: "logos/logo.png" }) {
          childImageSharp {
            fixed(width: 100, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        logoWhite: file(relativePath: { eq: "logos/logo-white.png" }) {
          childImageSharp {
            fixed(width: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data: Data) => {
      return (
        <ThemeProvider theme={theme}>
          <Root>
            <Normalize />
            <GlobalStyle />
            <Head />
            <Content bg="background.default">
              <Header title={title} navItems={navItems} logo={data.logo} />
              <Main>{children}</Main>
              <Footer email={email} phone={phone} title={title} />
            </Content>
          </Root>
        </ThemeProvider>
      );
    }}
  />
);
