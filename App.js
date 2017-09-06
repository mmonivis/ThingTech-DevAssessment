import React from 'react';
import { Image, StyleSheet, Text, View, ListView } from 'react-native';

export default class App extends React.Component {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    getInitialState() {
         return {
            apiURL: 'https://serene-scrubland-62943.herokuapp.com/',
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
         }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData() {
        fetch(this.state.apiURL, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            for (var i = 0; i < responseData.length; i++){
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseData)})
            }
        })
        .done(() => {
        });
    }




  render() {
    return (

      <View style={styles.container}>

         <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>}
            />
      </View>

    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#345678',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
