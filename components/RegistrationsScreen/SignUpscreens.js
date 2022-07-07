import { StyleSheet, Text, View ,TouchableOpacity , TextInput, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icons from "react-native-vector-icons/Ionicons";
import { useState } from 'react'

function SignupPage() {
    const navigation = useNavigation();

    const[passwordVisible , setPasswordVisible] = useState(true);

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
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>{
              navigation.navigate("loginScreen");
          }}>
    <Text style={styles.signupText}>Sign Up</Text>
    <View style={styles.ViewContainer}>
    <View style={styles.line} />
    </View>
    </TouchableOpacity>

    <View style={styles.InputContainer} >
 
    <TextInput
    placeholder='First Name'
    style={styles.inputText}
    />
     <TextInput
    placeholder='Last Name'
    style={styles.inputText}
    />
     <TextInput
    placeholder='Email'
    style={styles.inputText}
    />
     <TextInput
    placeholder='Password'
    style={styles.inputText}
    secureTextEntry={passwordVisible}
    />
    <TouchableOpacity onPress={() =>[setPasswordVisible(!passwordVisible) , setEyeIcon(funcTheIcon)]}>
     <Icons name={EyeIcon}  style={styles.eyeIcons} size={25}/>
   </TouchableOpacity>


    <Text style={styles.sixText}>6 Characters Minimum</Text>
    <Text style={styles.withText}>You can also Sign up with</Text>
    
    </View>
    <View style={styles.icons}>
    <Image source={require('../../assets/image/fb.png')} style={styles.images}/>
    <Image source={require('../../assets/image/gg.png')} style={styles.images}/>
    <Image source={require('../../assets/image/mac.png')} style={styles.images}/>
    </View>
    <Text style={styles.termsAndPolicyText}>By Signing up you agree to our Terms and Privacy Policy</Text>
    <TouchableOpacity>
        <Text style={styles.buttonSignup}>SIGN UP</Text>
    </TouchableOpacity>
    <View stlye={styles.imageContainers}>
        <Image source={require('../../assets/image/computer.png')} style={styles.computerImg}/>
    </View>
    </View>
          
    )
}
export default function SignUpscreens(){
    return <SignupPage />
}

const styles = StyleSheet.create({
container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'skyblue',
    borderTopLeftRadius:70,
    borderTopRightRadius:70,
},
signupText:{
    marginTop:5,
    left:29,
    fontSize:15,
},
ViewContainer:{
flexDirection:'row',
alignItems:'center',
marginTop:5,
},
line:{
    height: 1, 
    backgroundColor: 'pink',
    paddingHorizontal:55,
    paddingVertical:8,
    borderRadius:10,
},
InputContainer:{

},
inputText:{
    color:'black',
    backgroundColor:'white',
    margin:4,
    paddingHorizontal:90,
    paddingVertical:8,
    borderRadius:20,
    borderColor:'darkslateblue',
    borderWidth:1,
},
sixText:{
top:4,
left:9,
},
withText:{
    textAlign:'center',
    top:15,
},
icons:{
    flexDirection:'row',
    alignContent:'center',
    marginTop:10,
},
images:{
    top:5,
    width:45,
    height:45,
    margin:10,
},
termsAndPolicyText:{
    top:7,
},
buttonSignup:{
    top:20,
    backgroundColor:'pink',
    paddingVertical:7,
    paddingHorizontal:28,
    borderRadius:15,
    fontSize:16,
},
eyeIcons:{
    position:'absolute',
    bottom:12,
    right:20,
},
imageContainers:{
flexDirection:'row-reverse',

},
computerImg:{
width:80,
height:80,
left:120,
bottom:10,
}
})