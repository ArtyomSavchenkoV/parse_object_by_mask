const parseObjectByMask = require('./parse-object-by-mask.js').parseObjectByMask;
const diff = require('deep-diff');

const startTest = (...params) => (expectedResult) => {
    const result = parseObjectByMask(...params);
    const differences = diff(expectedResult, result);
    if(differences !== undefined){
        throw new Error(`Expected\n${JSON.stringify(expectedResult, null, '\t')}\n, but got \n${JSON.stringify(result, null, '\t')}\n`);
    }
}


const initialData = {
    onlyDataField: 'from data value', 
    commonField: 'from data value'
};


const mask = {
    commonField: 'from mask value', 
    onlyMaskField: 'from mask value'
};


it("Fields with default params.", function(){
    const isFillDefault = undefined; //default must be `true`
    const isCreateEmptyObjects = undefined; //default must be `false`

    const expectedResult = {
        commonField: 'from data value',
        onlyMaskField: 'from mask value'
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});


it("Fields with Fill default, don't create empty objects. (default params)", function(){
    const isFillDefault = true;
    const isCreateEmptyObjects = false;
     
    const expectedResult = {
            commonField: 'from data value',
            onlyMaskField: 'from mask value'
        };
    
    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});


it("Fields with Fill default, create empty objects.", function(){

    const isFillDefault = true;
    const isCreateEmptyObjects = true;

    const expectedResult = {
        commonField: 'from data value',
        onlyMaskField: 'from mask value'
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});


it("Fields with Don't fill default, don't create empty objects.", function(){
    const isFillDefault = false;
    const isCreateEmptyObjects = false;

    const expectedResult = {
        commonField: 'from data value'
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});


it("Fields with Don't fill default, create empty objects.", function(){

    const isFillDefault = false;
    const isCreateEmptyObjects = true;

    const expectedResult = {
        commonField: 'from data value'
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});
