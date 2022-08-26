export class Trie {
    root = new Node(false)
    
    addWord(word: string): void {
        const characters = word.split('')

        let currNode = this.root
        for(let i=0; i < word.length; i++) {
            const char = characters[i]

            let nextNode = currNode.getChild(char)
            if (!nextNode) {
                nextNode = currNode.addChild(char, i === word.length - 1)
            }
            
            currNode = nextNode
        }
    }

    startsWith(prefix: string): boolean {
        const characters = prefix.split('')

        let lastNode = this.root
        for(let i=0; i < prefix.length; i++) {
            const char = characters[i]

            let nextNode = lastNode.getChild(char)
            if (!nextNode) {
                return false
            }
            
            lastNode = nextNode
        }

        return true
    }

    isWord(word: string): boolean {
        const characters = word.split('')

        let lastNode = this.root
        for(let i=0; i < word.length; i++) {
            const char = characters[i]

            let nextNode = lastNode.getChild(char)
            if (!nextNode) {
                return false
            }
            
            lastNode = nextNode
        }

        return lastNode.isWord
    }

    deleteWord(word: string): boolean {
        const characters = word.split('')

        let lastNode = this.root
        for(let i=0; i < word.length; i++) {
            const char = characters[i]

            let nextNode = lastNode.getChild(char)
            if (!nextNode) {
                return false
            }
            
            lastNode = nextNode
        }

        if (lastNode.hasChildren()) {
            // just unmark as word so not to disturb other words
            lastNode.isWord = false
        } else if (lastNode.parent) {
            this.safeDeleteWord(characters, lastNode)
        }

        return true
    }


    private safeDeleteWord(characters: string[], finalWordNode: Node): void {
        let childPos = characters.length - 1
        let lastNode = finalWordNode.parent || new Node(false)

        while (lastNode.childSize() === 1) {
            lastNode.deleteChildren()
            if (lastNode.parent) {
                childPos--
                lastNode = lastNode.parent
            }
        }

        if (lastNode.childSize() > 1) {
            lastNode.deleteChild(characters[childPos])
            // leave other children/words
        }
    }
}

class Node {
    private children: Map<string, Node> | null
    parent: Node | null
    isWord = false

    constructor(isWord: boolean, parent?: Node) {
        this.parent = parent || null
        this.isWord = isWord
    }

    addChild(char: string, isWord = false): Node {
        if (!this.children) {
            this.children = new Map<string, Node>()
        }
        const node = new Node(isWord, this)
        this.children.set(char, node)
        return node
    }

    getChild(char: string): Node | null {
        return this.children?.get(char) || null;
    }

    hasChildren(): boolean {
        return !!this.children && this.children.size > 0
    }

    childSize(): number {
        return (!!this.children && this.children.size) || 0
    }

    deleteChildren(): void {
        this.children = null
    }

    deleteChild(char: string): void {
        this.children && this.children.delete(char)
    }
}