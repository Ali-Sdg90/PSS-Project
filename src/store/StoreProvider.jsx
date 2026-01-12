import React from "react";
import { DataProvider } from "./Data/DataProvider";

const StoreProvider = ({ children }) => {
    return (
        <>
            <DataProvider>
                <>{children}</>
            </DataProvider>
        </>
    );
};

export default StoreProvider;
