import fetchMovies from "./fetchMovies";

const refs = {
  pagination: document.querySelector(".pagination"),
  btnPage1: document.querySelector(".btn-page1"),
  btnPage2: document.querySelector(".btn-page2"),
  btnPage3: document.querySelector(".btn-page3"),
  btnPage4: document.querySelector(".btn-page4"),
  btnPage5: document.querySelector(".btn-page5"),
  previous: document.querySelector(".previous"),
  next: document.querySelector(".next"),
  dots1: document.querySelector(".dots1"),
  dots2: document.querySelector(".dots2"),
  btnFirst: document.querySelector(".btn-first"),
  btnLast: document.querySelector(".btn-last"),
};

refs.pagination.addEventListener("click", onBtnClick);
let currentPage = 1;

// console.log(data.total_pages);

const btn1 = refs.btnPage1;
const btn2 = refs.btnPage2;
const btn3 = refs.btnPage3;
const btn4 = refs.btnPage4;
const btn5 = refs.btnPage5;

refs.previous.hidden = true;
refs.dots1.hidden = true;
refs.btnFirst.hidden = true;

function onBtnClick(event) {
  if (event.target.tagName === "BUTTON") {
    const activeBtn = event.target.dataset.index;
    let previousPage = document.querySelector(".active").textContent;
    // console.log("previousPage", previousPage);
    currentPage = Number(activeBtn);

    refs.previous.hidden = true;
    refs.dots1.hidden = true;
    refs.btnFirst.hidden = true;

    const previous = refs.previous;
    const next = refs.next;
    // const dots1 = refs.dots1;
    // const dots2 = refs.dots2;

    if (event.target.classList.contains("next") && currentPage < 995) {
      next.dataset.index = Number(next.dataset.index) + 1;
      btn1.textContent = Number(btn1.textContent) + 1;
      btn2.textContent = Number(btn2.textContent) + 1;
      btn3.textContent = Number(btn3.textContent) + 1;
      btn4.textContent = Number(btn4.textContent) + 1;
      btn5.textContent = Number(btn5.textContent) + 1;
      btn1.dataset.index = Number(btn1.dataset.index) + 1;
      btn2.dataset.index = Number(btn2.dataset.index) + 1;
      btn3.dataset.index = Number(btn3.dataset.index) + 1;
      btn4.dataset.index = Number(btn4.dataset.index) + 1;
      btn5.dataset.index = Number(btn5.dataset.index) + 1;

      currentPage = Number(previousPage) + 1;
    }

    previous.dataset.index = currentPage;

    if (event.target.classList.contains("previous") && btn1.textContent > 1) {
      next.dataset.index = Number(next.dataset.index) - 1;
      previous.dataset.index = next.dataset.index;
      btn1.textContent = Number(btn1.textContent) - 1;
      btn2.textContent = Number(btn2.textContent) - 1;
      btn3.textContent = Number(btn3.textContent) - 1;
      btn4.textContent = Number(btn4.textContent) - 1;
      btn5.textContent = Number(btn5.textContent) - 1;
      btn1.dataset.index = Number(btn1.dataset.index) - 1;
      btn2.dataset.index = Number(btn2.dataset.index) - 1;
      btn3.dataset.index = Number(btn3.dataset.index) - 1;
      btn4.dataset.index = Number(btn4.dataset.index) - 1;
      btn5.dataset.index = Number(btn5.dataset.index) - 1;

      currentPage = Number(previousPage) - 1;
    }

    if (
      event.target.classList.contains("dots1") &&
      Number(btn1.textContent) > 5
    ) {
      next.dataset.index = Number(next.dataset.index) - 5;
      previous.dataset.index = next.dataset.index;
      btn1.textContent = Number(btn1.textContent) - 5;
      btn2.textContent = Number(btn2.textContent) - 5;
      btn3.textContent = Number(btn3.textContent) - 5;
      btn4.textContent = Number(btn4.textContent) - 5;
      btn5.textContent = Number(btn5.textContent) - 5;
      btn1.dataset.index = Number(btn1.dataset.index) - 5;
      btn2.dataset.index = Number(btn2.dataset.index) - 5;
      btn3.dataset.index = Number(btn3.dataset.index) - 5;
      btn4.dataset.index = Number(btn4.dataset.index) - 5;
      btn5.dataset.index = Number(btn5.dataset.index) - 5;

      currentPage = Number(previousPage) - 5;
    }

    if (event.target.classList.contains("dots2") && currentPage < 995) {
      next.dataset.index = Number(next.dataset.index) + 5;
      btn1.textContent = Number(btn1.textContent) + 5;
      btn2.textContent = Number(btn2.textContent) + 5;
      btn3.textContent = Number(btn3.textContent) + 5;
      btn4.textContent = Number(btn4.textContent) + 5;
      btn5.textContent = Number(btn5.textContent) + 5;
      btn1.dataset.index = Number(btn1.dataset.index) + 5;
      btn2.dataset.index = Number(btn2.dataset.index) + 5;
      btn3.dataset.index = Number(btn3.dataset.index) + 5;
      btn4.dataset.index = Number(btn4.dataset.index) + 5;
      btn5.dataset.index = Number(btn5.dataset.index) + 5;

      currentPage = Number(previousPage) + 5;
    }

    if (event.target.classList.contains("btn")) {
      setBtnActiveStyle(event);
    }
    fetchMovies();
  }

  console.log(currentPage);

  if (btn1.textContent > 1) {
    refs.previous.hidden = false;
  }

  if (btn1.textContent > 5) {
    refs.dots1.hidden = false;
    refs.btnFirst.hidden = false;
  }

  if (event.target.classList.contains("btn-first")) {
    btn1.textContent = Number(currentPage) + 1;
    btn2.textContent = Number(currentPage) + 2;
    btn3.textContent = Number(currentPage) + 3;
    btn4.textContent = Number(currentPage) + 4;
    btn5.textContent = Number(currentPage) + 5;

    btn1.dataset.index = Number(currentPage) + 1;
    btn2.dataset.index = Number(currentPage) + 2;
    btn3.dataset.index = Number(currentPage) + 3;
    btn4.dataset.index = Number(currentPage) + 4;
    btn5.dataset.index = Number(currentPage) + 5;

    // btn1.textContent = 2;
    // btn2.textContent = 3;
    // btn3.textContent = 4;
    // btn4.textContent = 5;

    refs.dots1.hidden = true;
    refs.btnPage5.hidden = true;
    refs.previous.hidden = true;
  }

  if (Number(currentPage) >= 995) {
    refs.next.hidden = true;
    refs.dots2.hidden = true;

    btn1.textContent = Number(currentPage) - 5;
    btn2.textContent = Number(currentPage) - 4;
    btn3.textContent = Number(currentPage) - 3;
    btn4.textContent = Number(currentPage) - 2;
    btn5.textContent = Number(currentPage) - 1;

    btn1.dataset.index = Number(currentPage) - 5;
    btn2.dataset.index = Number(currentPage) - 4;
    btn3.dataset.index = Number(currentPage) - 3;
    btn4.dataset.index = Number(currentPage) - 2;
    btn5.dataset.index = Number(currentPage) - 1;
  } else {
    refs.next.hidden = false;
    refs.dots2.hidden = false;
  }
}

let buttons = document.querySelectorAll(".btn");

function setBtnActiveStyle(event) {
  let btnEvent = event.target;
  buttons.forEach((el) => el.classList.remove("active"));
  if (btnEvent.classList.contains("btn")) {
    btnEvent.classList.add("active");
  }
}

export { currentPage };
