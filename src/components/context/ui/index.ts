import { createContext, useContext } from "react";
import { Cart } from "../../../redux/interfaces/cart/cart.interface";



export type GlobalContext = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    showSearchBox: boolean;
    setShowSearchBox: (show: boolean) => void;
    cart: Cart;
    setCart: (product: Cart) => void
    showCart: boolean;
    setShowCart: (show: boolean) => void;

}
export const UIContext = createContext<GlobalContext>({
    drawerOpen: false,
    setDrawerOpen: () => { },
    showSearchBox: false,
    setShowSearchBox: () => { },
    cart: [],
    setCart: () => { },
    showCart: false,
    setShowCart: () => { }

});
export const useUIContext = () => useContext(UIContext);

