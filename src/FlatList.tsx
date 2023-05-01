import React, { useCallback } from "react";
import ReactNative, { FlatListProps, ListRenderItem } from "react-native";
import { LayoutContextWrapper } from "./LayoutContext";

const renderDefault = () => null;

export default function FlatList<T>(props: FlatListProps<T>) {
  /**
   * Wrapper to renderItem function so it wraps rendered items
   * with LayoutContext. This way we can know the layout hierarchy
   * of all of them.
   */
  const renderItem = useCallback<ListRenderItem<T>>(
    ({ item, index, separators }) => {
      const key = props.keyExtractor?.(item, index) ?? "";
      const render = props.renderItem ?? renderDefault;

      return (
        <LayoutContextWrapper id={key}>
          {render({ item, index, separators })}
        </LayoutContextWrapper>
      );
    },
    []
  );

  return <ReactNative.FlatList {...props} renderItem={renderItem} />;
}
