export const maxMinChecker = (appConfig, number) => {
    if (number <= appConfig.minItemSize) {
        return appConfig.minItemSize;
    } else if (number >= appConfig.maxItemSize) {
        return appConfig.maxItemSize;
    } else {
        return number;
    }
};
