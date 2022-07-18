import { LinkedList } from '../linked-list/LinkedList'

export class Stack {
    private list = new LinkedList()
    private length = 0

    push(value: any): void {
        this.list.addFirst(value)
        this.length++
    }

    pop(): any {
        if (!this.length) throw new Error('Stack is empty')
        
        this.length--
        
        return this.list.remove(0)
    }

    size(): number {
        return this.length
    }
}