function findParentIdx(idx: number): number {
    return Math.floor((idx - 1)/2)
}

function findLeftChildIdx(idx: number): number {
    return 2 * idx + 1
}

function findRightChildIdx(idx: number): number {
    return 2 * idx + 2
}

export class MinPriorityQueue<T> {
    private heap: T[]
    private heapPositions: Map<T, number[]>

    constructor(list?: T[]) {
        this.heap = []
        this.heapPositions = new Map<T, number[]>()
        
        if (list) {
            list.forEach(val => this.add(val))
        }
    }

    add(val: T): void {
        this.heap.push(val)
        const idx = this.heap.length - 1

        this.updateHeapPositions(val, idx)

        this.swim(idx)
    }

    poll(): T {
        if (!this.heap.length) throw new Error('Priority Queue is empty')

        const val = this.replaceFirstWithLast()

        this.sink(0)

        return val
    }

    peek(): T {
        if (!this.heap.length) throw new Error('Priority Queue is empty')

        return this.heap[0]
    }

    remove(idx: number): T {
        // TODO - change signature
        const lastIdx = this.heap.length - 1
        if (idx > lastIdx) throw new Error('Index out of bounds')

        // swap target with last value
        const targetVal = this.heap[idx]
        const lastVal = this.heap[lastIdx]
        this.heap.pop()

        this.updateHeapPositions(targetVal, idx, false)
        this.updateHeapPositions(lastVal, lastIdx, false)
        this.updateHeapPositions(lastVal, idx)

        // correct heap
        if (idx !== 0) {
            const parentVal = this.heap[findParentIdx(idx)]
            
            if (parentVal > targetVal) {
                this.swim(idx)
                return targetVal
            }
        }

        this.sink(idx)
        return targetVal
    }

    size(): number {
        return this.heap.length
    }

    private updateHeapPositions(val: T, idx: number, isAdd = true) {
        const positions = this.heapPositions.get(val)
        if (positions) {
            if (isAdd) {
                positions.push(idx)
            } else if (positions.length > 1) {
                const posOfIdx = positions.findIndex(i => i === idx)
                positions.splice(posOfIdx, 1)
            } else {
                this.heapPositions.delete(val)
            }
        } else if (isAdd) {
            this.heapPositions.set(val, [idx])
        }
    }

    private swim(idx: number): void {
        let i = idx
        while (true) {
            if (i === 0) {
                break
            }

            let parentIdx = findParentIdx(i)
            const parentVal = this.heap[parentIdx]
            const targetVal = this.heap[i]

            if (targetVal >= parentVal) {
                // in correct position
                break
            }

            this.swapIdx(parentIdx, i)
            i = parentIdx
        }
    }

    private sink(idx: number): void {
        // prefer smallest, left to right

        const maxIdx = this.heap.length - 1
        let i = idx

        while (true) {
            let leftIdx = findLeftChildIdx(i)
            let rightIdx = findRightChildIdx(i)

            const left = leftIdx <= maxIdx ? this.heap[leftIdx] : null
            const right = rightIdx <= maxIdx ? this.heap[rightIdx] : null

            if (left === null) {
                // reached bottom of heap
                break;
            }

            let sinkNode: Node<T>
            if (right === null) {
                sinkNode = new Node(left, leftIdx)
            } else {
                const compareLeftRight = left > right ? 1 : (right > left ? -1 : 0)
                sinkNode = compareLeftRight <= 0 ? new Node(left, leftIdx) : new Node(right, rightIdx)
            }

            const targetVal = this.heap[i]
            if (targetVal <= sinkNode.value) {
                // node properly sunk
                break;
            }

            this.swapIdx(i, sinkNode.idx)
            i = sinkNode.idx
        }
    }

    private replaceFirstWithLast(): T {
        if (this.heap.length === 1) {
            return this.heap.splice(0, 1)[0]
        }

        const pollVal = this.heap[0]
        const lastIdx = this.heap.length - 1
        const lastVal = this.heap[lastIdx]

        this.heap[0] = lastVal
        this.heap.pop()

        // remove poll val, remove last val, set last val at poll position
        this.updateHeapPositions(pollVal, 0, false)
        this.updateHeapPositions(lastVal, lastIdx, false)
        this.updateHeapPositions(lastVal, 0)

        return pollVal
    }

    private swapIdx(idx1: number, idx2: number): void {
        const val1 = this.heap[idx1]
        const val2 = this.heap[idx2]

        // swap
        this.heap[idx1] = val2
        this.heap[idx2] = val1

        // remove prev positions and add new positions
        this.updateHeapPositions(val1, idx1, false)
        this.updateHeapPositions(val2, idx2, false)
        this.updateHeapPositions(val1, idx2)
        this.updateHeapPositions(val2, idx1)
    }
}

class Node<T> {
    value: T
    idx: number

    constructor(value: T, idx: number) {
        this.value = value
        this.idx = idx
    }
}