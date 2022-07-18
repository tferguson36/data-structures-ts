export class LinkedList {
    private head?: ListNode
    private tail?: ListNode

    constructor(headValue?: any) {
        if (headValue) {
            const node = new ListNode(headValue)
            this.initList(node)
        }
    }

    getHead(): any {
        return this.head?.value
    }

    getTail(): any {
        return this.tail?.value
    }

    addFirst(value: any): void {
        const node = new ListNode(value)
        if (!this.head) {
            this.initList(node)
        } else {
            const oldHead = this.head
            node.next = oldHead
            oldHead.prev = node

            this.head = node
        }
    }

    addLast(value: any): void {
        const node = new ListNode(value)
        if (!this.tail) {
            this.initList(node)
        } else {
            const oldTail = this.tail
            oldTail.next = node
            node.prev = oldTail

            this.tail = node
        }
    }

    remove(index: number): any {
        const node = this.getNode(index)

        // fill gap
        const prev = node.prev
        const next = node.next

        if (!prev) {
            this.head = next
        }
        if (!next) {
            this.tail = prev
        }

        if (prev) {
            prev.next = next
            if (next) {
                next.prev = prev
            }
        }

        if (next && !prev) {
            next.prev = undefined
        }

        // clean up for garbage collection
        node.next = undefined
        node.prev = undefined

        return node.value
    }

    insert(val: any, index: number): void {
        const nodeAtIndex = this.getNode(index)
        const prev = nodeAtIndex.prev

        const newNode = new ListNode(val)
        newNode.next = nodeAtIndex
        nodeAtIndex.prev = newNode
        if (prev) {
            newNode.prev = prev
            prev.next = newNode
        } else {
            this.head = newNode
        }

    }

    get(index: number): any {
        return this.getNode(index)?.value
    }

    private getNode(index: number): ListNode {
        if (!this.head) throw new Error('Initialize LinkedList first!')

        let node = this.head
        for (let i = 0; i < index; i++) {
            if (node.next === undefined) {
                throw new Error('Index out of bounds')
            }
            node = node.next
        }

        return node
    }

    private initList(node: ListNode): void {
        this.head = node
        this.tail = node
    }
}

class ListNode {
    value: any;
    prev?: ListNode;
    next?: ListNode;

    constructor(value: any) {
        if (!value) throw Error('Must pass a value for node creation')

        this.value = value
    }

}
