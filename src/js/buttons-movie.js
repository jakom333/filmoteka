export default function movieButtons(li) {
  li.forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      e.target.insertAdjacentHTML(
        "afterBegin",
        `<div class="film-overlay"><button class="button watched-button button-anactive li-btn-js-watched">watched</button>
              <button class="button queue-button button-anactive li-btn-js-queue">queue</button></div>`,
      );
      const buttonQueue = document.querySelector(".li-btn-js-queue");
      const buttonWatched = document.querySelector(".li-btn-js-watched");
      buttonQueue.addEventListener("click", () => {
        buttonQueue.classList.toggle("button-anactive");
        buttonQueue.classList.toggle("button-active");
        console.log("кнопка: queue");
        // тут пишем вызов функции которая добавляет фильм в "queue"
      });
      buttonWatched.addEventListener("click", () => {
        buttonWatched.classList.toggle("button-anactive");
        buttonWatched.classList.toggle("button-active");
        console.log("кнопка: watched");
        // тут пишем вызов функции которая добавляет фильм в "watched"
      });
    });
    el.addEventListener("mouseleave", () => {
      const overlay = document.querySelector(".film-overlay");
      if (overlay) {
        overlay.remove();
      }
    });
  });
}
