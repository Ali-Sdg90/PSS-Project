import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";

const appConfig = {
    numberOfStones: 50,
    numberOfPapers: 50,
    numberOfScissors: 50,
    maxSpeed: 1,
    minSpeed: -1,
    gameSpeed: 30,
    fixItemSize: 1.5,
    minItemSize: 0 + 1.5,
    maxItemSize: 100 - 1.5,
    detectionRadios: 3,
};

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
            vx: getRandomBetween(appConfig.minSpeed, appConfig.maxSpeed, false),
            vy: getRandomBetween(appConfig.minSpeed, appConfig.maxSpeed, false),
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
        stone: createNumberOfBaseStart(appConfig.numberOfStones),
        paper: createNumberOfBaseStart(appConfig.numberOfPapers),
        scissor: createNumberOfBaseStart(appConfig.numberOfScissors),
    });

    return (
        <DataContext.Provider value={{ data, setData, appConfig }}>
            {children}
        </DataContext.Provider>
    );
};
