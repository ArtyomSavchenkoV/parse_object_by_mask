const dataHandler = (field, mask, isFillDefault, isReturnEmptyObjects) => {
    // if array
    if (Array.isArray(mask)) {
        return parseArray(field, mask, isFillDefault, isReturnEmptyObjects);
    // if object
    } else if (typeof mask === 'object' && mask !== null ) {
        return parseObject(field, mask, isFillDefault, isReturnEmptyObjects);
    // if just field
    } else {
        return parseField(field, mask, isFillDefault, isReturnEmptyObjects);
    }
};


const parseField = (field, mask, isFillDefault, isReturnEmptyObjects) => {
    //TODO: rewrite conditions
	if (
		typeof field === 'string' ||
		typeof field === 'number' ||
		typeof field === 'boolean' ||
		typeof field === null
	) {
		return field;
	} else {
		if (isFillDefault) {
			return mask;
		} else {
			return undefined;
		}
	}
	//TODO: Delete the commented old code when new code completes tests successfully.
	/*if (
		field === undefined
		|| (typeof field === 'function')
		|| (typeof field === 'object' && field !== null )
	) {
		if (isFillDefault) {
			return mask;
		}
	} else {
		return field;
	}*/
	
    return undefined;
};


const parseArray = (arr, mask, isFillDefault, isReturnEmptyObjects) => { 
	let result = isReturnEmptyObjects || isFillDefault ? [] : undefined;
    for (let i in arr) {
        const resultField = dataHandler(arr[i], mask[0], isFillDefault, isReturnEmptyObjects);
        if (resultField !== undefined) {
            result = result || [];
            result = [...result, resultField];
        }
    }
    if (Array.isArray(result) && isFillDefault) {
        if (result.length === 0) {
            result = [...mask];
        }
    }
    return result;
};


const parseObject = (obj, mask, isFillDefault, isReturnEmptyObjects) => {
	let result = isReturnEmptyObjects || isFillDefault ? {} : undefined;
	for (let key in mask) {
		const resultField = dataHandler(obj[key], mask[key], isFillDefault, isReturnEmptyObjects);
		if (resultField !== undefined) {
			result = result || {};
			result[key] = resultField;
		}
	}
	return result;
};


/**
 * Create new object or array by the mask from the object or array of data.
 *
 * @param {object, array} The object or array of data for parsing by mask.
 * @param {object, array} The mask object or array.
 * @param {boolean} Using default values for empty fields. "false" - fill as "undefined". "true" - use the value from the mask.
 * @param {boolean} Using empty object or array for undefined or not object or array fields. "false" - fill as "undefined".
 * "true" - use empty object or array.
 *
 * @return {object, array} Produced result.
 */
//TODO: consider necessity for using "isReturnEmptyObjects" parameter. Probably this parameter merge with "isFillDefault"
const parseObjectByMask = (obj, mask, isFillDefault=true, isReturnEmptyObjects=false) => {
    return dataHandler(obj, mask, isFillDefault, isReturnEmptyObjects);
};


exports.parseObjectByMask = parseObjectByMask;
