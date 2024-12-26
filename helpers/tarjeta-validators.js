// Función para generar un número de tarjeta válido usando el algoritmo de Luhn
const generarNumeroTarjeta = (prefijo = '25', longitud = 16) => {
    let numero = prefijo;

    // Genera los dígitos restantes (excepto el último)
    while (numero.length < longitud - 1) {
        numero += Math.floor(Math.random() * 10).toString();
    }

    // Calcula el dígito de control (checksum) usando el algoritmo de Luhn
    const checksum = calcularDigitoLuhn(numero);
    numero += checksum;

    return numero;
};

// Función para calcular el dígito de control (Luhn)
const calcularDigitoLuhn = (numeroBase) => {
    const digitos = numeroBase.split('').map(Number).reverse();
    let suma = 0;

    for (let i = 0; i < digitos.length; i++) {
        let valor = digitos[i];
        if (i % 2 === 0) {
            valor *= 2;
            if (valor > 9) valor -= 9;
        }
        suma += valor;
    }

    const resto = suma % 10;
    return resto === 0 ? 0 : 10 - resto;
};

// Función para validar una tarjeta usando el algoritmo de Luhn
const validarTarjeta = (tarjeta) => {
    let suma = 0;
    let shouldDouble = false;
    // Recorremos la tarjeta de derecha a izquierda
    for (let i = tarjeta.length - 1; i >= 0; i--) {
        let digito = parseInt(tarjeta.charAt(i));
        if (shouldDouble) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }
        suma += digito;
        shouldDouble = !shouldDouble;
    }
    // Si la suma no es divisible por 10, lanzamos un error
    if (suma % 10 !== 0) {
        throw new Error('La tarjeta no es válida');
    }
    return true;
};


// Función para verificar si la tarjeta es de tu banco
const esTarjetaDeMiBanco = (tarjeta) => {
    const prefijoBanco = '25';  // Prefijo del banco, ajusta esto según tu caso
    return  tarjeta.startsWith(prefijoBanco);
};


module.exports = {
    generarNumeroTarjeta,
    validarTarjeta,
    esTarjetaDeMiBanco
};
