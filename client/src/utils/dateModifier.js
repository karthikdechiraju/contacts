export const dateModifier = (date) => {
    let newDate = new Date(date)
    return newDate.getDate() + '-' + parseInt(newDate.getMonth() + 1) + '-' + newDate.getFullYear()
}