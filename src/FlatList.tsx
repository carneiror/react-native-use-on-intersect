import React, { useCallback } from "react";
import {
  FlatListProps,
  ListRenderItem,
  FlatList as ReactNativeFlatList,
} from "react-native";
import { LayoutContextWrapper } from "./LayoutContext";
import store from "./store";

export default function FlatList<T>(props: FlatListProps<T>) {
  /**
   * Wrapper to renderItem function so it wraps rendered items
   * with LayoutContext. This way we can know the layout hierarchy
   * of all of them.
   */
  const renderItem = useCallback<
    Exclude<typeof props.renderItem, null | undefined>
  >(({ item, index, separators }) => {
    const key = props.keyExtractor?.(item, index) ?? "";

    return (
      <LayoutContextWrapper id={key}>
        {props.renderItem && props.renderItem({ item, index, separators })}
      </LayoutContextWrapper>
    );
  }, []);
  /**
   * Wrapper to onViewableItemsChanged function so everytime a component changes
   * the viewable state within this FlatList, the global state can be updated.
   */
  const onViewableItemsChanged = useCallback<
    Exclude<typeof props.onViewableItemsChanged, null | undefined>
  >(({ changed }) => {
    changed.forEach(({ item, isViewable }) => {
      store.updateVisibility(item.key, isViewable);
    });
  }, []);

  return (
    <ReactNativeFlatList
      {...props}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
}
