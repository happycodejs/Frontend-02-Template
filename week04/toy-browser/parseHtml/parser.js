const EOF= Symbol("EOF")  // End Of File
// 利用 Symbol 的唯一性，创建了 EOF

let  currentToken = null
let currentAttribute = null
let stack = [{type:"document",children:[]}]

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
        console.log("stack",stack[0])
    }
}



/**{ type: 'text', content: '\n' }
{ type: 'startTag', tagName: 'html', maaa: 'a' }
{ type: 'text', content: '\n' }
{ type: 'startTag', tagName: 'head' } */
function emit(token) {
    let top = stack[stack.length - 1]
    let currentTextNode = null;
    if (token.type === "startTag") {
      let element = {
        type: "element",
        children: [],
        attributes: [],
      }
      element.tagName = token.tagName
      for (let p in token) {
        if (p != "type" && p != "tagName") {
          element.attributes.push({
            name: p,
            value: token[p],
          })
        }
      }
      top.children.push(element)
      element.parent = top
  
      if (!token.isSelfClosing) {
        stack.push(element)
      }
      currentTextNode = null
    } else if ((token.type === "endTag")) {
      if ((top.tagName !== token.tagName)) {
        throw new Error("Tag start end dosen't match")
      } else {
        stack.pop()
      }
      currentTextNode = null
    } else if (token.type === "text") {
      if (currentTextNode === null) {
        currentTextNode = {
          type: "",
          content: "",
        }
        top.children.push(currentTextNode)
      }
      currentTextNode.content += token.content
    }
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
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
    } else if (c === "/" || c === ">" || c === EOF) {
      return afterAttributeName(c)
    } else if (c === "=") {
    } else {
      currentAttribute = {
        name: "",
        value: "",
      }
      return attributeName(c)
    }
  }
  
  function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      return afterAttributeName
    } else if (c === "/") {
      return selfClosingStartTag
    } else if (c === "=") {
      return beforeAttributeValue
    } else if (c === ">") {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
    } else if (c === EOF) {
    } else {
      currentToken[currentAttribute.name] = currentAttribute.value
      currentAttribute = {
        name: "",
        value: "",
      }
      return attributeName
    }
  }
  
  function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
      return afterAttributeName(c)
    } else if (c === "=") {
      return beforeAttributeValue
    } else if (c === "\u0000") {
    } else if (c === '"' || c === "'" || c === "<") {
    } else {
      currentAttribute.name += c
      return attributeName
    }
  }
  
  function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
      return beforeAttributeValue
    } else if (c === '"') {
      return doubleQuotedAttributeValue
    } else if (c === "'") {
      return singleQuotedAttributeValue
    } else if (c === ">") {
    } else {
      return UnquotedAttributeValue(c)
    }
  }
  
  function doubleQuotedAttributeValue(c) {
    if (c === '"') {
      currentToken[currentAttribute.name] = currentAttribute.value
      return afterQuotedAttributeValue
    } else if (c === "\u0000") {
    } else if (c === EOF) {
    } else {
      currentAttribute.value += c
      return doubleQuotedAttributeValue
    }
  }
  
  function singleQuotedAttributeValue(c) {
    if (c === "'") {
      currentToken[currentAttribute.name] = currentAttribute.value
      return afterQuotedAttributeValue
    } else if (c === "\u0000") {
    } else if (c === EOF) {
    } else {
      currentAttribute.value += c
      return singleQuotedAttributeValue
    }
  }
  
  function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
    } else if (c === "/") {
      return selfClosingStartTag
    } else if (c === ">") {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
    } else if (c === EOF) {
    } else {
      currentAttribute.value += c
      return doubleQuotedAttributeValue
    }
  }
  
  function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      currentToken[currentAttribute.name] = currentAttribute.value
      return beforeAttributeName
    } else if (c === "/") {
      currentToken[currentAttribute.name] = currentAttribute.value
      return selfClosingStartTag
    } else if (c === ">") {
      currentToken[currentAttribute.name] = currentAttribute.value
      emit(currentToken)
      return data
    } else if (c === "\u0000") {
    } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {
    } else if (c === EOF) {
    } else {
      currentAttribute.value += c
      return UnquotedAttributeValue
    }
  }
  
  function selfClosingStartTag(c) {
    if (c === ">") {
      currentToken.isSelfClosing = true
      return data
    } else if (c === "EOF") {
    } else {
    }
  }



















