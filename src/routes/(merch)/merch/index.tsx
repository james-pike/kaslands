import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/Card";
import { SITE } from "~/config.mjs";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  badge?: string;
  image?: string;
}

export default component$(() => {
  const products = useSignal<Product[]>([
    {
      id: 1,
      name: "Kaslands Hoodie",
      price: "0.025 KAS",
      description: "Premium quality hoodie with neon Kaslands logo. Ultra-soft cotton blend.",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Neon T-Shirt",
      price: "0.015 KAS",
      description: "Classic fit t-shirt featuring the iconic Kaslands neon design.",
    },
    {
      id: 3,
      name: "Collector's Pin Set",
      price: "0.008 KAS",
      description: "Limited edition enamel pin collection. Set of 5 unique designs.",
      badge: "Limited",
    },
    {
      id: 4,
      name: "Kaslands Cap",
      price: "0.012 KAS",
      description: "Adjustable snapback cap with embroidered logo. One size fits all.",
    },
    {
      id: 5,
      name: "Art Print Bundle",
      price: "0.020 KAS",
      description: "High-quality prints of our top NFT collections. Set of 3 prints.",
      badge: "New",
    },
    {
      id: 6,
      name: "Sticker Pack",
      price: "0.005 KAS",
      description: "Waterproof vinyl stickers featuring Kaslands art and logos.",
    },
  ]);

  return (
    <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl rounded-xl rounded-t-none border-none md:mx-auto mx-3 bg-gray-900/50">
      {/* Hero Section */}
      <div class="mb-4 text-center">
        {/* <h1 class="text-3xl md:text-5xl font-bold text-white md:neon-text mb-3">
          Kaslands Merch
        </h1> */}
        <p class="text-lg text-white/90 max-w-3xl mx-auto">
          Represent the Kaslands community with exclusive merchandise. All items are limited edition.
        </p>
        <div class="mt-4 inline-block bg-pink-600/20 border-2 border-pink-500/50 rounded-lg px-4 py-2">
          <p class="text-white/90 text-sm">
            🚀 <span class="font-semibold">Coming 2026</span> - Pre-orders opening soon!
          </p>
        </div>
      </div>

      {/* Featured Product Banner */}
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-xl p-2 border-2 border-pink-500/40">
          <div class="bg-black/70 rounded-lg h-full flex items-center justify-center p-8">
            <div class="text-center">
              <div class="text-8xl mb-4">👕</div>
              <p class="text-2xl font-bold text-white md:neon-text">Featured Item</p>
            </div>
          </div>
        </div>
        <div class="bg-black/80 rounded-xl p-5 md:p-6 border-2 border-pink-500/30 flex flex-col justify-center">
          <span class="inline-block bg-pink-600/40 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 w-fit">
            Best Seller
          </span>
          <h2 class="text-2xl font-bold text-white md:neon-text mb-3">
            Kaslands Hoodie
          </h2>
          <p class="text-white/90 mb-4 text-lg">
            Our signature hoodie featuring the iconic neon Kaslands logo. Made from premium cotton blend
            for ultimate comfort and style.
          </p>
          <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-bold text-pink-500">0.025 KAS</span>
            <span class="text-white/60 line-through text-lg">0.035 KAS</span>
          </div>
          <button class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg w-full md:w-auto">
            Notify When Available
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <h2 class="text-2xl font-bold text-white md:neon-text mb-4 text-center">
        All Products
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {products.value.map((product) => (
          <div
            key={product.id}
            class="bg-black/80 rounded-xl border-2 border-pink-500/20 overflow-hidden hover:border-pink-500/50 transition-all duration-300 group"
          >
            {/* Product Image Placeholder */}
            <div class="bg-gradient-to-br from-pink-500/20 to-purple-500/20 h-48 flex items-center justify-center relative">
              <div class="text-7xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                {product.id === 1 && "👕"}
                {product.id === 2 && "👔"}
                {product.id === 3 && "📍"}
                {product.id === 4 && "🧢"}
                {product.id === 5 && "🖼️"}
                {product.id === 6 && "✨"}
              </div>
              {product.badge && (
                <span class="absolute top-4 right-4 bg-pink-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div class="p-4">
              <h3 class="text-lg font-bold text-white mb-2">{product.name}</h3>
              <p class="text-white/80 mb-3 text-sm">{product.description}</p>
              <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-pink-500">{product.price}</span>
              </div>
              <button class="w-full bg-pink-600/40 hover:bg-pink-600/60 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 border-2 border-pink-500/30">
                Coming Soon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div class="bg-gradient-to-r from-pink-600/40 to-purple-600/40 rounded-xl p-5 md:p-8 border-2 border-pink-500/30 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
          Stay Updated
        </h2>
        <p class="text-white/90 mb-4 text-base max-w-2xl mx-auto">
          Be the first to know when our merch drops. Join our community and get exclusive early access.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg bg-black/60 border-2 border-pink-500/30 text-white placeholder-white/50 focus:outline-none focus:border-pink-500/60"
          />
          <button class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </Card.Root>
  );
});

export const head: DocumentHead = {
  title: `Merch - ${SITE.title}`,
  meta: [
    {
      name: "description",
      content: "Shop exclusive Kaslands merchandise. Limited edition apparel, accessories, and collectibles.",
    },
  ],
};