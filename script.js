"use strict";

function assignColor(event) {
  const h = Math.random() * 360;
  const s = Math.random() * 100;
  event.srcElement.style.backgroundColor = `hsl(${h}, ${s}%, 90%)`;
  event.srcElement.addEventListener("mouseenter", addBlack);
}

function addBlack(event) {
  const src = event.srcElement;
  const currColorRGB = parseRGB(src.style.backgroundColor);
  const currColorHSL = rgbToHsl(...currColorRGB);

  const h = currColorHSL[0];
  const s = currColorHSL[1];
  const l = Math.round((currColorHSL[2] - 10) / 10) * 10;
  console.log(h, s, l);
  event.srcElement.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;

  if (l === 0) {
    event.srcElement.removeEventListener("mouseenter", addBlack);
  }
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const b = blue / 255;
  const g = green / 255;

  const x_max = Math.max(r, g, b);
  const x_min = Math.min(r, g, b);
  const chroma = x_max - x_min;

  const l = (x_max + x_min) / 2;
  let h;
  if (chroma === 0) {
    h = 0;
  } else {
    switch(x_max) {
      case r:
	h = 60 * (0 + (g - b) / chroma);
	h = (h < 0) ? (h + 360) : h;
	break;
      case g:
	h = 60 * (2 + (b - r) / chroma);
	break;
      case b:
	h = 60 * (4 + (r - g) / chroma);
	break;
    }
  }
  const s = (l === 0 || l === 1) ? 0 : (x_max - l) / Math.min(l, 1 - l);
  return [h, s * 100, l * 100];
}

function parseRGB(value) {
  const fragments = value.split('(')[1].split(')')[0].split(',').map(x => x.trim());
  return fragments;
}

function drawGrid(numberOfSquaresPerSide) {
  const container = document.querySelector(".grid-container");
  const containerHeight = container.clientWidth;
  const containerWidth = container.clientHeight;

  const smallerLength = containerHeight > containerWidth ? containerHeight : containerWidth;
  const squareContentSide = smallerLength / numberOfSquaresPerSide;

  const numberOfSquares = numberOfSquaresPerSide * numberOfSquaresPerSide;
  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");
    square.style.height = `${squareContentSide}px`;
    square.style.width = `${squareContentSide}px`;
    square.style.border = "1px solid hsl(0, 0%, 95%)";
    square.style.cssFloat = "left";

    square.addEventListener("mouseenter", assignColor, {once: true})

    container.appendChild(square);
  }
}

function clearGrid() {
  const container = document.querySelector(".grid-container");
  container.innerHTML = "";
}

function resetGrid() {
  clearGrid();
  drawGrid(gridSize);
}

function askForGridSize() {
  gridSize = +prompt("Number of squares per side? [1-100]", 16);
  if (!Number.isInteger(gridSize) || gridSize < 1 || gridSize > 100) {
    alert("Invalid input!");
    return;
  }
  resetGrid();
}

let gridSize = 16;
drawGrid(gridSize);

const inputButton = document.querySelector(".input-btn");
inputButton.addEventListener("click", askForGridSize);
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", resetGrid);
