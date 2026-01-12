import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { DataContext } from "../store/Data/DataContext";

// const gameSpeed = 30;
const gameSpeed = 100;
const fixItemSize = 1.5;
const minItemSize = 0 + fixItemSize;
const maxItemSize = 100 - fixItemSize;
const detectionRadios = 3;

const Base = () => {
    const { data, setData } = useContext(DataContext);
    const gameType = ["paper", "scissor", "stone"];

    const [_iteration, setIteration] = useState(0);

    const moveItem = (item) => {
        let x = item.x;
        let y = item.y;
        let vx = item.vx;
        let vy = item.vy;

        x += vx;
        y += vy;

        if (x <= minItemSize) {
            x = minItemSize;
            vx = -1 * vx;
        }
        if (x >= maxItemSize) {
            x = maxItemSize;
            vx = -1 * vx;
        }
        if (y <= minItemSize) {
            y = minItemSize;
            vy = -1 * vy;
        }
        if (y >= maxItemSize) {
            y = maxItemSize;
            vy = -1 * vy;
        }

        return [x, y, vx, vy];
    };

    const maxMinChecker = (number) => {
        if (number <= minItemSize) {
            return minItemSize;
        } else if (number >= maxItemSize) {
            return maxItemSize;
        } else {
            return number;
        }
    };

    const gameLogic = (item1, item2) => {
        // "📄📄", "✂️✂️", "🪨🪨"
        if (item1 === item2) {
            return "none";
        }

        // "📄", "🪨"
        if (
            (item1 === "stone" && item2 === "paper") ||
            (item1 === "paper" && item2 === "stone")
        ) {
            return "paper";
        }

        // "✂️", "🪨"
        if (
            (item1 === "stone" && item2 === "scissor") ||
            (item1 === "scissor" && item2 === "stone")
        ) {
            return "stone";
        }

        // "📄", "✂️"
        if (
            (item1 === "scissor" && item2 === "paper") ||
            (item1 === "paper" && item2 === "scissor")
        ) {
            return "scissor";
        }
    };

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

    useEffect(() => {
        const animate = () => {
            console.log("-------------------");

            const newData = data;

            gameType.map((gameSingleType) => {
                for (let i = 0; i < newData[gameSingleType].length; i++) {
                    const newValues = moveItem(newData[gameSingleType][i]);
                    newData[gameSingleType][i].x = newValues[0];
                    newData[gameSingleType][i].y = newValues[1];
                    newData[gameSingleType][i].vx = newValues[2];
                    newData[gameSingleType][i].vy = newValues[3];
                }
            });

            setData(newData);
            setIteration((prevState) => prevState + 1);

            // ---------------------------------------------------------------------

            console.log(newData["stone"][0]["x"]);

            const selectedItemType = "stone";

            const selectedItemID = newData["stone"][0]["id"];
            console.log("selectedItemID >>", selectedItemID);

            const maxXRadios = maxMinChecker(
                newData["stone"][0]["x"] + detectionRadios
            );
            const minXRadios = maxMinChecker(
                newData["stone"][0]["x"] - detectionRadios
            );
            const maxYRadios = maxMinChecker(
                newData["stone"][0]["y"] + detectionRadios
            );
            const minYRadios = maxMinChecker(
                newData["stone"][0]["y"] - detectionRadios
            );

            console.log(maxXRadios);
            console.log(minXRadios);

            gameType.map((gameSingleType) => {
                for (let i = 0; i < newData[gameSingleType].length; i++) {
                    if (
                        newData[gameSingleType][i].id !== selectedItemID &&
                        newData[gameSingleType][i].x > minXRadios &&
                        newData[gameSingleType][i].x < maxXRadios &&
                        newData[gameSingleType][i].y > minYRadios &&
                        newData[gameSingleType][i].y < maxYRadios
                    ) {
                        console.log("YESSSSSSSSSSSSS");
                        console.log(gameSingleType, selectedItemType);

                        const winnerType = gameLogic(
                            gameSingleType,
                            selectedItemType
                        );
                        console.log("Winner >>", winnerType);

                        if (winnerType === "none") {
                            console.log("none");
                            continue;
                        } else if (winnerType === selectedItemType) {
                            killItem(newData, newData[gameSingleType][i].id);
                        } else {
                            killItem(newData, selectedItemID);
                        }

                        debugger;
                    }
                }
            });
        };

        setInterval(animate, gameSpeed);
    }, [data, setData]);

    return (
        <div className="base-component">
            <div className="base-container">
                <Item data={data} />
            </div>
        </div>
    );
};

export default Base;
