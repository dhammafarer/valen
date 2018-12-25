import * as React from "react";
import { Card } from "primithemes";

export const Section: React.SFC<{}> = ({ children }) => (
  <Card
    py={3}
    bg="background.light"
    w={1}
    bt={2}
    borderColor="primary.main"
    alignItems="center"
    flexDirection="column"
  >
    {children}
  </Card>
);
