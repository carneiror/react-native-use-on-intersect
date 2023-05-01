import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FlatList from "./src/FlatList";
import { LayoutContext } from "./src/LayoutContext";
import useIntersect from "./src/useIntersect";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

function Card({ id, title }: { id: string; title: string }) {
  const isVisible = useIntersect(id);

  return (
    <View style={styles.card}>
      <Text>
        {title} + {JSON.stringify(isVisible)}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...DATA]}
        renderItem={({ item }) => (
          <FlatList
            data={[...DATA]}
            renderItem={({ item }) => <Card id={item.id} title={item.title} />}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    margin: 5,
    backgroundColor: "#f60",
  },
});
