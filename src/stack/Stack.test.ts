import { Stack } from './Stack'

it('can push and pop stack', () => {
    // Given
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)

    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
})