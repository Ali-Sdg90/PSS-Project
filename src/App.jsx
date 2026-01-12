import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./store/Data/DataContext";

const App = () => {
    const { data, setData } = useContext(DataContext);

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <>
            <h1> hello</h1>
        </>
    );
};

export default App;
