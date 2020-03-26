import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing
} from "react-native-web";
import { connect } from "react-redux";
import { setchangeColor } from "../service/action";
import { Transform } from "stream";

class Icons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeColor: false,
      // changeWidth:true,
      transformer: new Animated.Value(0),
      fader: new Animated.Value(0),
      iconTransformer: new Animated.Value(15),
      showText: false
    };
  }

  animate() {
    Animated.timing(this.animatedValue, {
      toValue: 45,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.animate());
  }

  changeColor = () => {
    this.props.setchangeColor();
  };

  // changeWidth =() =>{
  //     this.setState({changeWidth: !this.state.changeWidth})
  //     console.log(this.changeWidth)
  // }

  // changeColor=() =>{
  //     this.setState({changeColor: !this.state.changeColor});
  //   }

  changeTranslate = () => {
    if (this.state.transformer._value === 0) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.transformer, {
            toValue: 50,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(this.state.iconTransformer, {
            toValue: -25,
            duration: 1000,
            useNativeDriver: true
          })
        ]),
        Animated.timing(this.state.fader, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        },()=>this.setState({showText:true}))
      ]).start();
    } else if (this.state.transformer._value === 50) {
      Animated.sequence([
        Animated.timing(this.state.fader, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.parallel([
          Animated.timing(this.state.transformer, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(this.state.iconTransformer, {
            toValue: 15,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ]).start();
    }
  };
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: this.state.transformer }] }
        ]}
      >
        <Animated.View
          style={{ transform: [{ translateX: this.state.iconTransformer }] }}
        >
          <Image
            source={require("../photos/1.jpg")}
            style={[
              styles.profile,
              {
                transform: [
                  { translateX: this.state.changeColor.iconTransformer }
                ]
              }
            ]}
          />
        </Animated.View>
        <Animated.View
          style={{
            marginTop: 30,
            // marginLeft:500,
            transform: [{ translateX: this.state.iconTransformer }]
          }}
        >
          <TouchableOpacity style={styles.touchStyle}>
            <Image
              source={require("../photos/comment.png")}
              style={styles.icon}
            />
            <Animated.Text
                style={{ color: "#fff", opacity: this.state.fader,width:65,alignItems:'center' }}
              >
                comment
              </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.changeColor.bind(this)}
            style={styles.touchStyle}
          >
            <Image source={require("../photos/like.png")} style={styles.icon} />
            <Animated.Text
                style={{ color: "#fff", opacity: this.state.fader,width:65,alignItems:'center' }}
              >
                likes
              </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchStyle}>
            <Image
              source={require("../photos/video.png")}
              style={styles.icon}
            />
            <Animated.Text
                style={{ color: "#fff", opacity: this.state.fader,width:65,alignItems:'center' }}
              >
                video
              </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchStyle}>
            <Image
              source={require("../photos/email.png")}
              style={styles.icon}
            />
            <Animated.Text
                style={{ color: "#fff", opacity: this.state.fader,width:65,alignItems:'center' }}
              >
                email
              </Animated.Text>
          </TouchableOpacity>
          <Animated.View>
            <TouchableOpacity
              style={styles.touchStyle}
              onPress={this.changeTranslate.bind(this)}
            >
              <Image
                source={require("../photos/setting.png")}
                style={styles.icon}
              />
              
              <Animated.Text
                style={{ color: "#fff", opacity: this.state.fader,width:65,alignItems:'center' }}
              >
                Setting
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
       
       
          <TouchableOpacity  style={[styles.touchStyle, {marginTop:90}]}>
            <Image source={require("../photos/note.png")} style={styles.icon} />
          </TouchableOpacity>
          </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    paddingLeft: 100,
    paddingRight: 15,
    marginLeft: -75,
    // justifyContent: 'center',
    width: 500,
    // alignItems: 'center',
    alignItems: "flex-end",
    backgroundColor: "#030132",
    position: "relative",
    zIndex: 2
  },
  touchStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 40,
    width:70,
    // marginLeft: 50
    //   padding: 20,
    // paddingLeft:100
    // borderColor:'#fff',
    // borderWidth: 3,
  },
  profile: {
    marginTop: 35,
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "white",
    marginRight: 30
  },
  icon: {
    // marginTop: 40,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius:50,
    marginHorizontal:15
  }
});

export default connect(
  null,
  { setchangeColor }
)(Icons);
