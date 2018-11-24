'use strict'

var uniqueRandomArray = require('unique-random-array')
var starWarsNames = require('./starwars-names')

module.exports = {
    all: starWarsNames,
    random: uniqueRandomArray(starWarsNames),
    doSomething
}

function doSomething() {
    console.log('hi')
}