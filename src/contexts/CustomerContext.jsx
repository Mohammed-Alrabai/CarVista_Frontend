import { createContext , useReducer , useContext } from "react";

import CustomerReducer from "../Reducers/CustomerReducer";

export const ApiContext = createContext([]);
export const DispatchContext = createContext(null);

const CustomerProvider = ({ children }) => {
    const [data , dispatch] = useReducer(CustomerReducer , []);
    return (
        <ApiContext.Provider value={data}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </ApiContext.Provider>        
    )
}
export default CustomerProvider;

export const useCustomer = () => useContext(ApiContext);
export const useDispatch = () => useContext(DispatchContext);
