// shell sort is really just an improvement over insertion sort
export function shellSort(arr: number[]): void {

    for (let gap = Math.floor(arr.length/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i=gap; i < arr.length; i++) {
            let j = i
            while (j >= gap && arr[j] < arr[j - gap]) {
                swap(arr, j, gap)
                j -= gap
            }
        }
    }
}

function swap(arr: number[], pos: number, gap: number) {
    const val1 = arr[pos]
    const val2 = arr[pos - gap]

    arr[pos] = val2
    arr[pos - gap] = val1
}
