import { UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Sbom } from "@app/api/sbom";

import { useMockableQuery } from "./helpers";
import { MOCK_SBOM } from "./mocks/sbom.mock";

export const useSbomQuery = (): UseQueryResult<Sbom, AxiosError> => {
  return useMockableQuery<Sbom, AxiosError>(
    {
      queryKey: ["sbomb"],
      queryFn: async () => (await axios.get<Sbom>("/sbomb")).data,
    },
    MOCK_SBOM,
    (window as any)["sbomb"]
  );
};
