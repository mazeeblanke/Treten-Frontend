export const transformArray = (data, key = 'id') => {
  let all = {};
  let byIds = [];

  all = data.reduce((agg, curr) => {
    byIds.push(curr[key]);
    agg[curr[key]] = curr
    return agg;
  }, all);

  return {
    all,
    byIds
  }
}

export const parsedPaginationTotalText = ({ current, pageSize, total }) => {
  if (!current || !pageSize || !total) return;
  let end = current * pageSize > total ? total : current * pageSize;
  let start = current * pageSize - pageSize + 1;
  return `Showing ${start} - ${end} of ${total}`;
}