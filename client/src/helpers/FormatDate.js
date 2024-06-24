/* eslint-disable no-unused-vars */
export function formatDateTime(date) {
	const dateYMD=new Date(date).toISOString().split('T')[0].split('-')
	const year=dateYMD[0]
	const month=dateYMD[1]
	const day=dateYMD[2]
	return `${day}/${month}/${year}`
}