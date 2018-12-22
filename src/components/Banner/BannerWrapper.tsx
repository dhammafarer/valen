import * as React from "react";
import { styled, Box, Flex, Card } from "primithemes";
import { Image } from "../Image";

const Wrapper = styled(Card)`
  position: relative;
  overflow: hidden;
  min-height: 300px;
`;

const ImageWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface BannerProps {
  image: any;
}

const BannerWrapper: React.SFC<BannerProps> = ({ image, children }) => {
  return (
    <Wrapper justifyContent="flex-end">
      <ImageWrapper>
        <Image style={{ width: "100%" }} fluid={image} />
      </ImageWrapper>
      <Flex color="white.light" style={{ position: "relative" }} width={1}>
        <Overlay
          bt={2}
          borderColor="secondary.dark"
          bg="linear-gradient(to top, rgba(0,0,0,1.0), rgba(0,0,0,0.6))"
          opacity={0.8}
        />
        <Box width={1} style={{ zIndex: 1 }}>
          {children}
        </Box>
      </Flex>
    </Wrapper>
  );
};

export { BannerWrapper, BannerProps };
