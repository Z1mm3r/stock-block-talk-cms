
// Converts Youtube Link into thumbnail location
//ex. https://www.youtube.com/embed/3vC4lyLjvr4
//into  https://img.youtube.com/vi/3vC4lyLjvr4/0.jpg
export const linkToThumbnail = (url) => {
    const id = url.slice(url.lastIndexOf('/') + 1)
    const  thumbnail = `https://img.youtube.com/vi/${id}/0.jpg`
    return thumbnail
}
