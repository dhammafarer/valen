import * as React from "react";
import { Flex } from "primithemes";
import { WineNode } from "./WineNode.d";
import { WineCard } from "./WineCard";

interface Props {
  wines: WineNode[];
}

const WinesList: React.SFC<Props> = ({ wines }) => {
  return (
    <Flex w={1} flexWrap="wrap">
      {wines.map(({ node }) => (
        <Flex w={[1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]} p={3} key={node.wineId}>
          <WineCard
            name={node.name}
            winery={node.winery}
            image={node.image}
            slug={node.fields.slug}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export { WinesList };
