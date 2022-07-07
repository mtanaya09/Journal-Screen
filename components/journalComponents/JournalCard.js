import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { JournalEntry, daysOfTheWeek, monthsOfTheYear } from "./props";
import { useNavigation } from "@react-navigation/native";

const JournalCard = ({ entry = JournalEntry, index }) => {
  const nav = useNavigation();
  const { month, day, year, hour, minute } = entry.date;
  const date = new Date(year, month, day, hour, minute); //Date(`${year}-${month}-${day}T${hour}:${minute}Z`);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.dateContentContainer}></View>
        <TouchableOpacity
          onPress={() =>
            nav.navigate("JournalEdit", {
              entryString: JSON.stringify(entry),
              folderIndex: index,
            })
          } //navigate to edit then pass the entry
        >
          <View style={styles.dateStyle}>
            <Text style={styles.dateTextStyle}>
              {date.getDate()} {monthsOfTheYear[date.getMonth()]}{" "}
              {date.getFullYear()} {date.getHours()}:
              {date.getMinutes() < 10//this is to render one o clock as 1:00 instead of 1:0
                ? `0${date.getMinutes()}`
                : date.getMinutes()}
            </Text>
            <Text style={styles.dateTextStyle}>
              {daysOfTheWeek[date.getDay()]}
            </Text>
          </View>
          <Text style={styles.type}>Type Something</Text>
          <Image
            style={styles.imahe}
            source={require("../../assets/makemyday.png")}
          />
          <View style={styles.titleContentContainer}>
            <Text style={styles.entrytitle}>{entry.title}</Text>
            <Text>{entry.content}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JournalCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "white",
    borderRadius: 15,
  },
  dateContentContainer: {
    marginTop: 10,
  },
  dateStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  dateTextStyle: {
    fontSize: 15,
    fontFamily: "Roboto",
    marginBottom: 15,
    fontWeight: "bold",
  },
  titleContentContainer: {
    margin: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  type: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 3,
  },
  imahe: {
    zIndex: 1,
    width: 315,
    height: 167,
    //resizeMode: "cover",
    marginLeft: 20,
    marginTop: 10,
  },
  entrytitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
