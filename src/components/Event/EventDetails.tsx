import * as React from "react";
import { Text, Flex } from "primithemes";
import { FormattedDate } from "react-intl";
import { Event } from "styled-icons/material/Event";
import { AccessTime } from "styled-icons/material/AccessTime";
import { LocationOn } from "styled-icons/material/LocationOn";
import { isSameDay } from "../../utils/helpers";

interface Props {
  dateStart: string;
  dateEnd: string;
  address: React.ReactNode;
}

export const Date: React.SFC<{ d: string }> = ({ d }) => (
  <FormattedDate value={d} month="long" day="numeric" />
);

export const Time: React.SFC<{ d: string }> = ({ d }) => (
  <FormattedDate value={d} hour="numeric" minute="numeric" />
);

export const Detail: React.SFC<{ icon: any; text: any }> = props => (
  <Flex alignItems="center" mb={1}>
    <Text mr={1} color="secondary.main">
      {props.icon}
    </Text>
    <Text>{props.text}</Text>
  </Flex>
);

export const DetailDate: React.SFC<{ d1: string; d2: string }> = ({
  d1,
  d2,
}) => (
  <Detail
    icon={<Event size={24} />}
    text={
      <>
        <Date d={d1} />
        {!isSameDay(d1, d2) && (
          <>
            <span> - </span>
            <Date d={d2} />
          </>
        )}
      </>
    }
  />
);

export const EventDetails: React.SFC<Props> = ({
  dateStart,
  dateEnd,
  address,
}) => (
  <Flex flexDirection="column">
    <DetailDate d1={dateStart} d2={dateEnd} />
    <Detail
      icon={<AccessTime size={24} />}
      text={
        <>
          <Time d={dateStart} />
          <span> - </span>
          <Time d={dateEnd} />
        </>
      }
    />
    <Detail icon={<LocationOn size={24} />} text={address} />
  </Flex>
);
