function strValidate(str) {
    const symbols = {
        ')' : '(',
        ']' : '[',
        '}' : '{',
    };
    const stack = [];

    for (const key of str) {
       if(symbols.hasOwnProperty(key)) {

           let peek = stack.pop();

           if(peek !== symbols[key]) {
               return false;
           }
           continue;
       }
       stack.push(key);
    }

    return stack.length === 0;
}

console.log(strValidate("()"));
console.log(strValidate("()[]{}"));
console.log(strValidate("(]"));
console.log(strValidate("([)]"));
console.log(strValidate("{[]}"));