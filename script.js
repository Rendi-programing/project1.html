const products = [
    { id: 1, name: "Es Campur", price: 5000, image: "images.jpeg" },
    { id: 2, name: "Gorengan", price: 1000, image: "images (1).jpeg" },
    { id: 3, name: "Roti Aoka", price: 2500, image: "download.jpeg" },
    { id: 4, name: "Mie Ayam", price: 7000, image: "images (2).jpeg" },
    { id: 5, name: "Nasi Goreng", price: 12000, image: "images (3).jpeg"}
  ];
  
  const cart = [];
  
  function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // clear before rendering
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
      `;
      productList.appendChild(div);
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
  
    renderCart();
  }
  
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    renderCart();
  }
  
  function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
  
    if (cart.length === 0) {
      cartDiv.innerHTML = "<p>Keranjang kosong.</p>";
      document.getElementById("total").innerText = "0";
      return;
    }
  
    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      const subtotal = item.price * item.qty;
      total += subtotal;
  
      itemDiv.innerHTML = `
        <span>${item.name} x ${item.qty}</span>
        <span>Rp ${subtotal}</span>
        <button onclick="removeFromCart(${item.id})">Hapus</button>
      `;
  
      cartDiv.appendChild(itemDiv);
    });
  
    document.getElementById("total").innerText = total;
  }
  
  // Inisialisasi
  renderProducts();
  
