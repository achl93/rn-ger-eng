import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput} from 'react-native';
var english_german = require('./english_german.json');
var SharedPreferences = require('react-native-shared-preferences');
import Swiper from 'react-native-swiper';

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '',
      history: ''
    };
  }
  /*
  loadHistory() {
    SharedPreferences.getAll(function(values){
      console.log(values);
      this.setState({"history": values});
    }).done();
  }
  */
  showMeaning() {
    var meaning = this.state.input in english_german ?
      english_german[this.state.input] :
      "Not Found";
    this.setState({
      output: meaning
    });
  }
  render() {
    return (
      <Swiper showsButtons={true}>
      <View style = {styles.parent}>
        <Text>
          English:
        </Text>
        <TextInput 
          placeholder = "Type here to translate!"
          onChangeText = {
            (text) => this.setState({input: text})
          }
          value = {this.state.input}
          onSubmitEditing = {
            this.showMeaning.bind(this)
            //(text) => this.saveHistory("asdf", text)
          }
        />
        <Text style = {styles.germanLabel}>
          German:
        </Text>
        <Text style = {styles.germanWord}>
          {this.state.output}
        </Text>
        </View>
        <View style = {styles.parent}>
        <Text style = {styles.history}>
          History:
        </Text>
        <Text style = {styles.historylist}>
          {this.state.history}
        </Text>
      </View>
      </Swiper>
    );
  }
  /*
  saveHistory(key, value) {
  SharedPreferences.setItem(key, value);
  this.setState({"history": value});
  */
}
const styles = StyleSheet.create({
  parent: {
    padding: 16
  },
  germanLabel: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  germanWord: {
    marginTop: 15,
    fontSize: 30,
    fontStyle: 'italic'
  },
  history: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  historylist: {
    marginTop: 10
  }
});

AppRegistry.registerComponent('Dictionary', () => Dictionary);