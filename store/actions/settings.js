
export const fetchSettings = payload => (dispatch, getState, api) => api.get('/api/settings')

export const saveSettings = payload => (dispatch, getState, api) => api.post('/api/settings', payload)
