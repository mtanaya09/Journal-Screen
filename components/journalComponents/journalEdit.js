import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import JournalHeader from "./JournalHeader";
import { getIndexInArray, getJournals, setJournals } from "./methods";
import { useJournalUpdate } from "./JournalContexts";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { daysOfTheWeek, monthsOfTheYear } from "./props";
import Dialog from "react-native-dialog";

const JournalEdit = ({ route }) => {
  const nav = useNavigation();
  const { entryString, folderIndex } = route.params;
  const updateJournals = useJournalUpdate();
  const entry = JSON.parse(entryString);
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const [showDeleteEntry, setDeleteEntry] = useState(false);
  //add
  const { month, day, year, hour, minute } = entry.date;
  const date = new Date(year, month, day, hour, minute);

  const deleteDialogHandler = (type) => {
    switch (type) {
      case 0: //cancel
        setDeleteEntry(false);
        break;
      case 1: //confirm delete
        //get journals' entries
        getJournals()
          .then((journals) => {
            //get the old entries
            const oldEntries = journals[folderIndex].entries;
            //new entries will be old entries but filtered out the deleted one
            const newEntries = oldEntries.filter((current) => {
              /* console.log(
                `${current.id} != ${entry.id}`,
                current.id != entry.id
              ); */
              return current.id != entry.id;
            });
            //console.log("new entries: ", newEntries);
            journals[folderIndex].entries = newEntries;
            updateJournals(journals); //update with a new array
          })
          .catch((error) => console.log("journalEdit.js: ", error.message));
        setDeleteEntry(false);
        nav.goBack();
        break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EBE9E9" }}>
      <View>
        {/* Dialog box */}
        <Dialog.Container visible={showDeleteEntry}>
          <Dialog.Title>Delete entry?</Dialog.Title>
          <Dialog.Description>
            Do you want to delete {title}?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => deleteDialogHandler(0)}
          />
          <Dialog.Button
            label="Confirm"
            onPress={() => deleteDialogHandler(1)}
          />
        </Dialog.Container>
      </View>
      <View style={{ height: 80, width: "100%" }}>
        {/* header */}
        <JournalHeader headerText="Edit Journal" />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}
      >
        {/* body */}

        <View style={styles.mainContainer}>
          <View style={styles.dateContentContainer}></View>
          <View style={styles.dateStyle}>
            <Text style={styles.dateTextStyle}>
              {date.getDate()} {monthsOfTheYear[date.getMonth()]}{" "}
              {date.getFullYear()} {date.getHours()}:
              {date.getMinutes() < 10 //this is to render one o clock as 1:00 instead of 1:0
                ? `0${date.getMinutes()}`
                : date.getMinutes()}
            </Text>
            <Text style={styles.dateTextStyle}>
              {daysOfTheWeek[date.getDay()]}
            </Text>
          </View>

          <Image
            style={styles.imahe}
            source={require("../../assets/makemyday.png")}
          />
          <Text
            style={{
              marginLeft: 18,
              fontSize: 18,
              fontWeight: "700",
              paddingVertical: 10,
            }}
          >
            {entry.title}
          </Text>
          <TextInput
            style={{ marginLeft: 18, fontSize: 18, fontWeight: "700" }}
            placeholder="Journal Title"
            onChangeText={(value) => setTitle(value)}
          />
          <TextInput
            style={{ marginLeft: 18, fontSize: 15 }}
            placeholder="Journal Content"
            onChangeText={(value) => setContent(value)}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <TouchableOpacity
                style={styles.saveJournal}
                onPress={() => {
                  //if content is similar, ignore change
                  if (content != entry.content) {
                    entry.content = content;
                  }
                  //if title is similar, ignore changes; if title  is empty, ignore change
                  if (title == entry.title || title == "") {
                    return;
                  } else {
                    entry.title = title;
                  }
                  //update the journals
                  getJournals()
                    .then((journals) => {
                      const index = getIndexInArray(journals, folderIndex); //get the index of the folder in the journals
                      const journalIndex = getIndexInArray(
                        journals[index].entries,
                        entry.id
                      ); //get the index of the journal in the folder
                      journals[index].entries[journalIndex].title = entry.title;
                      journals[index].entries[journalIndex].content =
                        entry.content;
                      //setJournals(journals);
                      updateJournals(journals);
                    })
                    .catch((error) =>
                      console.log("journalEdit.js: ", error.message)
                    );
                  nav.goBack();
                }}
              >
                <FontAwesome name="check-square-o" size={28} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => setDeleteEntry(true)}
              >
                <AntDesign name="delete" size={25} />
              </TouchableOpacity>
              <View style={styles.editIcons}>
                <TouchableOpacity>
                  <MaterialIcons name="text-format" size={34} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5
                    name="copy"
                    size={25}
                    style={{ marginStart: 3 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="format-color-highlight"
                    size={35}
                    style={{ marginStart: 3 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="image-outline"
                    size={25}
                    style={{ marginStart: 3 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JournalEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  icon: {
    zIndex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
  },
  delete: {
    marginLeft: 7,
    marginTop: 10,
  },
  saveJournal: {
    marginLeft: 15,
    marginTop: 10,
  },
  //sample design for edits
  mainContainer: {
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
    width: "100%",
    resizeMode: "contain",
    height: 180,
    marginTop: 10,
  },
  entrytitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  editIcons: {
    justifyContent: "center",
    paddingRight: 20,
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
  },
  journalcontent: {
    marginLeft: 20,
    fontSize: 15,
    marginTop: 7,
  },
  textInput: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
});
