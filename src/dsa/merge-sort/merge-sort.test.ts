import { merge, mergeSort } from "./merge-sort"

function sortAndExpect(arr: number[], expected: string): void {
    // Given arr
    // When
    mergeSort(arr)

    // Then
    expect(arr.join(', ')).toBe(expected)
}


it('has a functioning merge function', () => {
    // Given
    const left = [12, 38, 899]
    const right = [23, 34, 356]
    
    // When
    const result = merge(left, right)
    
    // Then
    expect(result.join(', ')).toBe('12, 23, 34, 38, 356, 899')
})

it('merge sorts [1, 3, 5, 2, 8, 99]', () => {
    sortAndExpect([1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('merge sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortAndExpect([383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('merge sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortAndExpect([100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})