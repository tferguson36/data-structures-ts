import { partition, quickSort } from "./quicksort"

function sortAndExpect(arr: number[], expected: string): void {
    // Given arr
    // When
    quickSort(arr)

    // Then
    expect(arr.join(', ')).toBe(expected)
}


it('has a functioning "partition" function', () => {
    // Given
    const arr = [12, 38, 899, 33, 22, 1, 209]
    
    // When
    const pivot = partition(arr, 0, arr.length - 1)
    
    // Then
    for (let i=0; i<pivot; i++) {
        expect(arr[i]).toBeLessThan(arr[pivot])
    }
    for (let j= pivot + 1; j < arr.length; j++) {
        expect(arr[j]).toBeGreaterThanOrEqual(arr[pivot])
    }
})

it('quicksorts [1, 3, 5, 2, 8, 99]', () => {
    sortAndExpect([1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('quicksorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortAndExpect([383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('quicksorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortAndExpect([100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})