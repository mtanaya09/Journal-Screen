import AsyncStorage from "@react-native-async-storage/async-storage";

//For handling the journals' JSON===============================================================================>
export const getJournals = async (journalName = "JOURNALS") => {
  try {
    const journals = await AsyncStorage.getItem(journalName);
    if (journals != null) {
      //console.log(journals);
      return JSON.parse(journals);
    } else {
      console.log("methods.js: theres no journals in local storage");
      return [];
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const setJournals = async (journalsJSON, journalName = "JOURNALS") => {
  try {
    await AsyncStorage.setItem(journalName, JSON.stringify(journalsJSON));
    console.log("methods.js: journals set");
  } catch (error) {
    console.log(error.message);
  }
};

export const resetJournals = async (journalName = "JOURNALS") => {
  try {
    await AsyncStorage.removeItem(journalName);
    console.log("methods.js: journals reset");
  } catch (error) {
    console.log(error.message);
  }
};

export const getIndexInArray = (array = Array(), id = Number()) =>
  array.findIndex((value) => value?.id == id);
//syncJournals currently broken, do the syncing manually muna with getJournals and setJournals
export const syncJournals = async (
  journalsJSON,
  journalName = "JOURNALS",
  localSync = true
) => {
  //sync is a combination of get and set journals,
  //thus returning a journals array object and taking a journals array object as an argument
  console.log(`methods.js: syncing from ${type == 0 ? "storage" : "web"}`);
  //type 0 is local sync, type 1 is web sync
  if (localSync) {
    //local sync
    try {
      getJournals(journalName)
        .then((value) => {
          //value can either be an empty array [] or an array that
          //contains JournalFolder objects [JournalFolder], both in String format
          console.log("syncJournals value: ", value);
          //check if value and the passed journals is synced
          if (JSON.stringify(journalsJSON) == value) {
            return JSON.parse(value);
          } else {
            //if they're not synced, sync cached from storage
          }
        })
        .catch((error) => console.log("syncJournals error: ", error.message));
    } catch (error) {
      console.log(error.message);
    }
  } else {
    //web sync
    console.log("methods.js: for web");
  }
};
//For handling the journals' JSON==============================================================================/>
