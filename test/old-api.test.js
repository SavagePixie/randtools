const tap = require('tap')
const rnd = require('../index')

const getDecimals = num => num.toString().split('.')[1] || { length: 0 }
const getSamples = (callback, amount) => Array.from({ length: amount }, () => callback())

// Normal Distribution

tap.test('normal', t => {
    t.test('should return a number', t => {
        t.ok(typeof rnd.normal(10, 1) === 'number', 'Two arguments')
        t.ok(typeof rnd.normal(12, 2, 1) === 'number', 'Three arguments')
        t.end()
    })

    t.test('should return decimals according to third parameter', t => {
        const decs = Math.max(...getSamples(() => getDecimals(rnd.normal(12, 2, 3)).length, 100))
        t.ok(decs > 0, 'There are decimals')
        t.ok(decs === 3, 'There are three decimals')
        t.ok(getDecimals(rnd.normal(12, 2, 0)).length === 0, 'There are no decimals')
        t.end()
    })

    t.end()
})

tap.test('normRange', t => {
    t.test('should return a number within the range', t => {
        const [ min, max ] = [ 1, 10 ]
        const num = rnd.normRange(min, max)
        t.ok(typeof num === 'number', 'Result is a number')
        t.ok(num >= min, 'Result is equal or greater than first parameter')
        t.ok(num <= max, 'Result is equal or less than second parameter')
        t.end()
    })

    t.test('should return decimals based on first two parameters', t => {
        t.ok(getDecimals(rnd.normRange(3, 6)).length === 0, 'There are no decimals')
        const decs = Math.max(...getSamples(() => getDecimals(rnd.normRange(2.201, 9)).length, 100))
        t.ok(decs === 3, 'There are three decimals')
        const decs2 = Math.max(...getSamples(() => getDecimals(rnd.normRange(2, 9.341)).length, 100))
        t.ok(decs2 === 3, 'There are three decimals')
        t.end()
    })

    t.test('should return decimals based on third parameter', t => {
        const decs = Math.max(...getSamples(() => getDecimals(rnd.normRange(2, 3, 2)).length, 100))
        t.ok(decs === 2, 'There are two decimals')
        const decs2 = Math.max(...getSamples(() => getDecimals(rnd.normRange(2.22, 3, 1)).length, 100))
        t.ok(decs2 === 2, 'Retuns decimals according to parameter with more decimals')
        t.end()
    })

    t.test('should ignore invalid input', t => {
        const result1 = rnd.normal.range(1, 4, 0, -5)
        t.ok(result1 >= 1)
        t.ok(result1 <= 4)

        const result2 = rnd.normal.range(1, 4, 0, 'potato')
        t.ok(result2 >= 1)
        t.ok(result2 <= 4)
        t.end()
    })

    t.end()
})

tap.test('normChoose', t => {
    t.test('should return element within array', t => {
        const arr = [ 'a', 'b', 'c', 'd' ]
        const choice = rnd.normChoose(arr)
        t.ok(arr.includes(choice))
        t.end()
    })

    t.end()
})

// Uniform Distribution

tap.test('unifRange', t => {
    t.test('should return a number within the range', t => {
        const [ min, max ] = [ 1, 10 ]
        const num = rnd.unifRange(min, max)
        t.ok(typeof num === 'number', 'Result is a number')
        t.ok(num >= min, 'Result is equal or greater than first parameter')
        t.ok(num <= max, 'Result is equal or less than second parameter')
        t.end()
    })

    t.test('should return decimals based on first two parameters', t => {
        t.ok(getDecimals(rnd.unifRange(3, 6)).length === 0, 'There are no decimals')
        const decs = Math.max(...getSamples(() => getDecimals(rnd.unifRange(2.201, 9)).length, 100))
        t.ok(decs === 3, 'There are three decimals')
        const decs2 = Math.max(...getSamples(() => getDecimals(rnd.unifRange(2, 9.341)).length, 100))
        t.ok(decs2 === 3, 'There are three decimals')
        t.end()
    })

    t.test('should return decimals based on third parameter', t => {
        const decs = Math.max(...getSamples(() => getDecimals(rnd.unifRange(2, 3, 2)).length, 100))
        t.ok(decs === 2, 'There are two decimals')
        const decs2 = Math.max(...getSamples(() => getDecimals(rnd.unifRange(2.22, 3, 1)).length, 100))
        t.ok(decs2 === 2, 'Retuns decimals according to parameter with more decimals')
        t.end()
    })

    t.end()
})

tap.test('unifChoose', t => {
    t.test('should return element within array', t => {
        const arr = [ 'a', 'b', 'c', 'd' ]
        const choice = rnd.unifChoose(arr)
        t.ok(arr.includes(choice))
        t.end()
    })

    t.end()
})

// Custom Distribution

tap.test('cstmChoose', t => {
    t.test('should return element within array', t => {
        const arr = [ 'a', 'b', 'c', 'd' ]
        const chance = [ 10, 30, 60, 100 ]
        const choice = rnd.cstmChoose(arr, chance)
        t.ok(arr.includes(choice))
        t.end()
    })

    t.end()
})
