// This is meant to be a 2-pointer example, so I am doing that here,
// but you could also do the normal 2-sum hashmap approach here as well and get the same time complexity (O(n))

function findTargetSumPair(sortedArr: Array<number>, targetSum: number): Array<number> {
    let leftIdx = 0
    let rightIdx = sortedArr.length - 1
    while (leftIdx !== rightIdx) {
        const sum = sortedArr[leftIdx] + sortedArr[rightIdx]
        if (sum === targetSum) {
            return [leftIdx, rightIdx]
        } else if (sum > targetSum) {
            // decrease number by decreasing rightIdx
            rightIdx--
        } else {
            // increase number by increasing leftIdx
            leftIdx++
        }
    }

    return []
}

it('find indices of pair that adds to target sum', () => {
    expect(findTargetSumPair([1, 2, 3, 4, 6], 6)).toStrictEqual([1, 3])
})

it('find indices of pair that adds to target sum', () => {
    expect(findTargetSumPair([2, 5, 9, 11], 11)).toStrictEqual([0, 2])
})
