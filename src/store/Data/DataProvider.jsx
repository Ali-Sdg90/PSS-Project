import { useRef, useState } from "react";
import { DataContext } from "./DataContext";
import { appConfig } from "../../constants/appConfig";

export const DataProvider = ({ children }) => {
    const nextIdRef = useRef(1);
    const usedIdsRef = useRef(new Set());

    const getNextId = () => {
        let candidateId = nextIdRef.current;

        while (usedIdsRef.current.has(candidateId)) {
            candidateId += 1;
        }

        usedIdsRef.current.add(candidateId);
        nextIdRef.current = candidateId + 1;

        return candidateId;
    };

    const getRandomBetween = (min, max, isRound = true) => {
        if (isRound) {
            return Math.round(Math.random() * (max - min) + min);
        } else {
            return Math.random() * (max - min) + min;
        }
    };

    const createBaseStart = () => {
        return {
            id: getNextId(),
            x: getRandomBetween(appConfig.minItemSize, appConfig.maxItemSize),
            y: getRandomBetween(appConfig.minItemSize, appConfig.maxItemSize),
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
