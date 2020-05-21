export const transformArray = (data, key = 'id') => {
  let all = {}
  const byIds = []

  all = data.reduce((agg, curr) => {
    const aggregate = { ...agg }
    byIds.push(curr[key])
    aggregate[curr[key]] = curr
    return aggregate
  }, all)

  return {
    all,
    byIds
  }
}
