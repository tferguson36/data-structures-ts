import { MinPriorityQueue } from './MinPriorityQueue'

it('polls properly', () => {
    // Given
    const queue = new MinPriorityQueue([2369, 23, 46, 221, 333, 43, 98])

    // When
    const one = queue.poll()
    const two = queue.poll()
    const three = queue.poll()

    // Then
    expect(one).toBe(23)
    expect(two).toBe(43)
    expect(three).toBe(46)
    expect(queue.size()).toBe(4)
})