let url = 'http://localhost:3000/chores/'
let choreList = document.getElementById('chore-list')


fetch(url)
.then(function(response){
  return response.json()
}).then(function(json){
  console.log(json)


  json.forEach(renderPost)




  choreList.addEventListener('click', function(event){
    if(event.target.className === 'delete-button'){
      event.target.parentElement.remove()
      let foundChore = json.find(function(chore){
        return chore.id === parseInt(event.target.dataset.id)

      })
       deleteChore(foundChore.id)
      // console.log(foundChore)

    }
  })
  // let input = document.querySelector('#priority')
  let form = document.getElementById('new-chore-form')
  // console.log(form)
  form.addEventListener('submit', function(event){
    event.preventDefault()
    // console.log(event.target)
    // debugger
    let title = event.target.title.value
    let priority = event.target.priority.value
    let duration = event.target.duration.value
    let newChore = {title: title, priority: priority, duration: duration}
    // console.log(title)
    postChore(newChore)
  })

})

function renderPost(chore){
  choreList.innerHTML+= `<div class="chore-card">
            <button class="delete-button" data-id="${chore.id}">x</button>
            <h3> ${chore.title} </h3>
            <p> Duration: ${chore.duration} </p>
          <input></div>`
}



//controller
//headers tell server what type of data we are posting
function postChore(newChore){
  return fetch(url, {
    method:'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newChore)
  }).then(response =>
  response.json().then(renderPost)
  )
}


function deleteChore(choreId){
  return fetch(url + choreId, {
    method:'delete'
  }).then(response =>
  response.json().then(json =>{
    return json;
  })
  )
}
