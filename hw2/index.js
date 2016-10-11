function counter(){
    let c = 0;
    return {
        increase: function(){ c += 1; },
        decrease: function(){ c -= 1; },
        getCount: function(){ return c; },
    };
}

function curringSum(x){
    return function(y){
        return function(z){
            return x + y + z;
        };
    };
}

function getType(o){
    const x = typeof o;
    if(x === 'number'){
        // Distinguish number and NaN
        return isNaN(o) ? 'NaN' : 'number';
    }else if(x === 'object'){
        if(o === null){
            return 'null';
        }else if(Array.isArray(o)){
            return 'array';
        }

        return 'object';
    }

    return typeof o;
}
