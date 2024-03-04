const input = require('fs').readFileSync('entrada', 'utf8')
var lines = readInputFile('entrada')
const logic = require('propositional_logic-js')
const array_symbol = ['&','∨','¬','⇒','⇔','(',')']


// No comment input
function readInputFile() {
    let lines = input.split('\n').filter(line => !line.startsWith('#'));
    return lines.join('').split('');
}


// Pega as letras da entrada
var array_letter = [];
function checar_letter(el){
    function contemLetra(str) {
        var regex = /[a-zA-Z]/;;
        return regex.test(str);
    }
    if( contemLetra(el) == true)
        array_letter.push(el)
        return el
}
lines.filter(checar_letter)


// Pega a premissa
function extrairConteudoParenteses(input) { //pega as expressões entre parenteses
    const regex = /\(([^)]+)\)/g;
    let match;
    const result = [];
    while ((match = regex.exec(input)) !== null) {
        const conteudo = match[1];
        const symbolsLetters = conteudo.split('').filter(char => array_symbol.includes(char) || array_letter.includes(char));
        result.push(symbolsLetters);
    }
    return result;
};
const symbolsLetters__Parentheses = extrairConteudoParenteses(lines);
let array_premisse = symbolsLetters__Parentheses.map((el)=>[el.join('')]); // junta as letras
array_premisse = array_premisse.flat() // pega todas as premissas e transforma em unica array
array_premisse.pop()


// Pega a conclusão
var conclusion 
lines.forEach((el,key)=>{ //verifica se tem o "⇒" fora de parenteses
    if(el==='⇒' && lines[key-1] ===')'){ //se tiver após ")"
        const indexStart = lines.indexOf('(', key + 1); 
        const indexEnd = lines.indexOf(')', indexStart);

        if (indexStart !== -1 && indexEnd !== -1) {// Pegar o conteúdo entre os parênteses da conclusão
            var contentBetweenParentheses = lines.slice(indexStart + 1, indexEnd);
            conclusion = contentBetweenParentheses.join('');
        } else {
            console.log("Parênteses não encontrados após o símbolo '⇒'.");
        }
    }else{
        return false
    }
});

console.log(logic.evaluateLogic(array_premisse, conclusion));// Feito












