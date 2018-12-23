import * as React from "react";
import { query } from "./query";
import { styled, Box, Flex, Text, Card } from "primithemes";
import { Image } from "../../Image";
import { Container } from "../../Container";
import { Button } from "../../Button";

const Sheet = styled(Card)`
  padding: ${props => props.theme.sizes[3]};
  ${props => props.theme.devices[1]} {
    padding: ${props => props.theme.sizes[4]};
  }
`;
const ImageWrapper = styled(Flex)``;

const ContentWrapper = styled(Box)`
  padding-top: ${props => props.theme.sizes[4]};

  ${props => props.theme.devices[1]} {
    padding-top: ${props => props.theme.sizes[0]};
    padding-right: ${props => props.theme.sizes[3]};
  }

  ${props => props.theme.devices[3]} {
    padding-top: ${props => props.theme.sizes[4]};
    padding-left: ${props => props.theme.sizes[5]};
    padding-right: ${props => props.theme.sizes[5]};
  }
`;

const Section = styled(Card)`
  border-top: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.divider};
  padding: ${props => props.theme.sizes[3]};
`;

const Spec: React.SFC<{
  first?: boolean;
  label: React.ReactNode;
  text: string;
}> = ({ label, text, first }) => (
  <Box mt={first ? 0 : 3}>
    <Text color="text.dark" fontWeight={6}>
      {label}
    </Text>
    <Text mt={1} color="text.main">
      {text}
    </Text>
  </Box>
);

export const WinePage: React.SFC<Props> = ({ wine }) => (
  <Box bg="grey.200" p={3}>
    <Container>
      <Sheet
        radius={2}
        shadow={1}
        bg="background.light"
        width={1}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="space-between"
      >
        <ImageWrapper
          width={[1, 1 / 3, 1 / 2, 1 / 4, 1 / 3]}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Image
            imgStyle={{ objectFit: "contain" }}
            style={{ width: "100%", maxWidth: 300 }}
            fluid={wine.image}
          />
        </ImageWrapper>

        <ContentWrapper width={[1, 2 / 3, 1 / 2, 3 / 4, 2 / 3]}>
          <Box>
            <Text is="h1" fontSize={[5, 5, 6]}>
              {wine.name}
            </Text>
            <Text mt={2} color="text.main" as="h1" fontSize={[5, 5, 6]}>
              {wine.year}
            </Text>
          </Box>

          {wine.winery && (
            <Box mt={3}>
              <Button
                my={2}
                mr={2}
                fontSize={3}
                contained
                variant="secondary"
                to={wine.winery.slug}
              >
                {wine.winery.name}
              </Button>
              {wine.winery.country && (
                <Button mr={2} fontSize={3} outlined to={wine.winery.slug}>
                  {wine.winery.country}
                </Button>
              )}
              {wine.kind && (
                <Button mr={2} fontSize={3} outlined to={wine.winery.slug}>
                  {wine.kind}
                </Button>
              )}
            </Box>
          )}

          {wine.awards && wine.awards.length > 0 && (
            <Section mt={4}>
              <Text as="h3">Latest Awards</Text>
              <Flex mt={2} flexWrap="wrap">
                {wine.awards.map((a, i) => (
                  <Flex width={1} p={2} alignItems="center">
                    <Image style={{ flexShrink: 0 }} fixed={a.image} />
                    <Text ml={3}>{a.name}</Text>
                  </Flex>
                ))}
              </Flex>
            </Section>
          )}

          <Section mt={4}>
            {wine.variety && <Spec label={"Variety"} text={wine.variety} />}
            {wine.aging && <Spec label={"Aging"} text={wine.aging} />}
            {wine.origin && <Spec label={"Origin"} text={wine.origin} />}
            {wine.bottle && <Spec label={"Bottle"} text={wine.bottle} />}
          </Section>

          <Section mt={4}>
            {wine.eye && <Spec first label={"Eye"} text={wine.eye} />}
            {wine.nose && <Spec label={"Nose"} text={wine.nose} />}
            {wine.mouth && <Spec label={"Mouth"} text={wine.mouth} />}
          </Section>

          {wine.pairing && (
            <Section mt={4}>
              <Spec first label={"Food Pairing"} text={wine.pairing} />
            </Section>
          )}

          <Section mt={4}>
            <Box>
              {wine.datasheet && (
                <Button to={wine.datasheet} outlined>
                  Download Spec
                </Button>
              )}
            </Box>
          </Section>
        </ContentWrapper>
      </Sheet>
    </Container>
  </Box>
);

interface Props {
  wine: {
    name: string;
    kind?: string;
    year?: number;
    image?: any;
    datasheet?: string;
    variety?: string;
    aging?: string;
    origin?: string;
    bottle?: string;
    pairing?: string;
    eye?: string;
    nose?: string;
    mouth?: string;
    awards?: { name?: string; image?: any }[];
    winery?: {
      country?: string;
      name?: string;
      slug?: string;
    };
  };
}

export { query };
