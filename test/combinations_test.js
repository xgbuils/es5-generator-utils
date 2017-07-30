const {expect} = require('chai')
const Iterum = require('../src/')
const {range} = Iterum

describe('.combinations', function () {
    describe('method', function () {
        context('given empty iterable', function () {
            it('combinations of 3 over empty iterable', function () {
                const arr = []
                const iterable = Iterum(arr).combinations(3)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([])
            })
            it('combinations of 0 over empty iterable', function () {
                const arr = []
                const iterable = Iterum(arr).combinations(0)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    []
                ])
            })
            it('combinations of negative number over empty iterable', function () {
                const arr = []
                const iterable = Iterum(arr).combinations(-5)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([])
            })
        })
        context('given non empty iterable', function () {
            describe('only 1 possible combination', function () {
                it('combinations of 10 over iterable of 10', function () {
                    const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
                    const iterable = Iterum(arr).combinations(10)
                    expect([...iterable].map(e => [...e])).to.be.deep.equal([arr])
                })

                it('combinations of 2 over iterable of 2', function () {
                    const arr = [6, 2]
                    const iterable = Iterum(arr).combinations(2)
                    expect([...iterable].map(e => [...e])).to.be.deep.equal([arr])
                })
            })

            describe('0 possible combinations', function () {
                it('combinations of 8 over iterable of 2', function () {
                    const arr = [5, 4]
                    const iterable = Iterum(arr).combinations(8)
                    expect([...iterable].map(e => [...e])).to.be.deep.equal([])
                })

                it('combinations of 5 over iterable of 4', function () {
                    const arr = [1, 3, 5, 7]
                    const iterable = Iterum(arr).combinations(5)
                    expect([...iterable].map(e => [...e])).to.be.deep.equal([])
                })
            })

            it('combinations of 0 over iterable of 3 elements', function () {
                const arr = [2, 4, 6]
                const iterable = Iterum(arr).combinations(0)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    []
                ])
            })

            it('combinations of 3 over iterable of 4 elements', function () {
                const arr = [1, 2, 3, 4]
                const iterable = Iterum(arr).combinations(3)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    [1, 2, 3],
                    [1, 2, 4],
                    [1, 3, 4],
                    [2, 3, 4]
                ])
            })

            it('combinations of 3 over iterable of 5 elements', function () {
                const arr = [1, 2, 3, 4, 5]
                const iterable = Iterum(arr).combinations(3)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    [1, 2, 3],
                    [1, 2, 4],
                    [1, 3, 4],
                    [2, 3, 4],
                    [1, 2, 5],
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 4, 5],
                    [2, 4, 5],
                    [3, 4, 5]
                ])
            })

            it('combinations of 2 over iterable of 6 elements', function () {
                const arr = [1, 2, 3, 4, 5, 6]
                const iterable = Iterum(arr).combinations(2)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    [1, 2],
                    [1, 3],
                    [2, 3],
                    [1, 4],
                    [2, 4],
                    [3, 4],
                    [1, 5],
                    [2, 5],
                    [3, 5],
                    [4, 5],
                    [1, 6],
                    [2, 6],
                    [3, 6],
                    [4, 6],
                    [5, 6]
                ])
            })

            it('combinations of 2 over iterable of 6 elements', function () {
                const arr = [1, 2, 3, 4, 5, 6]
                const iterable = Iterum(arr).combinations(4)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    [1, 2, 3, 4],
                    [1, 2, 3, 5],
                    [1, 2, 4, 5],
                    [1, 3, 4, 5],
                    [2, 3, 4, 5],
                    [1, 2, 3, 6],
                    [1, 2, 4, 6],
                    [1, 3, 4, 6],
                    [2, 3, 4, 6],
                    [1, 2, 5, 6],
                    [1, 3, 5, 6],
                    [2, 3, 5, 6],
                    [1, 4, 5, 6],
                    [2, 4, 5, 6],
                    [3, 4, 5, 6]
                ])
            })
        })
        describe('infinite iterables', function () {
            it('returns infinite combinations that can slice without producing infinite loops', function () {
                const naturals = range(1, Infinity)
                const iterable = naturals.combinations(3).take(11)
                expect([...iterable].map(e => [...e])).to.be.deep.equal([
                    [1, 2, 3],
                    [1, 2, 4],
                    [1, 3, 4],
                    [2, 3, 4],
                    [1, 2, 5],
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 4, 5],
                    [2, 4, 5],
                    [3, 4, 5],
                    [1, 2, 6]
                ])
            })
        })

        describe('wrong arguments', function () {
            it('throws an exception when the first argument is not a number', function () {
                const a = new Map([['a', 'A'], ['b', 'B']])
                function test () {
                    Iterum(a).combinations({})
                }
                expect(test).to.throw(TypeError,
                    /^\[object Object\] is not a number$/)
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2, 3, 4]).combinations(2)
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        describe('iterables within iterable are not consumed on first iteration', function () {
            it('first iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).combinations(2)[Symbol.iterator]()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })

            it('second iterable', function () {
                const iterator = Iterum([1, 2, 3, 4]).combinations(2)[Symbol.iterator]()
                iterator.next()
                const nestedIterable = iterator.next().value
                const first = [...nestedIterable]
                const second = [...nestedIterable]
                expect(first).to.be.deep.equal(second)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.combinations(2, [5, 7, 10])
            expect([...iterable].map(e => [...e])).to.be.deep.equal([
                [5, 7],
                [5, 10],
                [7, 10]
            ])
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.combinations(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.combinations(2, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
