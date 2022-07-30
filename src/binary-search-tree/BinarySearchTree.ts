import { isNotEmittedStatement } from "typescript"
import { Queue } from "../queue/Queue"
import { Stack } from "../stack/Stack"


export enum BstTraversalStrat {
    PRE_ORDER,
    IN_ORDER,
    POST_ORDER,
    LEVEL_ORDER,
    DFS_STACK
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
            case BstTraversalStrat.DFS_STACK: this.printDfsStack(arr); break;
            default: throw new Error('Undefined order: ' + traversalStrat)
        }

        return arr
    }
    
    isBalanced(): boolean {
        const stack = new Stack()

        let node = this.root
        while (node) {
            if (!this.nodeIsBalanced(node)) {
                return false
            }

            node.leftChild && stack.push(node.leftChild)
            node.rightChild && stack.push(node.rightChild)

            node = stack.size() && stack.pop() || null
        }
        return true
    }

    private nodeIsBalanced(root: Node<T>): boolean {
        if (!root.leftChild && !root.rightChild) return true

        let leftCount = this.getHeight(root.leftChild)
        let rightCount = this.getHeight(root.rightChild)

        return Math.abs(rightCount - leftCount) <= 1
    }

    height(): number {
        return this.getHeight(this.root)
    }

    private getHeight(root?: Node<T>): number {
        let counter = 0

        // enqueue marker at the end of each level
        const marker = 'END_LEVEL'
        const queue = new Queue()
        queue.enqueue(marker)
        
        let node = root
        while (node) {
            node.leftChild && queue.enqueue(node.leftChild)
            node.rightChild && queue.enqueue(node.rightChild)
            
            const queuedItem = queue.size() && queue.dequeue() || null
            if (queuedItem === marker) {
                // increase counter and replace marker at end of queue to demarcate new level
                counter++
                node = queue.size() && queue.dequeue() || null
                queue.enqueue(marker)
            } else {
                node = queuedItem
            }
        }

        return counter
    }
    
    private printDfsStack(arr: T[]): void {
        const stack = new Stack()
        stack.push(this.root)

        let node
        do {
            node = stack.pop()
            arr.push(node.value)

            node.rightChild && stack.push(node.rightChild)
            node.leftChild && stack.push(node.leftChild)
        } while (stack.size())
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