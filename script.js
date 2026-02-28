const btn = document.getElementById('colorBtn');
btn.addEventListener('click', () => {
  document.body.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
});
console.log('Site loaded — hello!');
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
    ? posts.map(p => `<article class="post"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.content)}</p><time>${p.date}</time></article>`).join('')
    : '<p>No posts yet — add one!</p>';
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