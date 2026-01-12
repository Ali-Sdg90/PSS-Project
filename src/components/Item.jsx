import React, { useEffect } from "react";

const Item = ({ data }) => {
    const gameType = ["paper", "scissor", "stone"];
    const gameIcon = ["📄", "✂️", "🪨"];

    return (
        <div>
            {gameType.map((type, type_index) => {
                // console.log(data[type]);

                return data[type].map((item) => {
                    // console.log("ITEM >>", item);

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
    );
};

export default Item;
