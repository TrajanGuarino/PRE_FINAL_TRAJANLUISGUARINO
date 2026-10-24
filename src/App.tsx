
import { useMemo, useState } from "react";
import "./App.css";

type Category = "Perfume" | "Gym Tools" | "Protein Powders" | "Shoes";

type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  specifications: string[];
  image: string;
  rating: number;
  reviews: number;
  price: number;
  stock: number;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Bleu de Chanel",
    category: "Perfume",
    description: "A fresh, woody fragrance with a clean and confident character.",
    specifications: ["Fresh woody scent", "Elegant glass bottle", "For everyday or evening wear"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL5lRMdnLaTeuQONgb-PKmFH0o5h_-2Aj-GPLQU4Cb3A&s=10",
    rating: 4.8,
    reviews: 120,
    price: 4500,
    stock: 6,
  },
  {
    id: 2,
    name: "Adjustable Dumbbells",
    category: "Gym Tools",
    description: "A versatile strength-training set for home workouts.",
    specifications: ["Adjustable weight design", "Textured grip handles", "For strength training"],
    // Change this URL if the product image does not load.
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85",
    rating: 4.7,
    reviews: 98,
    price: 3800,
    stock: 8,
  },
  {
    id: 3,
    name: "Gold Standard Whey Protein",
    category: "Protein Powders",
    description: "A convenient protein powder to complement your training and recovery routine.",
    specifications: ["Protein supplement", "Mix with water or milk", "Follow the product label for serving guidance"],
    // Change this URL if the product image does not load.
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=85",
    rating: 4.9,
    reviews: 200,
    price: 2950,
    stock: 5,
  },
  {
    id: 4,
    name: "Nike Downshifter 12",
    category: "Shoes",
    description: "Running shoes for training and casual wear.",
    specifications: ["Breathable upper", "Cushioned midsole", "Running and everyday use"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWPmAvfLpMJpTCPFgTGERYTka1HxiqpVU6hAMcem6Jsw&s=10",
    rating: 4.6,
    reviews: 150,
    price: 3200,
    stock: 7,
  },
  {
    id: 5,
    name: "Versace Eros",
    category: "Perfume",
    description: "A bold fragrance choice for nights out and special occasions.",
    specifications: ["Distinctive fragrance profile", "Statement bottle", "For evening wear"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SfSYfwMu62Xukx8soyomwxo7mUCB4ksbaJU22G8ZFw&s=10",
    rating: 4.7,
    reviews: 95,
    price: 4200,
    stock: 4,
  },
  {
    id: 6,
    name: "Resistance Bands Set",
    category: "Gym Tools",
    description: "Portable resistance bands for warmups, mobility, and home workouts.",
    specifications: ["Multiple resistance levels", "Lightweight and portable", "Useful for full-body workouts"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEF80fly3eQHInW-ME_f56I-7VLhGsOjZqAE8W-7LoQ&s=10",
    rating: 4.5,
    reviews: 80,
    price: 1200,
    stock: 12,
  },
  {
    id: 7,
    name: "Dymatize ISO100",
    category: "Protein Powders",
    description: "A protein supplement to complement a balanced diet.",
    specifications: ["Protein supplement", "Mix according to package directions", "Check ingredients and allergens"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3hLZBewWRw9rQQtCzXvktg2LHYHdV5prWmnmksVgw6g&s",
    rating: 4.8,
    reviews: 160,
    price: 3500,
    stock: 6,
  },
  {
    id: 8,
    name: "Everyday Running Shoes",
    category: "Shoes",
    description: "Athletic shoes for walks, runs, and gym sessions.",
    specifications: ["Sport-inspired design", "Cushioned sole", "For training and casual use"],
    // Change this URL if the product image does not load.
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCHwbfkh6MjhgiGZeOzKCcRK67bR4z5ppRqteQpKMSg&s=10",
    rating: 4.6,
    reviews: 112,
    price: 2800,
    stock: 14,
  },
];

const categories: Array<"All" | Category> = [
  "All",
  "Perfume",
  "Gym Tools",
  "Protein Powders",
  "Shoes",
];

const peso = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] =
    useState<"All" | Category>("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatches =
        activeCategory === "All" ||
        product.category === activeCategory;

      const searchMatches =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return categoryMatches && searchMatches;
    });
  }, [products, activeCategory, search]);

  const cartProducts = products.filter(
    (product) => (cart[product.id] ?? 0) > 0,
  );

  const totalItems = cartProducts.reduce(
    (sum, product) => sum + (cart[product.id] ?? 0),
    0,
  );

  const totalPrice = cartProducts.reduce(
    (sum, product) =>
      sum + product.price * (cart[product.id] ?? 0),
    0,
  );

  function changeQuantity(productId: number, amount: number) {
    const product = products.find(
      (item) => item.id === productId,
    );

    if (!product) return;

    setCart((current) => {
      const nextQuantity = Math.max(
        0,
        Math.min(
          product.stock,
          (current[productId] ?? 0) + amount,
        ),
      );

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });

    setNotice("");
  }

  function addToCart(product: Product) {
    if (product.stock <= 0) {
      setNotice(`${product.name} is out of stock.`);
      return;
    }

    if ((cart[product.id] ?? 0) >= product.stock) {
      setNotice(`You have reached the available stock for ${product.name}.`);
      return;
    }

    changeQuantity(product.id, 1);
    setNotice(`${product.name} added to your cart.`);
  }

  function buyNow() {
    if (totalItems === 0) {
      setNotice("Your cart is empty. Add a product before checking out.");
      return;
    }

    // Deduct the purchased quantity from each product's inventory.
    setProducts((current) =>
      current.map((product) => ({
        ...product,
        stock: Math.max(
          0,
          product.stock - (cart[product.id] ?? 0),
        ),
      })),
    );

    // Clear the cart after the purchase.
    setCart({});
    setSelectedProduct(null);
    setShowCart(false);
    setNotice("");
    setShowThankYou(true);
  }

  function returnHome() {
    setShowThankYou(false);
    setActiveCategory("All");
    setSearch("");
    setSelectedProduct(null);
    setShowCart(false);
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="store-app">
      <header className="topbar">
        <button
          className="brand"
          onClick={returnHome}
          aria-label="FitLife Store home"
        >
          <span className="brand-mark">✚</span>

          <span className="brand-copy">
            <strong>
              FitLife <em>Store</em>
            </strong>
            <small>Look Good · Feel Strong · Live Better</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <button className="nav-link active" onClick={returnHome}>
            ⌂ <span>Home</span>
          </button>

          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            ▦ <span>Products</span>
          </button>

          <button
            className="nav-link"
            onClick={() => setShowCart(true)}
          >
            🛒 <span>Cart</span>
            {totalItems > 0 && (
              <b className="cart-badge">{totalItems}</b>
            )}
          </button>

          <button
            className="nav-link"
            onClick={() =>
              setNotice(
                "FitLife Store — your destination for fragrance, fitness, supplements, and shoes.",
              )
            }
          >
            ⓘ <span>About</span>
          </button>
        </nav>

        <label className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>
      </header>

      <main className="page-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">WELCOME TO FITLIFE</p>

            <h1>
              Your Goals, <span>Our Products</span>
            </h1>

            <p className="hero-description">
              Premium perfumes, gym essentials, protein powders,
              <br className="desktop-break" /> and quality shoes — all in one place.
            </p>

            <button
              className="primary-button shop-button"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now <span>→</span>
            </button>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-circle circle-one" />
            <div className="hero-circle circle-two" />
            <div className="hero-symbol">✦</div>
            <div className="hero-emoji">🏋️‍♂️</div>
            <div className="hero-emoji shoe-emoji">👟</div>
            <div className="hero-emoji bottle-emoji">🧴</div>
          </div>
        </section>

        <section className="store-layout" id="products">
          <div className="catalog">
            <div
              className="category-row"
              aria-label="Filter products by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-pill ${
                    activeCategory === category ? "selected" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === "All"
                    ? "✦"
                    : category === "Perfume"
                      ? "♧"
                      : category === "Gym Tools"
                        ? "⚒"
                        : category === "Protein Powders"
                          ? "♜"
                          : "⌁"}

                  <span>{category}</span>
                </button>
              ))}
            </div>

            <div className="section-heading">
              <div>
                <p className="eyebrow">FIND YOUR FAVORITES</p>
                <h2>Featured Products</h2>
              </div>

              <span className="result-count">
                {visibleProducts.length} products
              </span>
            </div>

            {notice && (
              <div className="notice" role="status">
                {notice}
                <button
                  onClick={() => setNotice("")}
                  aria-label="Dismiss notice"
                >
                  ×
                </button>
              </div>
            )}

            {visibleProducts.length === 0 ? (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No products found</h3>
                <p>Try another search or category.</p>
              </div>
            ) : (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <button
                      className="product-image-button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                      <span className="category-tag">
                        {product.category}
                      </span>
                    </button>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <button
                        className="product-name"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </button>

                      <div className="rating">
                        <span>★</span> {product.rating.toFixed(1)}
                        <small>({product.reviews})</small>
                      </div>

                      <div className="product-bottom">
                        <strong className="price">
                          {peso(product.price)}
                        </strong>

                        <button
                          className="add-cart-button"
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          🛒
                        </button>
                      </div>

                      <div
                        className={`stock-count ${
                          product.stock < 10
                            ? "stock-low"
                            : "stock-normal"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : `Stock: ${product.stock}`}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside
            className={`cart-panel ${
              showCart ? "cart-panel-open" : ""
            }`}
          >
            <div className="cart-heading">
              <h2>
                🛒 Your Cart{" "}
                <span className="cart-badge">{totalItems}</span>
              </h2>

              <button
                className="mobile-close"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="cart-empty">
                <span>🛍️</span>
                <strong>Your cart is empty</strong>
                <p>Add something you love.</p>
              </div>
            ) : (
              <div className="cart-items">
                {cartProducts.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <img src={product.image} alt="" />

                    <div className="cart-item-info">
                      <strong>{product.name}</strong>
                      <span>{peso(product.price)}</span>

                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            changeQuantity(product.id, -1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{cart[product.id]}</span>

                        <button
                          onClick={() =>
                            changeQuantity(product.id, 1)
                          }
                          disabled={
                            cart[product.id] >= product.stock
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        changeQuantity(
                          product.id,
                          -(cart[product.id] ?? 0),
                        )
                      }
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="cart-summary">
              <div>
                <span>Total ({totalItems} items)</span>
                <strong>{peso(totalPrice)}</strong>
              </div>

              <button
                className="primary-button buy-button"
                onClick={buyNow}
                disabled={totalItems === 0}
              >
                🛒 Buy Now <span>→</span>
              </button>

              <p className="secure-note">
                ✓ Inventory updates after checkout
              </p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          ✚ FitLife <span>Store</span>
        </div>
        <p>Look Good · Feel Strong · Live Better</p>
      </footer>

      {selectedProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              ×
            </button>

            <div className="modal-image-wrap">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
            </div>

            <div className="modal-details">
              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <div className="rating">
                <span>★</span> {selectedProduct.rating.toFixed(1)}
                <small>({selectedProduct.reviews} reviews)</small>
              </div>

              <strong className="modal-price">
                {peso(selectedProduct.price)}
              </strong>

              <p>{selectedProduct.description}</p>

              <strong>Specifications</strong>

              <ul>
                {selectedProduct.specifications.map(
                  (specification) => (
                    <li key={specification}>{specification}</li>
                  ),
                )}
              </ul>

              <div
                className={`stock-count modal-stock ${
                  selectedProduct.stock < 10
                    ? "stock-low"
                    : "stock-normal"
                }`}
              >
                {selectedProduct.stock === 0
                  ? "Out of stock"
                  : `Stock: ${selectedProduct.stock}`}
              </div>

              <div className="modal-actions">
                <button
                  className="primary-button"
                  onClick={() => addToCart(selectedProduct)}
                  disabled={selectedProduct.stock === 0}
                >
                  Add to Cart
                </button>

                <button
                  className="secondary-button"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setShowCart(true);
                  }}
                  disabled={selectedProduct.stock === 0}
                >
                  View Cart
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {showThankYou && (
        <div className="modal-backdrop thank-backdrop">
          <section
            className="thank-you-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
          >
            <div className="success-icon">✓</div>
            <h2 id="thank-you-title">Thank You!</h2>
            <p>Your purchase has been completed successfully.</p>
            <p className="thank-subtext">
              Your cart is cleared and the inventory has been updated.
            </p>

            <button
              className="primary-button okay-button"
              onClick={returnHome}
            >
              Okay
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
