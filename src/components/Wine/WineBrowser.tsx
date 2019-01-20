import * as React from "react";
import { Box, Flex } from "primithemes";
import { WineNode } from "./WineNode.d";
import { WinesList } from "./WinesList";
import { WineFilter } from "./WineFilter";
import { contains } from "ramda";

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

class WineBrowser extends React.Component<Props, State> {
  kinds = ["red", "white", "rose", "sparkling"];

  state: State = {
    showFilter: false,
    search: "",
    kinds: this.kinds,
    wineries: this.props.wineries.map(({ node }) => node.name),
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  handleChange = (e: any) => {
    const target = e.target;
    this.setState({ search: target.value });
  };

  handleCheckbox = (field: "kinds" | "wineries", e: any) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    const items: string[] = value
      ? [name, ...this.state[field]]
      : this.state[field].filter(x => x !== name);
    this.setState({ [field]: items });
  };

  filterName = (wine: WineNode) => {
    const s = this.state.search.toLowerCase();
    const { name, winery } = wine.node;
    return (
      name.toLowerCase().includes(s) || winery.name.toLowerCase().includes(s)
    );
  };

  filterKind = (wine: WineNode) => contains(wine.node.kind, this.state.kinds);

  filterWinery = (wine: WineNode) =>
    contains(wine.node.winery.name, this.state.wineries);

  filterWines = () => {
    return this.props.wines
      .filter(this.filterName)
      .filter(this.filterKind)
      .filter(this.filterWinery);
  };

  render() {
    const wines = this.filterWines();

    return (
      <Flex flexDirection={["column", "column", "row", "row"]} p={3} w={1}>
        <Box pt={3} w={[1, 1, 1 / 2, 1 / 4, 1 / 5]}>
          <WineFilter
            toggleFilter={this.toggleFilter}
            showFilter={this.state.showFilter}
            handleChange={this.handleChange}
            handleCheckbox={this.handleCheckbox}
            search={this.state.search}
            kinds={this.kinds}
            selectedKinds={this.state.kinds}
            wineries={this.props.wineries.map(w => w.node.name)}
            selectedWineries={this.state.wineries}
          />
        </Box>
        <Box style={{ flexGrow: 1 }}>
          <WinesList wines={wines} />
        </Box>
      </Flex>
    );
  }
}

export { WineBrowser };
