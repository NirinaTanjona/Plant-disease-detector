export const fetchPredict = async (data) => {
    const response = await fetch('https://plant-disease-detector01.herokuapp.com/predict', {
        mode: 'cors',
        method: 'POST',
        body: data
    })
    const result = await response.json()
    return result
}
