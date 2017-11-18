
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
//
let randomNumber
const newImage = () => {
  randomNumber = Math.round(Math.random() * 49)
  image.src = "https://picsum.photos/800/500/?image=" + randomNumber
  return randomNumber
}
image.addEventListener('click', function(){
  // randomNumber = Math.round(Math.random() * 49)
  // image.src = "https://picsum.photos/800/500/?image=" + randomNumber
  randomNumber = newImage()
  clearUpVote()
  clearDownVote()
  electionUpdate.innerHTML = ''
})

function voteSave(direction) {
  console.log('fetching');
  console.log('data', randomNumber)
  return fetch('/votes', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: randomNumber,
      direction: direction
    })
  })
  .then(updatedVoteCount => updatedVoteCount.json())
}

// addEventListeners to thumbs to alter appearance when clicked
thumbsUp.addEventListener('click', function(){
  upVote()
  clearDownVote()
  voteSave('upvotes')
    .then((election)=>{
      console.log(election);
      electionUpdate.innerHTML = `Upvotes: ${election.upvotes}\nDownvotes: ${election.downvotes}`
    })
})

thumbsDown.addEventListener('click', function(){
  downVote()
  clearUpVote()
  voteSave('downvotes')
    .then((election)=>{
      console.log(election);
      electionUpdate.innerHTML = `Upvotes: ${election.upvotes}\nDownvotes: ${election.downvotes}`
    })
})

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
    randomNumber = newImage()

  }
};
//
//  and to display vote count after first clicked
//    vote count should be stored in db
//  and to allow users to unclick icon
// fa fa-thumbs-down
// fa fa-thumbs-up
