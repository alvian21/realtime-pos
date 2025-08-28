export const HEADER_TABLE_USER = ['No', 'Email', 'FullName', 'Role', 'Status', 'Created At', 'Action'];

export const INITIAL_USER_FORM = {
    name: '',
    alias: '',
    isActive: false
}

export const INITIAL_STATE_USER = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        nickname: [],
        fullName: [],
        roleId: [],
        file: [],
        isActive: [],
        _form: [],
    }
}

export const INITIAL_CREATE_USER_FORM = {
    nickname: '',
    fullName: '',
    roleId: '',
    file: '',
    email: '',
    password: '',
    isActive: false
}

export const INITIAL_STATE_CREATE_USER = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        nickname: [],
        fullName: [],
        roleId: [],
        file: [],
        isActive: [],
        _form: [],
    }
}

export const INITIAL_STATE_UPDATE_USER = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        nickname: [],
        fullName: [],
        roleId: [],
        file: [],
        isActive: [],
        _form: [],
    }
}

