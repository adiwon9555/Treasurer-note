export const Members = {
    MEMBERLIST: 'MEMBERLIST',
    ADDMEMBER: 'ADDMEMBER',
}

export const getMemberList = () => {
    return { type: Members.MEMBERLIST }
}

export const addMember = (payload) => {
    return { type: Members.ADDMEMBER, payload }
}