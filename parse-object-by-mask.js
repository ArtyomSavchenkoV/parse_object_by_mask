const checkData = (field, mask, isFillDefault, isReturnEmptyObjects) => {

    // if array
    if (typeof mask === 'object' && Array.isArray(mask)) {
        if ((typeof field === 'object' && Array.isArray(field)) || isFillDefault) {
            return parseArray(field, mask, isFillDefault, isReturnEmptyObjects);
        }

    // if object
    } else if (typeof mask === 'object' && mask !== null ) {
        if ((typeof field === 'object' && field !== null) || isFillDefault) {
            return parseObject(field, mask, isFillDefault, isReturnEmptyObjects);
        }

    // fill final field
    } else {
        //TODO: rewrite conditions
        if (
            field === undefined
            || (typeof field === 'function')
            || (typeof field === 'object' && field !== null )
        ) {
            if (isFillDefault) {
                return mask;
            }
        } else {
            return field;
        }
    }
    return undefined;
};


const parseArray = (arr=[], mask, isFillDefault, isReturnEmptyObjects) => {
    let result = isReturnEmptyObjects ? [] : undefined;
    for (let i in arr) {
        const resultField = checkData(arr[i], mask[0], isFillDefault, isReturnEmptyObjects);
        if (resultField !== undefined) {
            result = result || [];
            result = [...result, resultField];
        }
    }
    return result;
};


const parseObject = (obj={}, mask, isFillDefault, isReturnEmptyObjects) => {
    let result = isReturnEmptyObjects ? {} : undefined;
    for (let key in mask) {
        const resultField = checkData(obj[key], mask[key], isFillDefault, isReturnEmptyObjects);
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
    return checkData(obj, mask, isFillDefault, isReturnEmptyObjects);
};


export default parseObjectByMask;
