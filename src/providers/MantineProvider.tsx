"use client";

import { MantineProvider as Provider } from "@mantine/core";
import { ReactNode } from "react";

export function MantineProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider
      theme={{
        primaryColor: "blue",
      }}
    >
      {children}
    </Provider>
  );
}
