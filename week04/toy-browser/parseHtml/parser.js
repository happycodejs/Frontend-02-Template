const EOF= Symbol("EOF")  // End Of File
// 利用 Symbol 的唯一性，创建了 EOF

let  currentToken = null


/**
     '\n<html maaa=a >\n<head>\n    <style>\nbody div #myid {\n    width: 100px;\n    background-color: #ff5000;\n}\nbody div img {\n    width: 30px;\n    background-color: #f11;\n}\n    </style>\n</head>\n<body>\n    <div>\n        <img id="myid"/>\n        <img />\n    </div>\n</body>\n</html>\n\r\n'
     * 构建成dom tree
*/


module.exports = {
    parseHTML: function(html){
        let state = data;
        for(let c of html){
            state = state(c)
        }
        state = state(EOF)
    }
}

function emit(token) {
    console.log(token)
}

function data(c){
    if(c === "<"){
        return tagOpen
    }
    else if(c == EOF) {
        emit({
            type: 'EOF'
        })
    }
    else {
        // 除了 < 之外的所有字符都被理解为文本节点
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c){
    if(c == '/'){
        return endTagOpen
    }
    else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type:'startTag',
            tagName:''
        }
        return tagName(c)
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName
    }
    else if(c === '/'){
        return selfClosingStartTag
    }
    else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c
        return tagName
    }
    else if(c === '>'){
        emit(currentToken)
        return data
    }
    else{
        return tagName
    }
}


function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type:'endTag',
            tagName: ''
        }
        return tagName(c)
    }
    else if(c === '>') {
        // 报错
    }
    else if(c === EOF) {
        // 报错
    }
    else {

    }
}

function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    }
    else if(c === '>') {
        return data
    }
    else if(c === '=') {
        return beforeAttributeName
    }
    else {
        return beforeAttributeName
    }
}

// <div />
function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.selfClosing = true
        return data
    }
    else if(c == "EOF") {
        // 报错
    }
    else {
        // 报错
    }
}


























