import { Queue } from "../queue/Queue"

export enum BstTraversalStrat {
    PRE_ORDER,
    IN_ORDER,
    POST_ORDER,
    LEVEL_ORDER
}

export class BinarySearchTree<T> {
    root?: Node<T>

    constructor() {}

    add(val: T): void {
        const node = new Node(val)
        this.traverseAndInsert(node)
    }

    find(val: T): T | null {
        return this.traverseAndFind(val)
    }

    remove(val: T): boolean {
        if (!this.find(val)) return false

        this.traverseAndRemove(val)
        return true
    }

    print(traversalStrat: BstTraversalStrat): T[] {
        const arr: T[] = []

        switch (traversalStrat) {
            case BstTraversalStrat.IN_ORDER: this.order(this.root, arr, traversalStrat); break;
            case BstTraversalStrat.PRE_ORDER: this.order(this.root, arr, traversalStrat); break;
            case BstTraversalStrat.POST_ORDER: this.order(this.root, arr, traversalStrat); break;
            case BstTraversalStrat.LEVEL_ORDER: this.printLevelOrder(arr); break;
            default: throw new Error('Undefined order: ' + traversalStrat)
        }

        return arr
    }

    private printLevelOrder(arr: T[]): void {
        const queue = new Queue()
        
        let node = this.root
        while (node) {
            arr.push(node.value)
            node.leftChild && queue.enqueue(node.leftChild)
            node.rightChild && queue.enqueue(node.rightChild)
            node = queue.size() && queue.dequeue() || null
        }
    }
    
    private order(node: Node<T> | undefined, arr: T[], strat: BstTraversalStrat): void {
        if (!node) return

        strat === BstTraversalStrat.PRE_ORDER && arr.push(node.value)
        this.order(node.leftChild, arr, strat)
        strat === BstTraversalStrat.IN_ORDER && arr.push(node.value)
        this.order(node.rightChild, arr, strat)
        strat === BstTraversalStrat.POST_ORDER && arr.push(node.value)
    }

    private traverseAndRemove(val: T): void {
        if (!this.root) {
            return
        }

        let prevNode = null
        let foundNode = this.root
        while (foundNode.value !== val) {
            const isValLessThanCurrent = val < foundNode.value
            const nextNode =  isValLessThanCurrent ? foundNode.leftChild : foundNode.rightChild
            if (!nextNode) throw new Error('Expected node does not exist')
            prevNode = foundNode
            foundNode = nextNode
        }

        this.replaceRemovedNode(prevNode, foundNode)
    }
    
    private replaceRemovedNode(prevNode: Node<T> | null, foundNode: Node<T>): void {
        let replaceNode = null
        // only has left subtree - take root
        if (foundNode.leftChild && !foundNode.rightChild) {
            replaceNode = foundNode.leftChild
            replaceNode.leftChild = foundNode.leftChild
            replaceNode.rightChild = foundNode.rightChild
        } else if (foundNode.rightChild && !foundNode.leftChild) {
            // only has right subtree - take root
            replaceNode = foundNode.rightChild
            replaceNode.leftChild = foundNode.leftChild
            replaceNode.rightChild = foundNode.rightChild
        } else if (foundNode.leftChild && foundNode.rightChild) {
            // has both subtrees - can take largest of left or smallest of right
            replaceNode = this.findLargestNode(foundNode.leftChild)
            replaceNode.leftChild = foundNode.leftChild
            replaceNode.rightChild = foundNode.rightChild
        } else {
            // no children - do nothing
            return
        }

        if (prevNode?.leftChild == foundNode) {
            prevNode.leftChild = replaceNode
        } else if (prevNode?.rightChild == foundNode) {
            prevNode.rightChild = replaceNode
        } else if (!prevNode) {
            this.root = replaceNode
        }

        this.deleteNodeRefs(foundNode)
    }

    private findLargestNode(root: Node<T>): Node<T> {
        let node = root
        while (node.rightChild) {
            node = node.rightChild
        } 
        return node
    }

    private deleteNodeRefs(node: Node<T>): void {
        node.leftChild = undefined
        node.rightChild = undefined
    }

    private traverseAndFind(val: T): T | null {
        if (!this.root) {
            return null
        }

        let currentNode = this.root
        
        while (currentNode.value !== val) {
            const isValLessThanCurrent = val < currentNode.value
            const nextNode =  isValLessThanCurrent ? currentNode.leftChild : currentNode.rightChild
            if (nextNode) {
                currentNode = nextNode
            } else {
                return null
            }
        }

        return currentNode.value
    }

    private traverseAndInsert(insert: Node<T>): void {
        if (!this.root) {
            this.root = insert
            return
        }

        let currentNode = this.root
        
        while (currentNode.value !== insert.value) {
            const isValLessThanCurrent = insert.value < currentNode.value
            const nextNode =  isValLessThanCurrent ? currentNode.leftChild : currentNode.rightChild

            if (!nextNode) {
                if (isValLessThanCurrent) {
                    currentNode.leftChild = insert
                } else {
                    currentNode.rightChild = insert
                }
                break
            }

            currentNode = nextNode
        }

        // ignore duplicate values
    }

}

class Node<T> {
    value: T
    leftChild?: Node<T>
    rightChild?: Node<T>

    constructor(value: T) {
        this.value = value
    }
}