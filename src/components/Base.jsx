import React, { useContext } from "react";
import Item from "./Item";
import { DataContext } from "../store/Data/DataContext";

const Base = () => {
    const { data, setData } = useContext(DataContext);
    const gameType = ["paper", "scissor", "stone"];
    const gameIcon = ["📄", "✂️", "🪨"];

    const createBase = () => {
        console.log(data);
    };

    return (
        <>
            <div className="base-component">
                <div className="base-container">
                    {gameType.map((type, type_index) => {
                        console.log(data[type]);

                        return data[type].map((item) => {
                            console.log("ITEM >>", item);

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        top: `${item.y}%`,
                                        left: `${item.x}%`,
                                    }}
                                    className="base-item"
                                >
                                    {gameIcon[type_index]}
                                </div>
                            );
                        });
                    })}
                </div>
            </div>
        </>
    );
};

export default Base;
