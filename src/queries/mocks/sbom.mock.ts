import { Sbom } from "@app/api/sbom";

export let MOCK_SBOM: Sbom;

if (
  process.env.NODE_ENV === "test" ||
  process.env.REACT_APP_DATA_SOURCE === "mock"
) {
  const sbomb1: Sbom = {
    title: "sbomb1",
    version: "0.1-beta",
    dependencies: ["dep1", "dep2", "dep3"],
  };

  MOCK_SBOM = sbomb1;
}
