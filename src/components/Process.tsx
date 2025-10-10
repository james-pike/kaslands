import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';


import styles from './carousel.css?inline';
import { Card } from './ui/Card';
import Heading from './Heading';

export default component$(() => {
  useStyles$(styles);
  
  // Add custom animation styles with Tailwind-compatible approach
  useStyles$(`
    @layer components {
      .carousel-slide {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .carousel-slide:not([data-active]) {
        transform: translateY(10px);
        opacity: 0.7;
      }
      
      .carousel-slide[data-active] {
        transform: translateY(0);
        opacity: 1;
      }
      
      .carousel-slide[data-active] .phase-content {
        animation: slideInFromRight 0.5s ease-out;
      }
      
      .carousel-slide[data-active] .milestone-item {
        animation: fadeInUp 0.4s ease-out both;
      }
      
      .carousel-slide[data-active] .milestone-item:nth-child(1) {
        animation-delay: 0.1s;
      }
      
      .carousel-slide[data-active] .milestone-item:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .carousel-slide[data-active] .milestone-item:nth-child(3) {
        animation-delay: 0.3s;
      }
      
      .carousel-slide[data-active] .milestone-item:nth-child(4) {
        animation-delay: 0.4s;
      }
      
      .milestone-item {
        opacity: 0;
        transform: translateY(10px) translateX(10px);
      }
      
      .carousel-step span {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .carousel-step[data-active] span {
        transform: scale(1.02);
        animation: pulseOnce 0.3s ease-out;
      }
      
      .phase-content {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(0);
        opacity: 1;
      }
      
      /* Progress separator base styles */
      .progress-separator {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .progress-separator::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 0%;
        background: hsl(var(--primary-300));
        transition: height 3s linear;
        border-radius: inherit;
        z-index: 1;
      }
      
      .progress-separator.active::after {
        height: 100%;
        animation: fillProgress 3s linear forwards;
      }
      
      .progress-separator.user-controlled::after,
      .progress-separator.completed::after {
        display: none;
      }
    }
    
    @keyframes slideInFromRight {
      from {
        transform: translateX(20px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px) translateX(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0) translateX(0);
      }
    }
    
    @keyframes pulseOnce {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1.02); }
    }
    
    @keyframes fillProgress {
      from {
        height: 0%;
      }
      to {
        height: 100%;
      }
    }
  `);

  // const space = { marginBlock: '1rem' };

  const isPlaying = useSignal<boolean>(false);
  const hasCompletedOneCycle = useSignal<boolean>(false);
  const currentStageStartTime = useSignal<number>(0);
  const userHasInteracted = useSignal<boolean>(false);

  useVisibleTask$(() => {
    isPlaying.value = true;
    currentStageStartTime.value = Date.now();
  });

  useVisibleTask$(({ track }) => {
    track(() => selectedIndex.value);
    currentStageStartTime.value = Date.now();
    
    if (selectedIndex.value === roadmapPhases.length - 1 && isPlaying.value && !hasCompletedOneCycle.value && !userHasInteracted.value) {
      setTimeout(() => {
        selectedIndex.value = 0;
        hasCompletedOneCycle.value = true;
        isPlaying.value = false;
      }, 3000);
    }
  });

  const selectedIndex = useSignal(0);
  const previousIndex = useSignal(0);

  // const progressIndex = useComputed$(() => selectedIndex.value);

  useVisibleTask$(({ track }) => {
    track(() => selectedIndex.value);
    previousIndex.value = selectedIndex.value;
  });

  // const bgOpacity = useComputed$(() => {
  //   return (selectedIndex.value + 1) * 10;
  // });

  // Tailwind opacity classes
  // const opacityClass = useComputed$(() => {
  //   const opacity = (selectedIndex.value + 1) * 10;
  //   return `bg-primary-300/${opacity}`;
  // });

  return (
    <>
      <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl !rounded-t-none border-none rounded-xl md:mx-auto mx-3 bg-black/50">
    <Heading/>
     
      </Card.Root>
    </>
  );
});


   {/* <Carousel.Root 
          class="carousel-root" 
          gap={30} 
          bind:selectedIndex={selectedIndex}
          autoPlayIntervalMs={3000}
          bind:autoplay={isPlaying}
        >
          <div class="flex flex-row gap-5 w-full">
            <div 
              class={cn("w-1/3 rounded hidden md:block aspect-square", opacityClass.value)}
            />
            <div class="flex flex-row items-start w-full md:flex-1">



              <div class="flex flex-col items-center justify-start w-2 mr-3">
                {roadmapPhases.map((_, index) => (
                  <>
                    <div
                      class="w-1 h-0 bg-gray-200 rounded-full"
                      style={{ marginTop: index === 0 ? '1rem' : '0.5rem' }}
                      key={`spacer-${index}`}
                    />
                    {index < roadmapPhases.length && (
                      <div
                        class={cn(
                          'progress-separator w-1 h-4 rounded-full bg-gray-200',
                          userHasInteracted.value 
                            ? progressIndex.value >= index ? 'user-controlled bg-primary-300' : ''
                            : progressIndex.value > index 
                              ? 'completed bg-primary-300' 
                              : progressIndex.value === index && isPlaying.value
                                ? 'active'
                                : ''
                        )}
                        style={{ transform: 'rotate(0deg)' }}
                        key={`separator-${index}`}
                      />
                    )}
                  </>
                ))}
              </div>

              <Carousel.Stepper class="carousel-stepper w-full flex flex-col">
                {roadmapPhases.map((phase, index) => (
                  <>
                    <Carousel.Step
                      class="flex items-start justify-start cursor-pointer"
                      key={`step-${index}`}
                      onClick$={() => {
                        console.log(`Clicked index: ${index}`);
                        userHasInteracted.value = true;
                        isPlaying.value = false;
                        selectedIndex.value = index;
                      }}
                    >
                      <span
                        class={cn(
                          'text-sm md:text-base font-medium px-3 py-1.5 rounded transition-all duration-300',
                          selectedIndex.value === index 
                            ? 'bg-primary-300 text-white' 
                            : 'bg-transparent hover:bg-primary-300/10'
                        )}
                      >
                        <span class="rounded-l-base bg-white/40 py-1 pl-2 -ml-2 mr-1.5">
                          {phase.headline}
                        </span>
                        {phase.title}
                        <span class="ml-1">{phase.icon}</span>
                      </span>
                    </Carousel.Step>
                    <Carousel.Slide
                      style={space}
                      class="carousel-slide p-3 text-sm md:p-4 !mt-2 bg-primary-300/10 rounded-lg shadow-sm"
                      key={`slide-${index}`}
                    >
                      <div class="phase-content">
                        <p class="mb-3 text-gray-700">{phase.description}</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          {phase.milestones.map((milestone, i) => (
                            <li key={`milestone-${i}`} class="milestone-item text-sm leading-relaxed text-gray-600">
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Carousel.Slide>
                  </>
                ))}
              </Carousel.Stepper>
            </div>
          </div>
        </Carousel.Root> */}
        
        
const roadmapPhases = [
  {
    headline: 'Phase 1:',
    title: 'Discovery & Strategy',
    icon: '🎯',
    description: 'Understand client goals, target audience, and competitive landscape to create a strategic foundation.',
    milestones: [
      'Conduct stakeholder interviews ',
      'Perform competitive analysis research',
      'Define project goals, KPIs, success metrics',
      'Create user personas, and content strategy',
    ],
  },
  {
    headline: 'Phase 2:',
    title: 'Design & Prototyping',
    icon: '🎨',
    description: 'Transform strategy into visual concepts through wireframing, design systems, and interactive prototypes.',
    milestones: [
      'Develop wireframes and architecture',
      'Create high-fidelity mockup systems',
      'Build interactive prototypes',
      'Finalize visual  brand guidelines',
    ],
  },
  {
    headline: 'Phase 3:',
    title: 'Development & Integration',
    icon: '⚙️',
    description: 'Build responsive, performant websites with clean code, seamless integrations, and optimal functionality.',
    milestones: [
      'Develop frontend with responsive layouts',
      'Integrate APIs, and third-party services',
      'Implement SEO best practices and standards',
      'Conduct cross-browser and device testing',
    ],
  },
  {
    headline: 'Phase 4:',
    title: 'Launch & Optimization',
    icon: '🚀',
    description: 'Deploy the website, ensure smooth performance, and provide ongoing support for continuous improvement.',
    milestones: [
      'Execute pre-launch checklist and final QA',
      'Deploy to production and monitor performance',
      'Provide client training and documentation',
      'Offer ongoing maintenance, updates, and review',
    ],
  },
];