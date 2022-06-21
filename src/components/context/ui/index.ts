import { createContext, useContext, useState } from "react";

export type GlobalContext = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    showSearchBox: boolean;
    setShowSearchBox: (show: boolean) => void;
}
export const UIContext = createContext<GlobalContext>({
    drawerOpen: false,
    setDrawerOpen: () => { },
    showSearchBox: false,
    setShowSearchBox: () => { },
});
export const useUIContext = () => useContext(UIContext);

