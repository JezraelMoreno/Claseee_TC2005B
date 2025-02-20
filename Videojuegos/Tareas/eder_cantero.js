/*
* Ejercicios de practica 
*
* Eder Cantero
* 12/02/2025
*
*/

//firstNonRepeating
function firstNonRepeating(string){
    for(let i =0; i<string.length; i++){
        let repeated = false;
        for(let j = 0; j<string.length; j++){
            if(string[i]== string[j] && i != j){
                repeated = true;
                break;
            }
        }
        if(!repeated){
            return string[i];
        } 
    }
}
string = 'abacddbec';
console.log(firstNonRepeating(string)); 


//Bubble sort
function swap (){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
 function bubbleSort(array) {
    
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

let array = [5, 3, 8, 4, 2];
console.log("Array original: " + array);
console.log("Array ordenado: " + bubbleSort(array));

//Invert Array

function invertArray(arr1) {
    const inverted = [];
    for (let i = arr1.length -1; i>=0; i--){
        inverted.push(arr1[i]);
    }
    return inverted;

}
arr1 = [1,2,3,4,5];
console.log("Array Original: " + arr1);
console.log("Array invertido: " + invertArray(arr1))

//Invert array in plaace
function invertArrayInplace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;      
        left++;
        right--;
    }
}
let arr2 = [1, 2, 3, 4, 5];
console.log("Array Original:", arr2);
invertArrayInplace(arr2);
console.log("Array invertido in-place:", arr2);


//MCD
function mcd(a, b) {
    // Aseguramos que a sea el número más grande
    if (b > a) {
        [a, b] = [b, a]; 
    }

    while (b !== 0) {
        const temp = b; 
        b = a % b;      
        a = temp;      
    }

    return a;
}

console.log(mcd(100, 200))

//hackerspeak

function hackerSpeak(palabra){
    const letrashacker = {
        'a' : 4,
        'A' : 4,
        'e' : 3,
        'E' : 3,
        'i' : 1,
        'I' : 1,
        'o' : 0,
        'O' : 0,
        's' : 5,
        'S' : 5,
        'y' : 7,
        'Y' : 7
    }
    let pHacker = '';
    for(let i = 0; i < palabra.length; i++){
        const caracter = palabra[i];
        pHacker += letrashacker[caracter] || caracter; 
    }
    return pHacker;
}
console.log(hackerSpeak("Javascript es raro"));

//factorize

function factorize(numero) {
    const factores = []; 
    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            factores.push(i); 
        }
    }

    return factores; 
}

console.log(factorize(12)); 

//deduplicate

function deduplicate(arrInicial) {
    const arrFinal = []; 

    for (let i = 0; i < arrInicial.length; i++) {
        const valorActual = arrInicial[i];
        // Si el valor no está en arrFinal, lo agregamos
        if (!arrFinal.includes(valorActual)) {
            arrFinal.push(valorActual);
        }
    }

    return arrFinal;
}

console.log(deduplicate([1,2,2,4]));

//find shortest string
function findShortestString(strings) {
    if (strings.length === 0) return 0; // Si la lista está vacía, regresamos 0

    let minLength = strings[0].length; // Inicializamos minLength con la longitud de la primera cadena

    for (let i = 1; i < strings.length; i++) {
        if (strings[i].length < minLength) {
            minLength = strings[i].length;
        }
    }

    return minLength;
}

const cadenas = ["hola", "que", "programación"];
console.log(findShortestString(cadenas)); 

//palindrome

function palindrome(frase) {
    const fraseLimpia = frase.toLowerCase().replace(/\s+/g, '');
    const fraseInvertida = fraseLimpia.split('').reverse().join('');
    return fraseLimpia === fraseInvertida;
}

console.log(palindrome("Anita lava la tina")); 
console.log(palindrome("Hola mundo")); 

//sortStrings

function sortStrings(strings) {
    return strings.slice().sort();
}

const cheins = ["hola", "que", "programación", "adiós", "mundo"];
console.log(sortStrings(cheins)); 

// Stats

function stats(numeros) {
    if (numeros.length === 0) return [null, null]; 

    // Ordenar lista
    const numerosOrdenados = numeros.slice().sort((a, b) => a - b);

    // mediana
    const mitad = Math.floor(numerosOrdenados.length / 2);
    let mediana;
    if (numerosOrdenados.length % 2 === 0) {
        mediana = (numerosOrdenados[mitad - 1] + numerosOrdenados[mitad]) / 2;
    } else {
        mediana = numerosOrdenados[mitad];
    }

    // moda
    const frecuencias = {};
    let maxFrecuencia = 0;
    let moda = numerosOrdenados[0];
    for (const num of numerosOrdenados) {
        frecuencias[num] = (frecuencias[num] || 0) + 1;
        if (frecuencias[num] > maxFrecuencia) {
            maxFrecuencia = frecuencias[num];
            moda = num;
        }
    }
    return [mediana, moda];
}

const numeros = [8, 4, 8, 4, 12, 13, 21, 24, 13, 17, 2, 4, 8];
console.log(stats(numeros)); 

//popularString

function popularString(strings) {
    if (strings.length === 0) return null;

    const frecuencias = {};
    let contador = 0;
    let cadenaMasFrecuente = strings[0];

    for (const str of strings) {
        frecuencias[str] = (frecuencias[str] || 0) + 1;
        if (frecuencias[str] > contador) {
            contador = frecuencias[str];
            cadenaMasFrecuente = str;
        }
    }

    return cadenaMasFrecuente;
}

const palabras = ["hola","hambre", "hambre", "sueño", "hola", "adsasd", "hambre", "asdasd"];
console.log(popularString(palabras));

//ispowerof2

function isPowerOf2(n) {
    if (n <= 0) return false; 
    return (n & (n - 1)) === 0;
}

console.log(isPowerOf2(1));  
console.log(isPowerOf2(2));   
console.log(isPowerOf2(3));  
console.log(isPowerOf2(4)); 
console.log(isPowerOf2(16));
console.log(isPowerOf2(18)); 

//sortDescending
function sortDescending(numeros) {
    return numeros.slice().sort((a, b) => b - a);
}

const numebers = [5, 3, 8, 12, 21, 4, 2];
console.log(sortDescending(numebers));
