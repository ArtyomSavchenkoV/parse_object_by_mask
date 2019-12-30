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
    onlyDataArray: [
        'from data value1',
        'from data value2'
    ],
    commonArray: [
        'from data value1',
        'from data value2'
    ],
    outerArray: [
        {
            onlyDataField: 'from data value1',
            commonField: 'from data value2',
        },
        {
            onlyDataField: 'from data value1',
            commonField: 'from data value2',
        }
    ]
};


const mask = {
    commonArray: [
        'from mask value'
    ],
    onlyMaskArray: [
        'from mask value1'
    ],
    emptyMaskArray: [],
    outerArray: [
        {
            onlyMaskField: 'from mask value',
            commonField: 'from mask value'
        }
    ]
};


it("Arrays with default params.", function(){
    const isFillDefault = undefined; //default must be `true`
    const isCreateEmptyArrays = undefined; //default must be `false`

    const expectedResult = {
        commonArray: [
            'from data value1',
            'from data value2'
        ],
        onlyMaskArray: [
                'from mask value1'
            ],
        emptyMaskArray: [],
        outerArray: [
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            },
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            }
        ]
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyArrays)(expectedResult);
});


it("Arrays with Fill default, don't create empty Arrays. (default params)", function(){
    const isFillDefault = true;
    const isCreateEmptyArrays = false;
     
    const expectedResult = {
        commonArray: [
            'from data value1',
            'from data value2'
        ],
        onlyMaskArray: [
                'from mask value1'
            ],
        emptyMaskArray: [],
        outerArray: [
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            },
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            }
        ]
    };
    
    startTest(initialData, mask, isFillDefault, isCreateEmptyArrays)(expectedResult);
});


it("Arrays with Fill default, create empty Arrays.", function(){

    const isFillDefault = true;
    const isCreateEmptyArrays = true;

    const expectedResult = {
        commonArray: [
            'from data value1',
            'from data value2'
        ],
        onlyMaskArray: [
                'from mask value1'
            ],
        emptyMaskArray: [],
        outerArray: [
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            },
            {
                onlyMaskField: 'from mask value',
                commonField: 'from data value2',
            }
        ]
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyArrays)(expectedResult);
});


it("Arrays with Don't fill default, don't create empty Arrays.", function(){
    const isFillDefault = false;
    const isCreateEmptyArrays = false;

    const expectedResult = {
        commonArray: [
            'from data value1',
            'from data value2'
        ],
        outerArray: [
            {
                commonField: 'from data value2'
            },
            {
                commonField: 'from data value2'
            }
        ]
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyArrays)(expectedResult);
});


it("Arrays with Don't fill default, create empty Arrays.", function(){

    const isFillDefault = false;
    const isCreateEmptyArrays = true;

    const expectedResult = {
        commonArray: [
            'from data value1',
            'from data value2'
        ],
        onlyMaskArray: [],
        emptyMaskArray: [],
        outerArray: [
            {
                commonField: 'from data value2'
            },
            {
                commonField: 'from data value2'
            }
        ]
    };

    startTest(initialData, mask, isFillDefault, isCreateEmptyArrays)(expectedResult);
});
