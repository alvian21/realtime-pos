export const HEADER_TABLE_ROLE = ['No', 'Name', 'Alias', 'Status', 'Created At', 'Action'];

export const ROLE_STATUS_LIST = [{
    value: 'active',
    label: 'Active'
},
{
    value: 'non-active',
    label: 'Non Active'
},
];

export const INITIAL_ROLE_FORM = {
    name: '',
    alias: '',
    isActive: false
}

export const INITIAL_STATE_ROLE = {
    status: 'idle',
    errors: {
        name: [],
        alias: [],
        isActive: [],
        _form: [],
    }
}

export const INITIAL_ROLE_PERMISSION_FORM = {
    permissionIds: []
}

export const INITIAL_STATE_ROLE_PERMISSION = {
    status: 'idle',
    errors: {
        permissionIds: [],
        _form: [],
    }
}
