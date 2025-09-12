import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Select as HeadlessSelect } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

const Root = (props: PropsOf<typeof HeadlessSelect.Root>) => (
  <HeadlessSelect.Root
    {...props}
    selectItemComponent={Item}
    selectItemLabelComponent={ItemLabel}
  />
);

const Label = component$<PropsOf<typeof HeadlessSelect.Label>>(({ ...props }) => {
  return (
    <HeadlessSelect.Label
      {...props}
      class={cn('px-2 py-1.5 text-sm font-semibold', props.class)}
    >
      <Slot />
    </HeadlessSelect.Label>
  );
});

interface SelectTriggerProps extends PropsOf<typeof HeadlessSelect.Trigger> {
  isDark?: boolean;
}

const Trigger = component$<SelectTriggerProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessSelect.Trigger
      {...restProps}
      class={cn(
        'flex h-10 w-full items-center justify-between whitespace-nowrap rounded-base border border-input px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
         'bg-muted',
        props.class
      )}
    >
      <Slot />
      <LuChevronDown class="h-4 w-4 opacity-50" />
    </HeadlessSelect.Trigger>
  );
});

const DisplayValue = HeadlessSelect.DisplayValue;

// Extend props for Popover to include isDark
interface SelectPopoverProps extends PropsOf<typeof HeadlessSelect.Popover> {
  isDark?: boolean;
}

const Popover = component$<SelectPopoverProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessSelect.Popover
      {...restProps}
      class={cn(
        'w-full max-w-[15rem] data-[open]:animate-in rounded-base data-[closing]:animate-out data-[closing]:fade-out-0 data-[open]:fade-in-0 data-[closing]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    'bg-muted',
        'text-popover-foreground shadow-md',
        props.class
      )}
    >
      <Slot />
    </HeadlessSelect.Popover>
  );
});

interface SelectListboxProps extends PropsOf<typeof HeadlessSelect.Listbox> {
  isDark?: boolean;
}

const Listbox = component$<SelectListboxProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessSelect.Listbox
      {...restProps}
      class={cn(
        'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border p-1 text-popover-foreground shadow-md',
'bg-muted',        props.class
      )}
    >
      <Slot />
    </HeadlessSelect.Listbox>
  );
});

const Group = HeadlessSelect.Group;

const GroupLabel = HeadlessSelect.GroupLabel;

interface SelectItemProps extends PropsOf<typeof HeadlessSelect.Item> {
  isDark?: boolean;
}

const Item = component$<SelectItemProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessSelect.Item
      {...restProps}
      class={cn(
        'relative flex w-full cursor-default focus:text-primary select-none items-center py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[highlighted]:border-base',
        'first:rounded-t', // Apply rounded top to the first item
        'last:rounded-b',  // Apply rounded bottom to the last item
      
    
           'focus:bg-accent data-[highlighted]:bg-accent',
      
           'focus:text-accent-foreground data-[highlighted]:text-primary',
        props.class
      )}
    >
      <Slot />
    </HeadlessSelect.Item>
  );
});


const ItemIndicator = component$<PropsOf<typeof HeadlessSelect.ItemIndicator>>(
  ({ ...props }) => {
    return (
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
        <HeadlessSelect.ItemIndicator {...props}>
          <LuCheck class="h-4 w-4" />
        </HeadlessSelect.ItemIndicator>
      </span>
    );
  }
);

const ItemLabel = component$<PropsOf<typeof HeadlessSelect.ItemLabel>>(({ ...props }) => {
  return (
    <HeadlessSelect.ItemLabel {...props}>
      <Slot />
    </HeadlessSelect.ItemLabel>
  );
});

export const Select = {
  Root,
  Label,
  Trigger,
  DisplayValue,
  Popover,
  Listbox,
  Group,
  GroupLabel,
  Item,
  ItemIndicator,
  ItemLabel,
};