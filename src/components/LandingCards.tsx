import { component$ } from "@builder.io/qwik";

export default component$(() => {
  const cards = [
    {
      title: "Everyone is Welcome at Earthen Vessels",
      text: (
        <>
We acknowledge that earthen vessels is on the traditional unceded territory of the Algonquin people. We are grateful to gather on this land held by rivers, trees, & the clay beneath our feet. Together, we honour the enduring presence & artistry of indigenous people who have long tended this land.        </>
      ),
      image: "/images/land.jpeg",
    },
    {
      title: "Everyone is Welcome at Earthen Vessels",
      text: (
        <>
          We pride ourselves on welcoming everyone into our studio, regardless of age, race, ethnicity, physical ability or attributes, religion, sexual orientation, gender identity or gender expression. All are welcome!
          <img src="/images/flag.webp" alt="Pride Flag" class="w-10 mt-4 mx-auto md:mx-0"/>
        </>
      ),
      image: "/images/welcome.png",
    },
  ];

  return (
    <section class="relative overflow-hidden py-12 md:py-16">
      
      <div class="relative max-w-7xl mx-auto px-5 md:px-12">
         <h1 class="!text-4xl md:!text-5xl text-center xdxd font-bold mb-10">
            <span class="bg-gradient-to-r from-secondary-800 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              All Are Welcome
            </span>
          </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => (
           <div
  key={index}
  class="flex flex-col md:flex-row bg-white/30 items-center rounded-lg shadow-md overflow-hidden"
>
  {/* Image */}
  <div class="w-full md:w-1/2 h-64 md:h-64">
    <img
      src={card.image}
      alt={card.title}
      class="w-full h-full object-cover pl-2"
    />
  </div>

  {/* Text */}
  <div class="w-full md:w-1/2 p-4 text-center md:text-left">
    <p class="text-base md:text-lg !leading-6 text-gray-700">
      {card.text}
    </p>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
});