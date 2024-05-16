import React from "react";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
};

export default Providers;
