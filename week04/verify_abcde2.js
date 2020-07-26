function match(string) {
    let state = start;
    for(let c of string){
        state = state(c)
    }
    return state === end;// 判断当前状态是否是end 
}

function start(c){
    if( c === "a" ){
        return foundA
    }else {
        return start;
    }
}

function end(c){
    return end;//能进去之后 就直接 掉进陷阱了 trap
}

function foundA(c) {
    if( c === 'b' ){
        return foundB
    }else{
        return start(c)
    }
}

function foundB(c) {
    if( c === 'c' ){
        return foundC
    }else{
        return start(c)
    }
}

function foundC(c) {
    if( c === 'd' ){
        return foundD
    }else{
        return start(c)
    }
}

function foundD(c) {
    if( c === 'e' ){
        return foundE
    }else{
        return start(c)
    }
}

function foundE(c) {
    if( c === 'f' ){
        return end
    }else{
        return start(c)  //  reConsume  重新使用
    }
}

let result = match('ababcdef')
console.log(result)








