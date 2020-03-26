import React, { Component } from "react";
import {setContact , fetchProducts , setSearch} from '../service/action';
import {connect} from 'react-redux';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  UIManager,
  Animated,
  Easing
} from "react-native-web";

// class ContactDetail extends Component {
//   render() {
//     const { firstName, lastName, avatarUrl } = this.props;

//     return (
//       <TouchableHighlight underlayColor="rgba(0,0,0,.3)" onPress={() => { this.pressButton}}>
//         <View style={styles.list}>
//           <Image source={{ uri: avatarUrl }} style={styles.flatImage} />
//           <Text style={styles.flatText}>{firstName}</Text>
//           <Text style={styles.flatText}>{lastName}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
// }

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class Contacts extends Component {



  constructor(props) {
    super(props);
    this.state = {
      text:'',
      // filter: [],
      // filteredData: [],
      // lastData: [],
      // loading: false,
      fadeIn: new Animated.Value(0),
      // toggle:false,
      // width:new Animated.Value(0)
      // animatedValue = new Animated.Value(0)
    };
  }
  
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 45,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => this.animate())
  }

  // changeButton=() =>{
  //   // LayoutAnimation.configureNext(this.config);
  //   this.setState({toggle: !this.state.toggle})
  // }

  pressButton=(name) =>{
    this.props.setContact (name)
 
}

  componentDidMount() {
    this.props.fetchProducts();
    this.fadeIn();
  }

  searchFilterFunction = text => {
    this.props.setSearch (text)
  }

//   setText = text  => {
//     this.setState ({
//         text : text
//     })
// };

  // searchFilterFunction = (text) => {
  //   // debugger;
  //   let result = this.state.lastData.filter(contact =>
  //     `${contact.name.first.toUpperCase()} ${contact.name.last.toUpperCase()}`.includes(
  //       text.toUpperCase()
  //     )
  //   );
  //   this.setState({
  //     filteredData: result
  //   });
  // };


  // getContacts = () => {
  //   return this.state.filteredData.length > 0
  //     ? this.state.filteredData
  //     : this.state.filter;
  // };

  fadeIn = () => {
    Animated.timing(
        this.state.fadeIn,
        {
            toValue: 1,
            duration: 1000,
            // easing: Easing.back(),
            // useNativeDriver: true
        }
    ).start()
    
};

 
  search = () => {
    
    return (
      <Animated.View style={styles.hedaerFlatList}>
        <View style={[styles.main , {opacity: this.state.fadeIn,}]}>
          <Image
            source={require("../photos/search.png")}
            style={{ width: 13, height: 13, marginRight: 10 }}
          />
          <TextInput
            placeholder={"Search"}
            style={{ fontSize: 12, color: "#98999a" }}
            // onPress={()=>this.props.setSearch(this.state.text)}
             onChangeText={this.searchFilterFunction.bind(this)}
          />
        </View>
      </Animated.View>
    );
  };

  // getContacts = () => {
  //   return this.state.filteredData.length > 0
  //     ? this.state.filteredData
  //     : this.state.filter;
  // };

  render() {
    let { fadeIn } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.result}
          ListHeaderComponent={this.search}
          keyExtractor={item => item.login}
          renderItem={({ item }) => (
            // <ContactDetail
            //   firstName={item.name.first} 
            //   lastName={item.name.last}
            //   avatarUrl={item.picture.large}
            // />
            <TouchableHighlight underlayColor="rgba(0,0,0,.3)" onPress={() => { this.pressButton (item.login )}}>
            <View style={styles.list}>
              <Image source={{ uri: item.avatar_url }} style={styles.flatImage} />
              <Text style={styles.flatText}>{item.login}</Text>
              <Text style={styles.flatText}>{item.login}</Text>
              {/* <Text style={styles.flatText}>{item.name.last}</Text> */}
            </View>
           </TouchableHighlight>
          )}
        />
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ecf6ff",
    // height:300,
    marginLeft:-20
  },
  list: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "white"
    paddingHorizontal: 30
  },
  flatImage: {
    width: 35,
    height: 35,
    borderRadius:100
  },
  flatText: {
    color: "black",
    paddingTop: 5,
    paddingLeft: 5
  },
  search: {
    backgroundColor: "#dce2e8"
  },
  hedaerFlatList: {
    backgroundColor: "#dce2e8",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 30,
    padding: 10,
    marginVertical: 30,
    height: 30
},
  main: {
    marginLeft: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    // fontSize: textSize,
    // marginTop: 10,
  },

  buttonOn: {
    backgroundColor: "#dce2e8",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 30,
    height: 30
  },

  buttonOff: {
    width: Animated,
    height: 45,
    backgroundColor: "#dce2e8",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
return{
  items:state.Contacts,
  result: state.result,
  filteredData: state.filteredData,
    // products: state.products.items,
    // loading: state.products.loading,
    // error: state.products.error
}

}


export default connect(mapStateToProps, {setContact , fetchProducts , setSearch})(Contacts);
