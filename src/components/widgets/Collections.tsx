import { component$, useSignal, useComputed$, useVisibleTask$, $ } from '@builder.io/qwik';
import { Card } from '../ui/Card';
import Heading from '../Heading';

// Define allowed rarity values
type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Legendary';

// Define item type
interface CollectionItem {
  id: number;
  name: string;
  rarity: Rarity;
  collection: string;
  image: string;
  description: string;
}

// Gun collection data from metadata.json
const initialCollectionItems: CollectionItem[] = [
  { id: 1, name: 'EL CHAPO', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/1.jpg', description: 'This Sinaloa cartel firearm is covered in gold and contains high explosive incendiary rounds for the violent paramilitary group.' },
  { id: 2, name: 'RANGER', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/2.jpg', description: 'A resilient 5.56 rifle with a magnified scope out in Siberia' },
  { id: 3, name: "DRAGON'S BREATH", rarity: 'Common', collection: 'Firearms', image: '/images/guns/3.jpg', description: 'This Dragunov rifle scouts the forest using the PSO-1 scope along with its 7.62 Russian ammo.' },
  { id: 4, name: 'MERCENARY', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/4.jpg', description: 'This Barrett .50 caliber sniper rifle comes in desert tan for operations in the sand. Fights against the Insurgent and Rebel.' },
  { id: 5, name: 'EMERALD', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/5.jpg', description: 'This ptr-91 has a parkerized finish and green furniture. It delivers lethal accuracy on the ski resort.' },
  { id: 6, name: 'BULLSEYE', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/6.jpg', description: 'This precision target rifle chambered in .308 tends to have better than average accuracy for shooters.' },
  { id: 7, name: 'HAMMER', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/7.jpg', description: 'This saiga 12 gauge shotgun, sometimes referred to as the Ak Shotgun, is a semi-auto to full auto weapon used by deployable special forces in the coast guard.' },
  { id: 8, name: 'RATTLESNAKE', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/8.jpg', description: 'This FN SCAR developed for the elite provides exceptional performance and reliability with an interchangeable upper receiver & barrel for different missions.' },
  { id: 9, name: 'SUB-ZERO', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/9.jpg', description: 'This Barrett .50 caliber rifle comes in snow camouflage and withstands harsh conditions very well giving it an advantage with distance and adaptability over its opponents.' },
  { id: 10, name: 'CHICAGO TYPEWRITER', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/10.jpg', description: 'This chrome plated tommy gun is a fully automatic .45 that seeks trouble in the barren wasteland. Often used by gangsters and g-men in the 1920s.' },
  { id: 11, name: 'TRENCH SWEEPER', rarity: 'Common', collection: 'Firearms', image: '/images/guns/11.jpg', description: 'This classic tommy gun clears the jungle and trenches in warfare. A favorite during ww2.' },
  { id: 12, name: 'BIG MAC', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/12.jpg', description: 'The big mac is mostly used for gang violence but has extended range with the longer barrel for the sicarios as well.' },
  { id: 13, name: 'GANGLAND', rarity: 'Common', collection: 'Firearms', image: '/images/guns/13.jpg', description: "This basic uzi is notorious for violent gang activity from drive-bys to robbery and murder. It's your average weapon for cold blooded criminals." },
  { id: 14, name: 'BLACK BEAR', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/14.jpg', description: 'This modern ak-47 is equipped with a state of the art aim assisted optic for long distance targets. Special feature includes called in airstrike in background.' },
  { id: 15, name: 'TRAILBLAZER', rarity: 'Common', collection: 'Firearms', image: '/images/guns/15.jpg', description: 'This ppsh-41 dominates its rival mp40 with superior fire rate on the ski race' },
  { id: 16, name: 'ICEMAN', rarity: 'Common', collection: 'Firearms', image: '/images/guns/16.jpg', description: 'This ppsh-41 chambered in 7.62x25mm is highly resistant to the elements and has a very high fire rate at 900 rounds per minute.' },
  { id: 17, name: 'PAPASHA', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/17.jpg', description: 'This ppsh-41 was often nicknamed daddy or father in russian due to the play on the three-letter prefix ppsh and signified appreciation for the weapons reliability and effectiveness.' },
  { id: 18, name: 'PABLO', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/18.jpg', description: 'A customized gold plated tommy gun for an infamous cartel kingpin in an undisclosed location.' },
  { id: 19, name: 'DUTCH', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/19.jpg', description: "This m16A1 is equipped with an M203 grenade launcher for the ultimate battle against an ultimate Predator. There's something in those trees." },
  { id: 20, name: 'FREEDOM', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/20.jpg', description: 'This classic m16a1 delivers freedom and democracy for bureaucrats whenever and wherever its deployed.' },
  { id: 21, name: 'MILITIA', rarity: 'Common', collection: 'Firearms', image: '/images/guns/21.jpg', description: 'ar15 equipped with an adjustable scope, and suppressor in the grit' },
  { id: 22, name: "AMERICA'S RIFLE", rarity: 'Common', collection: 'Firearms', image: '/images/guns/22.jpg', description: 'This ar15 is equipped with an M203 grenade launcher making it easier to light up the forest when needed.' },
  { id: 23, name: 'DUKE', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/23.jpg', description: 'Hail to the king baby, this nostalgic gold plated uzi screams, "Come get some!"' },
  { id: 24, name: 'HANS', rarity: 'Common', collection: 'Firearms', image: '/images/guns/24.jpg', description: 'This standard mp5 is a classic used everywhere from nyc to the deep jungle by many.' },
  { id: 25, name: 'OPERATOR', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/25.jpg', description: 'This classic mp5 equipped with a red dot optic, and suppressor is perfect for any close quarters special operation.' },
  { id: 26, name: 'SPECIALIST', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/26.jpg', description: 'This mp5 has a special stock, optic, and fore grip designed for maximum concealment and quick draw making it perfect for surprising your guests.' },
  { id: 27, name: 'BIELSKI', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/27.jpg', description: 'This mp40 is named after the resistance leader that created a refuge camp in Belarus during ww2 saving many lives. Remaining resilient in brutal conditions.' },
  { id: 28, name: 'ZE GERMAN', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/28.jpg', description: "This mp40 has had a long day and rounded up many. Now it's strolling on in to a cafe & bar for a drink. Everyone's watching and trying not to sweat. Arch nemesis to the Thompson" },
  { id: 29, name: 'ARCHER', rarity: 'Common', collection: 'Firearms', image: '/images/guns/29.jpg', description: 'This mp40 fires while skiing down the mountain side in a winter wonderland.' },
  { id: 30, name: 'PEACEMAKER', rarity: 'Common', collection: 'Firearms', image: '/images/guns/30.jpg', description: 'the counterpart to the Barrett, peacemaker keeps Barrett safe from the closer range combatants.' },
  { id: 31, name: 'KALASHNIKOV', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/31.jpg', description: 'Named after legendary arms designer, this original ak47 leads the fight with its ease of use and functionality. Rustic worn look from experience.' },
  { id: 32, name: 'THE ROYALE', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/32.jpg', description: "all gucci'd out while in the thick of it" },
  { id: 33, name: 'SHINOBI', rarity: 'Common', collection: 'Firearms', image: '/images/guns/33.jpg', description: 'an advanced ak47 in a battle for resources in greenland.' },
  { id: 34, name: 'ELF', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/34.jpg', description: 'Legend has it the elves love this rifle. Santas little helpers have been spotted patrolling with these in various parts of the north pole.' },
  { id: 35, name: 'COMRADE', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/35.jpg', description: 'Brother to the Infiltrator, Comrade must finish the mission and stop the 2nd secret base. special feature, space rocket taking off.' },
  { id: 36, name: 'VINTOVKA', rarity: 'Common', collection: 'Firearms', image: '/images/guns/36.jpg', description: 'a dragunov with an extended barrel, used in a Japanese rainforest.' },
  { id: 37, name: 'RED FURY', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/37.jpg', description: 'This Dragunov is used for taking down the greek gods themselves using 7.62x54mmR 7BZ3 (B-32) Armor-piercing incendiary russian ammunition.' },
  { id: 38, name: 'VLADIMIR', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/38.jpg', description: 'A soviet Dragunov used for fighting in the misty forest' },
  { id: 39, name: 'MR. CLAUSE', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/39.jpg', description: 'Santa\'s Dragunov is gold plated for the jolly toy bringer and ensures the north pole remains free.' },
  { id: 40, name: 'MILITANT', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/40.jpg', description: 'an ak-47 equipped with an acog scope and suppressor in an ice war over resources.' },
  { id: 41, name: 'THOR', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/41.jpg', description: 'superior firepower in the wasteland' },
  { id: 42, name: 'REBEL', rarity: 'Common', collection: 'Firearms', image: '/images/guns/42.jpg', description: 'The Rebel, equipped with an acog and flash suppressor, fights back against the Contractor and Mercenary.' },
  { id: 43, name: 'INFILTRATOR', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/43.jpg', description: 'an advanced ak-47 equipped with a special scope built to take down robots in the storming of the AI super base. special feature, space rocket launching.' },
  { id: 44, name: 'MAC DADDY', rarity: 'Legendary', collection: 'Firearms', image: '/images/guns/44.jpg', description: 'This mac-11 hollow point 9mm comes with an extended magazine, foregrip, optic, infrared laser, specialized suppressor, and foldable stock. The name is earned as it goes head to head with anyone.' },
  { id: 45, name: 'ELSA', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/45.jpg', description: 'freezing temps & 7.62x.39' },
  { id: 46, name: 'UKRAINIAN', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/46.jpg', description: 'This ak-47 serves in the Polissya forest of northern ukraine. Protecting part of europe\'s last ancient forests from deforestation.' },
  { id: 47, name: 'MRS. KASLAND', rarity: 'Legendary', collection: 'Firearms', image: '/images/guns/47.jpg', description: 'The gucci Ak-47 in gold and platinum plus a special suppressor for extra stealth. She searches for her partner in crime in the wasteland.' },
  { id: 48, name: 'INVADER', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/48.jpg', description: 'm4a1 equipped with long range scope, suppressor, and an infrared laser in green kaspa themed color.' },
  { id: 49, name: 'CHAMELEON', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/49.jpg', description: 'm4a1 equipped with magnified scope, suppressor, and desert paint job.' },
  { id: 50, name: 'MR. KASLAND', rarity: 'Legendary', collection: 'Firearms', image: '/images/guns/50.jpg', description: 'Mr. Kasland, the only honey badger, journeys the wasteland to get to Mrs Kasland.' },
  { id: 51, name: 'CONTRACTOR', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/51.jpg', description: 'ar15 deployed to an unnamed region for high value targets. equipped with an adjustable scope, and suppressor.' },
  { id: 52, name: 'SEAL', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/52.jpg', description: 'military firearm on underwater operation with magnified scope, infrared laser, and suppressor.' },
  { id: 53, name: 'STALKER', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/53.jpg', description: 'The jungle stalker using a magnified scope, suppressor and infrared laser in bitcoin colored theme.' },
  { id: 54, name: 'RUDOLPH', rarity: 'Ultra Rare', collection: 'Firearms', image: '/images/guns/54.jpg', description: 'santas little helper is one of the finest ar15s protecting Mr. & Mrs. Clause and all their elves.' },
  { id: 55, name: 'ARCTIC FOX', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/55.jpg', description: 'an ar15 equipped with a thermal scope and foregrip this fox has a huge advantage to its counterparts.' },
  { id: 56, name: 'INSURGENT', rarity: 'Rare', collection: 'Firearms', image: '/images/guns/56.jpg', description: 'This Tec-9 submachine gun fights its counter parts amongst the chaos in the undisclosed location.' },
  { id: 57, name: 'JOHNNY', rarity: 'Common', collection: 'Firearms', image: '/images/guns/57.jpg', description: 'this ww2 browning automatic rifle chambered in .30-06 fulfills every riflemans needs in the rainforest' },
  { id: 58, name: 'BARRETT', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/58.jpg', description: 'the barrett .50 caliber makes an incredible 2 mile shot' },
  { id: 59, name: 'YELLOWJACKET', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/59.jpg', description: 'A black and yellow ak-47 in the amazon jungle ready for action.' },
  { id: 60, name: 'REAPER', rarity: 'Uncommon', collection: 'Firearms', image: '/images/guns/60.jpg', description: 'The Reaper is armed with a trijicon scope and suppressor in the cold lands of Siberia, hunting the Ranger.' },
];

export default component$(() => {
  const selectedCollection = useSignal('Firearms');
  const sortBy = useSignal<'id' | 'rarity-asc' | 'rarity-desc'>('id');
  const filterRarity = useSignal<Rarity | 'All'>('All');
  const showBackToTop = useSignal(false);

  // Track scroll position for back to top button
  useVisibleTask$(({ cleanup }) => {
    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 300;
    };
    window.addEventListener('scroll', handleScroll);
    cleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  const scrollToTop = $(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Define rarity order for sorting
  const rarityOrder: Record<Rarity, number> = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    'Ultra Rare': 4,
    Legendary: 5,
  };

  // Computed: filtered & sorted items
  const filteredItems = useComputed$(() => {
    return initialCollectionItems
      .filter((item) => item.collection === selectedCollection.value)
      .filter((item) => filterRarity.value === 'All' || item.rarity === filterRarity.value)
      .sort((a, b) => {
        if (sortBy.value === 'id') return a.id - b.id;
        if (sortBy.value === 'rarity-asc') return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        if (sortBy.value === 'rarity-desc') return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        return 0;
      });
  });

  const collections = ['Firearms'];

  return (
    <Card.Root class="p-5 md:p-8 mb-0.5 pt-8 max-w-6xl rounded-xs rounded-t-none border-none md:mx-auto mx-[6px] bg-gray-900/60">
      {/* Heading */}
      <div class="mb-4 md:mb-0">
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
                <option value="Legendary">Legendary</option>
                <option value="Ultra Rare">Ultra Rare</option>
                <option value="Rare">Rare</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Common">Common</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <label class="text-gray-300 text-sm whitespace-nowrap hidden sm:inline">Sort:</label>
              <select
                class="p-2 rounded bg-gray-900/60 border-none text-white text-sm"
                value={sortBy.value}
                onChange$={(e) =>
                  (sortBy.value = (e.target as HTMLSelectElement).value as 'id' | 'rarity-asc' | 'rarity-desc')
                }
              >
                <option value="id">ID</option>
                <option value="rarity-desc">Rarity ↓</option>
                <option value="rarity-asc">Rarity ↑</option>
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
        class="group relative bg-gray-800/95 rounded-lg text-white shadow-md hover:bg-gray-700 transition-colors duration-150 overflow-hidden"
      >
        <div class="relative">
          <img
            src={item.image}
            alt={item.name}
            class="w-full h-48 object-cover"
          />
          {/* Description overlay on hover */}
          <div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
            <p class="text-white text-sm text-center">{item.description}</p>
          </div>
        </div>
        <div class="p-2">
          <h3 class="font-semibold text-base mb-1 truncate">{item.name}</h3>
          <div class="flex justify-between flex-wrap gap-2 text-gray-300 text-xs">
            <span>ID: {item.id}</span>
            <span class={
              item.rarity === 'Legendary' ? 'text-orange-400' :
              item.rarity === 'Ultra Rare' ? 'text-purple-400' :
              item.rarity === 'Rare' ? 'text-blue-400' :
              item.rarity === 'Uncommon' ? 'text-green-400' :
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

      {/* Back to Top Button - Mobile Only */}
      {showBackToTop.value && (
        <button
          onClick$={scrollToTop}
          class="md:hidden fixed bottom-6 right-6 z-50 bg-pink-600/80 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </Card.Root>
  );
});
