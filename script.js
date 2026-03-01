// Banner hide/show
const banner = document.querySelector('.site-banner');
const closeBtn = document.getElementById('bannerClose');

function hideBanner(persist = true) {
  if (!banner) return;
  banner.style.display = 'none';
  document.body.style.paddingTop = '0';
  if (persist) localStorage.setItem('bannerHidden', '1');
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => hideBanner(true));
}

// Posts functionality
const postForm = document.getElementById('postForm');
const postsList = document.getElementById('postsList');

function loadPosts() {
  const raw = localStorage.getItem('posts');
  return raw ? JSON.parse(raw) : [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  const posts = loadPosts();
  postsList.innerHTML = posts.length
    ? posts.map(p =>
        `<article class="post lily">
           <h3>${escapeHtml(p.title)}</h3>
           <p>${escapeHtml(p.content)}</p>
           <time>${p.date}</time>
         </article>`).join('')
    : '<p>i dont know why thats up there!!!!!</p>';
}

function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

postForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if(!title || !content) return;
  const posts = loadPosts();
  posts.unshift({ title, content, date: new Date().toLocaleString() });
  savePosts(posts);
  renderPosts();
  postForm.reset();
});

renderPosts();

console.log('Site loaded — hello!');