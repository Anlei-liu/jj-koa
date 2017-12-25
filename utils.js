export const foamtTime = (arr) => {
    arr.forEach((item) => {
        item.time = item.time.toLocaleDateString() + ' ' + item.time.toLocaleTimeString()
        return item;
    })
}
