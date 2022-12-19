"use strict";

function changeColor(event) {
  event.srcElement.style.backgroundColor = "black";
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

    square.addEventListener("mouseenter", changeColor, {once: true})

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
