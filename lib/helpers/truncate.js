export const truncate = (string, limit = 24) => {
	return `${string.substr(0, 24)}${string.length > limit ? '...' : ''}`
}
