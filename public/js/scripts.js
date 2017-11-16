const router = require('../routes/routes.js')
// document.addEventListener("DOMContentLoaded", function(event) {
  //do work
  const image = document.getElementById('image');
  const thumbsUp = document.getElementById('up');
  const thumbsDown = document.getElementById('down');
  // const unvote = () => {
  //   // this will remove a vote for the current picture
  //   // use random number from image.src?
  //   console.log('unvote');
  // }

  image.addEventListener('click', function(){
    let randomNumber = Math.round(Math.random() * 49)
    image.src = "https://picsum.photos/800/500/?image=" + randomNumber
  })

  // addEventListener to thumbs to alter appearance when clicked
  thumbsUp.addEventListener('click', function(){
    thumbsUp.classList.add('fa-thumbs-up')
    thumbsUp.classList.remove('fa-thumbs-o-up')
    // thumbsUp.addEventListener('click', unvote)
    thumbsDown.classList.remove('fa-thumbs-down')
    thumbsDown.classList.add('fa-thumbs-o-down')
    // const votes = getVotes(3)
    // console.log(votes);
    const votes = fetch('/votes', {
      method: 'get',
      // body: JSON.string÷ify(data),
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
    }
  })
    // .then(checkStatus)
    .then(()=>console.log(votes))

  })
  thumbsDown.addEventListener('click', function(){
    thumbsDown.classList.add('fa-thumbs-down')
    thumbsDown.classList.remove('fa-thumbs-o-down')
    // thumbsDown.addEventListener('click', unvote)
    thumbsUp.classList.remove('fa-thumbs-up')
    thumbsUp.classList.add('fa-thumbs-o-up')

  })
// })
//
//  and to display vote count after first clicked
//    vote count should be stored in db
//  and to allow users to unclick icon
// fa fa-thumbs-down
// fa fa-thumbs-up
