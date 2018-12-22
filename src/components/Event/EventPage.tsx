import * as React from "react";
import { Image } from "../Image";
import { Card, Text } from "primithemes";

interface EventPageProps {
  name: string;
  summary: string;
  address: string;
  dateStart: string;
  dateEnd: string;
  image: any;
  htmlAst: any;
  www: string;
}

export const EventPage: React.SFC<EventPageProps> = ({
  name,
  summary,
  address,
  dateStart,
  dateEnd,
  image,
  www,
}) => (
  <section>
    <Image fluid={image} />
    <Card bb={2} borderColor="secondary.main" pb={2} m={3}>
      <Text color="primary.main" as="h1">
        {name}
      </Text>

      <Text mt={2} fontWeight={3} color="primary.light" as="h3">
        {summary}
      </Text>
    </Card>
  </section>
);
