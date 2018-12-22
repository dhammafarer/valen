import * as React from "react";
import { withIntl } from "../i18n/withIntl";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";

const NotFound: React.SFC<{}> = () => {
  return (
    <Layout>
      <Button variant="secondary" to="/">
        hello
      </Button>
      404
    </Layout>
  );
};

export default withIntl(NotFound);
