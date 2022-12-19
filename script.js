"use strict";

function changeColor(event) {
  event.srcElement.style.backgroundColor = "red";
}

function drawGrid(numberOfSquaresPerSide) {
  const container = document.querySelector(".grid-container");
  const containerHeight = container.clientWidth;
  const containerWidth = container.clientHeight;
  const marginBetweenSquares = 2;  // px

  const smallerLength = containerHeight > containerWidth ? containerHeight : containerWidth;
  const squareTotalSide = smallerLength / numberOfSquaresPerSide;
  const squareContentSide = squareTotalSide - 2 * marginBetweenSquares;  // remove margin

  const numberOfSquares = numberOfSquaresPerSide * numberOfSquaresPerSide;
  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.createElement("div");
    square.style.height = `${squareContentSide}px`;
    square.style.width = `${squareContentSide}px`;
    square.style.margin = `${marginBetweenSquares}px`;
    square.style.border = "1px solid red";
    square.style.cssFloat = "left";

    square.addEventListener("mouseenter", changeColor, {once: true})

    container.appendChild(square);
  }
}

function clearGrid() {
  const container = document.querySelector(".grid-container");
  container.innerHTML = "";
}

function askForGridSize() {
  const gridSize = +prompt("Number of squares per side? [1-100]", 16);
  if (!Number.isInteger(gridSize) || gridSize < 1 || gridSize > 100) {
    alert("Invalid input!");
    return;
  }
  clearGrid();
  drawGrid(gridSize);
}

drawGrid(16);
const button = document.querySelector("button");
button.addEventListener("click", askForGridSize);
