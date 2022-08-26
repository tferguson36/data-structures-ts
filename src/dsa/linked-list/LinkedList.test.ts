import { LinkedList } from './LinkedList'

it('can get head', () => {
    // Given
    const list = new LinkedList(4)
    list.addLast(2)

    expect(list.getHead()).toBe(4)
})

it('can get tail', () => {
    // Given
    const list = new LinkedList(4)
    list.addLast(2)

    expect(list.getTail()).toBe(2)
})

it('can add to end of list', () => {
    // Given
    const list = new LinkedList(1)

    // When
    list.addLast(2)
    list.addLast(3)

    // Then
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(3)
})

it('can add to front of list', () => {
    // Given
    const list = new LinkedList(1)

    // When
    list.addFirst(2)
    list.addFirst(3)

    // Then
    expect(list.get(0)).toBe(3)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(1)
})

it('shifts the list after removing a node', () => {
    // Given
    const list = new LinkedList(1)
    list.addLast(2)
    list.addLast(3)

    // When
    list.remove(1)

    // Then
    expect(list.get(1)).toBe(3)
})

it('inserts nodes', () => {
    // Given
    const list = new LinkedList(1)
    list.addLast(2)
    list.addLast(3)

    // When
    list.insert(13, 1)

    // Then
    expect(list.get(1)).toBe(13)
    expect(list.get(2)).toBe(2)
})
