/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let simbolos = ["♥", "♦", "♠", "♣"];

//seleccionar cointarnerglobar
let global = document.querySelector("#super");

//tomar boton draw
let botonDraw = document.querySelector("#generar");

//tomar boton sort

let btnSort = document.querySelector("#sort");

//Tomar el input original
let inputOr = document.querySelector("#original");

//Llamar boton clear
let btnClear = document.querySelector("#clear");
//carta aleatoria
function cartaAleatoria() {
  return numeros[Math.floor(Math.random() * 13)];
}
//simbolo aleatorio
function simboloAleatorio() {
  return simbolos[Math.floor(Math.random() * 4)];
}

//Arreglo que guarda el draw
let arregloDraw = [];

window.onload = function() {
  botonDraw.addEventListener("click", () => {
    imprimirDraws(generarArreglo(inputOr.value));
  });

  btnClear.addEventListener("click", () => {
    clear();
  });

  btnSort.addEventListener("click", () => {
    console.log(ordenarImprimir());
  });
};

function draw(valor, simbolo) {
  let contenedorDraw = document.querySelector("#draw");
  // let simbolo = simboloAleatorio();
  if (valor == 11) {
    valor = "J";
  } else if (valor == 12) {
    valor = "Q";
  } else if (valor == 13) {
    valor = "K";
  }
  let clase = "black";
  if (simbolo == "♥" || simbolo == "♦") {
    clase = "red";
  }

  contenedorDraw.innerHTML += `<div class="card ${clase}">
          <p class="arriba">${simbolo}</p>
          <p class="medio">${valor}</p>
          <p class="abajo">${simbolo}</p>
        </div>`;
}
function drawBubble(valor, simbolo) {
  let contenedorG = document.querySelector("#generadas");
  // let simbolo = simboloAleatorio();
  if (valor == 11) {
    valor = "J";
  } else if (valor == 12) {
    valor = "Q";
  } else if (valor == 13) {
    valor = "K";
  }
  let clase = "black";
  if (simbolo == "♥" || simbolo == "♦") {
    clase = "red";
  }
  let nuegog = document.createElement("DIV");
  global.appendChild(nuegog);
  nuegog.innerHTML += `<div class="card ${clase} d-flex">
          <p class="arriba">${simbolo}</p>
          <p class="medio">${valor}</p>
          <p class="abajo">${simbolo}</p>
        </div>`;
}

//funcion que toma el length de original e imprime los draw
function imprimirDraws(arreglo) {
  // for (let i in arreglo) {
  //   draw(arreglo[i]);
  //   console.log(arreglo[i]);
  // }
  for (let i = 0; i < arregloDraw.length; i++) {
    let a = arregloDraw[i][0];
    let b = arregloDraw[i][1];
    draw(a, b);
  }
}

function imprimirBubbles(arreglo) {
  //creo div y lo agrego
  let nuegog = document.createElement("DIV");
  nuegog.classList.add("d-flex");
  global.appendChild(nuegog);

  for (let i = 0; i < arregloDraw.length; i++) {
    let a = arregloDraw[i][0];
    let b = arregloDraw[i][1];
    if (a == 11) {
      a = "J";
    } else if (a == 12) {
      a = "Q";
    } else if (a == 13) {
      a = "K";
    }
    let clase = "black";
    if (b == "♥" || b == "♦") {
      clase = "red";
    }

    nuegog.innerHTML += `<div class="card ${clase} mb-2 a">
          <p class="arriba">${b}</p>
          <p class="medio">${a}</p>
          <p class="abajo">${b}</p>
        </div>`;
  }
}

//funcion generar arreglo
function generarArreglo(origin) {
  for (let i = 0; i < origin; i++) {
    let miniarr = [cartaAleatoria(), simboloAleatorio()];
    arregloDraw.push(miniarr);
  }
  console.log(arregloDraw);
  return arregloDraw;
}

//EXTRA funcion clear

function clear() {
  let contenedorDraw = document.querySelector("#draw");
  arregloDraw = [];
  contenedorDraw.innerHTML = "<div></div>";
  inputOr.value = "";
  let items = document.querySelectorAll(".a");
  for (let item of items) {
    item.parentNode.remove();
  }
}

function ordenarImprimir() {
  let wall = arregloDraw.length - 1;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (arregloDraw[index][0] > arregloDraw[index + 1][0]) {
        let aux = arregloDraw[index][0];
        let auxS = arregloDraw[index][1];
        arregloDraw[index][0] = arregloDraw[index + 1][0];
        arregloDraw[index][1] = arregloDraw[index + 1][1];
        arregloDraw[index + 1][0] = aux;
        arregloDraw[index + 1][1] = auxS;
        imprimirBubbles();
      }
      index++;
    }

    wall--;
  }
  return arregloDraw;
}
