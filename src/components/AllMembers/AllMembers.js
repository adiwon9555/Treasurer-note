import React, {Component} from 'react';
import {View, Text, SectionList, BackHandler, Linking} from 'react-native';
import MemberCard from './MemberCard';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import {normalize} from '../utils/utils';
import {connect} from 'react-redux';
import {getMemberList, removeMember} from '../../actions/MemberAction';
import SearchBox from './SearchBox';
import DrawerIconHeaderLeft from '../utils/DrawerIconHeaderLeft';
import memoize from 'memoize-one';
import MarkedItemActionBox from './MarkedItemActionBox';
import {SaveExcel} from '../export-excel/Playground';

class AllMembers extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      modalVisible: false,
      selectedEgf: null,
      filterText: '',
      showSearchBox: false,
      markedItems: [],
    };
  }
  componentDidMount() {
    //   this.didFocusSubscription = this.props.navigation.addListener(
    //       'didFocus',
    //       () => this.props.getMemberList()
    //   );
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.showSearchBox || this.state.markedItems.length > 0) {
        if (this.state.showSearchBox) {
          this.closeSearch();
        }
        if (this.state.markedItems.length > 0) {
          this.cancelSelection();
        }
        return true;
      }
      return false;
    });
    this.props.navigation.setParams({toggleSearch: this.toggleSearch});
    this.props.navigation.setParams({saveExcel: this.saveExcel});
    this.props.navigation.setParams({openAddModal: this.openAddModal});
  }
  // componentWillUnmount(){
  //     this.didFocusSubscription.remove();
  // }
  openAddModal = () => {
    this.props.navigation.navigate('AddMember');
  };
  static navigationOptions = ({navigationOptions, navigation}) => {
    return {
      title: 'BCSE - All Members',
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20), marginLeft: -normalize(3)},
      headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
      headerRight: (
        <AddSearchOptionsHeaderRight
          navigation={navigation}
          openAddModal={navigation.getParam('openAddModal', () => {})}
          saveExcel={navigation.getParam('saveExcel', () => {})}
          searchIcon={navigation.getParam('searchIcon', true)}
          toggleSearch={navigation.getParam('toggleSearch', () => {})}
        />
      ),
    };
  };
  saveExcel = () => {
    let c = 1;
    const data = this.props.memberList.flatMap((egfLevel) =>
      egfLevel.data.map((item) => ({
        Serial_No: c++,
        Id: item.id,
        Name: item.userName,
        EGF: egfLevel.egf,
        Phone: item.phone,
        Email: item.email,
        Image: item.image,
        Notes: item.notes,
      })),
    );
    SaveExcel(data);
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
  markItem = (id, egf) => {
    let marked = this.state.markedItems.includes(id);
    if (marked) {
      this.setState({
        markedItems: this.state.markedItems.filter((mid) => mid !== id),
        selected: null,
        selectedEgf: null,
      });
    } else {
      this.setState({
        markedItems: [...this.state.markedItems, id],
        selected: null,
        selectedEgf: null,
      });
    }
  };
  cancelSelection = () => {
    this.setState({
      markedItems: [],
    });
  };

  markAll = () => {
    this.setState({
      markedItems: this.props.memberList.flatMap((egfLevel) =>
        egfLevel.data.map((member) => member.id),
      ),
    });
  };

  markAllEgf = () => {
    let egfs = this.props.memberList.flatMap((egfLevel) =>
      egfLevel.data.map((member) => {
        return this.state.markedItems.includes(member.id) ? egfLevel.egf : '';
      }),
    );
    this.setState({
      markedItems: this.props.memberList
        .filter((egfLevel) => egfs.includes(egfLevel.egf))
        .flatMap((egfLevel) => egfLevel.data.map((member) => member.id)),
    });
  };

  onMailPress = () => {
    let emails = this.props.memberList.flatMap((egfLevel) =>
      egfLevel.data.map((member) => {
        return this.state.markedItems.includes(member.id) ? member.email : '';
      }),
    );
    if (emails.length > 0) Linking.openURL(`mailto:${emails.toString()}`);
  };

  renderItem = ({item, section}) => {
    let selected = this.state.selected == item.id ? true : false;
    item.egf = item.egf || section.egf;
    return (
      <MemberCard
        selected={selected}
        setSelected={this.setSelected}
        member={item}
        deleteMember={this.deleteMember}
        navigation={this.props.navigation}
        markItem={this.markItem}
        markedItems={this.state.markedItems}
      />
    );
  };

  deleteMember = () => {
    if (this.state.selected) {
      this.props.removeMember({
        ids: [this.state.selected],
        egf: this.state.selectedEgf,
      });
    } else if (this.state.markedItems.length > 0) {
      this.props.removeMember({
        ids: this.state.markedItems,
        egf: null,
      });
      this.setState({
        markedItems: [],
      });
    }
  };

  onSearch = (value) => {
    this.setState({filterText: value});
  };

  toggleSearch = () => {
    this.setState(
      {
        showSearchBox: !this.state.showSearchBox,
        filterText: '',
      },
      () => {
        this.props.navigation.setParams({
          searchIcon: !this.state.showSearchBox,
        });
      },
    );
  };

  closeSearch = () => {
    this.setState(
      {
        filterText: '',
        showSearchBox: false,
      },
      () => {
        this.props.navigation.setParams({
          searchIcon: !this.state.showSearchBox,
        });
      },
    );
  };

  filter = memoize((list, filterText) => {
    // list.filter(item => item.egf.toLowerCase().includes(filterText.toLowerCase()));
    let temp = list.map((item) => ({
      egf: item.egf,
      data: item.data.filter((members) =>
        members.userName.toLowerCase().includes(filterText.toLowerCase()),
      ),
    }));
    return temp.filter((item) => item.data.length > 0);
  });

  render() {
    const {showSearchBox} = this.state;
    const {memberListContainer, sectionHeader} = styles;
    const filteredList = this.filter(
      this.props.memberList,
      this.state.filterText,
    );
    return (
      <View style={memberListContainer}>
        {showSearchBox && (
          <SearchBox
            placeholder="Search Member"
            onChangeText={this.onSearch}
            value={this.state.filterText}
            closeSearch={this.closeSearch}
          />
        )}
        {this.state.markedItems.length > 0 && (
          <MarkedItemActionBox
            cancelSelection={this.cancelSelection}
            markAll={this.markAll}
            deleteMember={this.deleteMember}
            onMailPress={this.onMailPress}
            markAllEgf={this.markAllEgf}
          />
        )}
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

const mapStateToProps = (state) => {
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
