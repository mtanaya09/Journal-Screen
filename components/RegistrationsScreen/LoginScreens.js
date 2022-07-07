import { StyleSheet, Text, View , KeyboardAvoidingView,TextInput, TouchableOpacity, Image , Button } from 'react-native';
import React ,{useState} from 'react';
import Icons from "react-native-vector-icons/Ionicons";
import FontIcons  from "react-native-vector-icons/FontAwesome";
import TistIcons  from "react-native-vector-icons/Fontisto";
import { useNavigation } from '@react-navigation/native';

function LoginPage(){
  const[passwordVisible , setPasswordVisible] = useState(true);

  const navigation = useNavigation();
  let theIcon = "ios-eye-off-sharp";
  
  const funcTheIcon=() =>{
    if(passwordVisible==true){
    setEyeIcon("ios-eye-off-outline")
    }else{
      setEyeIcon("ios-eye-off-sharp")
    }
  }

  const[EyeIcon , setEyeIcon] = useState(theIcon);
return(
  <View
  style = {styles.container}
  behavior="padding"
  >

  <View style={styles.imageContainer}>
  <Image source={require('../../assets/image/welcome1.png')} style={styles.welcomeImage} />
    </View>


  <View style={styles.inputContainer}>
  <TextInput 
  placeholder="Username"
  // value={}
  // onchangeText={text =>{}}
  style={styles.input}
  />
   <FontIcons name="user"  style={styles.userIcon} size={25}/>
</View>

<View style={styles.passwordContainer}>
   <TextInput 
  placeholder="Password"
  // value={}
  // onchangeText={text =>{}}
  style={styles.input}
  secureTextEntry={passwordVisible}
  />
  <View style={styles.LockContainer}>
   <TistIcons name="locked"  style={styles.lockIcon} size={25}/>
   </View>
   </View>

  <TouchableOpacity onPress={() =>[setPasswordVisible(!passwordVisible) , setEyeIcon(funcTheIcon)]} >
  <Icons name={EyeIcon}  style={styles.eyeIcons} size={25}/>
  </TouchableOpacity>


    <View style={styles.loginButton}>
      <TouchableOpacity>
    <Text style={styles.loginText}>
      LOGIN
    </Text>
      </TouchableOpacity>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
   <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}> OR </Text>
  </View>
    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  </View>

  <View style={styles.icons}>
    <Image source={require('../../assets/image/fb.png')} style={styles.images}/>
    <Image source={require('../../assets/image/gg.png')} style={styles.images}/>
    <Image source={require('../../assets/image/mac.png')} style={styles.images}/>
  </View>

    <View style={styles.textContainer}>
    <Text style={styles.texts}>
    Don't have an Account?  
    </Text>
    <TouchableOpacity style={styles.signUpconatainer} onPress={()=>{navigation.navigate('signUpScreen')}}>
      <Text style={styles.signUptext}>Sign In</Text></TouchableOpacity>
    </View>
</View>
)
}
export default function LoginScreensPage(){
    return <LoginPage />
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  inputContainer:{
    alignItems:'stretch',
    textAlign:'left',
    marginTop:5,
  },
  eyeIcons:{
    position:'absolute',
    left:100,
    
  },
  userIcon:{
    position:'absolute',
    bottom:12,
    left:7,
  },
  lockIcon:{
    position:'absolute',
    bottom:12,
    left:7,
  },
  input:{
    backgroundColor:'grey',
    paddingRight:170,
    paddingLeft:40,
    paddingVertical:8,
    borderWidth:1,
    marginTop:10,
    borderRadius:12,
    borderColor:'darkslateblue',
    textAlign:'left',

  },
  loginButton:{
      paddingVertical:8,
      marginBottom:10,
  },
  loginText:{
    marginTop: 10,
    color:'white',
    backgroundColor:'indigo',
    paddingHorizontal: 30,
    paddingVertical:8,
    borderRadius:10,
    
  },
  icons:{
    flexDirection:'row',
    alignContent:'center',
    marginTop:10,
  },

  images:{
  width:45,
  height:45,
  margin:10,
  },
  textContainer:{
    marginTop:10,
    flexDirection:'row'
  },
  texts:{
    bottom:1,
    marginRight:5,
    fontSize:15,
  },
  signUpconatainer:{
    paddingTop:7,
    
  },signUptext:{
    color:'blue',
    fontSize:15,
    bottom:7,
  },
  imageContainer:{
    backgroundColor:'pink',
    paddingHorizontal:110,
    bottom:11,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  welcomeImage:{
    height:150,
    width:150,
  }
  
});