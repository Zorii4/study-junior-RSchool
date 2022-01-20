/* eslint-disable */
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const dateFormat = (date) => {
    date = Number(date)
    const today = new Date()
    const currentDate = new Date(date)
    const different = Math.floor((today.getTime() - date) / 60000)

    switch (true) {
        case different < 1:
            return "1 минуту назад"

        case different < 5:
            return "5 минут назад"

        case different < 10:
            return "10 минут назад"

        case different < 30:
            return "30 минут назад"

        case different < 1440:
            return (
                `0${currentDate.getHours()}`.slice(-2) +
                ":" +
                `0${currentDate.getMinutes()}`.slice(-2)
            )
        case different < 525600:
            return (
                `${currentDate.getDate()}` +
                " " +
                `${monthNames[currentDate.getMonth() + 1]}`
            )
        default:
            return (
                `${currentDate.getDate()}` +
                " " +
                `${monthNames[currentDate.getMonth() + 1]}` +
                " " +
                `${currentDate.getFullYear()}`
            )
    }
}
/* eslint-disable */
