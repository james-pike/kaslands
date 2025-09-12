import { Slot, component$, type PropsOf } from '@builder.io/qwik';
import { Tabs as HeadlessTabs } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = (props: PropsOf<typeof HeadlessTabs.Root>) => (
  <HeadlessTabs.Root
    {...props}
    tabListComponent={List}
    tabComponent={Tab}
    tabPanelComponent={Panel}
  />
);

// Extend props for List to include isDark
interface TabsListProps extends PropsOf<typeof HeadlessTabs.List> {
  isDark?: boolean;
}

const List = component$<TabsListProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessTabs.List
      {...restProps}
      class={cn(
        'inline-flex items-center bg-card justify-center rounded-base border-border border text-muted-foreground shadow-sm',
        '',
        props.class
      )}
    >
      <Slot />
    </HeadlessTabs.List>
  );
});

// Extend props for Tab to include isDark
interface TabsTabProps extends PropsOf<typeof HeadlessTabs.Tab> {
  isDark?: boolean;
}

const Tab = component$<TabsTabProps>((props) => {
  const { ...restProps } = props;

  return (
    <HeadlessTabs.Tab
    {...restProps}
    class={cn(
      'inline-flex items-center justify-center whitespace-nowrap px-1 py-2 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      // Add a default transparent border to reserve space
      'border-b border-transparent',
      // Styles for selected state
      'data-[state=selected]:bg-background',
      // Base styles for all tabs
      'bg-card',
      // Rounding: only first and last tabs get rounded corners
      '[&:first-child]:rounded-l-base [&:last-child]:rounded-r-base',
      // Ensure middle tabs have no rounding
      'not:first-child:not:last-child:rounded-none',
      // Vertical borders: right border for all tabs except the last
      'border-r border-border [&:last-child]:border-r-0',
      // Per-tab styles for selected state
      'data-[state=selected]:border-b-primary data-[state=selected]:text-primary',
      'data-[state=selected]:shadow-inner',
      props.class
    )}
  >
    <Slot />
  </HeadlessTabs.Tab>
  );
});




const Panel = component$<PropsOf<typeof HeadlessTabs.Panel>>((props) => {
  return (
    <HeadlessTabs.Panel
      {...props}
      class={cn(
        'mt-1 ring-offset-background bg-card rounded-base border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class
      )}
    >
      <Slot />
    </HeadlessTabs.Panel>
  );
});

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};