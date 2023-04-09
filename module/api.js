'use strict'

export const button = async() => {

    //const url = `
    const response = await fetch(url)
    const data = await response.json()

    return data
}