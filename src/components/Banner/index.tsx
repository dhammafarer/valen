import * as React from "react";
import { Box, Text } from "src/theme/primitives";
import { BannerWrapper } from "./BannerWrapper";

interface BannerProps {
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  image: any;
}

const Banner: React.SFC<BannerProps> = props => {
  return (
    <BannerWrapper image={props.image}>
      <Box p={3}>
        <Text
          as="h1"
          fontSize={4}
          color="white.main"
          fontWeight={2}
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="tracked"
          lineHeight="title"
        >
          {props.heading}
        </Text>
        {props.subheading && (
          <Text mt={2} fontSize={3} color="text.main">
            {props.subheading}
          </Text>
        )}
      </Box>
    </BannerWrapper>
  );
};

export { Banner, BannerProps };
