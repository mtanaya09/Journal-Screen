import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import JournalHeader from "./JournalHeader";
import { useNavigation } from "@react-navigation/native";
import JournalCard from "./JournalCard";
import { getIndexInArray, getJournals, setJournals } from "./methods";
import { JournalEntry } from "./props";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useJournalContext } from "./JournalContexts";

const JournalView = ({ route }) => {
  const nav = useNavigation();
  if (route.params == undefined) {
    alert("route params is undefined lol");
    return (
      //for when someone forgets to add params to navigate()
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Frick, go back</Text>
      </TouchableOpacity>
    );
  }
  const { id, JournalsString } = route.params;
  const cachedJournals = useJournalContext();
  const [JournalEntries, setJournalEntriesArray] = useState([JournalEntry]); //the folder of the current
  const [journalFolderIndex, setJournalFolderIndex] = useState(
    getIndexInArray(cachedJournals, id)
  ); //if for some reason the id is different from its index in the journals array

  const renderCards = ({ item }) => (
    <JournalCard entry={item} index={journalFolderIndex} />
  );

  const addEntry = () => {
    const date = new Date();
    const entry = {
      id://if no entries, id is 0, else id will be last item's id + 1
        JournalEntries.length == 0 ? 0 : JournalEntries[JournalEntries.length-1].id + 1,
      date: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
      title: `New Entry`,
      content: "Today, I learned...",
    };
    setJournalEntriesArray([...JournalEntries, entry]);
    nav.navigate("JournalEdit", {
      entryString: JSON.stringify(entry),
      folderIndex: journalFolderIndex,
    });
  };

  //useEffect===================================================================>
  useEffect(() => {
    setJournalEntriesArray([]); //reset the array
    //console.log(journalFolderIndex);
    getJournals()
      .then((value) =>
        setJournalEntriesArray(value[journalFolderIndex].entries)
      )
      .catch((error) =>
        console.log("journalHome.js useEffect: ", error.message)
      );
  }, []);
  useEffect(() => {
    //console.log(journalFolderIndex);
  }, [journalFolderIndex]);
  useEffect(() => {
    //update the Journal from local storage
    //first we get the journal
    getJournals().then((journals) => {
      //then we update the entries of the current folder
      journals[id].entries = JournalEntries;
      //then we update the journals
      setJournals(journals);
    });
  }, [JournalEntries]);
  useEffect(() => {
    setJournalEntriesArray(cachedJournals[id].entries);
  }, [cachedJournals]);
  //useEffect==================================================================/>

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: 65, zIndex: 1 }}>
        <JournalHeader headerText={cachedJournals[id].name} />
      </View>
      <View style={{ flex: 9 }}>
        <FlatList
          data={JournalEntries}
          renderItem={renderCards}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyList}>List is empty</Text>
            </View>
          }
        />
        <TouchableOpacity onPress={() => addEntry()} style={styles.addJournal}>
          <AntDesign
            name="addfile"
            size={24}
            color="#FFFFFF"
            stlye={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JournalView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  noteContainer: {},
  dateContainer: {},
  dateNotesContainer: {},
  dateStyle: {},
  noteTitleStyle: {},
  emptyList: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
    flex: 1,
    textAlign: "center",
    marginTop: 300,
  },
  addJournal: {
    height: 60,
    width: 60,
    bottom: 0,
    right: 10,
    borderRadius: 100,
    backgroundColor: "#454545",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginBottom: 20,
  },
});
