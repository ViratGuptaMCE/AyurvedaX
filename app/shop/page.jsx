'use client'
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SimpleEcommerce() {
  // Sample product data with multiple images
  const products = [
    {
      id: 1,
      name: "Abhayarishta",
      price: 156,
      images: [
        "/images/ayur/abhay1.jpg",
        "/images/ayur/abhay2.png",
        "/images/ayur/abhay3.png",
      ],
      description:
        "It is used for mild to moderate constipation, reducing hard stools in piles and anal fissures. It is also helpful in gas, flatulence, abdominal distension and dysuria. It increases appetite and improves digestion.",
      sizes: [
        "Piles",
        "Anal Fissure",
        "Constipation",
        "Bloating",
        "Flatulence",
      ],
      category: "For All",
    },
    {
      id: 2,
      name: "Arvindasava",
      price: 120,
      images: [
        "/images/ayur/arvind1.jpg",
        "/images/ayur/arvind2.png",
        "/images/ayur/arvind3.webp",
      ],
      description:
        "It improves appetite and increases physical and mental strength. It promotes optimum growth and development of the child. In ayurveda, it is also recommended in the treatment of all types of health conditions or diseases",
      sizes: ["Rickets", "Indigestion", "bronchitis", "GRAHADOSHA"],
      category: "Children",
    },
    {
      id: 3,
      name: "Chandanasava ",
      price: 480,
      images: [
        "/images/ayur/chandan1.jpeg",
        "/images/ayur/chandan2.jpeg",
        "/images/ayur/chandan3.jpeg",
      ],
      description:
        "It is effective ayurvedic solution for burning micturition, urinary tract infections (UTI), pyuria, dysuria, hyperuricemia, kidney stones (renal calculi), cystitis, chronic kidney failure, pyospermia (leukocytospermia) and gonorrhea.",
      sizes: [
        "Pyuria",
        "Cystitis",
        "Hyperuricemia",
        "Gonorrhea",
        "Renal Calculi",
      ],
      category: "Adults",
    },
    {
      id: 4,
      name: "Lodhrasavam",
      price: 234.5,
      images: ["/images/ayur/lodh1.jpg", "/images/ayur/lodh3.webp"],
      description:
        "It is generally given along with Ashokarishta or Ashoka Bark Churna or in combination with Ashokarishta and Ushirasava or Arvindasava and Saraswatarishta.",
      sizes: ["Hemostatic", "Astringent", "Carminative", "Antihemorrhagic"],
      category: "Adults",
    },
    {
      id: 5,
      name: "Raktshodhakarishta ",
      price: 180,
      images: ["/images/ayur/rakt1.jpg", "/images/ayur/rakt2.webp"],
      description:
        "It detoxifies the blood and increases the excretion of the toxic or unwanted substances from the blood through the kidneys. It also has a diuretic action.",
      sizes: ["Depurative", "Eccritic", "Herpes", "Ringworm"],
      category: "All",
    },
    {
      id: 6,
      name: "Shringa Bhasma",
      price: 149.50,
      images: ["/images/ayur/shringa1.jpg", "/images/ayur/shringa2.webp"],
      description:
        "Shringa BhasmaShringa Bhasma is a calcined ayurvedic medicine used as expectorant. The expectorant action of Shringa Bhasma is comparable with all modern/allopathic expectorants.",
      sizes: ["Pyorrhea", "Influenza", "Angina "],
      category: "All",
    },
  ];

  // State management
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handlers
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setCurrentImageIndex(0);
  };

  const handleAddToCart = () => {
    const itemInCart = cart.find(
      (item) => item.id === selectedProduct.id && item.size === selectedSize
    );

    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === selectedProduct.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...selectedProduct,
          size: selectedSize,
          quantity: quantity,
          cartItemId: `${selectedProduct.id}-${selectedSize}`,
        },
      ]);
    }

    setSelectedProduct(null);
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleQuantityChange = (val) => {
    const newQuantity = quantity + val;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(
        (currentImageIndex + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + selectedProduct.images.length) %
          selectedProduct.images.length
      );
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Components
  const Header = () => (
    <header className="bg-neutral-200 shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-950 max-sm:text-2xl">
          VedaShop
        </h1>
        <button
          onClick={() => setShowCart(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );

  const ProductGrid = () => (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-lg font-bold">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ImageCarousel = ({ images }) => (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
      <img
        src={images[currentImageIndex]}
        alt="Product view"
        className="object-cover w-full h-full transition-opacity duration-200"
      />

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all shadow-md text-gray-700"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all shadow-md text-gray-700"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageIndex === index
                ? "bg-blue-600 w-4"
                : "bg-white bg-opacity-60 hover:bg-opacity-100"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  const ProductDetail = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageCarousel images={selectedProduct.images} />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProduct.name}
            </h2>
            <p className="text-2xl font-bold text-blue-600">
              ${selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-600">{selectedProduct.description}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 border rounded-md ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded-md w-min">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-6"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Cart = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            Your Cart ({itemCount} items)
          </h2>
          <button
            onClick={() => setShowCart(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-2">
          {cart.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => setShowCart(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <ChevronLeft size={16} className="mr-1" />
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="py-4 grid grid-cols-[80px,1fr,auto] gap-4"
                  >
                    <div className="aspect-square bg-gray-100 rounded overflow-hidden w-[50px] h-[50px]">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Size: {item.size} | Qty: {item.quantity}
                      </div>
                      <div className="mt-1 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.cartItemId)}
                      className="h-min p-1 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="py-4 border-t mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => setShowCart(false)}
                  className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-2 flex items-center justify-center"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <ProductGrid />
      {selectedProduct && <ProductDetail />}
      {showCart && <Cart />}
    </div>
  );
}
