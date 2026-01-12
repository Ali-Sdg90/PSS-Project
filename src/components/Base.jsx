import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { DataContext } from "../store/Data/DataContext";

const Base = () => {
    const { data, setData } = useContext(DataContext);
    const gameType = ["paper", "scissor", "stone"];
    const gameIcon = ["📄", "✂️", "🪨"];

    const [iteration, setIteration] = useState(0);

    const moveItem = (item) => {
        let x = item.x;
        let y = item.y;
        let vx = item.vx;
        let vy = item.vy;

        x += vx;
        y += vy;
        console.log(x);

        if (x <= 0) {
            x = 0;
            vx = -1 * vx;
        }
        if (x >= 100) {
            x = 100;
            vx = -1 * vx;
        }
        if (y <= 0) {
            y = 0;
            vy = -1 * vy;
        }
        if (y >= 100) {
            y = 100;
            vy = -1 * vy;
        }

        return [x, y, vx, vy];
    };

    useEffect(() => {
        const animate = () => {
            console.log("------------------- hi");

            const newData = data;

            gameType.map((gameSingleType) => {
                console.log(gameSingleType);
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
        };

        setInterval(animate, 100);
    }, [data, setData]);

    return (
        <>
            <div className="base-component">
                <div className="base-container">
                    <Item data={data} />
                </div>
            </div>
        </>
    );
};

export default Base;
