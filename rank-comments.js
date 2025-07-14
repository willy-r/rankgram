(async function rankComments() {
  const isScrollable = (el) => {
    const style = getComputedStyle(el);
    const hasScrollableOverflow =
      style.overflow === 'auto' || style.overflow === 'scroll' ||
      style.overflowY === 'auto' || style.overflowY === 'scroll' ||
      style.overflowX === 'auto' || style.overflowX === 'scroll';

    const canScrollVertically = el.scrollHeight > el.clientHeight;
    const canScrollHorizontally = el.scrollWidth > el.clientWidth;

    return hasScrollableOverflow && (canScrollVertically || canScrollHorizontally);
  }

  if (!location.href.startsWith("https://www.instagram.com/p/")) {
    alert("⚠️ Este bookmarklet só funciona em uma publicação do Instagram.");
    return;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.zIndex = 99999;
  overlay.style.color = '#fff';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontSize = '20px';
  overlay.style.fontFamily = 'sans-serif';
  overlay.innerHTML = `
    <div style="margin-bottom: 16px;">⏳ Coletando comentários…</div>
    <div class="spinner" style="width:40px;height:40px;border:5px solid #ccc;border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite;"></div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const userComments = new Map();
  const scrollContainer = Array.from(document.querySelectorAll('div'))
    .find(el => isScrollable(el));

  if (!scrollContainer) {
    alert("❌ Não foi possível localizar o container de comentários. Tente atualizar a página.");
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
    return;
  }

  let lastHeight = 0;
  let attemptsWithoutGrowth = 0;

  const scrollAndCollect = async () => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    let usernamesEl = Array.from(document.querySelectorAll('a[href^="/"] > div > div > span'));

    for (const usernameEl of usernamesEl) {
      const username = usernameEl.innerText.trim();
      const userCommentEl = usernameEl?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.firstChild;

      // Comment can be an image or text
      let comment = '';
      if (!userCommentEl) {
        continue;
      } else if (userCommentEl.nodeName === 'SPAN') {
        comment = userCommentEl.innerText.trim();
      } else if (userCommentEl.nodeName === 'IMG') {
        comment = userCommentEl.src.trim();
      }

      if (!username || !comment) continue;

      if (!userComments.has(username)) {
        userComments.set(username, new Set([comment]));
      } else {
        userComments.get(username).add(comment);
      }
    }

    const newHeight = scrollContainer.scrollHeight;
    if (newHeight === lastHeight) {
      attemptsWithoutGrowth++;
    } else {
      lastHeight = newHeight;
      attemptsWithoutGrowth = 0;
    }
  };

  try {
    while (attemptsWithoutGrowth < 2) {
      await scrollAndCollect();
      await new Promise(r => setTimeout(r, 1000));
    }
    const ranked = Array.from(userComments.entries())
      .map(([user, comments]) => [user, comments.size])
      .sort((a, b) => b[1] - a[1]);

    const result = ranked
      .map(([user, count], i) => (i + 1) + "º - @" + user + "(" + count + " comentário" + (count > 1 ? "s" : "") + ")");

    console.log('📊 Ranking:');
    result.forEach(line => console.log(line));
    alert("✅ Ranking finalizado! Veja o console (F12) e baixe o arquivo.");

    const blob = new Blob([result.join(' | ')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    link.download = "ranking_comentarios.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  } catch (err) {
    console.log("Error during comment collection:", err);
  } finally {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  }
})();
