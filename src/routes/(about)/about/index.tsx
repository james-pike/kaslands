import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";

export default component$(() => {
  return (
    <div class="max-w-6xl mx-3 md:mx-auto px-3 md:px-0 py-4 mb-4">
      {/* Hero Section */}
      <div class="bg-black/80 rounded-xl p-5 md:p-8 mb-4 border-2 border-pink-500/30">
        <h1 class="text-3xl md:text-5xl font-bold text-white md:neon-text mb-3 text-center">
          Welcome to Kaslands
        </h1>
        <p class="text-lg text-white/90 text-center max-w-3xl mx-auto">
          A vibrant NFT ecosystem built on Kaspa, where art meets innovation and community drives creativity.
        </p>
      </div>

      {/* Section 1 - Text Left, Image Right */}
      <div class="grid md:grid-cols-2 gap-4 mb-4 items-center">
        <div class="bg-black/80 rounded-xl p-5 md:p-6 border-2 border-pink-500/20">
          <h2 class="text-3xl font-bold text-white md:neon-text mb-4">
            The Vision
          </h2>
          <p class="text-white/90 mb-4 leading-relaxed">
            Kaslands is more than just an NFT collection—it's a creative vision brought to life on the Kaspa blockchain.
            Founded by Jules, an artist and entrepreneur passionate about 80s culture, family, and adventure, Kaslands
            represents the fusion of retro aesthetics with cutting-edge web3 technology.
          </p>
          <p class="text-white/90 leading-relaxed">
            Our mission is to create a lasting legacy in the Kaspa ecosystem, bringing excitement, art, and
            community together in unique and innovative ways.
          </p>
        </div>
        <div class="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-2 border-2 border-pink-500/30">
          <div class="bg-black/60 rounded-lg h-64 md:h-80 flex items-center justify-center">
            <img
              src="/images/sticker.webp"
              alt="Kaslands Vision"
              class="w-48 h-48 object-contain opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Section 2 - Image Left, Text Right */}
      <div class="grid md:grid-cols-2 gap-4 mb-4 items-center">
        <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-2 border-2 border-pink-500/30 order-2 md:order-1">
          <div class="bg-black/60 rounded-lg h-48 md:h-64 flex items-center justify-center">
            <div class="text-center p-8">
              <div class="text-6xl mb-4">🎨</div>
              <p class="text-white/80 text-lg">Art & Creativity</p>
            </div>
          </div>
        </div>
        <div class="bg-black/80 rounded-xl p-5 md:p-6 border-2 border-pink-500/20 order-1 md:order-2">
          <h2 class="text-2xl font-bold text-white md:neon-text mb-3">
            The Art
          </h2>
          <p class="text-white/90 mb-4 leading-relaxed">
            Each Kaslands collection is carefully curated and created by hiring talented artists and skilled
            professionals who bring unique visions to life. From photography-based pieces to hand-drawn sketches,
            every piece tells a story.
          </p>
          <p class="text-white/90 leading-relaxed">
            We believe in fair launches and community-first approach, ensuring that everyone has an equal
            opportunity to be part of the Kaslands journey.
          </p>
        </div>
      </div>

      {/* Section 3 - Text Left, Image Right */}
      <div class="grid md:grid-cols-2 gap-4 mb-4 items-center">
        <div class="bg-black/80 rounded-xl p-5 md:p-6 border-2 border-pink-500/20">
          <h2 class="text-2xl font-bold text-white md:neon-text mb-3">
            The Community
          </h2>
          <p class="text-white/90 mb-4 leading-relaxed">
            Kaslands is built on the belief that we're in the early stages of Kaspa's growth—similar to
            Ethereum's early days. This presents an incredible opportunity for collectors, artists, and
            enthusiasts to be part of something special from the ground up.
          </p>
          <p class="text-white/90 leading-relaxed">
            Join us in building a vibrant community where creativity thrives, collaboration is encouraged,
            and lasting connections are made. Together, we're shaping the future of NFTs on Kaspa.
          </p>
        </div>
        <div class="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-2 border-2 border-pink-500/30">
          <div class="bg-black/60 rounded-lg h-48 md:h-64 flex items-center justify-center">
            <div class="text-center p-8">
              <div class="text-6xl mb-4">🤝</div>
              <p class="text-white/80 text-lg">Building Together</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div class="bg-gradient-to-r from-pink-600/40 to-purple-600/40 rounded-xl p-5 md:p-8 border-2 border-pink-500/30 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to Join Kaslands?
        </h2>
        <p class="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
          Explore our collections, connect with the community, and be part of the legacy we're building on Kaspa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
          >
            View Collections
          </a>
          <a
            href="/faq"
            class="bg-black/60 hover:bg-black/80 border-2 border-pink-500/50 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: `About - ${SITE.title}`,
  meta: [
    {
      name: "description",
      content: "Learn about Kaslands - a vibrant NFT ecosystem built on Kaspa, where art meets innovation and community drives creativity.",
    },
  ],
};