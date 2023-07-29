import React from "react";

import {
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";

import { useSbomQuery } from "@app/queries/sbom";

import { ChartCard } from "./components/ChartCard";
import { Dependencies } from "./components/Dependencies";
import { SummaryCard } from "./components/SummaryCard";

export const OverviewPage: React.FC = () => {
  const sbomQuery = useSbomQuery();

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{sbomQuery.data?.packagePath}</Text>
          <Text component="p">{sbomQuery.data?.sbomPath}</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Grid hasGutter>
          <GridItem md={6}>
            {sbomQuery.data && <SummaryCard sbom={sbomQuery.data} />}
          </GridItem>
          <GridItem md={6}>
            {sbomQuery.data && <ChartCard sbom={sbomQuery.data} />}
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>
        {sbomQuery.data && <Dependencies sbom={sbomQuery.data} />}
      </PageSection>
    </>
  );
};
