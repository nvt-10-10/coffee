class Validate
	constructor: (@value, @result = yes) ->


	isNull: (type) ->
		return @ unless @result
		@result = no unless @value is null
		@

	isUndefined: (type) ->
		return @ unless @result
		@result = no unless @value is undefined
		@


	##### validation for strings #####

	isString: (type) ->
		return @ unless @result
		@result = no if typeof @value isnt 'string'
		@

	notEmpty: ->
		return @ unless @result
		@result = no unless @value
		@

	isEmail: ->
		return @ unless @result
		# email has @ and dot
		@result = no unless /^.+@.+\..+$/.test @value
		@

	hasOnlyDigits: ->
		return @ unless @result
		@result = no unless /^\d+$/.test @value
		@

	inRange: (left, right) ->
		return @ unless @result
		@lessThen(right)
		@moreThen(left)
		@

	matchRegExp: @match
	match: (re) ->
		return @ unless @result
		@result = no unless re.test @value
		@

	hasPrefix: @startWith
	startWith: (prefix) ->
		return @ unless @result
		@result = no unless @value.slice(0, prefix.length) == prefix;
		@

	hasPostfix: @endWith
	endWith: (postfix) ->
		return @ unless @result
		@result = no unless @value.slice(-postfix.length) == postfix;
		@



	##### validation for strings or numbers #####

	lower: @lessThen
	lessThen: (length) ->
		return @ unless @result
		if typeof @value is 'string'
			@result = no if @value.length >= length
		else if typeof @value is 'number'
			@result = no if @value >= length
		@

	higher: @moreThen
	moreThen: (length) ->
		return @ unless @result
		if typeof @value is 'string'
			@result = no if @value.length <= length
		else if typeof @value is 'number'
			@result = no if @value <= length
		@



	##### validation for numbers #####

	isNumber: (type) ->
		return @ unless @result
		@result = no if typeof @value isnt 'number'
		@



	##### validation for booleans #####

	isBool: ->
		return @ unless @result
		@result = no if typeof @value isnt 'boolean'
		@



	end: -> @result


module.exports = (value) ->
	return new Validate value
