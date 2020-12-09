import React, {Component} from 'react';
import {View, Text} from 'react-native';
// import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';

// export default class Bills extends Component {
//     static navigationOptions = ({ navigationOptions, navigation }) => {
//         return ({
//             headerRight: (
//                 <AddSearchOptionsHeaderRight navigation={navigation} />
//             )
//         })
//     }

//     render() {
//         return (
//             <View><Text>a</Text></View>
//         );
//     }
// }

class Cheese extends React.PureComponent {
  render() {
    console.log('@aditya cheese');
    return <Text onPress={this.props.onPress}>{this.props.chees.text}</Text>;
  }
}
export default class Bills extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cheese: {text: 'cheese'},

      // cheese : 'cons',
      temp: 1,
    };
  }
  // componentDidMount(){
  //     setTimeout(()=>{
  //       this.setState({
  //           temp : 2,
  //       })
  //     },3000)
  // }
  changeCheese = () => this.setState({cheese: {text: 'ghee'}});
  // changeCheese = () => this.setState({cheese:'change'})

  render() {
    console.log('@aditya bills');
    return <Cheese chees={{text: 'text'}} onPress={this.changeCheese} />;
  }
}
