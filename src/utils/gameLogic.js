export const gameLogic = (item1, item2) => {
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
