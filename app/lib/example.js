/**
 * @class Libraries.example
 * This is an example library description. As a developer it is your responsibility to regularly update this description along with the function documentation.
 * 
 */

/**
 * @method multiply
 * Function to perform multiplication of 2 numbers
 * 
 * @param {Number} a
 * @param {Number} b
 * @return {Number} returns multiplication result
 */
exports.multiply = function(a, b) {
	if (typeof(a) !== 'number' || typeof(b) !== 'number') {
		throw new Error('Multiplication does not allow strings');
	} else {
		return a * b;	
	}
};

/**
 * @method divide
 * Function to perform division of 2 numbers
 * 
 * @param {Number} a
 * @param {Number} b
 * @return {Number} return division result
 */
exports.divide = function(a, b) {
	if (typeof(a) !== 'number' || typeof(b) !== 'number') {
		throw new Error('Division does not allow strings');
	} else {
		return a / b;	
	}
};
