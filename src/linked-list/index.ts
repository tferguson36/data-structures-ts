import { LinkedList } from './LinkedList'

const list = new LinkedList(1)
list.add(2)
list.add(3)

console.log(list.get(0))
console.log(list.get(1))
console.log(list.get(2))

try {
    list.get(3)
} catch(e) {
    console.log('Successfully throws an error when out of bounds')
}

const removed = list.remove(1)
console.log('Removed should equal 2:', removed)
console.log('Position 1 should now be equal to 3:', list.get(1))

// ------------------------

const list2 = new LinkedList("one")
console.log(list2.remove(0))
try {
    list2.get(0)
} catch(e) {
    console.log('Successfully throws an error when out of bounds')
}