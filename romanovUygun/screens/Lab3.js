import { useCallback, useEffect, useState, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  useMe,
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

const Lab3 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      const json = await response.json();
      return json.entries;
    } catch {
      return [];
    }
  };

  const refresh = async () => {
    setData(await fetchData());
  };
  const memo = useMemo(async () => await fetchData(), []);

  useEffect(() => {
    console.log(data[0]);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="refresh" onPress={refresh} />
      <Button
        title="useMemo"
        onPress={async () => {
          setData(await memo);
        }}
      />
      <Button
        title="delete"
        onPress={() => {
          setData([]);
        }}
      />
      {data.map((d, i) => (
        <Text key={i}>
          {d.API} {d.Description}
        </Text>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Lab3;
