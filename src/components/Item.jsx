import React from "react";
import { gameType } from "../constants/gameItemTypes";

const Item = ({ data }) => {
    const gameIcon = ["📄", "✂️", "🪨"];

    return (
        <div>
            {gameType.map((type, type_index) =>
                data[type].map((item) => (
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
                ))
            )}
        </div>
    );
};

export default Item;
