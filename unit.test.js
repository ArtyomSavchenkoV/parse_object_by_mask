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
    commonField: 'from data value',
    onlyDataObject: {
        field: 'from data value'
    },
    commonObject: {
        field: 'from data value'
    }
};


const mask = {
    commonField: 'from mask value', 
    onlyMaskField: 'from mask value',
    commonObject: {
        field: 'from mask value'
    },
    onlyMaskObject: {
        field: 'from mask value'
    }
};


it("Test with default params.", function(){
    //default function values:
    //`const isFillDefault = true`
    //`const isCreateEmptyObjects = false`
     
    const expectedResult = {
            commonField: 'from data value',
            onlyMaskField: 'from mask value',
            commonObject: {
                field: 'from data value'
            },
            onlyMaskObject: {
                field: 'from mask value'
            }
        };

    startTest(initialData, mask/*, isFillDefault, isCreateEmptyObjects*/)(expectedResult);
});


it("Fill default, dont create empty objects. (default params)", function(){
    const isFillDefault = true
    const isCreateEmptyObjects = false
     
    const expectedResult = {
            commonField: 'from data value',
            onlyMaskField: 'from mask value',
            commonObject: {
                field: 'from data value'
            },
            onlyMaskObject: {
                field: 'from mask value'
            }
        };
    
    startTest(initialData, mask, isFillDefault, isCreateEmptyObjects)(expectedResult);
});
