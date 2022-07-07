import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import JournalHeader from "./JournalHeader";
import { getJournals, resetJournals, setJournals } from "./methods";
import { JournalFolder } from "./props";
import Dialog from "react-native-dialog";
import { useJournalUpdate } from "./JournalContexts";

const JournalHome = () => {
  const navigation = useNavigation();
  const updateJournals = useJournalUpdate();
  const [Journals, setJournalsArray] = useState([JournalFolder]);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showDeleteFolder, setShowDeleteFolder] = useState(false);
  const [newFolderName, setFolderName] = useState("Journal Folder");
  //useEffect========================================================>
  useEffect(() => {
    //initialize the array
    //uncomment next line for deleting journals
    //resetJournals();
    setJournalsArray([]);
    getJournals()
      .then((value) => setJournalsArray(value))
      .catch((error) =>
        console.log("journalHome.js useEffect: ", error.message)
      );
    updateJournals(Journals); //updates the journal in memory
    //console.log(Journals);
  }, []);

  //for checking updates in the cached journal
  useEffect(() => {
    setJournals(Journals); //updates the journal in local storage
  }, [Journals]);

  //useEffect=======================================================/>
  const renderFolders = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JournalView", {
          id: item.id,
          JournalsString: JSON.stringify(Journals),
        })
      }
    >
      <Text style={styles.folderStyle}>{item.name}</Text>
    </TouchableOpacity>
  );

  const newJournal = (journalName) => {
    console.log(journalName);
    setJournalsArray([
      ...Journals,
      {
        id: Journals.length,
        name: String(journalName),
        entries: [],
      },
    ]);
  };

  const showDialog = () => {
    /* Alert.alert("Create New Folder", " ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: newJournal },
    ]); */
    setShowNewFolder(1);
  };

  const addDialogHandler = (type, folderName) => {
    switch (type) {
      case 0:
        //cancel
        setShowNewFolder(0);
        break;
      case 1:
        //add
        setShowNewFolder(0);
        newJournal(folderName == "" ? "Journal Folder" : folderName); //if nothing is entered add default name
        setFolderName("Journal Folder");
        break;
    }
  };

  const deleteAll = () => {
    setJournalsArray([]);
    resetJournals();
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        {/* dialog box */}
        <Dialog.Container visible={showNewFolder}>
          <Dialog.Title>Add new folder</Dialog.Title>
          <Dialog.Input
            onChangeText={(value) => setFolderName(value)}
            placeholder="Enter the folder's name"
          />
          <Dialog.Button label="Cancel" onPress={() => addDialogHandler(0)} />
          <Dialog.Button
            label="Add"
            onPress={() => addDialogHandler(1, newFolderName)}
          />
        </Dialog.Container>
        <Dialog.Container visible={showDeleteFolder}>
          <Dialog.Title>Delete all folders?</Dialog.Title>
          <Dialog.Description>
            Do you want to delete all folders?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => setShowDeleteFolder(false)}
          />
          <Dialog.Button
            label="Confirm"
            onPress={() => {
              deleteAll();
              setShowDeleteFolder(false);
            }}
          />
        </Dialog.Container>
      </View>
      <View style={styles.header}>
        {/* ==============Header============== */}
        <JournalHeader headerText="My Journal" disableBackButton />
      </View>
      <View style={styles.body}>
        {/* ==============Body============== */}
        <Image
          source={{
            uri: "https://teravisioncorp.site/assets_music/assets_journal/illustrationJournal.png",
          }}
          style={styles.illustration}
        />
        <View style={styles.folderContainer}>
          <FlatList
            data={Journals}
            keyExtractor={(item) => item.id}
            renderItem={renderFolders}
            ListEmptyComponent={
              <View>
                <Text>No folders</Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />
          {/* di nakaflatlist grr
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.folderStyle}>Bible Class</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.folderStyle}>Prayer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.folderStyle}>My Day</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={showDialog}>
          <Icons
            name="add-circle"
            size={70}
            color="#000000"
            stlye={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDeleteFolder(true)}>
          <MaterialCommunityIcons
            name="delete-circle"
            size={65}
            color="#8f1818"
            stlye={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JournalHome;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    //backgroundColor: "#990",
  },
  body: { flex: 7, justifyContent: "flex-start" },
  illustration: {
    height: 200,
    width: 200,
    marginTop: 35,
    marginLeft: 60,
  },
  folderContainer: {
    alignItems: "center",
    flex: 1,
    top: 15,
  },
  folderStyle: {
    borderWidth: 1,
    color: "#fff",
    backgroundColor: "#000000",
    margin: 10,
    borderRadius: 15,
    width: 290,
    height: 50,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "serif",
    paddingTop: 8,
    //marginRight: 25,
  },
  iconContainer: {
    position: "absolute",
    bottom: "4%",
    right: 15,
  },
});
