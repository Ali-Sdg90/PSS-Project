import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./store/Data/DataContext";
import Base from "./components/Base";

const App = () => {
    const { data, setData } = useContext(DataContext);

    return (
        <div className="app-container">
            <h1>Paper Scissor Stone Battle Royal</h1>
            <Base />
        </div>
    );
};

export default App;
