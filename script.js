"use strict";

function changeColor(event) {
  event.srcElement.style.backgroundColor = "red";
}

const container = document.querySelector(".grid-container");
const containerHeight = container.clientWidth;
const containerWidth = container.clientHeight;

const smallerLength = containerHeight > containerWidth ? containerHeight : containerWidth;
const squareTotalSide = smallerLength / 16;
const squareContentSide = squareTotalSide - 4;  // remove margin

const marginBetweenSquares = 2;  // px
const numberOfSquares = 16 * 16;
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
