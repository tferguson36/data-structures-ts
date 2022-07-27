export function bubbleSort(arr: number[]): void {
    for (let i=0; i<arr.length - 1; i++) {
        for (let j=0; j<arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j) 
            }
        }
    }
}

function swap(arr: number[], pos: number) {
    const val1 = arr[pos]
    const val2 = arr[pos + 1]

    arr[pos] = val2
    arr[pos + 1] = val1
}
