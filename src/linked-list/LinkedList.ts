export class LinkedList {
    head?: ListNode

    constructor(headValue: any) {
        if (headValue) {
            this.head = new ListNode(headValue)
        }
    }

    add(value: any): void {
        const node = new ListNode(value)
        const tail = this.getTail()
        if (tail) {
            tail.next = node
        } else {
            this.head = node
        }
    }

    remove(index: number): any {
        if (!this.head) throw new Error('Initialize LinkedList first!')

        let prev
        let node = this.head
        for(let i=0; i <= index; i++) {
            if (i === index) {
                break
            }
            if (node.next === undefined) {
                throw new Error('Index out of bounds')
            }
            prev = node
            node = node.next
        }

        // fill gap
        if (prev) {
            prev.next = node.next
        } else {
            this.head = node.next
        }

        // clean up for garbage collection
        node.next = undefined

        return node.value
    }

    get(index: number): any {
        return this.getNode(index)?.value
    }

    private getNode(index: number): ListNode {
        if (!this.head) throw new Error('Initialize LinkedList first!')

        let node = this.head
        for(let i=0; i <= index; i++) {
            if (i === index) {
                break
            }
            if (node.next === undefined) {
                throw new Error('Index out of bounds')
            }
            node = node.next
        }

        return node
    }

    private getTail(): ListNode | null {
        if (!this.head) return null
        
        let tail = this.head
        let nextNode
        while (nextNode = tail.next) {
            tail = nextNode
        }

        return tail
    }
}

class ListNode {
    value: any;
    next?: ListNode;

    constructor(value: any) {
        if (!value) throw Error('Must pass a value for node creation')

        this.value = value
    }

}
