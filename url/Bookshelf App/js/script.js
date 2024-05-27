const buku = [];
const RENDER_EVENT = "render-buku";
const SAVED_EVENT = "buku-tersimpan";
const STORAGE_KEY = "bookshelf";

document.addEventListener("DOMContentLoaded", function () {
  const inputBuku = document.getElementById("formTambah");
  inputBuku.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBuku();
  });

  if (cekStorage()) {
    ambilData();
  }
});

function cekStorage() {
  if (typeof Storage === "undefined") {
    alert("Browser tidak mendukung storage");
    return false;
  } else {
    return true;
  }
}

function generateID() {
  return +new Date();
}

function listBuku(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function tambahBuku() {
  const title = document.getElementById("judulBuku").value;
  const author = document.getElementById("penulisBuku").value;
  const year = document.getElementById("tahunBuku").value;
  var nyear=parseInt(year);
  const isCompleted = document.getElementById("tambahSelesai").checked;

  const generateId = generateID();
  const buatList = listBuku(generateId, title, author, nyear, isCompleted);
  buku.push(buatList);

  document.dispatchEvent(new Event(RENDER_EVENT));
  simpanBuku();
}

function simpanBuku() {
  if (cekStorage()) {
    const parsed = JSON.stringify(buku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(buku);
  const belumSelesai = document.getElementById("rakBelum");
  belumSelesai.innerHTML = "";

  const selesaiDibaca = document.getElementById("rakSudah");
  selesaiDibaca.innerHTML = "";

  for (const itemBuku of buku) {
    const elemenBuku = buatBuku(itemBuku);
    if (!itemBuku.isCompleted) belumSelesai.append(elemenBuku);
    else selesaiDibaca.append(elemenBuku);
  }
});

cSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  const cJudul = document.querySelector("#cariJudul");
  const hasil = document.querySelector('.pencarian .listBuku');

  hasil.innerHTML = "";
  hasil.innerHTML += `<p>Hasil Pencarian Buku dengan Judul <b>${cJudul.value}</b></p>`;

  for (const objekBuku of buku) {
    if (objekBuku.title.toLowerCase().includes(cJudul.value.toLowerCase())) {
      if (objekBuku.isComplete === true) {
        const judul = document.createElement("h3");
        judul.innerText = objekBuku.title;
        judul.classList.add("jBuku");

        const penulis = document.createElement("p");
        penulis.innerText = objekBuku.author;

        const tahun = document.createElement("p");
        tahun.innerText = objekBuku.year;

        const container = document.createElement("article");
        container.classList.add("buku");
        container.append(judul, penulis, tahun);
        container.setAttribute("id", `buku-${objekBuku.id}`);

        hasil.append(container);
      } else {
        const judul = document.createElement("h3");
        judul.innerText = objekBuku.title;
        judul.classList.add("jBuku");

        const penulis = document.createElement("p");
        penulis.innerText = objekBuku.author;

        const tahun = document.createElement("p");
        tahun.innerText = objekBuku.year;

        const container = document.createElement("article");
        container.classList.add("buku");
        container.append(judul, penulis, tahun);
        container.setAttribute("id", `buku-${objekBuku.id}`);

        hasil.append(container);
      }
    }
  }
});

function ambilData() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const buk of data) {
      buku.push(buk);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function buatBuku(objekBuku) {
  const judul = document.createElement("h3");
  judul.innerText = objekBuku.title;
  judul.classList.add("jBuku");

  const penulis = document.createElement("p");
  penulis.innerText = objekBuku.author;

  const tahun = document.createElement("p");
  tahun.innerText = objekBuku.year;

  const container = document.createElement("article");
  container.classList.add("buku");
  container.append(judul, penulis, tahun);
  container.setAttribute("id", `buku-${objekBuku.id}`);

  if (objekBuku.isCompleted) {
    const rmvBtn = document.createElement("button");
    rmvBtn.classList.add("remove");
    rmvBtn.innerText = "Belum Selesai Dibaca";
    rmvBtn.addEventListener("click", function () {
      removeBuku(objekBuku.id);
    });

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerText = "Hapus";
    delBtn.addEventListener("click", function () {
      deleteBuku(objekBuku.id);
    });

    const btn = document.createElement("div");
    btn.classList.add("btn");
    btn.append(rmvBtn, delBtn);

    container.append(btn);
  } else {
    const addBtn = document.createElement("button");
    addBtn.classList.add("add");
    addBtn.innerText = "Selesai Dibaca";
    addBtn.addEventListener("click", function () {
      addBuku(objekBuku.id);
    });

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerText = "Hapus";
    delBtn.addEventListener("click", function () {
      deleteBuku(objekBuku.id);
    });

    const btn = document.createElement("div");
    btn.classList.add("btn");
    btn.append(addBtn, delBtn);

    container.append(btn);
  }
  return container;
}

function cariBuku(idBuku) {
  for (const itemBuku of buku) {
    if (itemBuku.id === idBuku) {
      return itemBuku;
    }
  }
  return null;
}

function cariIndex(idBuku) {
  for (const index in buku) {
    if (buku[index].id === idBuku) {
      return index;
    }
  }
  return -1;
}

function saveData() {
  if (cekStorage()) {
    const parsed = JSON.stringify(buku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function removeBuku(idBuku) {
  const targetBuku = cariBuku(idBuku);

  if (targetBuku == null) return;

  targetBuku.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBuku(idBuku) {
  const targetBuku = cariBuku(idBuku);

  if (targetBuku == null) return;

  targetBuku.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function deleteBuku(idBuku) {
  const targetBuku = cariIndex(idBuku);

  if (targetBuku == -1) return;

  buku.splice(targetBuku, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
