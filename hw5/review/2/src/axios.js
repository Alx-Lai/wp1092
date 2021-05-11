import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  }
  catch (error) {
    alert("Error: Network Connection Problem, Please try again later")
  }
}

const guess = async (number) => {
  // Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  }
  catch (error) {
    if (error.response !== undefined) {
      alert(`Error: "${number}" is not a valid number (1 - 100)`);
      return 'Not a legal number';
    }
    else
      alert("Error: Network Connection Problem, Please try again later")
  }
}

const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  }
  catch (error) {
    alert("Error: Network Connection Problem, Please try again later")
  }
}

export { startGame, guess, restart }
