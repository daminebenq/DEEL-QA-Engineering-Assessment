function getPreviousDate() {
    const previousDay = new Date().getDate() - 1;
    return previousDay;
}

exports.getPreviousDate = getPreviousDate;