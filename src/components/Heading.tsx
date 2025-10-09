import { component$ } from '@builder.io/qwik';
import { Separator } from './ui/Separator';

export default component$(() => {
  return (
    <div>
      <div class="flex items-center gap-2 px-0 justify-between space-y-1">



        <div>
          <div class="flex items-center">
            <h4 class="text-3xl md:text-5xl font-medium leading-none">Collections</h4>
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
          <p class="text-md md:text-2xl text-muted-foreground">Gallery of Kasland collections.</p>
        </div>

        <div class="flex items-center">
          {/* Example icon using an SVG; you can replace with your preferred icon */}
<svg width="56px" height="56px" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg820" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs814"> <linearGradient gradientTransform="matrix(1.25 0 0 1.2 -484.714 468.561)" gradientUnits="userSpaceOnUse" y2="520.79797" x2="401.57144" y1="535.79797" x1="401.57144" id="linearGradient4358" xlink:href="#linearGradient4424"></linearGradient> <linearGradient id="linearGradient4424"> <stop style="stop-color:#60a5e7;stop-opacity:0" offset="0" id="stop4426"></stop> <stop style="stop-color:#a6f3fb;stop-opacity:.25773194" offset="1" id="stop4428"></stop> </linearGradient> </defs> <metadata id="metadata817"> <rdf:rdf> <cc:work> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> <dc:date>2021</dc:date> <dc:creator> <cc:agent> <dc:title>Timothée Giet</dc:title> </cc:agent> </dc:creator> <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/"></cc:license> </cc:work> <cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"> <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits> <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires> <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires> <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike"></cc:requires> </cc:license> </rdf:rdf> </metadata> <g transform="translate(0 -1090.52)" id="layer1"> <path id="rect4122" transform="translate(0 1090.52)" d="M2 2v28h28V2zm2 2h24v24H4zm6 3a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm2 12-7 7h6l4-4zm8 0-7 7h14z" style="fill:#373737;fill-opacity:1;stroke:none;stroke-width:2.33333325"></path> </g> </g></svg>

        
        </div>


      </div>
      <Separator class="mt-3 mb-0" />
    </div>
  );
});