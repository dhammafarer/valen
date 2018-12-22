import * as React from "react";
import { Card } from "primithemes";

export const Section: React.SFC<{}> = ({ children }) => (
  <Card
    py={3}
    bg="background.light"
    width={1}
    bt={2}
    btc="primary.main"
    alignItems="center"
    flexDirection="column"
  >
    {children}
  </Card>
);
