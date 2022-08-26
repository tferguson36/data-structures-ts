function findMinLength(arr: number[], targetSum: number): number {

    let start = 0
    let end = 0

    let minLength = Infinity
    let sum = 0
    while (end < arr.length && start <= end) {
        sum += arr[end]
        while (sum >= targetSum) {
            // decrease window from left until you go under target sum
            minLength = Math.min(minLength, end - start + 1)
            sum -= arr[start++]
            if (minLength === 1) return 1
        }
        end++
    }

    return minLength;
}


it('finds the minimum length of any contiguous subarray with a sum of k (1)', () => {
    const arr = [2, 1, 5, 2, 3, 2]
    const sum = 7

    expect(findMinLength(arr, sum)).toBe(2)
})

it('finds the minimum length of any contiguous subarray with a sum of k (2)', () => {
    const arr = [2, 1, 5, 2, 8]
    const sum = 7

    expect(findMinLength(arr, sum)).toBe(1)
})

it('finds the minimum length of any contiguous subarray with a sum of k (3)', () => {
    const arr = [3, 4, 1, 1, 6]
    const sum = 8

    expect(findMinLength(arr, sum)).toBe(3)
})