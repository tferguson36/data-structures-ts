export function insertSort(arr: number[]): void {

    for (let i=1; i<arr.length; i++) {
        let j = i
        while (j > 0 && arr[j] < arr[j - 1]) {
            swap(arr, j)
            j--
        }
    }
}

function swap(arr: number[], pos: number) {
    const val1 = arr[pos]
    const val2 = arr[pos - 1]

    arr[pos] = val2
    arr[pos - 1] = val1
}
