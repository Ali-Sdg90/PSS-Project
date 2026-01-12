export const moveItem = (appConfig, item) => {
    let x = item.x;
    let y = item.y;
    let vx = item.vx;
    let vy = item.vy;

    x += vx;
    y += vy;

    if (x <= appConfig.minItemSize) {
        x = appConfig.minItemSize;
        vx = -1 * vx;
    }
    if (x >= appConfig.maxItemSize) {
        x = appConfig.maxItemSize;
        vx = -1 * vx;
    }
    if (y <= appConfig.minItemSize) {
        y = appConfig.minItemSize;
        vy = -1 * vy;
    }
    if (y >= appConfig.maxItemSize) {
        y = appConfig.maxItemSize;
        vy = -1 * vy;
    }

    return [x, y, vx, vy];
};
