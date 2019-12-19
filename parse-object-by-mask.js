const checkData = (field, mask, isFillDefault, isReturnEmptyObjects) => {

    // if array
    if (typeof mask === 'object' && Array.isArray(mask)) {
        if ((typeof field === 'object' && Array.isArray(field)) || isFillDefault) {
            return parseArray(field, mask, isFillDefault, isReturnEmptyObjects);
        };

    // if object
    } else if (typeof mask === 'object' && mask !== null ) {
        if ((typeof field === 'object' && field !== null) || isFillDefault) {
            return parseObject(field, mask, isFillDefault, isReturnEmptyObjects);
        };

    // fill final field
    } else {
        if (
            field === undefined
            || (typeof field === 'function')
            || (typeof field === 'object' && field !== null )
        ) {
            if (isFillDefault) {
                return mask;
            };
        } else {
            return field;
        };
    };
    return undefined;
}

const parseArray = (arr=[], mask, isFillDefault, isReturnEmptyObjects) => {
    let result = isReturnEmptyObjects ? [] : undefined;
    for (let i in arr) {
        const resultField = checkData(arr[i], mask[0], isFillDefault, isReturnEmptyObjects);
        if (resultField !== undefined) {
            result = result || [];
            result = [...result, resultField];
        }
    };
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
    };
    return result;
};

const parseObjectByMask = (obj, mask, isFillDefault=true, isReturnEmptyObjects=false) => {
    return checkData(obj, mask, isFillDefault, isReturnEmptyObjects);
}

export default parseObjectByMask;
