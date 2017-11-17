
const image = document.getElementById('image');
const thumbsUp = document.getElementById('up');
const thumbsDown = document.getElementById('down');
const upVote = () => {
  thumbsUp.classList.add('fa-thumbs-up')
  thumbsUp.classList.remove('fa-thumbs-o-up')
}
const downVote = () => {
  thumbsDown.classList.add('fa-thumbs-down')
  thumbsDown.classList.remove('fa-thumbs-o-down')
}
const clearDownVote = () => {
  thumbsDown.classList.remove('fa-thumbs-down')
  thumbsDown.classList.add('fa-thumbs-o-down')
}
const clearUpVote = () => {
  thumbsUp.classList.remove('fa-thumbs-up')
  thumbsUp.classList.add('fa-thumbs-o-up')
}
// const unvote = () => {
//   // this will remove a vote for the current picture
//   // use random number from image.src?
//   console.log('unvote');
// }
let randomNumber = 0

image.addEventListener('click', function(){
  let randomNumber = Math.round(Math.random() * 49)
  image.src = "https://picsum.photos/800/500/?image=" + randomNumber
  clearUpVote()
  clearDownVote()
})

function update(data) {
  console.log('fetching');
  console.log('data', data)
  return fetch('/votes', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: 1})
  })
  .then(()=>console.log('updated!!!'))
}

// addEventListeners to thumbs to alter appearance when clicked
thumbsUp.addEventListener('click', function(){
  upVote()
  clearDownVote()
  update(1)
})

thumbsDown.addEventListener('click', function(){
  downVote()
  clearUpVote()
})

//
//  and to display vote count after first clicked
//    vote count should be stored in db
//  and to allow users to unclick icon
// fa fa-thumbs-down
// fa fa-thumbs-up
