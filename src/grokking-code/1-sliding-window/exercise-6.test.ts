function findLongestSubstr(str: string, maxChar: number): number {

    let start = 0
    let end = 0

    let currLength = 0
    let maxLength = 0
    let cache: {[key: string]: number} = {}

    while (end < str.length) {
        const chr = str[end++]
        currLength++
        cache[chr] = cache[chr] ? cache[chr] + 1 : 1

        while (Object.keys(cache).length > maxChar) {
            maxLength = Math.max(currLength-- - 1, maxLength)
            removeCharacter(str, start++, cache)
        }
    }

    return maxLength;
}


it('find longest substring with max 2 distinct char', () => {
    expect(findLongestSubstr("araaci", 2)).toBe(4)
})

it('find longest substring with max 1 distinct char', () => {
    expect(findLongestSubstr("araaci", 1)).toBe(2)
})

it('find longest substring with max 3 distinct char', () => {
    expect(findLongestSubstr("cbbebi", 3)).toBe(5)
})

function removeCharacter(str: string, idx: number, cache: { [key: string]: number }) {
    const removeChr = str[idx]
    cache[removeChr] = cache[removeChr] - 1

    if (!cache[removeChr]) {
        delete cache[removeChr]
    }
}

