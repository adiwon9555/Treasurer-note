import {Members} from '../actions/MemberAction';

const initialState = {
  // memberList: [],
  memberList: [
    {
      egf: 'HSR',
      data: [
        {
          id: 1,
          userName: 'Aditya Rathi',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
        {
          id: 2,
          userName: 'Ausaf',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
        {
          id: 3,
          userName: 'H D Christopher',
          image: '',
        },
        {
          id: 4,
          userName: 'Reema T John',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
      ],
    },
    {
      egf: 'Kormangala',
      data: [
        {
          id: 5,
          userName: 'Khan Sahab',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
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
        },
      ],
    },
    {
      egf: 'BTM',
      data: [
        {
          id: 8,
          userName: 'Aditya Rathi',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
        {
          id: 9,
          userName: 'Ausaf',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
        {
          id: 10,
          userName: 'H D Christopher',
          image: '',
        },
        {
          id: 11,
          userName: 'Reema T John',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
        },
      ],
    },
    {
      egf: 'Begur',
      data: [
        {
          id: 12,
          userName: 'Khan Sahab',
          image:
            'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
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
        },
      ],
    },
  ],
};

export const MemberReducer = (state = initialState, action) => {
  let newState = {};
  let egf = '';
  let data = {};
  switch (action.type) {
    case Members.MEMBERLIST:
      return state;
    case Members.ADDMEMBER:
      egf = action.payload.egf;
      data = action.payload.data;
      newState = Object.assign({}, state, {
        memberList: state.memberList.map((item) =>
          item.egf === egf ? {egf, data: [...item.data, data]} : item,
        ),
        // memberList: initialState.memberList,
      });
      return newState;
    case Members.EDITMEMBER:
      const {member} = action.payload;
      const {oldegf} = action.payload;

      egf = member.egf;
      data = member.data;
      if (oldegf === egf) {
        newState = Object.assign({}, state, {
          memberList: state.memberList.map((item) => {
            if (item.egf === egf) {
              let obj = {
                egf,
                data: item.data.map((member) => {
                  if (member.id === data.id) {
                    return data;
                  } else {
                    return member;
                  }
                }),
              };
              return obj;
            } else {
              return item;
            }
          }),
        });
      } else {
        newState = Object.assign({}, state, {
          memberList: state.memberList.map((item) => {
            if (item.egf === egf) {
              item.data.push(data);
              return item;
            } else if (item.egf === oldegf) {
              let obj = {
                egf: item.egf,
                data: item.data.filter((member) => member.id !== data.id),
              };
              return obj;
            } else {
              return item;
            }
          }),
        });
      }
      return newState;
    case Members.REMOVEMEMBER:
      egf = action.payload.egf;
      if (egf) {
        //for single
        newState = Object.assign({}, state, {
          memberList: state.memberList.map((item) =>
            item.egf === egf
              ? {
                  egf,
                  data: item.data.filter(
                    (member) => !action.payload.ids.includes(member.id),
                  ),
                }
              : item,
          ),
        });
      } else {
        //for all marked
        newState = Object.assign({}, state, {
          memberList: state.memberList.map((item) => ({
            egf: item.egf,
            data: item.data.filter(
              (member) => !action.payload.ids.includes(member.id),
            ),
          })),
        });
      }

      return newState;
    default:
      return state;
  }
};
