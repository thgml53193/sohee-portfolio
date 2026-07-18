(function () {
  emailjs.init("nFY4hzUqykdzXFOMY");
})();

const heroTl = gsap.timeline();

heroTl
  .from("#hero h1", {
    y: 120,
    opacity: 0,
    duration: 1.6,
    ease: "power3.out",
  })
  .from(
    "#hero nav ul li",
    {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
    },
    "-=0.8",
  )
  .from(
    "#hero .top div",
    {
      opacity: 0,
      duration: 0.8,
      ease: "power1.out",
    },
    "-=0.4",
  )
  // 완벽한 클릭 버그 방지: 투명해진 마스크를 완전히 없애기
  .to(".intro-mask", {
    display: "none",
    duration: 0,
  });

// gsap - 클론 영역 스크롤 시 타이틀, clone01, clone02 아래 -> 위 방향으로 올라옴
const clone = gsap.timeline({
  scrollTrigger: {
    trigger: "#clone-wrap",
    start: "top top",
    end: () => (window.innerWidth <= 768 ? "+=300%" : "+=600%"),
    pin: true,
    scrub: 2,
    anticipatePin: 1, // 핀이 풀릴 때의 움직임을 미리 계산해서 부드럽게 만들어줌
  },
});

clone
  // 클론 메인 타이틀 올라옴
  .from("#clone-wrap .line-mask > span", {
    yPercent: 100,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.2,
  })
  .to({}, { duration: 1 })

  // 클론01 페이지 배경이 아래에서 올라옴
  .to(".clone01", { top: 0, duration: 2, ease: "linear" }, "+=1")
  // 프리뷰 박스 아래에서 위로 올라옴
  .from(
    ".clone01 .preview-box",
    {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",

      onComplete: () => {
        setTimeout(() => {
          document
            .querySelector(".clone01 .preview-box")
            .classList.add("active");
        }, 800);
      },
    },
    "-=0.8",
  )
  .to({}, { duration: 1.5 })

  // 클론02 페이지 배경이 아래에서 올라옴
  .to(".clone02", { top: 0, duration: 2, ease: "linear" }, "+=1")
  // 프리뷰 박스 아래에서 위로 올라옴
  .from(
    ".clone02 .preview-box",
    {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",

      onComplete: () => {
        setTimeout(() => {
          document
            .querySelector(".clone02 .preview-box")
            .classList.add("active");
        }, 800);
      },
    },
    "-=0.8",
  )
  .to({}, { duration: 1.5 });

//gsap - 디자인 타이틀 영역 스크롤 시 아래 -> 위 방향으로 올라옴
const design = gsap.timeline({
  scrollTrigger: {
    trigger: "#design-wrap",
    start: "top top",
    end: () => (window.innerWidth <= 768 ? "+=300%" : "+=600%"),
    pin: true,
    scrub: 2,
    anticipatePin: 1, // 핀이 풀릴 때의 움직임을 미리 계산해서 부드럽게 만들어줌
  },
});

design
  // 디자인 메인 타이틀 올라옴
  .from("#design-wrap .line-mask > span", {
    yPercent: 100,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
  })
  .to({}, { duration: 1 })

  // 디자인 페이지 올라옴
  .to(
    ".design-page",
    {
      top: 0,
      duration: 2,
      ease: "linear",
      immediateRender: false,
    },
    "+=2",
  )

  // 디자인 페이지 서브 타이틀 올라옴
  .from(
    ".design-page h4, .design-page > p ",
    {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2,
    },
    "+=0.5",
  )

  // 서브 타이틀 올라온 후 카드박스 올라오기
  .from(".card-box ", {
    y: 500,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
  })
  .to({}, { duration: 2 });

// 디자인 페이지에 카드 클릭했을 때 풀스크린으로 열리고 닫힘
const cards = document.querySelectorAll(".card-box > div");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // 이미 active 상태면 제거
    if (card.classList.contains("active")) {
      card.classList.remove("active");
    }

    // active 없으면 추가
    else {
      // 다른 카드 active 제거
      cards.forEach((c) => {
        c.classList.remove("active");
      });

      // 클릭 카드 active 추가
      card.classList.add("active");
    }
  });
});
window.addEventListener("load", () => {
  const previewBoxes = document.querySelectorAll(".preview-box");
  previewBoxes.forEach((box) => {
    box.classList.remove("active"); // 혹시 남아있을지 모를 active 클래스 초기화
  });
});

// 카드 박스에서 사진 페이드 인아웃
let total = 4;
console.log(total);
let i = 0;

setInterval(function () {
  if (i === total - 1) {
    i = 0;
  } else {
    i++;
  }
  $(".active .img-wrap li").fadeOut();
  $(".active .img-wrap li").eq(i).fadeIn();
}, 2000);

// 플레이그라운드 페이지 자바스크립트 텍스트가 중앙에서 제자리로
const isMobile = () => window.innerWidth <= 768;

const jsText = gsap.timeline({
  scrollTrigger: {
    trigger: "#playground",
    start: "top top",
    end: () => (isMobile() ? "+=2000" : "+=300%"),
    pin: true,
    scrub: 1,
  },
});

jsText
  .from(".big-text-box .java", {
    y: () => (isMobile() ? "20vh" : "40vh"),
    letterSpacing: "0.2em",
    opacity: 0,
    duration: 1,
  })
  .from(
    ".big-text-box .script",
    {
      y: () => (isMobile() ? "-20vh" : "-40vh"),
      letterSpacing: "0.2em",
      opacity: 0,
      duration: 1,
    },
    0,
  )
  .from(".small-text-box", {
    opacity: 0,
    duration: 2,
  });
const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  jsText.to(
    "#playground .play-item",
    {
      scale: 1,
      rotationX: 15,
      opacity: 1,
      duration: 2,
      ease: "power2.out",

      onStart: () => {
        gsap.set("#playground .play-item", {
          pointerEvents: "auto",
        });
      },
    },
    "-=1",
  );
});

mm.add("(max-width: 768px)", () => {
  gsap.set("#playground .play-item", {
    opacity: 1,
    pointerEvents: "auto",
  });

  const items = gsap.utils.toArray("#playground .play-item li");

  items.forEach((item, i) => {
    jsText.fromTo(
      item,

      {
        y: 150,
        opacity: 0,
        rotation: i === 0 ? -18 : 18,
        scale: 0.9,
      },

      {
        y: 0,
        opacity: 1,
        rotation: i === 0 ? -8 : 8,
        scale: 1,

        duration: 0.9,
        ease: "power3.out",
      },

      "-=0.2",
    );
  });
});

//gsap - contact 텍스트 변경
const textItems = ["contact ↗", "감사합니다 ↗"];
let currentIndex = 0;

function changeText() {
  const nextIndex = (currentIndex + 1) % textItems.length;

  // 1. 현재 글자를 부드럽게 숨기기
  gsap.to(".thank", {
    duration: 0.5,
    opacity: 0,
    onComplete: () => {
      // 2. 숨겨진 상태에서 텍스트 교체
      document.querySelector(".thank").textContent = textItems[nextIndex];
      currentIndex = nextIndex;

      // 3. 새 글자를 부드럽게 나타내기
      gsap.to(".thank", {
        duration: 0.5,
        opacity: 1,
      });
    },
  });
}

// 2.5초마다 실행
setInterval(changeText, 2500);

// modal
const modal = document.querySelector(".contact-modal");
const contactForm = document.getElementById("contact-form");
const contactBtn = document.querySelector(".thank"); // 기존 contact 텍스트
const closeBtn = document.querySelector(".close-btn");

contactBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  gsap.to(".contact-modal", {
    opacity: 1,
    visibility: "visible",
    duration: 0.5,
  });
});
closeBtn.addEventListener("click", () => {
  gsap.to(".contact-modal", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // 애니메이션이 완전히 끝난 후 display를 none으로 변경
      modal.style.display = "none";
      modal.style.visibility = "hidden";
    },
  });
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // 새로고침 방지

  // 서비스ID, 템플릿ID
  emailjs.sendForm("thgml53193", "template_81q5uce", this).then(
    function () {
      alert("성공적으로 전송되었습니다!");
      modal.style.display = "none";
      contactForm.reset();
    },
    function (error) {
      alert("전송 실패: " + JSON.stringify(error));
    },
  );
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
