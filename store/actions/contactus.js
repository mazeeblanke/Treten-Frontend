export const sendContactUsMsg = payload => (dispatch, getState, api) => api.post('/api/contactus', payload)
