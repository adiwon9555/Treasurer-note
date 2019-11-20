import React, { Component } from 'react';
import { View, Text, FlatList, SectionList, TouchableOpacity, TouchableHighlight } from 'react-native';
import MemberCard from './MemberCard';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import { normalize } from '../utils/utils'
import { connect } from 'react-redux';
import { getMemberList, Members } from '../../actions/MemberAction';


class AllMembers extends Component {
    constructor() {
        super();
        this.state = {
            selected: null,
            modalVisible: false,
        }
    }
    // componentDidMount() {
    //     this.didFocusSubscription = this.props.navigation.addListener(
    //         'didFocus',
    //         () => this.props.getMemberList()
    //     );
    // }
    // componentWillUnmount(){
    //     this.didFocusSubscription.remove();
    // }
    static navigationOptions = ({ navigationOptions, navigation }) => {
        return ({
            title: 'BCSE - All Members',
            headerStyle: { height: normalize(55) },
            headerTitleStyle: { fontSize: normalize(20) },
            headerLeft: (
                <DrawerIconHeaderLeft navigation={navigation} />
            ),
            headerRight: (
                <AddSearchOptionsHeaderRight navigation={navigation} openAddModal={() => { navigation.navigate('AddMember') }} />
            )
        })
    }
    setSelected = (id) => {
        if (this.state.selected == id) {
            this.setState({
                selected: null,
            })
        } else {
            this.setState({
                selected: id
            })
        }
    }

    renderItem = (item) => {
        selected = this.state.selected == item.id ? true : false;
        return <MemberCard selected={selected} setSelected={this.setSelected} member={item}></MemberCard>
    }


    render() {

        const { memberListContainer, sectionHeader } = styles;
        return (
            <View style={memberListContainer}>
                <SectionList
                    sections={this.props.memberList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => this.renderItem(item)}
                    renderSectionHeader={({ section: { egf } }) => (
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
    }
}

export default connect(mapStateToProps, { getMemberList })(AllMembers);

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
    }
}