export const Members = {
    MEMBERLIST: 'MEMBERLIST',
    ADDMEMBER: 'ADDMEMBER',
    REMOVEMEMBER: 'REMOVEMEMBER',
    EDITMEMBER: 'EDITMEMBER',
}

export const getMemberList = () => {
    return { type: Members.MEMBERLIST }
}

export const addMember = (payload) => {
    return { type: Members.ADDMEMBER, payload }
}

export const editMember = (payload) => {
    console.log('@aditya action');
    
    return { type: Members.EDITMEMBER, payload }
}

export const removeMember = (payload) => {
    return { type: Members.REMOVEMEMBER, payload }
}