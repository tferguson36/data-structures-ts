export function selectionSort(arr: number[]): void {

    for (let i=0; i<arr.length; i++) {
        let minVal = arr[i]
        let swapPos = i

        for (let j=i; j<arr.length; j++) {
            if (arr[j] < minVal) {
                minVal = arr[j]
                swapPos = j
            }
        }

        swap(arr, i, swapPos)
    }
}

function swap(arr: number[], pos1: number, pos2: number) {
    const val1 = arr[pos1]
    const val2 = arr[pos2]

    arr[pos1] = val2
    arr[pos2] = val1
}