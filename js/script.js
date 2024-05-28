let menuIcon = document.querySelector("#iconMenu");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*="+ id +"]").classList.add("active");
      })
    }
  })
}
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
}

const scriptURL = 'https://script.google.com/macros/s/AKfycby_Egvvwv1sSbOx-IsLuHQvK9D0BVM-cGwV_L6wleHJC9-yW5EBW_KQjguyge2z1W6A/exec';
  const form = document.forms['formKontak'];

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        alert('Pesan Anda Terkirim');
        form.reset();
        console.log('Success!', response);
      })
      .catch(error => console.error('Error!', error.message))
  });
