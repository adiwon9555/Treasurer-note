import React, {Component} from 'react';
import {
  View,
  Text,
  SectionList,
  BackHandler
} from 'react-native';
import MemberCard from './MemberCard';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import {normalize} from '../utils/utils';
import {connect} from 'react-redux';
import {getMemberList, removeMember} from '../../actions/MemberAction';
import SearchBox from './SearchBox';
import DrawerIconHeaderLeft from '../utils/DrawerIconHeaderLeft';
import memoize from 'memoize-one';

class AllMembers extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      modalVisible: false,
      selectedEgf: null,
      filterText: '',
      showSearchBox: false,
    };
  }
  componentDidMount() {
    //   this.didFocusSubscription = this.props.navigation.addListener(
    //       'didFocus',
    //       () => this.props.getMemberList()
    //   );
    BackHandler.addEventListener('hardwareBackPress', () =>  {
        if (this.state.showSearchBox) {
          this.closeSearch();
          return true;
        }
        return false;
      });
    this.props.navigation.setParams({toggleSearch: this.toggleSearch})
  }
  // componentWillUnmount(){
  //     this.didFocusSubscription.remove();
  // }
  static navigationOptions = ({navigationOptions, navigation}) => {
    return {
      title: 'BCSE - All Members',
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20)},
      headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
      headerRight: (
        <AddSearchOptionsHeaderRight
          navigation={navigation}
          openAddModal={() => {
            navigation.navigate('AddMember');
          }}
          searchIcon={navigation.getParam('searchIcon',true)}
          toggleSearch={navigation.getParam('toggleSearch',()=>{})}
        />
      ),
    };
  };
  setSelected = (id, egf) => {
    if (this.state.selected == id) {
      this.setState({
        selected: null,
        selectedEgf: null,
      });
    } else {
      this.setState({
        selected: id,
        selectedEgf: egf,
      });
    }
  };

  renderItem = ({item, section}) => {
    selected = this.state.selected == item.id ? true : false;
    item.egf = item.egf || section.egf;
    return (
      <MemberCard
        selected={selected}
        setSelected={this.setSelected}
        member={item}
        deleteMember={this.deleteMember}
        navigation={this.props.navigation}
      />
    );
  };

  deleteMember = () => {
    this.props.removeMember({
      id: this.state.selected,
      egf: this.state.selectedEgf,
    });
  };

  onSearch = value => {
    this.setState({ filterText: value });
  };

  toggleSearch = () => {
      this.setState({
          showSearchBox: !this.state.showSearchBox,
          filterText: '',
      },() => {
        this.props.navigation.setParams({searchIcon: !this.state.showSearchBox})
      })
      
  }

  closeSearch = () => {
      this.setState({
          filterText : '',
          showSearchBox: false,
      }, () => {
        this.props.navigation.setParams({searchIcon: !this.state.showSearchBox})
      })

  }

  filter = memoize((list, filterText) =>{
    // list.filter(item => item.egf.toLowerCase().includes(filterText.toLowerCase()));
    let temp =  list.map(item => ({egf :item.egf, data: item.data.filter( members =>
        members.userName.toLowerCase().includes(filterText.toLowerCase())
    )}))
    return temp.filter(item => item.data.length > 0);
  });

  render() {
    const {showSearchBox} = this.state;
    const {memberListContainer, sectionHeader} = styles;
    const filteredList = this.filter(this.props.memberList, this.state.filterText);
    return (
      <View style={memberListContainer}>
        {showSearchBox && <SearchBox
          placeholder="Search Member"
          onChangeText={this.onSearch}
          value={this.state.filterText}
          closeSearch= {this.closeSearch}
        />}
        <SectionList
          sections={filteredList}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={({section: {egf}}) => (
            // <View style={{minWidth:30}}>
            <Text style={sectionHeader}>{egf}</Text>
            // </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberList: state.MemberReducer.memberList,
  };
};

export default connect(mapStateToProps, {getMemberList, removeMember})(
  AllMembers,
);

const styles = {
  memberListContainer: {
    marginLeft: normalize(5),
    marginRight: normalize(5),
  },
  sectionHeader: {
    fontSize: normalize(20),
    paddingTop: normalize(5),
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: normalize(20),
    // backgroundColor: '#DDD',
  },
};
