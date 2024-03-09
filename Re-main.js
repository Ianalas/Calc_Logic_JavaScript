const input = require('fs').readFileSync('entrada', 'utf8')
var lines = readInputFile('entrada')
const logic = require('propositional_logic-js')
const array_symbol = ['&','∨','¬','⇒','⇔','(',')']


// No comment input
var fora 
function readInputFile() {
    let lines = input.split('\n').filter(line => !line.startsWith('#'));
    return lines.join('').split('');
}
lines.pop()
lines.pop()
lines.pop()
var fora = lines.join('')

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

if(conclusion !== null){
    console.log(logic.evaluateLogic(array_premisse, conclusion));// Feito   
}


//////////////////////////////////////////////////////////////////////////////////////////////


function evaluate(proposition, values) {
    // Substitui o operador de implicação (⇒) pela sua equivalência (!A || B)
    let expression = proposition.replace(/([A-Z])⇒([A-Z].*?)/g, '(!$1 || $2)');
    // Substitui valores de variáveis por seus valores reais
    for (let variable of Object.keys(values)) {
        let regex = new RegExp('\\b' + variable + '\\b', 'g');
        expression = expression.replace(regex, values[variable]);
    }
    // Avalia a expressão de forma segura
    try {
        return Function(`return (${expression});`)();
    } catch (error) {
        console.error('Erro ao avaliar a expressão:', error.message);
        return null;
    }
}

function convertSymbols(str) {
    let symbols = {
        '&': '&&',
        '∨': '||',
        '¬': '!',
        '⇒': '||'
    };
        for (let symbol in symbols) {
            if( symbol === '⇒'){
                let posicao = str.indexOf(symbol)
                let newStr = minhaString.substring(0, posicao) + "!" + minhaString.substring(posicao + 1)
                let regex = new RegExp(symbol, 'g');
                str = str.replace(regex, symbols[symbol]);
                str = '!'+str
                continue
            } else{
            let regex = new RegExp(symbol, 'g');
            str = str.replace(regex, symbols[symbol]);
            } 
        }
    return str;
}

function truthTable(propositions, variables) {
    let n = variables.length;
    let rows = Math.pow(2, n);

    for (let proposition of propositions) {
        let results = [];
        for (let i = 0; i < rows; i++) {
            let values = {};
            for (let j = 0; j < n; j++) {
                values[variables[j]] = Boolean((i >> j) & 1);
            }
            results.push(evaluate(proposition, values) ? 1 : 0);
        }

        let allTrue = results.every(result => result === 1);
        let allFalse = results.every(result => result === 0);

        if (allTrue) {
            console.log(`${proposition} é uma tautologia.`);
        } else if (allFalse) {
            console.log(`${proposition} é uma contradição.`);
        } else {
            console.log(`${proposition} é uma contingência.`);
        }
    }
}

let proposition = ["(P&Q)⇒(P∨Q)"];
let symb = ['P', 'Q'];

// Convertendo os símbolos antes de avaliar a expressão
let convertedProposition = convertSymbols(fora);
console.log(`Proposição convertida: ${convertedProposition}`);


truthTable([convertedProposition], array_letter);


















