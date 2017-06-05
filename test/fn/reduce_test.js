const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')

describe('reduce', function () {
    it('returns correct value', function () {
        const cb = (a, b) => a - b
        const value = Iterum([1, 3, 5]).reduce(cb, 0)
        expect(value).to.be.deep.equal(-9)
    })

    it('without initial value', function () {
        const cb = sinon.spy(function (a, b) {
            return a + b
        })
        const iterum = Iterum([1, 3, 5])
        iterum.reduce(cb, 0)
        expect(cb.args).to.be.deep.equal([
            [0, 1],
            [1, 3],
            [4, 5]
        ])
    })

    describe('wrong arguments', function () {
        it('throws an exception if parameters are not passed', function () {
            function test () {
                Iterum(new Set([1, 4, 2])).reduce()
            }
            expect(test).to.throw(TypeError,
                /^undefined is not a function$/)
        })

        it('throws an exception if initial value parameter is not passed', function () {
            function test () {
                Iterum(new Set([1, 4, 2])).reduce((a, b) => a + b)
            }
            expect(test).to.throw(TypeError,
                /^argument 2 is required$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.reduce([5, 7, 10], (a, b) => a + b, 0)
            expect(result).to.be.equal(22)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.reduce(42, (a, b) => a + b, 0)
            expect(result).to.be.equal(0)
        })
    })
})
