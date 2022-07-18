import { LinkedList } from '../linked-list/LinkedList';

export class Queue {
    list = new LinkedList()
    private length = 0

    enqueue(val: any): void {
        this.list.addLast(val)
        this.length++
    }

    dequeue(): any {
        this.length--
        return this.list.remove(0)
    }

    size(): number {
        return this.length
    }
}