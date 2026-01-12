import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";

import { DataContext } from "../store/Data/DataContext";
import { maxMinChecker } from "../utils/maxMinChecker";
import { gameType } from "../constants/gameItemTypes";
import { gameLogic } from "../utils/gameLogic";
import { moveItem } from "../utils/moveItem";

const Base = () => {
    const { data, setData, appConfig } = useContext(DataContext);
    const [_iteration, setIteration] = useState(0);

    const killItem = (newData, killItemID) => {
        gameType.map((gameSingleType) => {
            for (let i = 0; i < newData[gameSingleType].length; i++) {
                if (newData[gameSingleType][i].id === killItemID) {
                    console.log("KILLING", gameSingleType);

                    newData[gameSingleType].splice(i, 1);

                    setData(newData);
                    setIteration((prevState) => prevState + 1);
                }
            }
        });
    };

    const checkForKillings = (newData, selectedItemType, index) => {
        const selectedItemID = newData[selectedItemType][index]["id"];

        const maxXRadios = maxMinChecker(
            appConfig,
            newData[selectedItemType][index]["x"] + appConfig.detectionRadios
        );
        const minXRadios = maxMinChecker(
            appConfig,
            newData[selectedItemType][index]["x"] - appConfig.detectionRadios
        );
        const maxYRadios = maxMinChecker(
            appConfig,
            newData[selectedItemType][index]["y"] + appConfig.detectionRadios
        );
        const minYRadios = maxMinChecker(
            appConfig,
            newData[selectedItemType][index]["y"] - appConfig.detectionRadios
        );

        gameType.map((gameSingleType) => {
            for (let i = 0; i < newData[gameSingleType].length; i++) {
                if (
                    newData[gameSingleType][i].id !== selectedItemID &&
                    newData[gameSingleType][i].x > minXRadios &&
                    newData[gameSingleType][i].x < maxXRadios &&
                    newData[gameSingleType][i].y > minYRadios &&
                    newData[gameSingleType][i].y < maxYRadios
                ) {
                    const winnerType = gameLogic(
                        gameSingleType,
                        selectedItemType
                    );
                    console.log("Winner >>", winnerType);

                    if (winnerType === "none") {
                        continue;
                    } else if (winnerType === selectedItemType) {
                        killItem(newData, newData[gameSingleType][i].id);
                    } else {
                        killItem(newData, selectedItemID);
                    }
                }
            }
        });
    };

    useEffect(() => {
        const animate = () => {
            console.log("-------------------");

            const newData = data;

            gameType.map((gameSingleType) => {
                for (let i = 0; i < newData[gameSingleType].length; i++) {
                    const newValues = moveItem(
                        appConfig,
                        newData[gameSingleType][i]
                    );
                    newData[gameSingleType][i].x = newValues[0];
                    newData[gameSingleType][i].y = newValues[1];
                    newData[gameSingleType][i].vx = newValues[2];
                    newData[gameSingleType][i].vy = newValues[3];
                }
            });

            setData(newData);
            setIteration((prevState) => prevState + 1);

            gameType.map((gameSingleType) => {
                for (let i = 0; i < newData[gameSingleType].length; i++) {
                    checkForKillings(newData, gameSingleType, i);
                }
            });
        };

        setInterval(animate, appConfig.gameSpeed);
    }, [data, setData]);

    return (
        <>
            <div className="score-section">
                <h2>Paper: {data.paper.length}</h2>
                <h2>Scissor: {data.scissor.length}</h2>
                <h2>Stone: {data.stone.length}</h2>
            </div>
            <div className="base-section">
                <div className="base-container">
                    <Item data={data} />
                </div>
            </div>
        </>
    );
};

export default Base;
