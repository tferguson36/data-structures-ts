import { Trie } from "./trie"

it('inserts and finds words', () => {
    // Given
    const trie = new Trie()

    // When
    trie.addWord('cat')
    const word = trie.isWord('cat')

    // Then
    expect(word).toBe(true)
})

it('performs prefix check', () => {
    // Given
    const trie = new Trie()
    trie.addWord('cattle')

    // When
    const hasPrefix = trie.startsWith('cat')

    // Then
    expect(hasPrefix).toBe(true)
})

it('does not find prefix as word', () => {
    // Given
    const trie = new Trie()
    trie.addWord('cattle')

    // When
    const isWord = trie.isWord('cat')

    // Then
    expect(isWord).toBe(false)
})

it('deletes words', () => {
    // Given
    const trie = new Trie()
    trie.addWord('cat')
    trie.addWord('cattle')
    trie.addWord('pork')
    trie.addWord('photon')
    trie.addWord('photo')

    // When
    trie.deleteWord('cat')

    // Then
    expect(trie.isWord('cat')).toBe(false)
    expect(trie.isWord('cattle')).toBe(true)
    expect(trie.isWord('photon')).toBe(true)
})