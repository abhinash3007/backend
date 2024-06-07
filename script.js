//fundamental of JS

let arr=[1,2,3,4];
let newarr=arr.map(function(val){  //map
    return val*3;
})
let newarr2=arr.filter(function(val){ //filter
    if(val>3){
        return true;
    }
})
let newarr3=arr.find(function(val){ //find
    if(val==3){
        return val;
    }
})
arr.indexOf(1);
console.log(arr);
console.log(newarr);
console.log(newarr3);

//objects
var obj={
    name:"abhi",
    age:21,
};

Object.freeze(obj);//it will not allow to change the value