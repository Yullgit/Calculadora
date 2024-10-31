const pantalla = document.getElementById('pantalla');
let operacionActual = ''; 
let operacionParaMostrar = '';  
let operadorPresionado = false; 
let decimalPresionado = false; 

function agregarValor(valor) {
    if (operadorPresionado && isNaN(valor)) {
        return;
    }

   if (!isNaN(valor) || valor === '.') {
        if (valor === '.') {
             if (decimalPresionado) return;
            decimalPresionado = true; 
        }

         if (operadorPresionado) {
            operacionParaMostrar = '';
            operadorPresionado = false; 
        }

        operacionActual += valor; 
        operacionParaMostrar += valor; 
        pantalla.textContent = operacionParaMostrar; 
    }

    if (isNaN(valor) && valor !== '.') {
        operadorPresionado = true; 
        decimalPresionado = false; 
        operacionActual += valor; 
    }
}

function limpiarPantalla() {
    operacionActual = '';
    operacionParaMostrar = '';
    pantalla.textContent = '';
    operadorPresionado = false;
    decimalPresionado = false; 
}

function calcularResultado() {
    try {
        const resultado = eval(operacionActual); // Calcula la operación completa
        pantalla.textContent = resultado; // Muestra el resultado
        operacionActual = resultado.toString(); // Actualiza la operación con el resultado
        operacionParaMostrar = ''; // Limpia lo que se muestra
        operadorPresionado = false;
        decimalPresionado = false; // Resetear decimal para nuevas entradas
    } catch (error) {
        pantalla.textContent = 'Error';
        operacionActual = '';
        operacionParaMostrar = '';
    }
}


document.querySelectorAll('.numero').forEach(boton => {
    boton.addEventListener('click', () => {
        agregarValor(boton.value);
    });
});

document.querySelectorAll('.operador').forEach(boton => {
    boton.addEventListener('click', () => {
        agregarValor(boton.value);
    });
});

document.querySelector('.decimal').addEventListener('click', () => {
    agregarValor('.');
});

document.querySelector('.igual').addEventListener('click', calcularResultado);

document.querySelector('.limpiar').addEventListener('click', limpiarPantalla);
