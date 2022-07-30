import { BinarySearchTree, BstTraversalStrat } from "./BinarySearchTree"

let bst: BinarySearchTree<number>

beforeEach(() => {
    // Given
    bst = new BinarySearchTree()
    bst.add(31)
    bst.add(17)
    bst.add(5)
    bst.add(346)
    bst.add(23)
    bst.add(81)
    bst.add(500)
})

it('finds an element', () => {
    // When
    const el = bst.find(81)

    // Then
    expect(el).toBe(81)
})

it('removes an element', () => {
    // When
    const isDone = bst.remove(31)
    const isRemoved = bst.find(31) === null

    // Then
    expect(isDone).toBe(true)
    expect(isRemoved).toBe(true)
})

it('removes an element and maintains BST', () => {
    // When
    bst.remove(31)
    const findOne = bst.find(23)
    const findTwo = bst.find(346)

    // Then
    expect(findOne).toBe(23)
    expect(findTwo).toBe(346)
})

it('prints "InOrder"', () => {
    // When
    const arr = bst.print(BstTraversalStrat.IN_ORDER)
    const expectArr = [5, 17, 23, 31, 81, 346, 500]

    // Then
    expect(arr.join(',')).toBe(expectArr.join(','))
})

it('prints "PreOrder"', () => {
    // When
    const arr = bst.print(BstTraversalStrat.PRE_ORDER)
    const expectArr = [31, 17, 5, 23, 346, 81, 500]

    // Then
    expect(arr.join(',')).toBe(expectArr.join(','))
})

it('prints "DFS" using stack approach', () => {
    // When
    const arr = bst.print(BstTraversalStrat.DFS_STACK)
    const expectArr = [31, 17, 5, 23, 346, 81, 500]

    // Then
    expect(arr.join(',')).toBe(expectArr.join(','))
})

it('prints "PostOrder"', () => {
    // When
    const arr = bst.print(BstTraversalStrat.POST_ORDER)
    const expectArr = [5, 23, 17, 81, 500, 346, 31]

    // Then
    expect(arr.join(',')).toBe(expectArr.join(','))
})

it('prints "LevelOrder"', () => {
    // When
    const arr = bst.print(BstTraversalStrat.LEVEL_ORDER)
    const expectArr = [31, 17, 346, 5, 23, 81, 500]

    // Then
    expect(arr.join(',')).toBe(expectArr.join(','))
})

it('finds the height', () => {
    // When
    const height = bst.height()

    // Then
    expect(height).toBe(3)
})

it('checks for balance', () => {
    // When
    const one = bst.isBalanced()

    bst.add(28)
    bst.add(29)
    bst.add(30)

    const two = bst.isBalanced()

    // Then
    expect(one).toBe(true)
    expect(two).toBe(false)
})
