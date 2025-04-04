import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default RootProvider;
