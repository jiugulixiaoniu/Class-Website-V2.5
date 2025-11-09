/* =========================
       1. 工具：时间排序（倒序）
    ========================= */
function sortByDateDesc(arr) {
  return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* =========================
   2. 工具：根据等级返回图标类名 & 颜色
========================= */
function getLevelMeta(level) {
  switch (level) {
    case 3:
      return {
        icon: 'fa-star', color: 'text-yellow-500 bg-yellow-100'
      }; // 活动/表彰
    case 2:
      return {
        icon: 'fa-file-alt', color: 'text-blue-500 bg-blue-100'
      }; // 报告/公示
    default:
      return {
        icon: 'fa-info-circle', color: 'text-gray-500 bg-gray-100'
      }; // 普通
  }
}
/* =========================
   3. 通知渲染函数
========================= */
async function renderNotifications() {
  const notifications = await (await fetch('/article/content.json')).json()
  const container = document.getElementById('notifications-container');
  if (!container) return;

  container.innerHTML = '';
  const sorted = sortByDateDesc([...notifications]); // 拷贝后排序
  sorted.forEach(item => {
    const meta = getLevelMeta(item.level);
    const div = document.createElement('div');
    div.className = 'flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition';
    div.innerHTML = `
                <div class="flex items-start">
                    <!-- 左侧图标 -->
                    <div class="flex-shrink-0 w-10 h-10 rounded-full ${meta.color} flex items-center justify-center mr-4">
                        <i class="fas ${meta.icon}"></i>
                    </div>
                    <!-- 右侧文字 -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">${item.title}</h3>
                        <p class="text-sm text-gray-500 mt-1">${item.date}</p>
                    </div>
                </div>
                <a href="/article/index.html?page=${item.id}" class="mt-3 sm:mt-0 inline-flex items-center text-primary hover:text-accent font-medium">
                    点击查看 <i class="fas fa-arrow-right ml-2"></i>
                </a>`;
    container.appendChild(div);
  });
}

/* =========================
   4. 统计数字动画（可选，保护不变）
========================= */
function animateNumbers() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.dataset.target;
    if (!target) return;
    const duration = 2000,
      stepTime = 20;
    const totalSteps = duration / stepTime;
    const stepSize = target / totalSteps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += stepSize;
      if (cur >= target) {
        cur = target;
        clearInterval(timer);
      }
      el.textContent = target > 1000 ? Math.floor(cur).toLocaleString() : Math.floor(cur);
    }, stepTime);
  });
}

/* =========================
   5. 导航栏滚动 + 返回顶部（原逻辑不变）
========================= */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
    navbar.classList.remove('shadow-sm');
  } else {
    navbar.classList.remove('shadow-md');
    navbar.classList.add('shadow-sm');
  }
  if (window.scrollY > 300) {
    backToTop.classList.remove('opacity-0', 'invisible');
    backToTop.classList.add('opacity-100', 'visible');
  } else {
    backToTop.classList.add('opacity-0', 'invisible');
    backToTop.classList.remove('opacity-100', 'visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
}));

/* =========================
   6. 移动端菜单（原逻辑不变）
========================= */
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

/* =========================
   7. 页面初始化
========================= */
document.addEventListener('DOMContentLoaded', () => {
  renderNotifications(); // 1. 通知渲染（已排序+图标）
  const statCard = document.querySelector('.stat-card');
  if (statCard) { // 2. 统计动画（可选）
    const statsSection = statCard.parentElement.parentElement;
    const observer = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) {
          animateNumbers();
          observer.unobserve(en.target);
        }
      }), {
        threshold: 0.5
      }
    );
    observer.observe(statsSection);
  }
});