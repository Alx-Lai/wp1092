import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })


const startGame = async () => {
  let msg = ''
  await instance.post('/start')
  .catch((e)=>{
      if(e == 'Error: Network Error'){
          console.log('start error');
          msg = 'Network Error';
          return msg
      }
  })
  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
    let msg = ''
    await instance.get('/guess', { params: { number } })
    .then((res)=>{
        msg = res.data.msg
    })
    .catch((e)=>{
        console.log('error in catch' + e);
        console.log(e);
        if(e == 'Error: Network Error'){
            msg = 'Network Error';
            console.log('net err')
        }else{
            msg = 'Error: "'+number+'" is not a valid number (1 - 100)'
        }
    })
  return msg
}

const restart = async () => {
  let msg = ''
    await instance.post('/restart').catch((e)=>{
      if(e == 'Error: Network Error'){
            msg = 'Network Error';
            return msg;
      }
  })

  return msg
}

export { startGame, guess, restart }
