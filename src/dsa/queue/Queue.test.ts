import { Queue } from './Queue'

let queue: Queue

beforeEach(() => {
    // Given
    queue = new Queue()
    queue.enqueue(33)
    queue.enqueue(25)
})

it('can enqueue and dequeue', () => {
    // When
    const one = queue.dequeue()
    const two = queue.dequeue()

    // Then
    expect(one).toBe(33)
    expect(two).toBe(25)
})

it('maintains correct size', () => {
    // When
    const first = queue.size()
    queue.dequeue()
    const second = queue.size()

    // Then
    expect(first).toBe(2)
    expect(second).toBe(1)
})

it('can peek properly', () => {
    // When
    const val = queue.peek()

    // Then
    expect(val).toBe(33)
    expect(queue.size()).toBe(2)
})