export function quickSort(arr: number[]): void {
    doQuickSort(arr, 0, arr.length - 1)
}

function doQuickSort(arr: number[], left: number, right: number): void {
    if (left >= right) return

    const pivot = partition(arr, left, right)
    doQuickSort(arr, left, pivot - 1)
    doQuickSort(arr, pivot + 1, right)
}

export function partition(arr: number[], left: number, right: number): number {
    let i = left - 1
    let j = left
    let pivot = arr[right]

    while (j < right) {
        if (arr[j] < pivot) {
            swap(arr, ++i, j)
        }
        j++
    }

    swap(arr, i + 1, right)

    // pivot position
    return i + 1
}

function swap(arr: number[], i: number, j: number): void {
    const oldValOfI = arr[i]
    arr[i] = arr[j]
    arr[j] = oldValOfI
}