const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];

const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);

const divProduk = document.getElementsByClassName("div-produk");


  data.forEach((item) => {
    // Menampilkan produk di dalam div-produk
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });

  // Inisialisasi event listener untuk tombol "tambah ke keranjang"
  let totalKeranjang = document.getElementsByClassName("cart_count")[0];
  const btnAddCart = document.getElementsByTagName("button");

  Array.from(btnAddCart).forEach ((tombol) => {
    tombol.addEventListener("click", function () {
      // ambil title, category, dan description terdekat dari tombol yang di klik
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol.closest("div").querySelector(".description").innerText;

      // Tambah informasi produk ke dalam array keranjang
      cart.push({ "title": title, "category": category, "description": description });

      // update total keranjang
      updateCartCount();
    });
  });
};
ambilData();

// Fungsi untuk memperbarui jumlah total keranjang
const updateCartCount = () => {
  const totalKeranjang = document.getElementsByClassName("cart_count")[0];
  totalKeranjang.innerText = cart.length;
};

// Event listener untuk tombol "tutup"
const modalKeranjang = document.querySelector('.modal');
const btnTutup = document.querySelector('.btn-tutup');
btnTutup.addEventListener("click", () => {
  modalKeranjang.classList.add("hidden");
});

// Event listener untuk tautan "keranjang"
const btnTampilKeranjang = document.querySelector('.tampil-keranjang');
const keranjangAnda = document.querySelector('.keranjang-anda');
btnTampilKeranjang.addEventListener("click", () => {
  // Tampilan modal dan isi dengan barang di keranjang
  modalKeranjang.classList.remove("hidden");
  keranjangAnda.innerHTML = '';

  cart.forEach((item, index) => {
    keranjangAnda.innerHTML += `
      <div class="bg-white rounded my-3 p-3">
        <span class="block font-bold text-xl">${item.title}</span>
        <span class="block font-semibold text-md">${item.category}</span>
        <button class="remove-item bg-red-500 px-3 py-1 rounded text-white" data-index="${index}">Hapus Pesanan</button>
      </div>
    `;
  });

  // Add event listener for the "Hapus Pesanan" (Remove Item) button
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Ambil indeks item yang akan dihapus
      const indexToRemove = parseInt(this.getAttribute('data-index'), 10);
      // Hapus item dari array keranjang
      cart.splice(indexToRemove, 1); 
      // Perbarui total keranjang
      updateCartCount();
      // Re-render modal setelah menghapus item
      btnTampilKeranjang.click();
    });
  });
});

// Seleksi elemen pencarian
const searchBar = document.querySelector(".searchbar");
// Menambahkan event listener untuk pencarian
searchBar.addEventListener("keyup", (e) => {
  // Memproses input pencarian
  let namaBarang = e.target.value.toLowerCase();
  // Mencari produk yang cocok
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  // Menampilkan hasil pencarian
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    // Memperbarui tampilan produk
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });
});
