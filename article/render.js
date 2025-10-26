// render.js —— 卡片式表格 + 行间距版
(() => {
    const htmlFile = location.pathname.split('/').pop();      // 202510122239.html
  const mdName   = htmlFile.replace(/\.html?/i, '.md');     // 202510122239.md
    
  // 2. 统一放到 /md/ 目录下
  const mdFile = './md/' + mdName;                          // ./md/202510122239.md

  // 检查页面是否已经有内容，如果有，则不需要加载md文件

  fetch(mdFile)
    .then(r => r.ok ? r.text() : Promise.reject('通知文件不存在'))
    .then(md => {
      const lines = md.split('\n');
      let title = '通知公告';
      for (const l of lines) if (l.startsWith('# ')) { title = l.slice(2).trim(); break; }
      document.getElementById('page-title').textContent = title;

      let rawHtml = marked.parse(md, { breaks: true, gfm: true });

      /* ---------- 通用元素美化（保持你原来逻辑）---------- */
      rawHtml = rawHtml
        .replace(/<h1[^>]*>(.*?)<\/h1>/gi,
          '<h1 class="text-3xl md:text-4xl font-bold text-dark mb-6 flex items-center">' +
          '<i class="fas fa-bullhorn text-notice mr-3"></i>$1</h1>')
        .replace(/<h2[^>]*>(.*?)<\/h2>/gi,
          '<h2 class="text-2xl font-semibold text-dark mt-8 mb-4">$1</h2>')
        .replace(/<h3[^>]*>(.*?)<\/h3>/gi,
          '<h3 class="text-xl font-semibold text-dark mt-6 mb-3">$1</h3>')
        .replace(/<p>/g, '<p class="text-base text-gray-600 leading-relaxed mb-4">')
        .replace(/<blockquote>/g,
          '<blockquote class="border-l-4 border-blue-400 bg-blue-50 pl-4 py-2 my-4 text-gray-700">')
        .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-1 text-base text-gray-600">')
        .replace(/<ol>/g, '<ol class="list-decimal pl-6 space-y-1 text-base text-gray-600">')
        .replace(/<a /g, '<a class="text-primary hover:text-accent font-medium" ');

      /* ---------- 表格 → 卡片式 ---------- */
      // 外层容器
      rawHtml = rawHtml.replace(/<table[^>]*>/gi,
        '<div class="overflow-x-auto py-2"><div class="min-w-[600px] space-y-2">');
      rawHtml = rawHtml.replace(/<\/table>/gi, '</div></div>');

      // 表头：只在大屏显示
      rawHtml = rawHtml.replace(/<thead[^>]*>(.*?)<\/thead>/gis, (_, thead) => {
        const heads = [...thead.matchAll(/<th[^>]*>(.*?)<\/th>/gi)].map(m => m[1]);
        return `
          <div class="hidden md:grid md:grid-cols-${heads.length} gap-4 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            ${heads.map(h => `<div>${h}</div>`).join('')}
          </div>`;
      });

      // 每一行：圆角卡片 + 阴影 + 行间距
      rawHtml = rawHtml.replace(/<tbody[^>]*>(.*?)<\/tbody>/gis, (_, tbody) => {
        const rows = [...tbody.matchAll(/<tr[^>]*>(.*?)<\/tr>/gis)];
        const heads = [...rawHtml.matchAll(/<th[^>]*>(.*?)<\/th>/gi)].map(m => m[1]);
        return rows.map(r => {
          const cells = [...r[1].matchAll(/<td[^>]*>(.*?)<\/td>/gi)].map(m => m[1]);
          return `
            <div class="grid grid-cols-1 md:grid-cols-${cells.length} gap-4 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-sm text-gray-900">
              ${cells.map((c, i) => `
                <div class="flex md:block">
                  <span class="md:hidden w-24 font-medium text-gray-500">${heads[i] || ''}：</span>
                  <span>${c}</span>
                </div>`).join('')}
            </div>`;
        }).join('');
      });

      // 清理残留标签
      rawHtml = rawHtml
        .replace(/<\/?(tr|td|th|tbody|thead)[^>]*>/gi, '');
          rawHtml = rawHtml
  // 把 <!--top--> 换成皇冠图标
  .replace(/<!--top-->/gi,
    '<i class="fas fa-crown text-yellow-500 ml-2" title="第一名"></i>')
      document.getElementById('content').innerHTML = `
        <div class="notice-card-hover bg-white rounded-xl p-8 shadow-lg border-l-4 border-notice space-y-6">
          <div class="text-gray-700 leading-relaxed">
            ${rawHtml}
          </div>
        </div>`;
    })
})();