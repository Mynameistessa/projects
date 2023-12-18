"use client";

import { fetcher } from "@/utils/fetcher";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig
    value={{
      fetcher: fetcher,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      errorRetryCount: 3,
    }}
  >
    {children}
  </SWRConfig>
);
