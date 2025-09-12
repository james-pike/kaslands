import { $, component$, type PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type InputProps = PropsOf<'input'> & {
  error?: string;
};

export const Input = component$<InputProps>(
  ({ name, error, id, ['bind:value']: valueSig, value, onInput$, ...props }) => {
    const inputId = id || name;

    return (
      <>
        <input
          {...props}
          aria-errormesprimary={`${inputId}-error`}
          aria-invalid={!!error}
          value={valueSig ? valueSig.value : value}
          onInput$={valueSig ? $((__, el) => (valueSig.value = el.value)) : onInput$}
          class={cn(
            'flex h-12 md:h-10 w-full rounded-base border border-input px-3 py-1 text-base sm:text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
             'bg-background', // Swap bg-background to bg-muted when isDark is true
            props.class
          )}
          id={inputId}
        />
        {error && (
          <div id={`${inputId}-error`} class="text-alert mt-1 text-sm">
            {error}
          </div>
        )}
      </>
    );
  },
);