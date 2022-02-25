// Start Landing Section
const sliderText = Array.from(document.querySelectorAll(".landing .text"));
const sliderBullet = Array.from(
  document.querySelectorAll(".landing .bullets li")
);
const btnNext = document.querySelector(".landing .change-right");
const btnPrevious = document.querySelector(".landing .change-left");

let currentSlide = 1;
sliderText[currentSlide - 1].classList.add("active");
sliderBullet[currentSlide - 1].classList.add("active");

btnNext.addEventListener("click", () => {
  
  btnPrevious.classList.remove("disabled");
  sliderText.forEach((ele) => {
    ele.classList.remove("active");
  });
  sliderBullet.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (currentSlide < sliderText.length) {
    currentSlide++;
    sliderText[currentSlide - 1].classList.add("active");
    sliderBullet[currentSlide - 1].classList.add("active");
  } else {
    btnNext.classList.add("disabled");
    sliderBullet[sliderBullet.length - 1].classList.add("active");
  }
  sliderText[currentSlide - 1].classList.add("active");
});

btnPrevious.addEventListener("click", () => {
  btnNext.classList.remove("disabled");
  sliderText.forEach((ele) => {
    ele.classList.remove("active");
  });
  sliderBullet.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (currentSlide !== 1) {
    currentSlide--;
    sliderText[currentSlide - 1].classList.add("active");
    sliderBullet[currentSlide - 1].classList.add("active");
  } else {
    btnPrevious.classList.add("disabled");
    sliderBullet[0].classList.add("active");
  }
  sliderText[currentSlide - 1].classList.add("active");
});

// bullet function only
sliderBullet.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    sliderBullet.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    sliderText.forEach((ele) => {
      ele.classList.remove("active");
    });
    document
      .querySelector(e.currentTarget.dataset.text)
      .classList.add("active");
  });
});

// End Landing Section

// Start Portfolio Section

const imagesContainer = Array.from(
  document.querySelectorAll(".portfolio .images-container div")
);
const tabs = Array.from(document.querySelectorAll(".portfolio .shuffle li"));

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    imagesContainer.forEach((div) => {
      div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.shuf).style.cssText =
      "margin-top: 40px; display: flex; flex-wrap: wrap";
  });
});

let btn = document.querySelector(".portfolio button");
let moreImages = document.querySelector(".portfolio .more");

btn.addEventListener("click", () => {
  btn.style.display = "none";
  moreImages.style.cssText = "margin-top: 40px; display: flex; flex-wrap: wrap";
});

// End Portfolio Section

// Start About Section and Nav Bar

let statsSpans = document.querySelectorAll(".stats .container .box span");
let progressSpans = document.querySelectorAll(".chart span");
const sections = document.querySelectorAll("section");
const anchors = document.querySelectorAll("header nav ul li a");
let started = false;

// Function to increment numbers in stats section to be used in Intersection Observer Function
const increaseNumber = (ele) => {
  let goal = ele.dataset.goal;
  let count = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == goal) {
      clearInterval(count);
    }
  }, 5000 / goal);
};

// Function of chart progress to be used in Intersection Observer Function
const chartProgress = (chart) => {
  chart.style.width = chart.dataset.progress;
};

// Start Intersection Observer Function
const toggleActiveClass = () => {
  const observer = new IntersectionObserver(
    (entires) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          // [1] Add active class to active link in nav bar
          anchors.forEach((anchor) => {
            anchor.classList.remove("active");
            if (anchor.dataset.nav === entry.target.id) {
              anchor.classList.add("active");
            } else {
              anchor.classList.remove("active");
            }
          });
          //[2] Increment numbers in stats section
          if (entry.target.id === "about" && !started) {
            statsSpans.forEach((span) => increaseNumber(span));
            started = true;
            //[3] Chart progress in our skills section
            progressSpans.forEach((span) => chartProgress(span));
          }
          //[3] Add Active to Home link
          if (window.scrollY < 300) {
            anchors[0].classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "150px 0px 0px 0px",
      threshold: 0.4,
    }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
};

//Adding Many Events To Active Sections when Scrolling
window.addEventListener("scroll", toggleActiveClass);

// End About Section and Nav Bar


// Start Testimonials Section

const skillsLi = document.querySelectorAll(".testimonials .bullets li");
const testimonialsDivs = document.querySelectorAll(".testimonials .box");

skillsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    skillsLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    testimonialsDivs.forEach((div) => {
      div.parentElement.classList.remove("active");
    });
    document
      .querySelector(e.currentTarget.dataset.skill)
      .classList.add("active");
  });
});

// End Testimonials Section


// Top Button

let topBtnDiv = document.querySelector(".top-button");
let topBtn = document.querySelector(".top-button button");
window.onscroll = () => {
  if (window.scrollY > 800) {
    topBtnDiv.style.opacity = "1";
  } else {
    topBtnDiv.style.opacity = "0";
  }
};
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};