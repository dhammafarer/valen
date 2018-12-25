import * as React from "react";
import { FormattedDate } from "react-intl";
import { Card, Text } from "primithemes";

interface Props {
  date: string;
}

const CalendarCard: React.SFC<Props> = ({ date }) => (
  <Card
    bg="white.light"
    p={2}
    w={"70px"}
    style={{ height: "70px" }}
    alignItems="center"
    shadow={2}
    radius={2}
  >
    <Text color="red">
      <FormattedDate value={date} month="short" />
    </Text>
    <Text fontSize={5} fontWeight={2} color="text.dark">
      <FormattedDate value={date} day="numeric" />
    </Text>
  </Card>
);

export { CalendarCard };
