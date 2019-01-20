import * as React from "react";
import { styled, Flex, Card, Box, Text } from "primithemes";
import { FormattedMessage } from "react-intl";
import { wineKinds } from "./wineMessages";

interface Props {
  toggleFilter(): void;
  handleChange(e: any): void;
  handleCheckbox(f: string, e: any): void;
  showFilter: boolean;
  search: string;
  kinds: string[];
  selectedKinds: string[];
  selectedWineries: string[];
  wineries: string[];
}

const Filters = styled(Box)<{ show: boolean }>`
  max-height: ${props => (props.show ? "500px" : "0px")};
  transition: all 400ms ease-out;
  ${props => props.theme.devices[2]} {
    max-height: 500px;
  }
`;

const Search = styled.input`
  appearance: none;
  width: 100%;
  background: ${props => props.theme.colors.white.light};
  font-family: ${props => props.theme.fonts.sans};
  padding: ${props => props.theme.sizes[2]};
  border-radius: ${props => props.theme.radii[1]};
  border: ${props => props.theme.borders[1]};
  box-shadow: ${props => props.theme.shadows[0]};
  border-color: transparent;
  transition: all 400ms ease-out;
  &:focus {
    border-color: transparent;
    outline: transparent;
    box-shadow: ${props => props.theme.shadows[1]};
  }
`;

const Checkbox = styled.input`
  margin-top: 3px;
`;

const WineFilter: React.SFC<Props> = props => (
  <Card w={1} px={3}>
    <Box my={2} onClick={props.toggleFilter}>
      <Text is="h4">Filter</Text>
    </Box>
    <Filters show={props.showFilter}>
      <Box w={1} pr={2} my={3}>
        <Search
          type="text"
          value={props.search}
          placeholder="Search wines..."
          onChange={props.handleChange}
          name="search"
        />
      </Box>
      <Box my={3}>
        <Text my={2} fontWeight={5}>
          Kind
        </Text>
        {props.kinds.map(x => (
          <Box key={x}>
            <Checkbox
              type="checkbox"
              name={x}
              checked={props.selectedKinds.indexOf(x) > -1}
              onChange={e => props.handleCheckbox("kinds", e)}
            />
            <Text ml={2} is="span">
              <FormattedMessage {...wineKinds[x]} />
            </Text>
          </Box>
        ))}
      </Box>
      <Box my={3}>
        <Text my={2} fontWeight={5}>
          Wineries
        </Text>
        {props.wineries.map(w => (
          <Flex my={2} key={w}>
            <Checkbox
              type="checkbox"
              name={w}
              checked={props.selectedWineries.indexOf(w) > -1}
              onChange={e => props.handleCheckbox("wineries", e)}
            />
            <Text
              color={
                props.selectedWineries.indexOf(w) > -1
                  ? "text.dark"
                  : "text.light"
              }
              ml={2}
            >
              {w}
            </Text>
          </Flex>
        ))}
      </Box>
    </Filters>
  </Card>
);

export { WineFilter };
