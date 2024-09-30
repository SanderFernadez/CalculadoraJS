const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
let historial = JSON.parse(localStorage.getItem("historial")) || [];


const historialLista = document.getElementById("historial-lista");
const borrarHistorialBtn = document.getElementById("borrar-historial");


function actualizarHistorial(operacion) {
    historial.push(operacion);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}


function mostrarHistorial() {
    historialLista.innerHTML = '';
    historial.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historialLista.appendChild(li);
    });
}


borrarHistorialBtn.addEventListener("click", () => {
    localStorage.removeItem("historial");
    historial = [];
    mostrarHistorial();
});


mostrarHistorial();

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if(boton.id === "c"){
            pantalla.textContent = "0";
            return; 
        }

        if (boton.id === "borrar"){
            if(pantalla.textContent.length === 1 || pantalla.textContent === "Error" ) {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual"){
            try { 
                const resultado = eval(pantalla.textContent);
                const operacion = `${pantalla.textContent} = ${resultado}`;
                pantalla.textContent = resultado;

                
                actualizarHistorial(operacion);
            } catch { 
                pantalla.textContent = "Error";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});
