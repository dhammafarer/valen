import * as React from "react";
import { WineNode } from "./WineNode.d";
import { WinesList } from "./WinesList";

interface Props {
  wines: WineNode[];
}

interface State {
  search: string;
}

class WineBrowser extends React.Component<Props, State> {
  state: State = {
    search: "",
  };

  render() {
    return (
      <div>
        <WinesList wines={this.props.wines} />{" "}
      </div>
    );
  }
}

export { WineBrowser };
