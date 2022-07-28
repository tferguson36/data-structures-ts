import { bubbleSort } from "./bubble-sort"
import { insertSort } from "./insert-sort"
import { selectionSort } from "./selection-sort"
import { shellSort } from "./shell-sort"

function sortUsing(sort: Function, arr: number[], expected: string): void {
    // Given arr
    // When
    sort(arr)

    // Then
    expect(arr.join(', ')).toBe(expected)
}

it('bubble sorts [1, 3, 5, 2, 8, 99]', () => {
    sortUsing(bubbleSort, [1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('bubble sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortUsing(bubbleSort, [383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('bubble sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortUsing(bubbleSort, [100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})

it('selection sorts [1, 3, 5, 2, 8, 99]', () => {
    sortUsing(selectionSort, [1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('selection sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortUsing(selectionSort, [383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('selection sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortUsing(selectionSort, [100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})

it('insertion sorts [1, 3, 5, 2, 8, 99]', () => {
    sortUsing(insertSort, [1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('insertion sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortUsing(insertSort, [383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('insertion sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortUsing(insertSort, [100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})

it('shell sorts [1, 3, 5, 2, 8, 99]', () => {
    sortUsing(shellSort, [1, 3, 5, 2, 8, 99], '1, 2, 3, 5, 8, 99')
})

it('shell sorts [383, 33, 2, 3, 99, 209, 34]', () => {
    sortUsing(shellSort, [383, 33, 2, 3, 99, 209, 34], '2, 3, 33, 34, 99, 209, 383')
})

it('shell sorts [100, 88, 72, 71, 55, 32, 11, 2, 1]', () => {
    sortUsing(shellSort, [100, 88, 72, 71, 55, 32, 11, 2, 1], '1, 2, 11, 32, 55, 71, 72, 88, 100')
})