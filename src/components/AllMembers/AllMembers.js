import React, { Component } from 'react';
import { View, Text, FlatList, SectionList, TouchableOpacity, TouchableHighlight } from 'react-native';
import MemberCard from './MemberCard';

const DATA = [
    {
        egf: 'HSR',
        data: [
            {
                id: 1,
                name: 'Aditya Rathi',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 2,
                name: 'Ausaf',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 3,
                name: 'H D Christopher',
                image: '',
            },
            {
                id: 4,
                name: 'Reema T John',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            }
        ],
    },
    {
        egf: 'Kormangala',
        data: [
            {
                id: 5,
                name: 'Khan Sahab',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 6,
                name: 'Thomas',
                image: '',
            },
            {
                id: 7,
                name: 'John',
                image: '',
            }
        ],
    },
    {
        egf: 'BTM',
        data: [
            {
                id: 8,
                name: 'Aditya Rathi',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 9,
                name: 'Ausaf',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 10,
                name: 'H D Christopher',
                image: '',
            },
            {
                id: 11,
                name: 'Reema T John',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            }
        ],
    },
    {
        egf: 'Begur',
        data: [
            {
                id: 12,
                name: 'Khan Sahab',
                image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            },
            {
                id: 13,
                name: 'Thomas',
                image: '',
            },
            {
                id: 14,
                name: 'John',
                image: '',
            }
        ],
    },
];
export default class AllMembers extends Component {
    constructor() {
        super();
        this.state = {
            memberList: DATA,
            selected: null,
        }
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
                    sections={this.state.memberList}
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

const styles = {
    memberListContainer: {
        marginLeft: 5,
        marginRight: 5,
    },
    sectionHeader: {
        fontSize: 20,
        paddingTop: 5,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        // backgroundColor: '#DDD',
    }
}