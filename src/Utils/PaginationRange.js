import _ from "lodash";

export const getPaginationRange = (totalPage, currentPage, siblings) => {
    const maxPagesInRange = 5 + (2 * siblings); // 5 => First, Last, Current, Left Dots, Right Dots

    if (totalPage <= maxPagesInRange) {
        return _.range(1, totalPage + 1);
    }

    let leftSiblingsIndex = Math.max(currentPage - siblings, 1);
    let rightSiblingsIndex = Math.min(currentPage + siblings, totalPage);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < totalPage - 1;

    if (!showLeftDots && showRightDots) {
        let leftRange = _.range(1, rightSiblingsIndex + 1);
        return [...leftRange, "... ", totalPage];
    } else if (showLeftDots && !showRightDots) {
        let rightRange = _.range(leftSiblingsIndex, totalPage + 1);
        return [1, " ...", ...rightRange];
    } else {
        let midRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, " ...", ...midRange, "... ", totalPage];
    }
}