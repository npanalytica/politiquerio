
/**
 * Loops through every property in @obj, and converts all 'true' and 'false'
 * strings into booleans
*/

function booleanize(obj) {
	for(key in obj) {
		if(obj[key] == 'true') {
			obj[key] = true;
		} else if (obj[key] == 'false') {
			obj[key] = false;
		}
	}
}
