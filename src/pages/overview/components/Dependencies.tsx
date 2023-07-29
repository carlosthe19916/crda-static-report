import React, { useState } from "react";

import { useSelectionState } from "@migtools/lib-ui";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Label,
  List,
  ListItem,
  SearchInput,
  ToolbarItem,
} from "@patternfly/react-core";
import { IAction, ICell, IRow, IRowData } from "@patternfly/react-table";

import { Dependency, Sbom } from "@app/api/sbom";
import { SimpleTableWithToolbar } from "@app/shared/components";
import { useTable, useTableControls } from "@app/shared/hooks";

const DataKey = "DataKey";

const columns: ICell[] = [
  {
    title: "Ref",
    transforms: [],
    cellTransforms: [],
  },
  {
    title: "Recommendation",
    transforms: [],
    cellTransforms: [],
  },
];

const getRow = (rowData: IRowData): Dependency => {
  return rowData[DataKey];
};

interface DependenciesProps {
  sbom: Sbom;
}

export const Dependencies: React.FC<DependenciesProps> = ({ sbom }) => {
  // Filters
  const [filterText, setFilterText] = useState("");

  // Rows
  const {
    isItemSelected: isRowExpanded,
    toggleItemSelected: toggleRowExpanded,
  } = useSelectionState<Dependency>({
    items: sbom.report.dependencies,
    isEqual: (a, b) => a.ref === b.ref,
  });

  const {
    page: currentPage,
    sortBy: currentSortBy,
    changePage: onPageChange,
    changeSortBy: onChangeSortBy,
  } = useTableControls();

  const { pageItems, filteredItems } = useTable({
    items: sbom.report.dependencies,
    currentPage: currentPage,
    currentSortBy: currentSortBy,
    compareToByColumn: () => 0,
    filterItem: (item) => {
      let isFilterTextFilterCompliant = true;
      if (filterText && filterText.trim().length > 0) {
        isFilterTextFilterCompliant =
          item.ref.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
      }

      return isFilterTextFilterCompliant;
    },
  });

  const itemsToRow = (items: Dependency[]) => {
    const rows: IRow[] = [];
    items.forEach((item) => {
      const isExpanded = isRowExpanded(item);

      rows.push({
        [DataKey]: item,
        isOpen: isExpanded,
        cells: [
          {
            title: item.ref,
          },
          {
            title: item.recommendation,
          },
        ],
      });

      if (isExpanded) {
        rows.push({
          parent: rows.length - 1,
          fullWidth: true,
          noPadding: true,
          cells: [
            {
              title: (
                <div className="pf-u-m-md">
                  <Card>
                    <CardHeader>
                      <CardTitle>Highest vulnerability</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <DescriptionList columnModifier={{ lg: "3Col" }}>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Title</DescriptionListTerm>
                          <DescriptionListDescription>
                            {item.highestVulnerability.title}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Source</DescriptionListTerm>
                          <DescriptionListDescription>
                            {item.highestVulnerability.source}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>CVEs</DescriptionListTerm>
                          <DescriptionListDescription>
                            <List>
                              {item.highestVulnerability.cves.map(
                                (elem, index) => (
                                  <ListItem key={index}>{elem}</ListItem>
                                )
                              )}
                            </List>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                        <DescriptionListGroup>
                          <DescriptionListTerm>Severity</DescriptionListTerm>
                          <DescriptionListDescription>
                            {item.highestVulnerability.severity}{" "}
                            <Label>{item.highestVulnerability.cvssScore}</Label>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      </DescriptionList>
                    </CardBody>
                  </Card>
                </div>
              ),
            },
          ],
        });
      }
    });

    return rows;
  };

  const rows: IRow[] = itemsToRow(pageItems);
  const actions: IAction[] = [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependencies</CardTitle>
      </CardHeader>
      <Divider />
      <CardBody>
        <SimpleTableWithToolbar
          hasTopPagination
          hasBottomPagination
          totalCount={filteredItems.length}
          // Expand
          onCollapse={(_event, _rowIndex, _isOpen, rowData) => {
            const issue = getRow(rowData);
            toggleRowExpanded(issue);
          }}
          // Sorting
          sortBy={
            currentSortBy || { index: undefined, defaultDirection: "asc" }
          }
          onSort={onChangeSortBy}
          // Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          // Table
          rows={rows}
          cells={columns}
          actions={actions}
          // Fetch data
          isLoading={false}
          loadingVariant="skeleton"
          fetchError={undefined}
          // Toolbar filters
          filtersApplied={filterText.trim().length > 0}
          toolbarToggle={
            <>
              <ToolbarItem variant="search-filter">
                <SearchInput
                  value={filterText}
                  onChange={setFilterText}
                  onClear={() => setFilterText("")}
                />
              </ToolbarItem>
            </>
          }
        />
      </CardBody>
    </Card>
  );
};
