function animate({ duration, timing, draw, delay = 0 }) {
  let start = null;

  function frame(time) {
    if (!start) start = time;
    const timeElapsed = time - start;

    if (timeElapsed >= delay) {
      const elapsed = timeElapsed - delay;
      const progress = Math.min(elapsed / duration, 1);
      const timingProgress = timing(progress);

      draw(timingProgress);
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    } else {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

function animateScaleAndTranslate(
  element,
  startScale,
  endScale,
  startY,
  endY,
  duration,
  delay
) {
  animate({
    duration: duration,
    delay: delay,
    timing: (progress) => progress,
    draw: (progress) => {
      let scale, translateY;

      if (progress <= 0.5) {
        scale = startScale;
        translateY = startY + (endY - startY) * (progress * 2);
      } else {
        scale = startScale + (endScale - startScale) * ((progress - 0.5) * 2);
        translateY = startY + (endY - startY);
      }
      element.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    },
  });
}

function animateRotation(element, angle, duration, delay) {
  animate({
    duration: duration,
    delay: delay,
    timing: (progress) => progress,
    draw: (progress) => {
      let rotationAngle;

      if (progress <= 0.5) {
        rotationAngle = angle * (progress * 2);
      } else {
        rotationAngle = angle * (1 - (progress - 0.5) * 2);
      }
      element.style.transform = `rotate(${rotationAngle}deg)`;
    },
  });
}
function animateTranslateX(element, startX, endX, duration, delay) {
  animate({
    duration: duration,
    delay: delay,
    timing: (progress) => progress,
    draw: (progress) => {
      let translateX = startX + (endX - startX) * progress;
      element.style.transform = `translateX(${translateX}px)`;
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".banner__title");
  const subtitle = document.querySelector(".banner__subtitle");
  const imgBoard = document.getElementById("board");
  const imgShapes = document.getElementById("shapes");
  const imgElements = document.getElementById("element");
  const imgSationery = document.getElementById("sationery");

  animateScaleAndTranslate(title, 0.5, 1, -100, 0, 800, 0);
  animateTranslateX(subtitle, -300, 0, 600, 900);
  animateRotation(imgBoard, -45, 1200, 1000);
  animateRotation(imgShapes, 45, 1200, 1000);
  animateRotation(imgElements, 45, 1200, 1000);
  animateRotation(imgSationery, -45, 1200, 1000);
});
