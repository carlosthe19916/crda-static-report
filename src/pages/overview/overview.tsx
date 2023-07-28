import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Grid,
  GridItem,
  List,
  ListItem,
  PageSection,
  PageSectionVariants,
  SearchInput,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import DownloadIcon from "@patternfly/react-icons/dist/esm/icons/download-icon";
import CubeIcon from "@patternfly/react-icons/dist/esm/icons/cube-icon";
import ShielVirusIcon from "@patternfly/react-icons/dist/esm/icons/shield-virus-icon";
import FileAltIcon from "@patternfly/react-icons/dist/esm/icons/file-alt-icon";
import { ChartDonut } from "@patternfly/react-charts";
import { useSbomQuery } from "@app/queries/sbom";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

export const OverviewPage: React.FC = () => {
  const sbomQuery = useSbomQuery();

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{sbomQuery.data?.title}</Text>
          <Text component="p">{sbomQuery.data?.version}</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Grid hasGutter>
          <GridItem md={6}>
            <Card isFlat isFullHeight>
              <CardHeader>
                <CardTitle>Summary of the stack</CardTitle>
                <CardActions>
                  <Button variant="plain" aria-label="Action">
                    <DownloadIcon />
                  </Button>
                </CardActions>
              </CardHeader>
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
            <Card isFlat isFullHeight>
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
      <PageSection variant={PageSectionVariants.default}>
        <Toolbar id="toolbar-items">
          <ToolbarContent>
            <ToolbarItem variant="search-filter">
              <SearchInput aria-label="Items example search input" />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <TableComposable>
          <Thead>
            <Tr>
              <Th width={10}>ID</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sbomQuery.data?.dependencies.map((dep, index) => (
              <Tr key={index}>
                <Td>{index}</Td>
                <Td>{dep}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </>
  );
};
