import React from "react";
import { LinkButton } from "../../ui/link-button";

const Header = () => {
    return (
        <nav className="p-2 flex gap-1">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/admin/new-plant">Dodaj rośline</LinkButton>
        </nav>
    );
};

export default Header;
