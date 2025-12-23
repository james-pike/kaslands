import { createContextId, useSignal, useContextProvider, useContext, Signal } from "@builder.io/qwik";

export type TabId = 'collection' | 'about' | 'merch' | 'faq';

export interface TabContextState {
  activeTab: Signal<TabId>;
}

export const TabContext = createContextId<TabContextState>('tab-context');

export const useTabContext = () => {
  return useContext(TabContext);
};

export const useTabProvider = () => {
  const activeTab = useSignal<TabId>('about');

  const contextValue: TabContextState = {
    activeTab,
  };

  useContextProvider(TabContext, contextValue);

  return contextValue;
};
