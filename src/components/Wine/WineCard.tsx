import * as React from "react";
import { styled, Card, Text, Box, Flex } from "primithemes";
import { Button } from "../Button";
import { Image } from "../Image";
import { Link } from "../../i18n";

const Img = styled(Image)``;

interface Props {
  name: string;
  slug: string;
  image: any;
  winery: {
    name: string;
    slug: string;
  };
}

const WineCard: React.SFC<Props> = ({ name, winery, slug, image }) => (
  <Card shadow={1} radius={2} width={1} style={{ height: "100%" }}>
    <Box bg="background.light" p={3} style={{ height: 300 }}>
      <Img
        imgStyle={{ objectFit: "contain" }}
        style={{ height: "100%" }}
        fluid={image}
      />
    </Box>
    <Flex
      p={3}
      bg="grey.100"
      flexDirection="column"
      justifyContent="space-between"
      style={{ flexGrow: 1 }}
    >
      <Box>
        <Text is="h3" fontSize={3} lineHeight={1} color="primary.main">
          {name}
        </Text>
        <Link to={winery.slug}>
          <Text
            textTransform="uppercase"
            is="span"
            mt={1}
            fontSize={2}
            color="secondary.main"
          >
            {winery.name}
          </Text>
        </Link>
      </Box>
      <Flex mt={3}>
        <Button to={slug} outlined>
          Learn More
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export { WineCard };
