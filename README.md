# React Native useIntersect

Easy to use hook that gives to react native apps capabilities similar to [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for web.

Natively a FlatList can detect when a item is visible using [onViewableItemsChanged](https://reactnative.dev/docs/flatlist#onviewableitemschanged). Unfortunately in React Native we can't we can't change the element that is used as the viewport like we do on [web changing the root element](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_concepts_and_usage).

This package tries to add that capability suporting nested FlatLists and correctly detecting when a inner list element should be marked as invilible even if it is visible within their parent FlatList.

TODO Not sure if reading this it is clear the problem I'm solving

## Instalation

```
npm install --save @carneiror/use-intersect
```

## Pre-requisites

TODO explain that:

- we change the data prop from FlatList
- you need to use my FlatList (that should work exactly like the original one, it just wrap the original one)

## Example

TODO add a better example than App.tsx has

## Demo

Try now: https://snack.expo.dev/@git/github.com/carneiror/react-native-use-on-intersect

TODO add gif of android working before/after
