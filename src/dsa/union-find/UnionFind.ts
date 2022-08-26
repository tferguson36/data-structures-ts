export class UnionFind {
    private parents: number[]
    private sizes: number[]

    constructor(size: number) {
        this.parents = []
        this.sizes = []

        for(let i=0; i<size; i++) {
            this.parents[i] = i
            this.sizes[i] = 1
        }
    }

    union(a: number, b: number): void {

        if (this.isConnected(a, b)) return

        const rootA = this.find(a)
        const rootB = this.find(b)

        // merge smaller into larger
        if (this.sizes[rootA] > this.sizes[rootB]) {
            this.parents[rootB] = rootA
            this.sizes[rootA] += this.sizes[rootB]
            this.sizes[rootB] = 0
        } else {
            this.parents[rootA] = rootB
            this.sizes[rootB] += this.sizes[rootA]
            this.sizes[rootA] = 0
        }
        
    }

    private isConnected(a: number, b: number) {
        return this.find(a) === this.find(b)
    }

    find(a: number): number {

        const intermediatePaths = []

        let root = a
        while (this.parents[root] !== root) {
            intermediatePaths.push(root)
            root = this.parents[root]
        }

        if (intermediatePaths.length) {
            // path compression
            intermediatePaths.forEach(p => this.parents[p] = root)
        }

        return root
    }

    print(): number[] {
        return this.parents
    }
}