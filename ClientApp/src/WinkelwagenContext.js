import { nanoid } from "nanoid";
import { useContext } from "react";
import { createContext, useState } from "react";

const WinkelwagenContext = createContext({});

export function useWinkelWagen() {
    return useContext(WinkelwagenContext);
}

export function WikelwagenProvider({ children }) {
    const [state, setState] = useState({
        winkelwagen: [],
        voorstellingen: [],
        currentVoorstelling: null,
    });

    function addToWinkelwagen(voorstellingId, hoeveelheid, rang) {
        const winkelwagenItem = {
            id: nanoid(),
            voorstellingId: voorstellingId,
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
