export const filterTable = (elements, search, fieldSearch) => {
    let arrElements = []
    let tempArr = {}

    elements.map((item) => {
        const itemType = item[fieldSearch]
        const itemId = item._id
        if (itemType.includes(search)) {
            tempArr = {...elements.filter(value => {return value._id === itemId })
            }
            arrElements.push(tempArr[0])
        }
    })
    return arrElements
}

export const getFieldId = (e) => {

    const headTable = document.getElementsByTagName("th")
    const input = document.getElementById("inputSearch")
    input.placeholder = `Search by ${e.target.id}`

    for (let i = 0; i < headTable.length; i++) {
        headTable[i].className = ''
    }
    e.target.className = 'bg-secondary'
    input.focus()

    return e.target.id
}
