import { selectionSort } from "./selection-sort"

it('sorts [1, 3, 5, 2, 8, 99]', () => {
    // Given
    const arr = [1, 3, 5, 2, 8, 99]

    // When
    selectionSort(arr)

    // Then
    expect(arr.join(', ')).toBe('1, 2, 3, 5, 8, 99')
})

it('sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    // Given
    const arr = [383, 33, 2, 3, 99, 209, 34]

    // When
    selectionSort(arr)

    // Then
    expect(arr.join(', ')).toBe('2, 3, 33, 34, 99, 209, 383')
})

it('sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    // Given
    const arr = [100, 88, 72, 71, 55, 32, 11, 2, 1]

    // When
    selectionSort(arr)

    // Then
    expect(arr.join(', ')).toBe('1, 2, 11, 32, 55, 71, 72, 88, 100')
})