(function () {
  "use strict";

  var PRODUCTS = [
    { id: "mug", name: "Ceramic Mug", price: 12, desc: "Matte black mug for late-night debugging." },
    { id: "sticker", name: "Bug Sticker Pack", price: 5, desc: "Five stickers. Zero production bugs guaranteed." },
    { id: "hoodie", name: "Trace Hoodie", price: 48, desc: "Soft hoodie with a tiny playwright mask." },
  ];

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem("shoplite-cart") || "[]");
    } catch (e) {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem("shoplite-cart", JSON.stringify(items));
    updateBadge();
  }

  function updateBadge() {
    var el = document.getElementById("cartBadge");
    if (!el) return;
    var n = readCart().reduce(function (s, i) { return s + i.qty; }, 0);
    el.textContent = String(n);
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("shoplite-user") || "null");
    } catch (e) {
      return null;
    }
  }

  function setUser(user) {
    if (user) localStorage.setItem("shoplite-user", JSON.stringify(user));
    else localStorage.removeItem("shoplite-user");
  }

  window.ShopLite = {
    PRODUCTS: PRODUCTS,
    readCart: readCart,
    writeCart: writeCart,
    addToCart: function (id) {
      var p = PRODUCTS.find(function (x) { return x.id === id; });
      if (!p) return;
      var cart = readCart();
      var row = cart.find(function (x) { return x.id === id; });
      if (row) row.qty += 1;
      else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
      writeCart(cart);
    },
    clearCart: function () { writeCart([]); },
    getUser: getUser,
    setUser: setUser,
    login: function (email, password) {
      if (!email || !password) return { ok: false, error: "Email and password are required." };
      if (password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
      // Demo credentials: any email + password "playwright"
      if (password !== "playwright") return { ok: false, error: "Invalid credentials. Hint: password is playwright" };
      var user = { email: email, name: email.split("@")[0] || "Tester" };
      setUser(user);
      return { ok: true, user: user };
    },
    logout: function () { setUser(null); },
    cartTotal: function () {
      return readCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    },
  };

  updateBadge();
})();
