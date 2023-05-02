import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FlatList from "./src/FlatList";
import { LayoutContext } from "./src/LayoutContext";
import useIntersect from "./src/useIntersect";

const VIEW_CONFIG = {
  itemVisiblePercentThreshold: 95,
  waitForInteraction: false,
  minimumViewTime: 1,
};

type Card = {
  __id: string;
  title: string;
};

// Create a vertical list with an inner horizontal list
const ListExample = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => ({
    title: `Vertical Item ${index}`,
  })),
];

// Example of a Card
const Card: React.FC<Card> = ({ __id, title }) => {
  const isVisible = useIntersect(__id);

  const backgroundColor = isVisible ? "#A2E3C4" : "#E2EFDE";

  return (
    <View style={{ ...styles.card, backgroundColor }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// Example of an Horizontal List
const HorizontalList: React.FC = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6].map((index) => ({
        title: `Horizontal Item ${index}`,
      }))}
      horizontal={true}
      renderItem={({ item }) => <Card {...item} />}
      viewabilityConfig={VIEW_CONFIG}
    />
  );
};

export default function App() {
  return (
    <FlatList
      data={ListExample}
      renderItem={({ item, index }) =>
        index % 2 ? <HorizontalList /> : <Card {...item} />
      }
      viewabilityConfig={VIEW_CONFIG}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "#808F87",
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});
