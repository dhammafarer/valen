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

export const WinePage: React.SFC<Props> = ({ wine: { frontmatter: w } }) => (
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
            fluid={w.image}
          />
        </ImageWrapper>

        <ContentWrapper width={[1, 2 / 3, 1 / 2, 3 / 4, 2 / 3]}>
          <Box>
            <Text as="h1" fontSize={[5, 5, 6]}>
              {w.name}
            </Text>
            <Text mt={2} color="text.main" as="h1" fontSize={[5, 5, 6]}>
              {w.year}
            </Text>
          </Box>

          <Box mt={3}>
            <Button
              my={2}
              mr={2}
              fontSize={3}
              contained
              variant="secondary"
              to={w.winery.fields.slug}
            >
              {w.winery.frontmatter.name}
            </Button>
            <Button mr={2} fontSize={3} outlined to={w.winery.fields.slug}>
              {w.winery.frontmatter.country}
            </Button>
            <Button mr={2} fontSize={3} outlined to={w.winery.fields.slug}>
              {w.kind}
            </Button>
          </Box>

          {w.awards && w.awards.length > 0 && (
            <Section mt={4}>
              <Text as="h3">Latest Awards</Text>
              <Flex mt={2} flexWrap="wrap">
                {w.awards.map((a, i) => (
                  <Flex width={1} p={2} alignItems="center">
                    <Image style={{ flexShrink: 0 }} fixed={a.image} />
                    <Text ml={3}>{a.name}</Text>
                  </Flex>
                ))}
              </Flex>
            </Section>
          )}

          <Section mt={4}>
            <Spec label={"Variety"} text={w.spec.variety} />
            <Spec label={"Aging"} text={w.spec.aging} />
            <Spec label={"Origin"} text={w.spec.origin} />
            <Spec label={"Bottle"} text={w.spec.bottle} />
          </Section>

          <Section mt={4}>
            <Spec first label={"Eye"} text={w.cata.eye} />
            <Spec label={"Nose"} text={w.cata.nose} />
            <Spec label={"Mouth"} text={w.cata.mouth} />
          </Section>

          <Section mt={4}>
            <Spec first label={"Food Pairing"} text={w.pairing} />
          </Section>

          <Section mt={4}>
            <Box>
              <Button to={w.datasheet.publicUrl} outlined>
                Download Spec
              </Button>
            </Box>
          </Section>
        </ContentWrapper>
      </Sheet>
    </Container>
  </Box>
);

interface Props {
  wine: {
    frontmatter: {
      name: string;
      kind: string;
      year: number;
      image: any;
      winery: {
        frontmatter: {
          name: string;
          country: string;
        };
        fields: {
          slug: string;
        };
      };
      datasheet: {
        publicUrl: string;
      };
      spec: {
        variety: string;
        aging: string;
        origin: string;
        bottle: string;
      };
      pairing: string;
      cata: {
        eye: string;
        nose: string;
        mouth: string;
      };
      awards: { name: string; image: any }[];
    };
  };
}

export { query };
