import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Grid,
  GridItem,
  Level,
  LevelItem,
  List,
  ListItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";
import CubeIcon from "@patternfly/react-icons/dist/esm/icons/cube-icon";
import ShielVirusIcon from "@patternfly/react-icons/dist/esm/icons/shield-virus-icon";
import FileAltIcon from "@patternfly/react-icons/dist/esm/icons/file-alt-icon";
import { ChartDonut } from "@patternfly/react-charts";

export const OverviewPage: React.FC = () => {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">My SBOMB name</Text>
          <Text component="p">Version: 1.0.0</Text>
          <Text component="small">Generated on 12/12/2023</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Grid hasGutter>
          <GridItem md={6}>
            <Card isFlat>
              <CardTitle>
                <Level>
                  <LevelItem>Summary of the stack</LevelItem>
                  <LevelItem>
                    <Button variant="plain" aria-label="Action">
                      <DownloadIcon />
                    </Button>
                  </LevelItem>
                </Level>
              </CardTitle>
              <Divider />
              <CardBody>
                <DescriptionList
                  columnModifier={{
                    default: "2Col",
                  }}
                >
                  <DescriptionListGroup>
                    <DescriptionListTerm icon={<CubeIcon />}>
                      Dependency details
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <List isPlain>
                        <ListItem>Analyzed dependencies: 17</ListItem>
                        <ListItem>Transitive dependencies: 112</ListItem>
                        <ListItem>Unknown dependencies: 10</ListItem>
                      </List>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm icon={<ShielVirusIcon />}>
                      Security issues
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <List isPlain>
                        <ListItem>Total vulnerabilities: 87</ListItem>
                        <ListItem>Vulnerable dependencies: 18</ListItem>
                      </List>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
              <Divider />
              <CardBody>
                <DescriptionList
                  columnModifier={{
                    default: "2Col",
                  }}
                >
                  <DescriptionListGroup>
                    <DescriptionListTerm icon={<FileAltIcon />}>
                      Licenses
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <List isPlain>
                        <ListItem>License conflicts: 2</ListItem>
                        <ListItem>Unknown licenses: 1</ListItem>
                      </List>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={6}>
            <Card isFlat>
              <CardTitle>Overview of the stack</CardTitle>
              <Divider />
              <CardBody>
                <div style={{ height: "230px", width: "350px" }}>
                  <ChartDonut
                    ariaDesc="Average number of pets"
                    ariaTitle="Donut chart example"
                    constrainToVisibleArea
                    data={[
                      { x: "Cats", y: 35 },
                      { x: "Dogs", y: 55 },
                      { x: "Birds", y: 10 },
                    ]}
                    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                    legendData={[
                      { name: "Cats: 35" },
                      { name: "Dogs: 55" },
                      { name: "Birds: 10" },
                    ]}
                    legendOrientation="vertical"
                    legendPosition="right"
                    name="chart2"
                    padding={{
                      bottom: 20,
                      left: 20,
                      right: 140, // Adjusted to accommodate legend
                      top: 20,
                    }}
                    subTitle="Pets"
                    title="100"
                    width={350}
                  />
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>content</PageSection>
    </>
  );
};
