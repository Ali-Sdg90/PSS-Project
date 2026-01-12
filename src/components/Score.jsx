import React, { useContext } from "react";
import { DataContext } from "../store/Data/DataContext";

const Score = () => {
    const { data } = useContext(DataContext);

    return (
        <div className="score-component">
            <h2>Paper: {data.paper.length}</h2>
            <h2>Scissor: {data.scissor.length}</h2>
            <h2>Stone: {data.stone.length}</h2>
        </div>
    );
};

export default Score;
