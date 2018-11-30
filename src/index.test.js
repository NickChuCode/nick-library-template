// node原生的测试方法，不用外部库也可以做测试，但测试库可以做的更多，比如watch变化，自动进行一系列的测试等
// const assert = require("assert")
//
// assert(1 === 2, 'one is not two..')

// 下面是mocha + chai的测试
// 把测试文件和被测试的源代码放在一个文件夹下是kent推荐的一种方式，因为当源文件很多的时候，
// 如果放在test文件夹下，我们需要分别定位src文件和test文件，还不如放在一起，好维护

const expect = require('chai').expect
// 在node中，可以用.代替./index
const starwarsNames = require('.')

describe('starwars-names', function () {
    it('should have a list a available names', function () {
        expect(isArrayOfStrings(starwarsNames.all)).to.be.true
    });
    it('should allow me to get a random name from the list', function () {
        expect(starwarsNames.random()).to.satisfy(isIncludedIn(starwarsNames.all))
    });
})

function isArrayOfStrings(arr) {
    return arr.every(function (item) {
        return typeof item === 'string'
    })
}

function isIncludedIn(array) {
    return function (item) {
        return array.indexOf(item) > -1
    }
}
