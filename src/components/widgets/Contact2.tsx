import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  const contactInfo = [
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Visit Our Studio",
      details: "36 Rosemount Ave, Ottawa ON, K1Y1P4",
      link: "https://www.google.com/maps/place/36+Rosemount+Ave,+Ottawa,+ON+K1Y+1P4/"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Email Us",
      details: "hello@earthenvessels.ca",
      link: "mailto:hello@earthenvessels.ca"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Studio Hours",
      details: "By appointment",
      link: "#"
    }
  ];

  return (
    <section id="contact" class="relative overflow-hidden py-12 md:py-16">
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-secondary-800 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left side image */}
          <div class="relative rounded-2xl overflow-hidden shadow-xl border-2 border-secondary-200/50 flex justify-center">
            <Image
              src="/images/space.jpeg"
              layout="constrained"
              width={600}
              height={400}
              alt="Terra Pottery Studio"
              class="w-full h-auto max-w-full object-cover"
              breakpoints={[320, 480, 640, 768, 1024]}
            />
            <div class="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent"></div>
          </div>

          {/* Right side cards */}
          <div class="space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? "_blank" : undefined}
                rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                class="flex flex-col p-6 rounded-2xl border-2 border-primary-100 dark:border-secondary-700 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-secondary-200 transition-all duration-300 
                       bg-gradient-to-br from-white/50 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/50 dark:via-primary-900/30 dark:to-secondary-900/30"
              >
                <div class="flex items-center space-x-4 mb-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-100/50 to-secondary-200/50 dark:from-secondary-700/50 dark:to-secondary-800/50 rounded-xl flex items-center justify-center text-secondary-800 dark:text-secondary-300">
                    {info.icon}
                  </div>
                  <h3 class="text-md font-semibold text-secondary-900 dark:text-secondary-100">
                    {info.title}
                  </h3>
                </div>
                <p class="text-sm text-primary-700 dark:text-primary-300">{info.details}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
