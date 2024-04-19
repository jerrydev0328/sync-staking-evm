import { createContext, useEffect, useReducer } from "react";
import { AppReducer } from './AppReducer'
import { CONFIG } from '../configs/config'

const initialState = {
    loading: false,
    stakers: 0,
    lockedTokens: {
        orbn: 0.00,
        usdt: 0.00
    },
    apy: {
        0: "100",
        1: "400",
        2: "800",
        3: "1200",
        4: "1800",
        5: "100",
        6: "400",
        7: "800",
        8: "1200",
        9: "1800",
    },
    userStakes: [],
    pools: [],
    rewards: [],
    orbn_usd_price: 0,
    usdt_usd_price: 0,
    graphData: {
        orbn: [],
        usdt: []
    }
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)


    return (
        <GlobalContext.Provider value={
            {
                blockchainData: state
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}