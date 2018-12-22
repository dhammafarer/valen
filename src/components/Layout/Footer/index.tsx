import * as React from "react";
import { styled, Box, Text, Flex } from "primithemes";

const Main = styled(Box)`
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url(${require("./cairo-pentagon-32.png")});
    background-repeat: repeat;
    opacity: 0.1;
  }
`;

const MainInner = styled(Flex)`
  ${props => props.theme.devices[2]} {
    flex-direction: row;
  }
`;

interface Props {
  logo?: any;
  title: React.ReactNode;
  phone?: React.ReactNode;
  email?: React.ReactNode;
  address?: React.ReactNode[];
}

const Footer: React.SFC<Props> = ({ logo, title, phone, email, address }) => (
  <Box as="footer">
    <Main bg="secondary.dark" color="white.light" py={3}>
      <MainInner
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {logo && (
          <Flex style={{ opacity: 0.9 }} width={["220px"]}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={logo.childImageSharp.fixed.src}
            />
          </Flex>
        )}
        <Flex justifyContent="center" flexDirection="column">
          <Text mb={3} fontSize={3} fontWeight={5}>
            {title}
          </Text>
          {
            <Text lineHeight="copy" fontSize={2} textAlign="center">
              {phone}
            </Text>
          }
          {email && (
            <Text lineHeight="copy" fontSize={2} textAlign="center">
              {email}
            </Text>
          )}
        </Flex>
      </MainInner>
    </Main>
    <Flex bg="text.dark" p={3} justifyContent="center">
      <Text color="grey.600" fontSize={1}>
        © 2018 Copyright:{" "}
        <Text as="span" color="primary.contrast">
          {title}
        </Text>
      </Text>
    </Flex>
  </Box>
);

export { Footer };
