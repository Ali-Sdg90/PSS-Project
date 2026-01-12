import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";

const numberOfStones = 1;
const numberOfPapers = 5;
const numberOfScissors = 5;
const maxSpeed = 1;
const minSpeed = -1;

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
            vx: getRandomBetween(minSpeed, maxSpeed, false),
            vy: getRandomBetween(minSpeed, maxSpeed, false),
        };
    };

    const createNumberOfBaseStart = (number) => {
        const baseStartArray = [];

        for (let i = 0; i < number; i++) {
            baseStartArray.push(createBaseStart());
        }

        return baseStartArray;
    };

    const [data, setData] = useState({
        stone: createNumberOfBaseStart(numberOfStones),
        paper: createNumberOfBaseStart(numberOfPapers),
        scissor: createNumberOfBaseStart(numberOfScissors),
    });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
