// ========== section id ==========
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", function () {
  let scrollDariAtas = window.scrollY;// sama juga dgn pageYOffset
  sections.forEach(sct => {
    const tinggiElement = sct.offsetHeight;
    const atasDariInduk = sct.offsetTop - 80;//sesuaikan dg tinggi header
    sectionId = sct.getAttribute("id");
    if (scrollDariAtas > atasDariInduk && scrollDariAtas <= atasDariInduk + tinggiElement) {
      document.querySelector(".navbar a[href*=" + sectionId + "]").classList.add("aktif");
    }
    else {
      document.querySelector(".navbar a[href*=" + sectionId + "]").classList.remove("aktif");
    }
  });
});

// ========== navbar ==========

const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');

window.addEventListener('click', e => {
  if ( e.target == menu ) {
    navbar.classList.toggle('aktif');
    e.target.classList.toggle('close');
  }
  else {
    navbar.classList.remove('aktif');
    menu.classList.remove('close');
  }
});
window.addEventListener('scroll', ()=> {
  navbar.classList.remove('aktif');
  menu.classList.remove('close');
});

// ******************** carousel ********************
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // menampilkan dan menyembunyikan ikon prev/next sesuai dengan nilai carousel scroll left
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // mendapatkan lebar maksimum yang dapat digulir
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // mendapatkan lebar img pertama & menambahkan 14 nilai margin
        // jika ikon yang diklik dibiarkan, kurangi nilai lebar dari gulir korsel ke kiri jika tidak, tambahkan ke dalamnya
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);// memanggil showHideIcons setelah 60ms
    });
});
const autoSlide = () => {
    // jika tidak ada gambar yang tersisa untuk digulir kemudian kembali dari sini
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);// membuat nilai positionDiff menjadi positif
    let firstImgWidth = firstImg.clientWidth + 14;
    // mendapatkan nilai perbedaan yang perlu ditambahkan atau dikurangi dari carousel kiri untuk mengambil pusat img tengah
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) {// jika pengguna menggulir ke kanan
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // jika pengguna menggulir ke kiri
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // memperbarui nilai variabel global pada acara mouse down
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // menggulir gambar/carousel ke kiri sesuai penunjuk tetikus
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);