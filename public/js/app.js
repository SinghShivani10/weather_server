console.log("client side msg");

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// })

const weather_form = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
//message1.textContent = 'javascript'

weather_form.addEventListener('submit', (e) => {

    e.preventDefault()
    message1.textContent = "Loading ...."

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //, { mode: 'no-cors' }
    fetch(`/weather?address=${input.value}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        if(data.Error)
        {
            message1.textContent = data.Error
        }
        else{
            message1.textContent = 'Location : ' + data.location
            message2.textContent = 'Weather Forcast : ' + data.forcat
        }
    })
    .catch(error => {
        message1.textContent = 'Something interrupted' + error
    });

})