export const enroll = payload => (dispatch, getState, api) => api.post('/api/enroll', payload)
