validate = require './index'
do require('chai').should


describe 'general', ->
	it 'isNull', ->
		validate(null).isNull().end().should.be.true

		validate('string').isNull().end().should.be.false
		validate(123).isNull().end().should.be.false

	it 'isUndefined', ->
		obj = {}
		validate(undefined).isUndefined().end().should.be.true
		validate(obj.unknown).isUndefined().end().should.be.true

		validate(123).isUndefined().end().should.be.false



describe 'strings', ->

	it '.end() should return boolean', ->
		validate('something').end().should.be.bool


	it 'isString', ->
		validate('string').isString().end().should.be.true

		validate({}).isString().end().should.be.false
		validate([]).isString().end().should.be.false
		validate().isString().end().should.be.false


	it 'notEmpty', ->
		validate('test').notEmpty().end().should.be.true

		validate('').notEmpty().end().should.be.false


	it 'isEmail', ->
		validate('test@test.com').isEmail().end().should.be.true
		validate('supertest@with-dash.ru').isEmail().end().should.be.true
		validate('name.and.surname@coffee.ru').isEmail().end().should.be.true

		validate('whithout-at.coffee.ru').isEmail().end().should.be.false
		validate('whithout-dot@coffeeru').isEmail().end().should.be.false
		validate('whithout-dot-and-at').isEmail().end().should.be.false
		validate('not-domen@.com').isEmail().end().should.be.false
		validate('not-domen-zone@csssr.').isEmail().end().should.be.false
		validate('').isEmail().end().should.be.false


	it 'hasOnlyDigits', ->
		validate('123').hasOnlyDigits().end().should.be.true
		validate('1230238475987').hasOnlyDigits().end().should.be.true

		validate('').hasOnlyDigits().end().should.be.false
		validate('123.0').hasOnlyDigits().end().should.be.false
		validate('.1').hasOnlyDigits().end().should.be.false
		validate('3,1').hasOnlyDigits().end().should.be.false


	it 'isRange', ->
		validate('1234567').inRange(0, 8).end().should.be.true
		validate('123').inRange(1, 4).end().should.be.true
		validate('123').inRange(2, 4).end().should.be.true

		validate('123').inRange(3, 10).end().should.be.false
		validate('123').inRange(1, 3).end().should.be.false


	it 'match', ->
		validate('1234567').match(/\d/).end().should.be.true
		validate('test').match(/t[ea]st/).end().should.be.true

		validate('wrong').match(/\W/).end().should.be.false


	it 'startWith', ->
		validate('1234567').startWith('123').end().should.be.true

		validate('1234567').startWith('345').end().should.be.false


	it 'endWith', ->
		validate('1234567').endWith('567').end().should.be.true

		validate('1234567').endWith('345').end().should.be.false



describe 'strings and numbers', ->

	it 'lessThen', ->
		validate('1234567').lessThen(8).end().should.be.true

		validate('1234567').lessThen(7).end().should.be.false
		validate('1234567').lessThen(5).end().should.be.false


	it 'moreThen', ->
		validate('1234567').moreThen(6).end().should.be.true

		validate('1234567').moreThen(7).end().should.be.false
		validate('1234567').moreThen(8).end().should.be.false



describe 'numbers', ->

	it 'moreThen', ->
		validate(123).isNumber().end().should.be.true
		validate(Infinity).isNumber().end().should.be.true

		validate('string').isNumber().end().should.be.false
		validate(null).isNumber().end().should.be.false
