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
  { id: 1, name: 'Item A1', rarity: 'Common', collection: 'A' },
  { id: 2, name: 'Item A2', rarity: 'Rare', collection: 'A' },
  { id: 3, name: 'Item B1', rarity: 'Epic', collection: 'B' },
  { id: 4, name: 'Item C1', rarity: 'Legendary', collection: 'C' },
  { id: 5, name: 'Item D1', rarity: 'Common', collection: 'D' },
];

export default component$(() => {
  const selectedCollection = useSignal('A');
  const sortBy = useSignal('id');
  const filterRarity = useSignal<Rarity | 'All'>('All');

  // Define rarity order for sorting
  const rarityOrder: Record<Rarity, number> = {
    Common: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
  };

  // Computed property for filtered and sorted items
  const filteredItems = useComputed$(() => {
    return initialCollectionItems
      .filter(item => item.collection === selectedCollection.value)
      .filter(item => filterRarity.value === 'All' || item.rarity === filterRarity.value)
      .sort((a, b) => {
        if (sortBy.value === 'id') return a.id - b.id;
        if (sortBy.value === 'rarity') {
          return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        }
        return 0;
      });
  });

  const collections = ['A', 'B', 'C', 'D'];

  return (
    <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl !rounded-t-none border-none rounded-xl md:mx-auto mx-3 bg-black/50">
      <Heading />
      <div class="flex flex-row h-[calc(100vh-12rem)]">
        {/* Sidebar: 1/4 width */}
        <div class="w-1/4 pr-4 border-r border-gray-700">
          <div class="flex flex-col space-y-2">
            {collections.map(collection => (
              <button
                key={collection}
                class={`p-3 text-left rounded-lg transition-colors ${
                  selectedCollection.value === collection
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick$={() => (selectedCollection.value = collection)}
              >
                Collection {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: 3/4 width */}
        <div class="w-3/4 pl-4">
          {/* Filtering and Sorting Controls */}
          <div class="flex justify-between mb-4">
            <div>
              <label class="mr-2 text-gray-300">Filter by Rarity:</label>
              <select
                class="p-2 rounded bg-gray-800 text-white"
                value={filterRarity.value}
                onChange$={(e) => (filterRarity.value = (e.target as HTMLSelectElement).value as Rarity | 'All')}
              >
                <option value="All">All</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>
            <div>
              <label class="mr-2 text-gray-300">Sort by:</label>
              <select
                class="p-2 rounded bg-gray-800 text-white"
                value={sortBy.value}
                onChange$={(e) => (sortBy.value = (e.target as HTMLSelectElement).value)}
              >
                <option value="id">ID</option>
                <option value="rarity">Rarity</option>
              </select>
            </div>
          </div>

          {/* Grid of Collection Items */}
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-full">
            {filteredItems.value.length > 0 ? (
              filteredItems.value.map(item => (
                <div
                  key={item.id}
                  class="p-4 bg-gray-800 rounded-lg text-white"
                >
                  <h3 class="font-bold">{item.name}</h3>
                  <p>Rarity: {item.rarity}</p>
                  <p>ID: {item.id}</p>
                </div>
              ))
            ) : (
              <p class="text-gray-400">No items found for this collection.</p>
            )}
          </div>
        </div>
      </div>
    </Card.Root>
  );
});