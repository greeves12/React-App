import * as React from 'react';
import {Text,TextInput, TouchableOpacity, KeyboardAvoidingView, View, StyleSheet, Alert} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class Post extends React.Component <any,any>{
  constructor(props: any){
    super(props);
    
    this.createPost = this.createPost.bind(this);
  }

   state = {
      title: "",
      description: ""
    }
    

    createPost (){
      const {title} = this.state;
      const {description} = this.state;
      var username = this.props.navigation.dangerouslyGetParent().getParam('Username')

      if(title == "" || description == ""){
        return Alert.alert("All fields must be filled");
      }
      fetch('http://162.243.174.168/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          username: username
        })
      }).then((response)=>response.json()).then((responseJson)=>{
        if(responseJson == 'POSTED'){
          this.props.navigation.navigate('Ticket', {Username: username});
          this.setState({title: ""})
          this.setState({description: ""})
          Alert.alert("Successfully posted.");
        }else{
          Alert.alert("Something went wrong...Try again later");
        }
      }).catch((error)=>{
        Alert.alert(error);
      })
    }
  
  
  render(){
    return(
      <View style={styles.Head}>
      <Header 
      backgroundColor='#fff'
        leftComponent={<Text style={{marginRight: 80, fontSize: 15, fontFamily: 'Times', fontWeight: 'bold'}}>Ticket Creation</Text>}
        rightComponent={<Text style={{color: '#566573', fontFamily: 'Times', fontWeight: 'bold'}} onPress={this.createPost}>POST</Text>}
      />
      <KeyboardAvoidingView style={styles.Container} behavior="padding">
      
      <TextInput style={styles.Input} returnKeyType="next" placeholder="Enter Title..." onChangeText={(text)=> this.setState({title:text})} value={this.state.title}></TextInput>
      <TextInput style={styles.Desc} textAlignVertical={'top'} multiline={true} placeholder="Enter Description..." onChangeText={(text) => this.setState({description:text})} value={this.state.description}></TextInput> 
     
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Head: {
    flex: 1,
    justifyContent: "flex-start",
  },
  Input: {
        height: 40,
        color: '#424949',
        fontSize: 20,
        paddingHorizontal: 10,
        opacity: 0.5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        borderColor: '#515A5A',
        
        
  },
  Desc: {
    height: 300,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  Container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    
  }, 

});