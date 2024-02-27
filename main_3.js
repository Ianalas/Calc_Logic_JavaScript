var fs = require('fs');
var lines = readInputFile('entrada');
var array_elements = [];
// No comment input
function readInputFile(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    var lines = input.split('\n').filter(line => !line.startsWith('#'));
    return lines.join('').split('');
}
// Sensor symbol
const array_symbol = ['∧','∨','~','→','↔','(',')','[',']']
function checar_Symbol(symbol) {
    return function(el) {
        return el === symbol;
    }
}
array_symbol.forEach(symbol => {
    var filtered_elements = lines.filter(checar_Symbol(symbol));
if ( filtered_elements.length > 0 ){
    array_elements.push(...filtered_elements);
}
});

// Sensor letter
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
//console.log(array_letter)

//Sensor FBF
function encontrarParenteses(expressao) {
    const pilha = [];
    const parenteses = [];

    for (let i = 0; i < expressao.length - 1; i++) {
        const char = expressao[i];
        const nextChar = expressao[i + 1];

        if (array_symbol.includes(char) && char === nextChar) {
            console.log(`ADV: Caractere "${char}" é igual ao próximo caractere "${nextChar}" na posição`);
            break; // Verifica os símbolos (Não podem estar juntos)
        }
        if (array_letter.includes(char) && char === nextChar) {
            console.log(`ADV: Caractere "${char}" é igual ao próximo caractere "${nextChar}" na posição`);
            break; // Verifica as letras (Não podem estar juntas)
        }

        if (char === '(') {
            pilha.push(i);
        } else if (char === ')') {
            if (pilha.length === 0) {
                console.log("Erro: Parênteses fechando sem abertura correspondente.");
            } else {
                const abertura = pilha.pop();
                parenteses.push([abertura, i]);
            }
        }
    }

    if (pilha.length !== 0) {
        console.log("Erro: Parênteses de abertura sem fechamento correspondente.");
    }

    return parenteses;
}

const parentesesEncontrados = encontrarParenteses(lines);
console.log(parentesesEncontrados);


//ETAPA III