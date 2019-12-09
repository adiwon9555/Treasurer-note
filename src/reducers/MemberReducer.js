import { Members } from "../actions/MemberAction"

const initialState = {
    // memberList: [],
    memberList: [
        {
            egf: 'HSR',
            data: [
                {
                    id: 1,
                    userName: 'Aditya Rathi',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 2,
                    userName: 'Ausaf',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 3,
                    userName: 'H D Christopher',
                    image: '',
                },
                {
                    id: 4,
                    userName: 'Reema T John',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                }
            ],
        },
        {
            egf: 'Kormangala',
            data: [
                {
                    id: 5,
                    userName: 'Khan Sahab',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 6,
                    userName: 'Thomas',
                    image: '',
                },
                {
                    id: 7,
                    userName: 'John',
                    image: '',
                }
            ],
        },
        {
            egf: 'BTM',
            data: [
                {
                    id: 8,
                    userName: 'Aditya Rathi',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 9,
                    userName: 'Ausaf',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 10,
                    userName: 'H D Christopher',
                    image: '',
                },
                {
                    id: 11,
                    userName: 'Reema T John',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                }
            ],
        },
        {
            egf: 'Begur',
            data: [
                {
                    id: 12,
                    userName: 'Khan Sahab',
                    image: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
                },
                {
                    id: 13,
                    userName: 'Thomas',
                    image: '',
                },
                {
                    id: 14,
                    userName: 'John',
                    image: '',
                }
            ],
        },
    ],

}

export const MemberReducer = (state = initialState, action) => {
    let newState = {};
    let egf = '';
    switch (action.type) {
        case Members.MEMBERLIST:
            return state;
        case Members.ADDMEMBER:
            egf = action.payload.egf;
            let data = action.payload.data;
            newState = Object.assign({}, state, {
                memberList: state.memberList.map(item => item.egf === egf ? { egf, data: [...item.data, data] } : item)
            });
            return newState;
        case Members.REMOVEMEMBER:
            egf = action.payload.egf;
            newState = Object.assign({}, state, {
                memberList: state.memberList.map(item => item.egf === egf 
                    ? { 
                        egf, data: item.data.filter(member => !(member.id===action.payload.id))
                    } 
                    : 
                    item)
            });
            return newState;
        default:
            return state;
    }
}