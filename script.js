let slider = document.querySelector(".slider");
let thumb = slider.querySelector(".thumb");
let number = slider.querySelector(".number");
let sliderRight = document.querySelector(".sliderRight");
let sliderLeft = document.querySelector(".sliderLeft");
let sliderWidth = slider.offsetWidth;

thumb.addEventListener("mousedown", (event) => {
  event.preventDefault(); // предотвратить запуск выделения (действие браузера)

  let shiftX = event.clientX - thumb.getBoundingClientRect().left;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  let newPosition = (shiftX / sliderWidth) * 100;

  function onMouseMove(event) {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    // курсор вышел из слайдера => оставить бегунок в его границах.

    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = sliderWidth - thumb.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    sliderRight.style.width = newLeft + "px";
    sliderLeft.style.width = sliderWidth - newLeft + "px";

    thumb.style.left = newLeft + "px";
    newPosition = Math.round(
      (newLeft / (sliderWidth - thumb.offsetWidth)) * 100
    );
  }

  function onMouseUp() {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    number.innerText = newPosition + "%";
  }
});

thumb.addEventListener("dragstart", () => {
  return false;
});