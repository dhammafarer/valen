import * as React from "react";
import { BannerWrapper } from "../Banner/BannerWrapper";
import { styled, Box, Flex, Text } from "primithemes";
import { FormattedMessage, defineMessages } from "react-intl";
import { Button } from "../Button";
import { DetailDate } from "./EventDetails";

const Wrapper = styled(Box)`
  position: relative;
`;

const messages = defineMessages({
  nextEvent: {
    id: "eventBanner.nextEvent",
    defaultMessage: "Meet us at:",
  },
  learnMore: {
    id: "eventBanner.learnMore",
    defaultMessage: "Learn More",
  },
  allEvents: {
    id: "eventBanner.allEvents",
    defaultMessage: "All Events",
  },
});

interface EventBannerProps {
  image: any;
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  address: React.ReactNode;
  dateStart: string;
  dateEnd: string;
  slug: string;
}

const EventBanner: React.SFC<EventBannerProps> = ({
  image,
  heading,
  subheading,
  dateStart,
  dateEnd,
  slug,
  address,
}) => (
  <Wrapper color="white.dark" bg="black.dark">
    <BannerWrapper image={image}>
      <Flex m={3} alignItems="center" flexDirection="column">
        <Text mb={1} color="white.dark">
          <FormattedMessage {...messages.nextEvent} />
        </Text>
        <Text
          mb={2}
          textAlign="center"
          is="h1"
          fontSize={5}
          color="white.light"
        >
          {heading}
        </Text>
        {subheading && (
          <Text is="h5" mt={2} fontSize={3} fontWeight={3}>
            {subheading}
          </Text>
        )}
      </Flex>
    </BannerWrapper>

    <Flex alignItems="center" flexDirection="column" pb={2}>
      <DetailDate d1={dateStart} d2={dateEnd} />
      <Flex p={3}>
        <Button to={slug} variant="white" contained>
          <FormattedMessage {...messages.learnMore} />
        </Button>
        <Button ml={2} to="/events" variant="white" outlined>
          <FormattedMessage {...messages.allEvents} />
        </Button>
      </Flex>
    </Flex>
  </Wrapper>
);

export { EventBanner };
