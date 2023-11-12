const refs = {
    btnStart: document.querySelector('.btn_start'),
    btnStop: document.querySelector('.btn_stop'),
    bgrColor: document.querySelector('body')

};
const bodyColor = window.getComputedStyle(refs.bgrColor).backgroundColor;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        refs.btnStart.disabled = true;
        const randomColor = getRandomHexColor();
        refs.bgrColor.style.backgroundColor = randomColor;
    }, 1000);
});



refs.btnStop.addEventListener('click', () => {
    refs.btnStart.disabled = false;
  clearInterval(timerId);
});

