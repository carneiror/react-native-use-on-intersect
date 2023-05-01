import React, { useCallback, useMemo } from "react";
import {
  FlatListProps,
  ListRenderItem,
  FlatList as ReactNativeFlatList,
} from "react-native";
import { LayoutContextWrapper } from "./LayoutContext";
import store from "./store";

/**
 * Observed a duplicate at only about 280.000 strings, due to
 * the birthday paradox. (sqrt(36^7) = 279936)
 */
function getUniqId(): string {
  const timestamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 9);
  return `${rand}${timestamp}`;
}

/**
 * Decorates the original data array so we can have an unique id
 * for each element
 *
 * @param data The original ArrayLike<T>
 * @returns The new decorated array
 */
function decorateData<T>(
  data: ArrayLike<T> | null | undefined
): (T & { __id: string })[] | null | undefined {
  if (!data) {
    return data;
  }

  return (data as T[]).map((v) => ({ ...v, __id: getUniqId() }));
}

/**
 * TODO
 *
 * @param props TODO
 * @returns TODO
 */
export default function FlatList<T>(
  props: FlatListProps<T & { __id: string }>
) {
  /**
   * Wrapper to renderItem function so it wraps rendered items
   * with LayoutContext. This way we can know the layout hierarchy
   * of all of them.
   */
  const renderItem = useCallback<
    Exclude<typeof props.renderItem, null | undefined>
  >(({ item, index, separators }) => {
    return (
      <LayoutContextWrapper id={item.__id}>
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
      store.updateVisibility(item.__id, isViewable);
    });
  }, []);

  /**
   * Decorate data with generated ids for all items so we can track them later
   */
  const data = useMemo(() => decorateData(props.data), [props.data]);

  return (
    <ReactNativeFlatList
      {...props}
      data={data}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
}
