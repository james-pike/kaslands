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
}

// Sample collection data
const initialCollectionItems: CollectionItem[] = [
 
  { id: 1, name: 'Item A1', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 2, name: 'Item A2', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 3, name: 'Item A3', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 4, name: 'Item A4', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 5, name: 'Item A5', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 6, name: 'Item A6', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 7, name: 'Item A7', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 8, name: 'Item A8', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 9, name: 'Item A9', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 10, name: 'Item A10', rarity: 'Legendary', collection: 'Gun Collection V1' },
  { id: 11, name: 'Item A11', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 12, name: 'Item A12', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 13, name: 'Item A13', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 14, name: 'Item A14', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 15, name: 'Item A15', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 16, name: 'Item A16', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 17, name: 'Item A17', rarity: 'Common', collection: 'Gun Collection V1' },
  { id: 18, name: 'Item A18', rarity: 'Rare', collection: 'Gun Collection V1' },
  { id: 19, name: 'Item B1', rarity: 'Epic', collection: 'B' },
  { id: 20, name: 'Item C1', rarity: 'Legendary', collection: 'C' },
  { id: 21, name: 'Item D1', rarity: 'Common', collection: 'D' },
];

export default component$(() => {
  const selectedCollection = useSignal('Gun Collection V1');
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

  const collections = ['Gun Collection V1', 'B', 'C', 'D'];

  return (
    <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl rounded-xl rounded-t-none border-none md:mx-auto mx-3 bg-gray-900/50">
      {/* Mobile: Heading and Collection Selector on same line */}
      <div class="md:hidden flex justify-between items-center mb-4">
        <Heading />
        <select
          class="p-2 rounded bg-gray-900/50 text-white text-sm"
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
                    : 'bg-gray-900/80 text-gray-300 hover:bg-gray-700'
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
                class="p-2 rounded bg-gray-900/50 border-none text-white text-sm"
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
                class="p-2 rounded bg-gray-900/50 border-none text-white text-sm"
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
                      src={`https://picsum.photos/seed/${item.id}/400/500`}
                      alt={item.name}
                      class="w-full h-48 object-cover"
                    />
                    <div class="p-4">
                      <h3 class="font-semibold text-lg mb-1">{item.name}</h3>
                      <p class="text-gray-300 text-sm">Rarity: {item.rarity}</p>
                      <p class="text-gray-400 text-sm">ID: {item.id}</p>
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
    </Card.Root>
  );
});