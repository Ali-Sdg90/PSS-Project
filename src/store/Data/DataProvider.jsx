import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
    const getRandomBetween = (min, max, isRound = true) => {
        if (isRound) {
            return Math.round(Math.random() * (max - min) + min);
        } else {
            return Math.random() * (max - min) + min;
        }
    };

    const createBaseStart = () => {
        return {
            id: getRandomBetween(-100000, 100000),
            x: getRandomBetween(10, 90),
            y: getRandomBetween(10, 90),
            vx: getRandomBetween(-1, 1, false),
            vy: getRandomBetween(-1, 1, false),
        };
    };

    const [data, setData] = useState({
        stone: [createBaseStart(), createBaseStart(), createBaseStart()],
        paper: [createBaseStart()],
        scissor: [createBaseStart(), createBaseStart()],
    });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
