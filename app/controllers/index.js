/**
 * @class Controllers.index
 * index class of the Titanium project
 * 
 * @uses Libraries.example
 */

var example = require('example');

/**
 * @method doClick
 * display alert message on multiplication result
 * 
 * @param {Object} e
 */
function doClick(e) {
	alert('312 multiplied by 213 equals to: ' + example.multiply(312, 213));
}

$.index.open();
