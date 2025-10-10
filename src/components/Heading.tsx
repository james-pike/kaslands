import { component$ } from '@builder.io/qwik';
import { Separator } from './ui/Separator';

export default component$(() => {
  return (
    <div>
      <div class="flex items-center gap-2 px-0 justify-between space-y-1">



        <div>
          <div class="flex items-center">
            <h4 class="text-xl md:text-2xl  text-white/80  font-bold leading-none">Collections</h4>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
          </div>
          {/* <p class="text-md md:text-2xl text-muted-foreground">Gallery of Kasland collections.</p> */}
        </div>

        <div class="flex items-center">
          {/* Example icon using an SVG; you can replace with your preferred icon */}
{/* <LuBook/> */}
        
        </div>


      </div>
      <Separator class="mt-3 mb-0" />
    </div>
  );
});