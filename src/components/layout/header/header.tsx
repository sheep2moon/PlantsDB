import React from "react";
import { LinkButton } from "../../ui/link-button";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
    return (
        <nav className="p-2">
            <LinkButton href="/">Home</LinkButton>
            <ThemeToggle />
        </nav>
    );
};

export default Header;
