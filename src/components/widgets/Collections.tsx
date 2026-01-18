import { component$, useSignal, useComputed$ } from '@builder.io/qwik';
import { Card } from '../ui/Card';
import Heading from '../Heading';

// Define allowed rarity values
type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

// Define item type
interface CollectionItem {
  id: number;
  name: string;
  rarity: Rarity;
  collection: string;
  image: string;
}

// Gun collection data derived from image filenames
const initialCollectionItems: CollectionItem[] = [
  { id: 1, name: 'AK-47 Ice', rarity: 'Epic', collection: 'Guns', image: '/images/guns/AK-47-ICE.PNG' },
  { id: 2, name: 'AK-74 Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/AK-74-LEGENDARY.PNG' },
  { id: 3, name: 'AK Silenced', rarity: 'Rare', collection: 'Guns', image: '/images/guns/AK-SILENCED.PNG' },
  { id: 4, name: 'AR-15', rarity: 'Common', collection: 'Guns', image: '/images/guns/AR-15-.PNG' },
  { id: 5, name: 'AR-15 V1', rarity: 'Common', collection: 'Guns', image: '/images/guns/AR-15-1.PNG' },
  { id: 6, name: 'AR-15 V2', rarity: 'Common', collection: 'Guns', image: '/images/guns/AR-15-2.PNG' },
  { id: 7, name: 'AR-15 V3', rarity: 'Common', collection: 'Guns', image: '/images/guns/AR-15-3.PNG' },
  { id: 8, name: 'AR-15 V4', rarity: 'Common', collection: 'Guns', image: '/images/guns/AR-15-4.PNG' },
  { id: 9, name: 'AR-15 ACOG', rarity: 'Rare', collection: 'Guns', image: '/images/guns/AR-15-ACOG.PNG' },
  { id: 10, name: 'AR-15 Desert', rarity: 'Rare', collection: 'Guns', image: '/images/guns/AR-15-DESERT.PNG' },
  { id: 11, name: 'AR-15 Gold Snow', rarity: 'Epic', collection: 'Guns', image: '/images/guns/AR-15-GOLD-SNOW.PNG' },
  { id: 12, name: 'AR-15 Ice', rarity: 'Epic', collection: 'Guns', image: '/images/guns/AR-15-ICE.PNG' },
  { id: 13, name: 'AR-15 Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/AR-15-LEGENDARY.PNG' },
  { id: 14, name: 'BAR', rarity: 'Common', collection: 'Guns', image: '/images/guns/BAR.PNG' },
  { id: 15, name: 'Barrett 50 Cal', rarity: 'Rare', collection: 'Guns', image: '/images/guns/BARRETT-50CAL.PNG' },
  { id: 16, name: 'Black AK V1', rarity: 'Common', collection: 'Guns', image: '/images/guns/BLACK-AK-1.PNG' },
  { id: 17, name: 'Black AK V2', rarity: 'Common', collection: 'Guns', image: '/images/guns/BLACK-AK-2.PNG' },
  { id: 18, name: 'Black AK V3', rarity: 'Common', collection: 'Guns', image: '/images/guns/BLACK-AK-3.PNG' },
  { id: 19, name: 'Black AK V4', rarity: 'Common', collection: 'Guns', image: '/images/guns/BLACK-AK-4.PNG' },
  { id: 20, name: 'Black AK V5', rarity: 'Common', collection: 'Guns', image: '/images/guns/BLACK-AK-5.PNG' },
  { id: 21, name: 'Black AK Ice', rarity: 'Epic', collection: 'Guns', image: '/images/guns/BLACK-AK-ICE.PNG' },
  { id: 22, name: 'Desert AK', rarity: 'Rare', collection: 'Guns', image: '/images/guns/DESERT-AK.PNG' },
  { id: 23, name: 'Dragunov V1', rarity: 'Common', collection: 'Guns', image: '/images/guns/Dragunov-1.PNG' },
  { id: 24, name: 'Dragunov V2', rarity: 'Common', collection: 'Guns', image: '/images/guns/Dragunov-2.PNG' },
  { id: 25, name: 'Dragunov V3', rarity: 'Common', collection: 'Guns', image: '/images/guns/Dragunov-3.PNG' },
  { id: 26, name: 'Dragunov V4', rarity: 'Common', collection: 'Guns', image: '/images/guns/Dragunov-4.PNG' },
  { id: 27, name: 'Dragunov V5', rarity: 'Common', collection: 'Guns', image: '/images/guns/Dragunov-5.PNG' },
  { id: 28, name: 'Gold AK', rarity: 'Epic', collection: 'Guns', image: '/images/guns/GOLD-AK.PNG' },
  { id: 29, name: 'Gold MAC-11', rarity: 'Epic', collection: 'Guns', image: '/images/guns/GOLD-MAC11.PNG' },
  { id: 30, name: 'Gold Plated AK V2', rarity: 'Epic', collection: 'Guns', image: '/images/guns/Gold_plated_AK2.PNG' },
  { id: 31, name: 'Gold Plated AK V3', rarity: 'Epic', collection: 'Guns', image: '/images/guns/Gold_plated_AK3.PNG' },
  { id: 32, name: 'Gold Plated AK V4', rarity: 'Epic', collection: 'Guns', image: '/images/guns/Gold_plated_AK4.PNG' },
  { id: 33, name: 'Gold Plated AK V5', rarity: 'Epic', collection: 'Guns', image: '/images/guns/Gold_plated_AK5.PNG' },
  { id: 34, name: 'Gold Tommy Gun', rarity: 'Epic', collection: 'Guns', image: '/images/guns/GOLD-TOMMY-GUN.PNG' },
  { id: 35, name: 'M16', rarity: 'Common', collection: 'Guns', image: '/images/guns/M16.PNG' },
  { id: 36, name: 'M16 Jungle', rarity: 'Rare', collection: 'Guns', image: '/images/guns/M16-JUNGLE.PNG' },
  { id: 37, name: 'M16 Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/M16-LEGENDARY.PNG' },
  { id: 38, name: 'MAC-11 Desert', rarity: 'Rare', collection: 'Guns', image: '/images/guns/MAC11-DESERT.PNG' },
  { id: 39, name: 'MAC-11 Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/MAC11-LEGENDARY.PNG' },
  { id: 40, name: 'MP5', rarity: 'Common', collection: 'Guns', image: '/images/guns/MP5.PNG' },
  { id: 41, name: 'MP5 Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/MP5-LEGENDARY.PNG' },
  { id: 42, name: 'MP5 Snow', rarity: 'Rare', collection: 'Guns', image: '/images/guns/MP5-SNOW.PNG' },
  { id: 43, name: 'MP40 Bar', rarity: 'Rare', collection: 'Guns', image: '/images/guns/MP40-BAR.PNG' },
  { id: 44, name: 'MP40 German', rarity: 'Rare', collection: 'Guns', image: '/images/guns/MP40-GERMAN.PNG' },
  { id: 45, name: 'MP40 Wood', rarity: 'Rare', collection: 'Guns', image: '/images/guns/MP40-WOOD.PNG' },
  { id: 46, name: 'OG AK', rarity: 'Common', collection: 'Guns', image: '/images/guns/OG-AK.PNG' },
  { id: 47, name: 'PPSH-41', rarity: 'Common', collection: 'Guns', image: '/images/guns/PPSH-41.PNG' },
  { id: 48, name: 'PPSH-41 Custom', rarity: 'Rare', collection: 'Guns', image: '/images/guns/PPSH-41-CUSTOM.PNG' },
  { id: 49, name: 'PPSH-41 Snow', rarity: 'Rare', collection: 'Guns', image: '/images/guns/PPSH-41-SNOW.PNG' },
  { id: 50, name: 'PTR-91', rarity: 'Common', collection: 'Guns', image: '/images/guns/PTR-91.PNG' },
  { id: 51, name: 'PTR-91 Black', rarity: 'Rare', collection: 'Guns', image: '/images/guns/PTR-91-BLACK.PNG' },
  { id: 52, name: 'Saiga-12', rarity: 'Common', collection: 'Guns', image: '/images/guns/SAIGA-12.PNG' },
  { id: 53, name: 'SCAR Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/SCAR-LEGENDARY.PNG' },
  { id: 54, name: 'Sniper Desert', rarity: 'Rare', collection: 'Guns', image: '/images/guns/SNIPER-DESERT.PNG' },
  { id: 55, name: 'Sniper Ice', rarity: 'Epic', collection: 'Guns', image: '/images/guns/SNIPER-ICE.PNG' },
  { id: 56, name: 'Thompson', rarity: 'Common', collection: 'Guns', image: '/images/guns/THOMPSON.PNG' },
  { id: 57, name: 'Thompson Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/THOMPSON-LEGENDARY.PNG' },
  { id: 58, name: 'UZI', rarity: 'Common', collection: 'Guns', image: '/images/guns/UZI.PNG' },
  { id: 59, name: 'UZI Legendary', rarity: 'Legendary', collection: 'Guns', image: '/images/guns/UZI-LEGENDARY.PNG' },
  { id: 60, name: 'OG AK Classic', rarity: 'Common', collection: 'Guns', image: '/images/guns/OG AK.PNG' },
];

export default component$(() => {
  const selectedCollection = useSignal('Guns');
  const sortBy = useSignal<'id' | 'rarity'>('id');
  const filterRarity = useSignal<Rarity | 'All'>('All');

  // Define rarity order for sorting
  const rarityOrder: Record<Rarity, number> = {
    Common: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
  };

  // Computed: filtered & sorted items
  const filteredItems = useComputed$(() => {
    return initialCollectionItems
      .filter((item) => item.collection === selectedCollection.value)
      .filter((item) => filterRarity.value === 'All' || item.rarity === filterRarity.value)
      .sort((a, b) => {
        if (sortBy.value === 'id') return a.id - b.id;
        if (sortBy.value === 'rarity') return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        return 0;
      });
  });

  const collections = ['Guns'];

  return (
    <Card.Root class="p-5 md:p-8 mb-0.5 pt-8 max-w-6xl rounded-xs rounded-t-none border-none md:mx-auto mx-[6px] bg-gray-900/60">
      {/* Mobile: Heading and Collection Selector on same line */}
      <div class="md:hidden flex justify-between items-center mb-4">
        <Heading />
        <select
          class="p-2 rounded bg-gray-900/60 border-none text-white text-sm"
          value={selectedCollection.value}
          onChange$={(e) =>
            (selectedCollection.value = (e.target as HTMLSelectElement).value)
          }
        >
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {` ${collection}`}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Just Heading */}
      <div class="hidden md:block">
        <Heading />
      </div>

      <div class="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside class="hidden md:block md:w-1/4 pr-4 border-r border-gray-700 overflow-y-auto">
          <div class="flex flex-col space-y-2">
            {collections.map((collection) => (
              <button
                key={collection}
                class={`p-3 text-left rounded-lg transition-colors duration-150 ${
                  selectedCollection.value === collection
                    ? 'bg-pink-600/50 text-white'
                    : 'bg-gray-900/70 text-gray-300 hover:bg-gray-700'
                }`}
                onClick$={() => (selectedCollection.value = collection)}
              >
                 {collection}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main class="w-full md:w-3/4 md:pl-4 flex flex-col md:-mt-14">
          {/* Filtering and Sorting Controls */}
          <div class="flex justify-between gap-3 mb-4 flex-none">
            <div class="flex items-center gap-2">
              <label class="text-gray-300 text-sm whitespace-nowrap hidden sm:inline">Filter:</label>
              <select
                class="p-2 rounded bg-gray-900/60 border-none text-white text-sm"
                value={filterRarity.value}
                onChange$={(e) =>
                  (filterRarity.value = (e.target as HTMLSelectElement)
                    .value as Rarity | 'All')
                }
              >
                <option value="All">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <label class="text-gray-300 text-sm whitespace-nowrap hidden sm:inline">Sort:</label>
              <select
                class="p-2 rounded bg-gray-900/60 border-none text-white text-sm"
                value={sortBy.value}
                onChange$={(e) =>
                  (sortBy.value = (e.target as HTMLSelectElement).value as 'id' | 'rarity')
                }
              >
                <option value="id">ID</option>
                <option value="rarity">Rarity</option>
              </select>
            </div>
          </div>

          {/* Grid Container (scrollable area) */}
          <div class="flex-1 overflow-y-auto pr-2">
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredItems.value.length > 0 ? (
    filteredItems.value.map((item) => (
      <div
        key={item.id}
        class="bg-gray-800/95 rounded-lg text-white shadow-md hover:bg-gray-700 transition-colors duration-150 overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.name}
          class="w-full h-48 object-cover"
        />
        <div class="p-2">
          <h3 class="font-semibold text-base mb-1 truncate">{item.name.replace(/ Legendary$/, '')}</h3>
          <div class="flex justify-between flex-wrap gap-2 text-gray-300 text-xs">
            <span>ID: {item.id}</span>
            <span class={
              item.rarity === 'Legendary' ? 'text-orange-400' :
              item.rarity === 'Rare' ? 'text-yellow-400' :
              item.rarity === 'Epic' ? 'text-purple-400' :
              'text-gray-400'
            }>{item.rarity}</span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p class="text-gray-400 col-span-full text-center mt-6">
      No items found for this collection.
    </p>
  )}
</div>
          </div>
        </main>
      </div>

      {/* Bottom CTA Section */}
      <div class="mt-6">
        <div class="bg-gradient-to-r from-pink-600/40 to-purple-600/40 p-5 md:p-8 border-2 border-pink-500/30 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
            Join Kaslands
          </h2>
          <p class="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
            Explore collections, join our community and be a part of the legacy.
          </p>
        </div>
      </div>
    </Card.Root>
  );
});