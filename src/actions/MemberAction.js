export const Members = {
    MEMBERLIST: 'MEMBERLIST',
    ADDMEMBER: 'ADDMEMBER',
    REMOVEMEMBER: 'REMOVEMEMBER',
}

export const getMemberList = () => {
    return { type: Members.MEMBERLIST }
}

export const addMember = (payload) => {
    return { type: Members.ADDMEMBER, payload }
}
export const removeMember = (payload) => {
    return { type: Members.REMOVEMEMBER, payload }
}