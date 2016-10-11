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

function counter(){
    let count = 0;
    return {
        increase: function(){ count += 1; },
        decrease: function(){ count -= 1; },
        getCount: function(){ return count; },
    };
}

function curringSum(x){
    return function(y){
        return function(z){
            return x + y + z;
        };
    };
}

