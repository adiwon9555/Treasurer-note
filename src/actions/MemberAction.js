export const Members = {
  MEMBERLIST: 'MEMBERLIST',
  ADDMEMBER: 'ADDMEMBER',
  REMOVEMEMBER: 'REMOVEMEMBER',
  EDITMEMBER: 'EDITMEMBER',
  UPDATE_MEMBER_LIST: 'UPDATE_MEMBER_LIST',
};

export const getMemberList = () => {
  return {type: Members.MEMBERLIST};
};

export const addMember = (payload) => {
  return {type: Members.ADDMEMBER, payload};
};

export const editMember = (payload) => {
  console.log('@aditya action');

  return {type: Members.EDITMEMBER, payload};
};

export const removeMember = (payload) => {
  return {type: Members.REMOVEMEMBER, payload};
};

export const updateMemberList = (payload) => {
  console.log('@aditya update action ', payload);
  return {type: Members.UPDATE_MEMBER_LIST, payload};
};
