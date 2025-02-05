// 主題切換功能
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    // 檢查本地儲存的主題
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // 更新按鈕圖示
    updateThemeIcon(savedTheme);

    // 點擊切換主題
    themeToggle.addEventListener("click", function () {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // 跳舞內容的時間軸動畫
    const timelineItems = document.querySelectorAll(".timeline-item");

    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.9;
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    // 音樂播放器動畫
    const audio = document.querySelector("#dance audio");
    const speakers = document.querySelectorAll("#dance .speaker");

    if (audio && speakers.length) {
        audio.addEventListener("play", () => {
            speakers.forEach(speaker => speaker.classList.add("playing"));
        });
        audio.addEventListener("pause", () => {
            speakers.forEach(speaker => speaker.classList.remove("playing"));
        });
    }

    // 興趣與嗜好點擊收合功能
    const hobbyItems = document.querySelectorAll(".hobby-item");
    const hobbyContents = document.querySelectorAll(".hobby-content");

    hobbyItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);

            // 檢查點擊的內容是否已經顯示，若是則隱藏
            if (targetContent.classList.contains("active")) {
                targetContent.classList.remove("active");
                targetContent.style.display = "none";
            } else {
                // 先隱藏所有內容
                hobbyContents.forEach(content => {
                    content.classList.remove("active");
                    content.style.display = "none";
                });

                // 顯示對應內容
                targetContent.classList.add("active");
                targetContent.style.display = "block";
            }
        });
    });

    // 預設隱藏所有內容
    hobbyContents.forEach(content => {
        content.style.display = "none";
    });
});

// 更新主題圖示
function updateThemeIcon(theme) {
    const toggleCircle = document.querySelector('.toggle-circle');
    if (toggleCircle) {
        toggleCircle.innerHTML = theme === 'light' ? '☀️' : '🌙';
    }
}

// 留言功能
function sendMessage() {
    const textarea = document.querySelector("#comments textarea");
    const feedback = document.querySelector("#comments .feedback");

    if (textarea.value.trim() === "") {
        feedback.textContent = "請輸入留言後再發送！";
        feedback.style.display = "block";
    } else {
        feedback.textContent = "留言已成功發送！";
        feedback.style.display = "block";
        textarea.value = "";
        setTimeout(() => {
            feedback.style.display = "none";
        }, 3000);
    }
}
