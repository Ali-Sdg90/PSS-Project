import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { DataContext } from "../store/Data/DataContext";

// const gameSpeed = 30;
const gameSpeed = 1000;
const fixItemSize = 1.5;
const detectionRadios = 5;

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

        if (x <= 0 + fixItemSize) {
            x = 0 + fixItemSize;
            vx = -1 * vx;
        }
        if (x >= 100 - fixItemSize) {
            x = 100 - fixItemSize;
            vx = -1 * vx;
        }
        if (y <= 0 + fixItemSize) {
            y = 0 + fixItemSize;
            vy = -1 * vy;
        }
        if (y >= 100 - fixItemSize) {
            y = 100 - fixItemSize;
            vy = -1 * vy;
        }

        return [x, y, vx, vy];
    };

    useEffect(() => {
        const animate = () => {
            console.log("------------------- hi");

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

            console.log(newData["stone"][0]["x"]);
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
