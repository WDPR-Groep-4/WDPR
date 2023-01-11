import { useBadge } from "@mui/base";
import { nanoid } from "nanoid";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const WinkelwagenContext = createContext({});

export function useWinkelWagen() {
    return useContext(WinkelwagenContext);
}

function getInitialState() {
    const winkelwagen = localStorage.getItem("winkelwagen");
    if (winkelwagen) {
        return JSON.parse(winkelwagen);
    }
    return {
        winkelwagen: [],
        currentVoorstelling: null,
    };
}

export function WikelwagenProvider({ children }) {
    const [state, setState] = useState(getInitialState());

    useEffect(() => {
        localStorage.setItem("winkelwagen", JSON.stringify(state));
    }, [state]);

    function addToWinkelwagen(voorstelling, hoeveelheid, rang) {
        const winkelwagenItem = {
            id: nanoid(),
            voorstelling: voorstelling,
            hoeveelheid: hoeveelheid,
            rang: rang,
        };
        setState((state) => ({
            ...state,
            winkelwagen: [...state.winkelwagen, winkelwagenItem],
        }));
    }

    function removeFromWinkelwagen(id) {
        setState((state) => ({
            ...state,
            winkelwagen: state.winkelwagen.filter((item) => item.id !== id),
        }));
    }

    function clearWinkelwagen() {
        setState((state) => ({
            ...state,
            winkelwagen: [],
        }));
    }

    function setCurrentVoorstelling(voorstelling) {
        setState((state) => ({
            ...state,
            currentVoorstelling: voorstelling,
        }));
    }

    return (
        <WinkelwagenContext.Provider
            value={{
                state,
                addToWinkelwagen,
                removeFromWinkelwagen,
                setCurrentVoorstelling,
            }}
        >
            {children}
        </WinkelwagenContext.Provider>
    );
}

// winkelwagen item:
// {id: 1, voorstellingId: 1, hoeveelheid: 2, rang: 1}
