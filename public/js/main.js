
const image = document.getElementById('image');
const thumbsUp = document.getElementById('up');
const thumbsDown = document.getElementById('down');
const electionUpdate = document.getElementById('electionUpdate')
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
let randomNumber

image.addEventListener('click', function(){
  randomNumber = Math.round(Math.random() * 49)
  image.src = "https://picsum.photos/800/500/?image=" + randomNumber
  clearUpVote()
  clearDownVote()
})

function voteSave(data) {
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
  .then(updatedVoteCount => updatedVoteCount.json())
  // .then((votes) => {
  //   console.log('votes', votes);
  //
  // })
  // .then((votes)=> votes.body )
}

// addEventListeners to thumbs to alter appearance when clicked
thumbsUp.addEventListener('click', function(){
  upVote()
  clearDownVote()
  let votesUpdate = voteSave(1)
    .then((election)=>{

      console.log(election);
      electionUpdate.innerHTML = `Upvotes: ${election.upvotes}\nDownvotes: ${election.downvotes}`
    })
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
