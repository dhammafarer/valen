import * as React from "react";
import { styled, Flex, Card, Box, Text } from "primithemes";
import { FormattedMessage } from "react-intl";
import { wineKinds } from "./wineMessages";
import { contains } from "ramda";
import { ExpandMore } from "styled-icons/material/ExpandMore";
import { Search } from "styled-icons/material/Search";
import { CheckBox } from "styled-icons/material/CheckBox";
import { CheckBoxOutlineBlank } from "styled-icons/material/CheckBoxOutlineBlank";

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

const TitleBar = styled(Flex)`
  cursor: pointer;
  ${props => props.theme.devices[2]} {
    cursor: auto;
  }
`;

const Checked = styled(CheckBox)`
  color: ${props => props.theme.colors.text.dark};
  flex-shrink: 0;
`;

const UnChecked = styled(CheckBoxOutlineBlank)`
  color: ${props => props.theme.colors.text.main};
  flex-shrink: 0;
`;

const Expand = styled(ExpandMore)<{ show: boolean }>`
  flex-shrink: 0;
  transform: ${props => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 400ms ease-out;
  ${props => props.theme.devices[2]} {
    display: none;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

const Filters = styled(Box)<{ show: boolean }>`
  max-height: ${props => (props.show ? "500px" : "0px")};
  transition: all 400ms ease-out;
  ${props => props.theme.devices[2]} {
    max-height: 500px;
  }
`;

const SearchInput = styled.input`
  margin-left: ${props => props.theme.sizes[2]};
  appearance: none;
  width: 80%;
  border: none;
  background: transparent;
  font-family: ${props => props.theme.fonts.sans};
  padding: ${props => props.theme.sizes[2]};
  border-bottom: ${props => props.theme.borders[1]};
  border-color: ${props => props.theme.colors.divider.main};
  transition: all 400ms ease-out;
  &:focus {
    border-color: ${props => props.theme.colors.secondary.main};
    outline: transparent;
  }
`;

const Checkbox = styled.input`
  height: 0;
  width: 0;
`;

const WineFilter: React.SFC<Props> = props => (
  <Card
    shadow={[1, 1, 0]}
    bg={["background.light", "background.light", "transparent"]}
    w={1}
    radius={2}
  >
    <TitleBar my={2} px={3} onClick={props.toggleFilter}>
      <Text is="h4" style={{ flexGrow: 1 }}>
        Filter Tools
      </Text>
      <Expand color="inherit" size={20} show={props.showFilter} />
    </TitleBar>
    <Filters show={props.showFilter}>
      <Box w={1} px={3}>
        <Search size={18} />
        <SearchInput
          type="text"
          value={props.search}
          placeholder="Search wines..."
          onChange={props.handleChange}
          name="search"
        />
      </Box>
      <Flex flexDirection={["column", "row", "column"]}>
        <Box p={3} w={[1, 1 / 2, 1]}>
          <Text my={2} fontWeight={5}>
            Wines
          </Text>
          {props.kinds.map(x => (
            <Box key={x}>
              <Label>
                <Flex my={2}>
                  <Checkbox
                    type="checkbox"
                    name={x}
                    checked={props.selectedKinds.indexOf(x) > -1}
                    onChange={e => props.handleCheckbox("kinds", e)}
                  />
                  {contains(x, props.selectedKinds) ? (
                    <Checked size={18} />
                  ) : (
                    <UnChecked size={18} />
                  )}
                  <Text
                    color={
                      contains(x, props.selectedKinds)
                        ? "text.dark"
                        : "text.light"
                    }
                    ml={2}
                  >
                    <FormattedMessage {...wineKinds[x]} />
                  </Text>
                </Flex>
              </Label>
            </Box>
          ))}
        </Box>
        <Box p={3} w={[1, 1 / 2, 1]}>
          <Text my={2} fontWeight={5}>
            Wineries
          </Text>
          {props.wineries.map(w => (
            <Label>
              <Flex my={2} key={w}>
                <Checkbox
                  type="checkbox"
                  name={w}
                  checked={props.selectedWineries.indexOf(w) > -1}
                  onChange={e => props.handleCheckbox("wineries", e)}
                />
                {contains(w, props.selectedWineries) ? (
                  <Checked size={18} />
                ) : (
                  <UnChecked size={18} />
                )}
                <Text
                  color={
                    contains(w, props.selectedWineries)
                      ? "text.dark"
                      : "text.light"
                  }
                  ml={2}
                >
                  {w}
                </Text>
              </Flex>
            </Label>
          ))}
        </Box>
      </Flex>
    </Filters>
  </Card>
);

export { WineFilter };
