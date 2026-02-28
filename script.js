const btn = document.getElementById('colorBtn');
btn.addEventListener('click', () => {
  document.body.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
});
console.log('Site loaded — hello!');