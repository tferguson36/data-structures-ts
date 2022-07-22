import { LinkedList } from '../linked-list/LinkedList';

export class Queue {
    private list = new LinkedList()
    private length = 0

    peek(): any {
        if (!this.length) throw new Error('Queue is empty')
        return this.list.get(0)
    }

    enqueue(val: any): void {
        this.list.addLast(val)
        this.length++
    }

    dequeue(): any {
        if (!this.length) throw new Error('Queue is empty')

        this.length--
        return this.list.remove(0)
    }

    size(): number {
        return this.length
    }
}