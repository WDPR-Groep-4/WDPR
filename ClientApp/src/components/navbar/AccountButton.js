import React, { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import AccountPopper from "./AccountPopper";

export default function AccountButton(props) {
    const [openAccount, setOpenAccount] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleAccount = () => {
        setOpenAccount((prev) => !prev);
    };

    const handleCloseAccount = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenAccount(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenAccount(false);
        } else if (event.key === "Escape") {
            setOpenAccount(false);
        }
    }

    const prevOpenAccount = useRef(openAccount);
    useEffect(() => {
        if (prevOpenAccount.current === true && openAccount === false) {
            anchorRef.current.focus();
        }

        prevOpenAccount.current = openAccount;
    }, [openAccount]);

    return (
        <>
            <IconButton
                color="inherit"
                sx={{ fontWeight: 600 }}
                ref={anchorRef}
                aria-controls={openAccount ? "composition-menu" : undefined}
                aria-expanded={openAccount ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggleAccount}
            >
                {props.children}
            </IconButton>
            <AccountPopper
                account={props.account}
                openAccount={openAccount}
                anchorRef={anchorRef}
                handleCloseAccount={handleCloseAccount}
                handleListKeyDown={handleListKeyDown}
            />
        </>
    );
}
