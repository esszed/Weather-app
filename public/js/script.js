const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  messageOne.innerHTML = 'Loading'
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.err) {
        messageOne.innerHTML = data.err
        messageTwo.innerHTML = ''
      } else {
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = data.forecast
      }
    })
  })
})
