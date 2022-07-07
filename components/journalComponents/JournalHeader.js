import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const JournalHeader = ({
  headerText = String(),
  disableBackButton = false,
}) => {
  const nav = useNavigation();
  return (
    <View style={styles.txtIconContainer}>
      {!disableBackButton && (
        <Icon
          name="arrow-circle-left"
          size={35}
          style={styles.icon}
          onPress={() => nav.goBack()}
        />
      )}
      <Text style={styles.underline} />
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

export default JournalHeader;

const styles = StyleSheet.create({
  txtIconContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#b0b0b0",
    paddingHorizontal: 15,
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    textDecorationLine: "underline",
    right: 20,
  },
  icon: {
    color: "#000000",
    zIndex: 1,
    left: 10,
  },
});
