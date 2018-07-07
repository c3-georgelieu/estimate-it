import defaultText from './default-text'

export const setApiKey = apiKey => localStorage.setItem('apiKey', apiKey)

export const getApiKey = () => localStorage.getItem('apiKey')

export const removeApiKey = () => localStorage.removeItem('apiKey')

const headers = () => ({
  'content-type': 'application/json',
  'x-apikey': getApiKey(),
  'cache-control': 'no-cache',
})

const db = (collection, method = 'GET', data = null) => new Promise((resolve, reject) => {
  fetch(`https://estimator-e1e7.restdb.io/rest/${collection}`, {
    method,
    headers: headers(),
    mode: 'cors',
    body: data && JSON.stringify(data),
  })
    .then(res => {
      // console.log(res.ok, 'Recieved response:', res)
      return res
    })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
})

export const saveEstimate = ({ _id, text, graphData = [] }) => (_id === 'new'
  ? db('estimates', 'POST', { text, graphData })
  : db(`estimates/${_id}`, 'PUT', { text, graphData }))

export const getEstimate = ({ estimateId }) => db(`estimates/${estimateId}`)

export const checkCreds = () => db('check/5b3e8507ef9d8e7700002e43')