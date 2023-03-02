// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // 1/1/2023 => 01/01/2023
    // 01 => 01
    // 020 => 20
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${day}/${month}/${year}`
}