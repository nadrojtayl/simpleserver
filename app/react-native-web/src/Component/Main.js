import React, { Component } from 'react';
import {chats} from '../chat/chats';
import { connect } from "react-redux";
import {setDelete , setItems , setID , setContact ,  setchangeColor} from '../service/action';

import { View, Text, StyleSheet, TextInput, Image,TouchableOpacity,Animated,Easing,FlatList,TouchableHighlight} from 'react-native-web';

class Main extends Component {

    constructor(props){
        super(props)
        this.spinValue=new Animated.Value(0)
        this.springValue=new Animated.Value(0.4)
        this.animatedValue3 = new Animated.Value(0)
        this.state={
          text : '',
          blinker:true,
          chengi:true
          // changeColor:false
      }
    }

    pressButton=() =>{
      this.props.setID()
     
      if(this.state.text.length > 0 ){
      this.props.setItems(this.state.text)
      this.setState({
        text: ''
    })
    }
  }

    onTextChangeHandler =(input) =>{
      this.setState({
        text:input
      })
    }

    changeColor=() =>{
      this.setState({changeColor: !this.state.changeColor})
    }

    Remover = (index) => {

      this.props.setDelete(index)
   
    }    

    componentDidMount () {
        this.spin()
        setInterval(
          () => this.blinking(),
          900
        );
      }

      spin() {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,{
            toValue:1,
            duration:3000,
            easing:Easing.linear
          }
        ).start(() => this.spin())
      }

      spring() {
        this.springValue.setValue(0)
        Animated.spring(
          this.springValue,{
            toValue:1,
            friction:1
            // duration:3000,
            // easing:Easing.linear
          }
        ).start()
      }

      animate () {
        this.animatedValue3.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
          return Animated.timing(
            value,
            {
              toValue: 1,
              duration,
              easing,
              delay
            }
          )
        }
        Animated.parallel([
          createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)        
        ]).start()
      }

      Button=() =>{
        this.setState({chengi: !this.state.chengi})
      }

        blinking =() => {this.setState(prev=>({blinker:!prev.blinker}))}
 
    render() {
        const introButton1 = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-400, 10]
          })

          const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','360deg']
          })

        return (
         
              <View style={[styles.container, this.props.change && {backgroundColor: '#f5b7b1'}]}>
              
            {
             
            }
            <View style={styles.header}>
            {/* <View style={{backgroundColor:this.props.change , width : 30 , height : 30}}></View> */}

                <View style={{flex:1,flexDirection:'row',alignItems: 'center'}}>
                
                    <Text style={{marginLeft:20}}>{this.props.contactName}</Text>
                   { this.state.blinker && <Image
                         source={require("../photos/circle.png")}
                         style={styles.circle}
                    />}
                </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity>
                            <Image
                                 source={require("../photos/folder.png")}
                              style={styles.imagIcon}
                            />
                        </TouchableOpacity>
                    
                        <TouchableOpacity>
                            <Animated.Image
                                source={require("../photos/phone.png")}
                                 style={{ width: 15, height: 15,marginLeft: 20, marginRight:32, transform:[{rotate:spin}] }}
                             />
                        </TouchableOpacity>
                         <TouchableOpacity>
                            <Image
                                source={require("../photos/videoo.png")}
                                style={{ width: 20, height: 20, marginRight: 20 }}
                             />
                        </TouchableOpacity>
                    </View>
                    </View>

<View style={{flex:8}}>

<FlatList
          data={this.props.rana}
          keyExtractor={item => item.id}
          renderItem={({ item , index }) => <TouchableHighlight onPress={this.Remover.bind(this, index)}> 
            <Text style={styles.iconChat} onPress={this.props.setContact()}>{item.text}</Text> 
            </TouchableHighlight>
            }
        />

        </View>


                <View style={this.state.chengi && styles.search || styles.bcred}>
                
                
                
                <TextInput
                        style={{fontSize:10 ,paddingLeft:20,flex:1 }}
                        placeholder={"Type somthing to search..."}
                        value={this.state.text}
                        onSubmitEditing={this.pressButton.bind(this)}
                        onChangeText={this.onTextChangeHandler.bind(this)}
                    />
                <TouchableOpacity onPress={this.pressButton.bind(this)} >
                        <Image
                    source={require("../photos/arrow-up.png")}
                    style={styles.imagIcon}
                    />
                    </TouchableOpacity>
                        <TouchableOpacity onPress={this.Button.bind(this)}>
                            <Image
                    source={require("../photos/attachment.png")}
                    style={[styles.imagIcon,{marginHorizontal:10,}]}
                    />
                        </TouchableOpacity>
                <TouchableOpacity>
                    <Animated.Image
                    source={require("../photos/smile.png")}
                    style={[styles.imagIcon,{marginHorizontal:10,transform:[{scale:this.spinValue}]}]}
                     />
                </TouchableOpacity>
                </View> 
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 6,
    },
    search: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: "#dce2e8",
        alignItems: "center",
        marginTop: 30,
      },
      ch: {
        flex:6,
   
        backgroundColor: "red",
    
      },
      header: { 
          flex:1,
          flexDirection: 'row',
          backgroundColor: "white",
          
          alignItems: "center",
      },
      imagIcon:{
        width: 15, 
        height: 15, 
        marginRight: 10
      },
      circle:{
        width: 7, 
        height: 7, 
        marginLeft:5,
        marginTop:4
      },
      chatProfile:{
        width: 30,
        height: 30, 
        borderRadius: 50,
        marginLeft:15,
        marginRight:10, 
      },
      iconChat:{
        width:190,
        minHeight:25,
        backgroundColor:'skyblue',
        marginLeft: 10,
        borderRadius:5,
        marginTop: 20,
        justifyContent: 'center',
        padding:10,
       flex:1
      },
      changeC:{
        backgroundColor:'#fad6fb'
      },
      bcred:{
        backgroundColor:'#4fc4c8',
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 30,
      }
});

const mapStateToProps = state => {
  return {
    rana: state.items,
    contactName:state.name,
    change : state.color,
  };
};

export default connect(mapStateToProps,{setDelete,setItems,setID,setContact,setchangeColor})(Main);
