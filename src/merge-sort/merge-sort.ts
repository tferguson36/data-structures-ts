export function mergeSort(arr: number[]): void {
    const sorted = doMergeSort(arr)
    arr.splice(0, arr.length)
    arr.push(...sorted)
}

function doMergeSort(arr: number[]): number[] {
    if (arr.length === 1) return arr
    
    const middle = Math.floor(arr.length / 2)
    
    // split in half, then merge
    const left = doMergeSort(arr.slice(0, middle))
    const right = doMergeSort(arr.slice(middle))
    return merge(left, right)
}

export function merge(left: number[], right: number[]) {
    const merged = []
    
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            merged.push(left.shift() as number)
        } else {
            merged.push(right.shift() as number)
        }
    }
    
    // add the remaining values of the other array
    // note: the array is already sorted
    if (left.length) {
        merged.push(...left)
    } else {
        merged.push(...right)
    }
    
    return merged
}

function doMergeSortInPlace(arr: number[], left: number, right: number): void {
    
    if (left >= right) return

    console.log(left, right, Math.floor((right - left) / 2))

    const middleAdd = Math.floor((right - left) / 2)
    const middle = left + middleAdd
    
    // split in half, then merge
    doMergeSortInPlace(arr, left, middle)
    doMergeSortInPlace(arr, middle + 1, right)
    mergeInPlace(arr, left, middle, right)
}

function mergeInPlace(arr: number[], left: number, middle: number, right: number): void {
    let i = left
    let j = middle + 1
    let k = left

    while (i <= middle && j <= right) {
        if (arr[i] <= arr[j]) {
            arr[k] = arr[i]
            i++
        } else {
            arr[k] = arr[j]
            j++
        }
        k++
    }

    while (i <= middle) {
        arr[k] = arr[i]
        i++
        k++
    }

    while (j <= right) {
        arr[k] = arr[j]
        j++
        k++
    }

}