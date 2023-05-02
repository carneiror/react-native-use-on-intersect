import { useCallback, useContext } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { LayoutContext } from "./LayoutContext";
import store from "./store";

export default function useIntersect(id: string): boolean {
  const parents = useContext(LayoutContext);

  const selector = useCallback(
    (state: any): boolean =>
      [...parents, id].every((key) => state[key] ?? false),
    [parents, id]
  );

  const isVisible = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getSnapshot,
    null,
    selector
  );

  return isVisible;
}
