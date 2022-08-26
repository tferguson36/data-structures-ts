import { UnionFind } from './UnionFind'

it('unions and finds the root', () => {
    // Given
    const unionFind = new UnionFind(5)
    unionFind.union(3, 1)

    // Then
    expect(unionFind.find(3)).toBe(1)
})

it('performs path compression', () => {
    // Given
    const unionFind = new UnionFind(5)
    unionFind.union(3, 1)
    unionFind.union(4, 3)

    // When
    const root4 = unionFind.find(4)
    console.log(unionFind.print())

    // Then
    expect(root4).toBe(1)
})