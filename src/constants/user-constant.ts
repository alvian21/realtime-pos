export const HEADER_TABLE_USER = ['No', 'Email', 'FullName', 'Role', 'Status', 'Created At', 'Action'];

export const INITIAL_USER_FORM = {
    name: '',
    alias: '',
    isActive: false
}

export const INITIAL_STATE_USER = {
    status: 'idle',
    errors: {
        name: [],
        alias: [],
        isActive: [],
        _form: [],
    }
}

