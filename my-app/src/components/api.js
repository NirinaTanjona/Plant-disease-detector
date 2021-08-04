export const fetchPredict = async (data) => {
    const response = await fetch('http://127.0.0.1:5000/predict', {
        mode: 'cors',
        method: 'POST',
        body: data
    })
    const result = await response.json()
    return result
}