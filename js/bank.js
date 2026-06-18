/* ================================================================
   HENO × Tingee — Quy Trình Liên Kết Ngân Hàng
   Main Script for bank.html
   ================================================================ */

"use strict";

/* ================================================================
   ACCORDION — MỞ / ĐÓNG NHÓM TÀI KHOẢN
   ================================================================ */

/**
 * Toggle accordion group khi click vào header.
 * @param {HTMLElement} hdr - phần tử .ag-hdr được click
 */
function toggleAg(hdr) {
  const body = hdr.nextElementSibling;
  const toggle = hdr.querySelector(".ag-toggle");
  const isOpen = !body.classList.contains("collapsed");

  body.classList.toggle("collapsed", isOpen);
  toggle.classList.toggle("open", !isOpen);
}

/* ================================================================
   SIDEBAR SEARCH — TÌM KIẾM NGÂN HÀNG
   ================================================================ */

const sbSearch = document.getElementById("sbSearch");
const sbBanks = document.querySelectorAll(".sb-bank");

// Khởi tạo và lưu tên gốc của ngân hàng để tránh mất thẻ HTML khi tìm kiếm
sbBanks.forEach((item) => {
  const span = item.querySelector("span:not(.sb-num)");
  if (span) {
    item._originalText = span.textContent;
  }
});

sbSearch.addEventListener("input", function () {
  const q = this.value.toLowerCase().trim();

  sbBanks.forEach((item) => {
    const match = !q || item.dataset.name.includes(q);
    item.classList.toggle("hidden", !match);

    const span = item.querySelector("span:not(.sb-num)");
    if (span && item._originalText) {
      if (!q) {
        span.innerHTML = item._originalText;
      } else {
        const text = item._originalText;
        const index = text.toLowerCase().indexOf(q);
        if (index !== -1) {
          const before = text.substring(0, index);
          const matched = text.substring(index, index + q.length);
          const after = text.substring(index + q.length);
          span.innerHTML = `${before}<mark class="sb-hl">${matched}</mark>${after}`;
        } else {
          span.innerHTML = text;
        }
      }
    }
  });
});

/* ================================================================
   SCROLL SPY — HIGHLIGHT SIDEBAR LINK THEO VỊ TRÍ CUỘN
   ================================================================ */

// Chỉ theo dõi bank-card và các section chính
const watchedSections = Array.from(
  document.querySelectorAll(".bank-card[id], #intro, #terminology"),
);
const sbLinks = document.querySelectorAll(".sb-link");
const backBtn = document.getElementById("backBtn");
const HEADER_H = 56 + 24; // chiều cao header + padding offset

let spyEnabled = true;
let spyTimer = null;

/**
 * Highlight link trong sidebar tương ứng với section đang xem.
 * @param {string} id - id của section đang active
 */
function setActiveLink(id) {
  sbLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === "#" + id);
  });

  // Tự cuộn sidebar để link active luôn hiển thị trong khung nhìn
  if (id) {
    const activeLink = document.querySelector(`.sb-link[href="#${id}"]`);
    if (activeLink) {
      const sb = document.getElementById("sidebar");
      const sbRect = sb.getBoundingClientRect();
      const lRect = activeLink.getBoundingClientRect();

      if (lRect.bottom > sbRect.bottom || lRect.top < sbRect.top + 50) {
        activeLink.scrollIntoView({ block: "nearest" });
      }
    }
  }
}

/**
 * Cập nhật trạng thái scroll spy và nút "Back to top".
 */
function updateScrollSpy() {
  if (!spyEnabled) return;

  // Hiện / ẩn nút Back to top
  backBtn.classList.toggle("visible", window.scrollY > 300);

  // Tìm section cuối cùng nằm trong tầm nhìn
  const y = window.scrollY + HEADER_H;
  let cur = "";
  watchedSections.forEach((s) => {
    if (s.offsetTop <= y) cur = s.id;
  });

  setActiveLink(cur);
}

// Gán sự kiện và chạy ngay khi tải trang
window.addEventListener("scroll", updateScrollSpy, { passive: true });
updateScrollSpy();

/* ================================================================
   MOBILE SIDEBAR — MỞ / ĐÓNG MENU
   ================================================================ */

const sidebar = document.getElementById("sidebar");
const sbOverlay = document.getElementById("sbOverlay");
const mobMenuBtn = document.getElementById("mobMenuBtn");

/** Mở sidebar trên mobile */
function openSidebar() {
  sidebar.classList.add("open");
  sbOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

/** Đóng sidebar trên mobile */
function closeSidebar() {
  sidebar.classList.remove("open");
  sbOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Nút hamburger toggle sidebar
mobMenuBtn.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

// Click overlay nền mờ → đóng sidebar
sbOverlay.addEventListener("click", closeSidebar);

// Đóng sidebar khi resize lên desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeSidebar();
});

/* ================================================================
   PDF VIEWER MODAL — XEM TÀI LIỆU ĐÍNH KÈM
   ================================================================ */

const pdfModal = document.getElementById("pdfModal");
const pdfModalOverlay = document.getElementById("pdfModalOverlay");
const pdfModalTitle = document.getElementById("pdfModalTitle");
const pdfModalDl = document.getElementById("pdfModalDl");
const pdfFrame = document.getElementById("pdfFrame");

/**
 * Mở modal xem PDF / tài liệu.
 * @param {string} url   - Đường dẫn tới file (vd: '../docs/vtb/cong-van-3156.pdf')
 * @param {string} title - Tiêu đề hiển thị trong modal
 */
function openDocViewer(url, title) {
  pdfModalTitle.textContent = title || "Xem tài liệu";
  pdfModalDl.href = url;
  pdfModalDl.download = url.split("/").pop();

  // Với PDF: dùng iframe trực tiếp; trình duyệt hiện đại tự hiển thị
  pdfFrame.src = url;

  pdfModal.classList.add("open");
  pdfModalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

/**
 * Đóng modal và xoá nguồn iframe để dừng tải file.
 */
function closeDocViewer() {
  pdfModal.classList.remove("open");
  pdfModalOverlay.classList.remove("open");
  document.body.style.overflow = "";

  // Đặt lại sau khi animation đóng hoàn tất
  setTimeout(() => {
    pdfFrame.src = "";
  }, 200);
}

// Đóng modal khi nhấn phím Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && pdfModal.classList.contains("open")) {
    closeDocViewer();
  }
});

/* ================================================================
   SIDEBAR LINKS — CLICK ĐỂ ĐIỀU HƯỚNG
   ================================================================ */

sbLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Tạm dừng scroll spy để active không bị ghi đè trong khi cuộn mượt
    spyEnabled = false;
    clearTimeout(spyTimer);

    // Đặt active ngay lập tức
    sbLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    // Bật lại scroll spy sau khi animation cuộn hoàn tất (~700ms)
    spyTimer = setTimeout(() => {
      spyEnabled = true;
      updateScrollSpy();
    }, 700);

    // Đóng sidebar trên mobile sau khi click
    if (window.innerWidth <= 768) {
      setTimeout(closeSidebar, 80);
    }
  });
});

/* ================================================================
   THEME TOGGLE — ĐỔI GIAO DIỆN SÁNG / TỐI
   ================================================================ */
const themeToggleBtn = document.getElementById("themeToggleBtn");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ================================================================
   SCROLL PROGRESS BAR
   ================================================================ */
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  const pb = document.getElementById("scrollProgress");
  if (pb) pb.style.width = scrolled + "%";
}, { passive: true });
