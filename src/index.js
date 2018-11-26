import uniqueRandomArray from 'unique-random-array'
const starWarsNames = require('./starwars-names')

module.exports = {
    all: starWarsNames,
    random: uniqueRandomArray(starWarsNames)
}
