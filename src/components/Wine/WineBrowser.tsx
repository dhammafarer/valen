import * as React from "react";
import { styled, Box, Flex, Card } from "primithemes";
import { WineNode } from "./WineNode.d";
import { WinesList } from "./WinesList";
import { Text } from "../Typography";
import { wineKinds } from "./wineMessages";
import { FormattedMessage } from "react-intl";

interface Props {
  wines: WineNode[];
  wineries: any[];
}

interface State {
  showFilter: boolean;
  search: string;
  kinds: string[];
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

const kinds = ["red", "white", "rose", "sparkling"];

class WineBrowser extends React.Component<Props, State> {
  state: State = {
    showFilter: true,
    search: "",
    kinds: kinds,
    wineries: this.props.wineries.map(({ node }) => node.name),
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  handleChange = (e: any) => {
    const target = e.target;
    this.setState({ search: target.value });
  };

  handleCheckboxChange = (field: "kinds" | "wineries", e: any) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    const items: string[] = value
      ? [name, ...this.state[field]]
      : this.state[field].filter(x => x !== name);
    this.setState({ [field]: items });
  };

  filterWines = () => {
    return this.props.wines
      .filter(
        w =>
          w.node.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >
            -1 ||
          w.node.winery.name
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) > -1
      )
      .filter(w => this.state.kinds.indexOf(w.node.kind) > -1)
      .filter(w => this.state.wineries.indexOf(w.node.winery.name) > -1);
  };

  render() {
    const wines = this.filterWines();

    return (
      <Flex flexDirection={["column", "column", "row"]} p={3} w={1}>
        <Card w={[1, 1, 1 / 4, 1 / 5]} px={3}>
          <Box my={2} onClick={this.toggleFilter}>
            <Text is="h4">Filter</Text>
          </Box>
          <Filters show={this.state.showFilter}>
            <Box w={1} pr={2} my={3}>
              <Search
                type="text"
                value={this.state.search}
                placeholder="Search wines..."
                onChange={this.handleChange}
                name="search"
              />
            </Box>
            <Box my={3}>
              <Text my={2} fontWeight={5}>
                Kind
              </Text>
              {kinds.map(x => (
                <Box key={x}>
                  <Checkbox
                    type="checkbox"
                    name={x}
                    checked={this.state.kinds.indexOf(x) > -1}
                    onChange={e => this.handleCheckboxChange("kinds", e)}
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
              {this.props.wineries.map(({ node }) => (
                <Flex my={2} key={node.name}>
                  <Checkbox
                    type="checkbox"
                    name={node.name}
                    checked={this.state.wineries.indexOf(node.name) > -1}
                    onChange={e => this.handleCheckboxChange("wineries", e)}
                  />
                  <Text
                    color={
                      this.state.wineries.indexOf(node.name) > -1
                        ? "text.dark"
                        : "text.light"
                    }
                    ml={2}
                  >
                    {node.name}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Filters>
        </Card>
        <Box style={{ flexGrow: 1 }}>
          <WinesList wines={wines} />
        </Box>
      </Flex>
    );
  }
}

export { WineBrowser };
