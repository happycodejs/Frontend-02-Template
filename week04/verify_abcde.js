function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for(let key of string){
        if(key === 'a'){
            foundA = true;
        }else if(foundA && key === 'b' ){
            foundB = true;
        }else if(foundB && key === 'c' ){
            foundC = true;
        }else if(foundC && key === 'd' ){
            foundD = true;
        }else if(foundD && key === 'e' ){
            foundE = true;
        }else if(foundE && key === 'f' ){
            return true;
        }else {
            foundA = foundB = foundC = foundD = foundE = false
        }
    }
}

let result = match('dddabcefaaa')
console.log(result)