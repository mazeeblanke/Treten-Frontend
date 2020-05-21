export const parsedPaginationTotalText = ({ current, pageSize, total }) => {
  if (current && pageSize && total) {
    const end = current * pageSize > total ? total : current * pageSize
    const start = current * pageSize - pageSize + 1
    return `Showing ${start} - ${end} of ${total}`
  }
  return ''
}
