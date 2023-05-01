import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import store from "./store";

const onViewableItemsChanged = ({ changed, viewableItems }) => {
  changed.forEach(({ item, isViewable }) => {
    store.updateVisibility(item.id, isViewable);
  });
};

export default function useIntersect() {
  const isVisible = true;

  return { isVisible, onViewableItemsChanged };
}
