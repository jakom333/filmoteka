import fetchMovies from "./fetchMovies.js";
import { input, fetchAPI } from "./search-input.js";
import paginationTmp from "../templates/pagination.hbs";

let currentPage = 1;

export default function markupPagination(data) {
  let totalPages = data.total_pages;
  const paginationBox = document.querySelector(".pagination");
  const paginationBoxNew = paginationBox.cloneNode(true);
  paginationBox.parentNode.replaceChild(paginationBoxNew, paginationBox);
  paginationBoxNew.addEventListener("click", onBtnClick);

  if (currentPage === 1) {
    paginationBoxNew.innerHTML = paginationTmp(data);
  }

  const refs = {
    paginator: document.querySelector(".paginator"),
    btnPage1: document.querySelector(".btn-page1"),
    btnPage2: document.querySelector(".btn-page2"),
    btnPage3: document.querySelector(".btn-page3"),
    btnPage4: document.querySelector(".btn-page4"),
    btnPage5: document.querySelector(".btn-page5"),
    prev: document.querySelector(".prev"),
    next: document.querySelector(".next"),
    dots1: document.querySelector(".dots1"),
    dots2: document.querySelector(".dots2"),
    btnFirst: document.querySelector(".btn-first"),
    btnLast: document.querySelector(".btn-last"),
  };

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => btn.classList.remove("active"));

  const currentBtn = document.querySelector(`[data-index="${currentPage}"]`);
  currentBtn.classList.add("active");

  const btn1 = refs.btnPage1;
  const btn2 = refs.btnPage2;
  const btn3 = refs.btnPage3;
  const btn4 = refs.btnPage4;
  const btn5 = refs.btnPage5;
  const btnLast = refs.btnLast;

  if (!data.total_pages) {
    refs.btnPage1.hidden = true;
  }

  if (currentPage === 1) {
    refs.prev.hidden = true;
  }

  if (totalPages <= 1) {
    refs.btnPage1.hidden = true;
  }

  if (Number(btn1.textContent) < 5) {
    refs.dots1.hidden = true;
    refs.btnFirst.hidden = true;
  }

  if (totalPages < 5) {
    const max = 5;
    let res = totalPages + 1;
    for (let i = res; i <= max; i += 1) {
      let del = (eval("refs.btnPage" + i).hidden = true);
    }
  }

  if (totalPages < 7) {
    // btn5.hidden = true;
    refs.dots2.hidden = true;
    refs.btnLast.hidden = true;
    refs.next.hidden = true;
  }

  if (document.body.clientWidth < 768) {
    refs.btnPage5.hidden = true;
    refs.dots1.hidden = true;
    refs.dots2.hidden = true;
    refs.btnFirst.hidden = true;
    refs.btnLast.hidden = true;
  }

  function onBtnClick(event) {
    if (event.target.tagName === "BUTTON") {
      let activeBtn = event.target.dataset.index;
      if (event.target.classList.contains("dots1")) {
        activeBtn = currentPage - 5;
      }
      if (event.target.classList.contains("dots2")) {
        if (currentPage === totalPages - 5) {
          activeBtn = currentPage + 5;
        }
        if (currentPage === totalPages - 4) {
          activeBtn = currentPage + 4;
        }
        if (currentPage === totalPages - 3) {
          activeBtn = currentPage + 3;
        }
        if (currentPage === totalPages - 2) {
          activeBtn = currentPage + 2;
        }
        if (currentPage === totalPages - 1) {
          activeBtn = currentPage + 1;
        }
        if (currentPage < totalPages - 5) {
          activeBtn = currentPage + 5;
        }
      }

      if (event.target.classList.contains("prev")) {
        activeBtn = currentPage - 1;
      }
      if (event.target.classList.contains("next")) {
        activeBtn = currentPage + 1;
      }
      if (event.target.classList.contains("btn-last")) {
        activeBtn = event.target.textContent;
      }
      if (event.target.classList.contains("btn-first")) {
        activeBtn = event.target.textContent;
      }

      let previousPage = document.querySelector(".active").textContent;
      currentPage = Number(activeBtn);
      // refs.prev.hidden = true;
      refs.dots1.hidden = true;
      refs.btnFirst.hidden = true;

      if (
        event.target.classList.contains("next") &&
        currentPage < totalPages
        // refs.btnLast.textContent < totalPages
      ) {
        // next.dataset.index = Number(next.dataset.index) + 1;
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
      } else {
        refs.next.hidden = true;
      }

      // prev.dataset.index = currentPage;
      if (event.target.classList.contains("prev") && btn1.textContent > 1) {
        if (!currentBtn.classList.contains("btn-last")) {
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
        } else {
          currentBtn.classList.remove("active");
          document
            .querySelector(`[data-index="${currentBtn.dataset.index - 1}"]`)
            .classList.add("active");
          currentPage = Number(previousPage) - 1;
        }
        // next.dataset.index = Number(next.dataset.index) - 1;
        // prev.dataset.index = next.dataset.index;
      }

      if (
        btn1.textContent >= totalPages - 6 &&
        currentBtn.textContent < totalPages - 1
      ) {
        refs.dots2.hidden = false;
      }

      if (
        event.target.classList.contains("dots1") &&
        Number(btn1.textContent) > 5
      ) {
        // next.dataset.index = Number(next.dataset.index) - 5;
        if (currentBtn.classList.contains("btn-last")) {
          btn1.textContent = Number(btn1.textContent) - 4;
          btn2.textContent = Number(btn2.textContent) - 4;
          btn3.textContent = Number(btn3.textContent) - 4;
          btn4.textContent = Number(btn4.textContent) - 4;
          btn5.textContent = Number(btn5.textContent) - 4;
          btn1.dataset.index = Number(btn1.dataset.index) - 4;
          btn2.dataset.index = Number(btn2.dataset.index) - 4;
          btn3.dataset.index = Number(btn3.dataset.index) - 4;
          btn4.dataset.index = Number(btn4.dataset.index) - 4;
          btn5.dataset.index = Number(btn5.dataset.index) - 4;
          currentPage = Number(previousPage) - 5;
        } else {
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
      }

      if (
        event.target.classList.contains("dots2") &&
        currentPage < totalPages
      ) {
        // next.dataset.index = Number(next.dataset.index) + 5
        if (currentBtn.textContent > totalPages - 5) {
          btn1.textContent =
            Number(btn1.textContent) +
            (totalPages - currentBtn.textContent - 1);
          btn2.textContent =
            Number(btn2.textContent) +
            (totalPages - currentBtn.textContent - 1);
          btn3.textContent =
            Number(btn3.textContent) +
            (totalPages - currentBtn.textContent - 1);
          btn4.textContent =
            Number(btn4.textContent) +
            (totalPages - currentBtn.textContent - 1);
          btn5.textContent =
            Number(btn5.textContent) +
            (totalPages - currentBtn.textContent - 1);
          btn1.dataset.index =
            Number(btn1.dataset.index) +
            (totalPages - currentBtn.textContent - 1);
          btn2.dataset.index =
            Number(btn2.dataset.index) +
            (totalPages - currentBtn.textContent - 1);
          btn3.dataset.index =
            Number(btn3.dataset.index) +
            (totalPages - currentBtn.textContent - 1);
          btn4.dataset.index =
            Number(btn4.dataset.index) +
            (totalPages - currentBtn.textContent - 1);
          btn5.dataset.index =
            Number(btn5.dataset.index) +
            (totalPages - currentBtn.textContent - 1);
          currentPage =
            Number(previousPage) + (totalPages - currentBtn.textContent);
        } else {
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
      }

      if (event.target.classList.contains("btn")) {
        setBtnActiveStyle(event);
      }

      if (!input) {
        fetchMovies();
      } else {
        fetchAPI(input);
      }
    }

    if (currentPage > 1) {
      refs.prev.hidden = false;
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
      refs.dots1.hidden = true;
      refs.prev.hidden = true;
    }

    if (
      Number(currentPage) >= totalPages &&
      event.target.classList.contains("btn-last")
    ) {
      refs.next.hidden = true;
      refs.prev.hidden = false;
      refs.dots1.hidden = false;
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

    if (currentPage === Number(refs.btnLast.textContent)) {
      refs.next.hidden = true;
    }

    if (btn5.textContent >= totalPages - 1) {
      refs.dots2.hidden = true;
    }
  }
  function setBtnActiveStyle(event) {
    let btnEvent = event.target;

    if (btnEvent.classList.contains("btn")) {
      buttons.forEach((el) => {
        el.classList.remove("active");
      });
      btnEvent.classList.add("active");
    }
  }
}

export { currentPage };
