import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const City = () => {
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.Weather}>
            <View></View>
            <Text>서울</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default City;

const styles = StyleSheet.create({
  Weather: {
    width: "90%",
    height: "70%",
    backgroundColor: "blue",
  },
  container: {
    alignItems: "center",
  },
});
