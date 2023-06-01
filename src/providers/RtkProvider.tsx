"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const RtkProvider: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default RtkProvider;
