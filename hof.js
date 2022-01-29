var _lodash = require("https://cdn.skypack.dev/lodash@4.17.20");
class Carousel {
  static getDest(element) {
    if (!(element instanceof Element)) return;
    if (element === document.documentElement) return;
    if (element.classList.contains("destination")) return element;
    return Carousel.getDest(element.parentElement);
  }

  constructor(element) {
    this.wrapperElement = element;
    this.dests = [...element.querySelectorAll(".destination")];
    this.active = null;
    this.update();
    this.wrapperElement.classList.remove("loading");

    this.wrapperElement.addEventListener("mouseover", (event) => {
      const dest = Carousel.getDest(event.target);
      if (typeof dest === "undefined") return;
      if (dest === this.dests[this.active]) return;
      this.activate(dest);
    });

    this.wrapperElement.addEventListener(
      "mouseleave",
      _lodash((event) => {
        console.log("mouseleave happening");
        if (event.target === this.wrapperElement) this.deactivate();
      }, 500)
    );
  }

  getIndex(dest) {
    if (!this.dests.includes(dest)) return;
    let i = 0;
    for (let currentDest of this.dests) {
      if (dest === currentDest) {
        return i;
      }
      i++;
    }
  }

  activate(dest) {
    this.active = this.getIndex(dest) ?? null;
    this.update();
  }

  deactivate() {
    this.active = null;
    this.update();
  }

  update() {
    this.dests.forEach((dest, index) => {
      dest.className = "destination";

      if (index === this.active) {
        dest.classList.add("unfolded", isOdd(index) ? "back" : "front");
      } else {
        dest.classList.add("folded");

        if (this.active === null || index < this.active) {
          dest.classList.add(isOdd(index) ? "right" : "left");
        } else if (index > this.active) {
          dest.classList.add(isOdd(index) ? "left" : "right");
        }
      }
    });
  }
}

function isOdd(value) {
  return value % 2 === 0;
}

const carousel = new Carousel(document.querySelector(".wrapper"));