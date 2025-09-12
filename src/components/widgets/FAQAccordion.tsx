import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { tursoClient } from "../utils/turso";
export const useFaqsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM faqs ORDER BY id ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    question: (row as any).question,
    answer: (row as any).answer,
    category: (row as any).category || 'General', // Default to 'General' if no category
  })) as Array<{ id: number; question: string; answer: string; category: string }>;
});

// Centralized category gradient mapping
const CATEGORY_GRADIENTS: Record<string, string> = {
  Care: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border-primary-300 shadow-primary-200/50',
  General: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border-secondary-300 shadow-secondary-200/50',
  Shipping:'bg-gradient-to-r from-tertiary-100 to-tertiary-200 text-tertiary-700 border-tertiary-300 shadow-tertiary-200/50',
  Custom: 'bg-gradient-to-r from-secondary-100 to-tertiary-100 text-secondary-700 border-secondary-300 shadow-secondary-200/50',
  Workshops: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border-primary-300 shadow-primary-200/50',
  Default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-gray-200/50',
};

const getCategoryColor = (category: string) => {
  return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.Default;
};

export default component$(() => {
  const openItems = useSignal<number | null>(null);
  const selectedCategory = useSignal<string>('All');
  const faqs = useFaqsLoader();

  const toggleItem = $((id: number) => {
    if (openItems.value === id) {
      openItems.value = null; // Close if already open
    } else {
      openItems.value = id; // Open this one, close others
    }
  });

  // Get unique categories from FAQs
  const categories = ['All', ...Array.from(new Set(faqs.value.map(faq => faq.category)))];

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory.value === 'All' 
    ? faqs.value 
    : faqs.value.filter(faq => faq.category === selectedCategory.value);

  // Split filtered FAQ items into two columns for independent expansion
  const leftColumn = filteredFaqs.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredFaqs.filter((_, i) => i % 2 === 1);

  return (
    <section class="relative overflow-hidden py-16 md:py-20">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-secondary-50/50 via-white to-primary-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 right-10 w-24 h-24 bg-secondary-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 left-10 w-20 h-20 bg-primary-300/20 rounded-full blur-xl animate-float" style="animation-delay: -3s;"></div>
      <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-tertiary-300/20 rounded-full blur-xl animate-float" style="animation-delay: -1s;"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span class="bg-gradient-to-r from-secondary-800 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p class="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Find answers to common questions about our pottery, workshops, and services. 
          </p>
        </div>

        {/* Show loading state if FAQs are still loading */}
        {faqs.value.length === 0 ? (
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary-800"></div>
            <p class="mt-4 text-primary-600">Loading FAQs...</p>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <div class="mb-8">
              {/* <div class="text-center mb-4">
                <h3 class="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                  Filter by Category
                </h3>
              </div> */}
              <div class="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick$={() => selectedCategory.value = category}
                    class={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                      selectedCategory.value === category
                        ? 'bg-gradient-to-r from-secondary-800 to-tertiary-600 text-white shadow-lg'
                        : 'bg-white/80 text-secondary-700 border-2 border-secondary-200 hover:border-secondary-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Count */}
            {/* <div class="text-center mb-6">
              <p class="text-primary-600">
                Showing {filteredFaqs.length} of {faqs.value.length} questions
                {selectedCategory.value !== 'All' && ` in ${selectedCategory.value}`}
              </p>
            </div> */}

            {/* FAQ Accordion - True 2-column layout */}
            {filteredFaqs.length === 0 ? (
              <div class="text-center py-12">
                <div class="bg-white/80 rounded-2xl p-8 border-2 border-secondary-100">
                  <p class="text-primary-600 text-lg">No questions found in this category.</p>
                  <button
                    onClick$={() => selectedCategory.value = 'All'}
                    class="mt-4 px-6 py-2 bg-gradient-to-r from-secondary-800 to-tertiary-600 text-white rounded-full hover:scale-105 transition-all duration-300"
                  >
                    View All Questions
                  </button>
                </div>
              </div>
            ) : (
              <div class="flex flex-col md:flex-row md:gap-8">
                <div class="flex-1 flex flex-col gap-4">
                  {leftColumn.map((item) => (
                    <div key={item.id} class="group mb-0 break-inside-avoid">
                      <div class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 backdrop-blur-sm border-2 border-secondary-100 dark:border-secondary-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-secondary-200">
                        {/* Question Header */}
                        <button
                          onClick$={() => toggleItem(item.id)}
                          class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-secondary-50/50 hover:to-primary-50/50 dark:hover:bg-secondary-800/50 transition-all duration-200"
                          aria-expanded={openItems.value === item.id}
                          aria-controls={`faq-answer-${item.id}`}
                        >
                          <div class="flex items-center space-x-4">
                            {/* Category Badge */}
                            <span class={`px-3 py-1 rounded-full text-xs font-semibold border-2 shadow-lg ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                            
                            {/* Question */}
                            <h3 class="text-lg font-semibold text-secondary-900 dark:text-secondary-100 font-serif pr-4">
                              {item.question}
                            </h3>
                          </div>
                          
                          {/* Expand/Collapse Icon */}
                          <div class="flex-shrink-0">
                            <div class={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              openItems.value === item.id 
                                ? 'bg-gradient-to-r from-secondary-500 to-tertiary-500 text-white shadow-lg' 
                                : 'bg-gradient-to-r from-secondary-100 to-primary-100 text-secondary-800'
                            }`}>
                              <svg 
                                class={`w-5 h-5 transition-transform duration-300 ${
                                  openItems.value === item.id ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </button>
                        
                        {/* Answer */}
                        <div 
                          id={`faq-answer-${item.id}`}
                          class={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openItems.value === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                          aria-hidden={openItems.value !== item.id}
                        >
                          <div class="px-6 pb-5">
                            <div class="border-t-2 border-gradient-to-r from-secondary-100 to-primary-100 pt-4">
                              <p class="text-primary-700 dark:text-primary-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="flex-1 flex flex-col gap-4 mt-4 md:mt-0">
                  {rightColumn.map((item) => (
                    <div key={item.id} class="group mb-0 break-inside-avoid">
                      <div class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 backdrop-blur-sm border-2 border-secondary-100 dark:border-secondary-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-secondary-200">
                        {/* Question Header */}
                        <button
                          onClick$={() => toggleItem(item.id)}
                          class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-secondary-50/50 hover:to-primary-50/50 dark:hover:bg-secondary-800/50 transition-all duration-200"
                          aria-expanded={openItems.value === item.id}
                          aria-controls={`faq-answer-${item.id}`}
                        >
                          <div class="flex items-center space-x-4">
                            {/* Category Badge */}
                            <span class={`px-3 py-1 rounded-full text-xs font-semibold border-2 shadow-lg ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                            
                            {/* Question */}
                            <h3 class="text-lg font-semibold text-secondary-900 dark:text-secondary-100 font-serif pr-4">
                              {item.question}
                            </h3>
                          </div>
                          
                          {/* Expand/Collapse Icon */}
                          <div class="flex-shrink-0">
                            <div class={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              openItems.value === item.id 
                                ? 'bg-gradient-to-r from-secondary-500 to-tertiary-500 text-white shadow-lg' 
                                : 'bg-gradient-to-r from-secondary-100 to-primary-100 text-secondary-800'
                            }`}>
                              <svg 
                                class={`w-5 h-5 transition-transform duration-300 ${
                                  openItems.value === item.id ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </button>
                        
                        {/* Answer */}
                        <div 
                          id={`faq-answer-${item.id}`}
                          class={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openItems.value === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                          aria-hidden={openItems.value !== item.id}
                        >
                          <div class="px-6 pb-5">
                            <div class="border-t-2 border-gradient-to-r from-secondary-100 to-primary-100 pt-4">
                              <p class="text-primary-700 dark:text-primary-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Contact CTA */}
        <div class="text-center mt-12">
          <div class="bg-gradient-to-r from-secondary-50 via-tertiary-50 to-primary-50 rounded-3xl p-8 md:p-12 border-2 border-secondary-100 dark:border-secondary-700 shadow-xl">
            <h3 class="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-secondary-100 font-serif mb-4">
              Still Have Questions?
            </h3>
            <p class="text-primary-700 dark:text-primary-300 mb-6 max-w-2xl mx-auto">
              Our pottery experts are here to help! Reach out to us for personalized assistance with your pottery needs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-secondary-800 via-tertiary-600 to-secondary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span class="relative z-10">Contact Us</span>
                <div class="absolute inset-0 bg-gradient-to-r from-secondary-700 via-tertiary-700 to-secondary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="mailto:hello@terrapottery.com"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary-700 bg-gradient-to-r from-white/80 via-primary-50/80 to-secondary-50/80 backdrop-blur-sm border-2 border-primary-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary-50"
              >
                <span class="relative z-10">Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 