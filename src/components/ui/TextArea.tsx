// ui/Textarea.tsx
import { $, component$, type PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type TextareaProps = PropsOf<'textarea'> & {
  error?: string;
  isDark?: boolean;
};

export const Textarea = component$<TextareaProps>(
  ({ name, error, id, ['bind:value']: valueSig, value, onInput$, ...props }) => {
    const textareaId = id || name;

    return (
      <>
        <textarea
          {...props}
          aria-errormesprimary={`${textareaId}-error`}
          aria-invalid={!!error}
          value={valueSig ? valueSig.value : value}
          onInput$={valueSig ? $((__, el) => (valueSig.value = el.value)) : onInput$}
          class={cn(
            'flex w-full rounded-base border border-input px-3 py-1 text-md md:text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            'bg-background', // Same isDark logic as Input
            props.class
          )}
          id={textareaId}
        />
        {error && (
          <div id={`${textareaId}-error`} class="text-alert mt-1 text-sm">
            {error}
          </div>
        )}
      </>
    );
  },
);