function findMaxSum(arr: number[], k: number): number {
    let max = 0

    let windowStart = 0
    let windowEnd = 0

    let sum = 0
    while (windowEnd < arr.length) {
        sum += arr[windowEnd++]
        if (windowEnd > k - 1) {
            // check max
            if (sum > max) {
                max = sum
            }
            // adjust window and sum
            sum -= arr[windowStart++]
        }
    }

    return max
}

it('finds the maximum sum of any contiguous subarray of length k (1)', () => {
    const arr = [2, 1, 5, 1, 3, 2]
    const k = 3

    expect(findMaxSum(arr, k)).toBe(9)
})

it('finds the maximum sum of any contiguous subarray of length k (2)', () => {
    const arr = [2, 3, 4, 1, 5]
    const k = 2

    expect(findMaxSum(arr, k)).toBe(7)
})