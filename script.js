//Dino = Sonic
//Cactus = Spikes

//Creating variables
const dino = document.querySelector('.dino')
const background = document.querySelector('.background') //const background created so we can place cactus inside of it
let isJumping = false
let position = 0 // Dino's jumps

// Intercepting when the user presses the spacebar
function handleKeyup(event) {
  if (event.keyCode === 32) {
    // 32 is the keycode for spacebar
    if (!isJumping) {
      jump()
    }
  }
}

// Function to make Dino jump
function jump() {
  // Creating repetitions/intervals
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)

      //Down
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 20) //he's going down in 20 milliseconds
    } else {
      //Up
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20) // he's going up in 20 milliseconds
}

// Function create Cactus
function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1000 // Placing cactus 1000px to the left
  let randomTime = Math.random() * 6000 //creating news cactus at random. 'Math' creates operations. In this case, it'll create random numbers.

  cactus.classList.add('cactus')
  cactus.style.left = 1000 + 'px'
  background.appendChild(cactus) // placing cactus inside the background div.

  //Making cactus move
  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus) //if the cactus disappears from the screen, remove the cactus
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // if it's still on screen (> 0) and occupying the same place as dino (< 60 | dino's width is 60) and dino's height is below 60 (<60 - cactus' height is 60)

      //Game Over
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">GAME OVER!</h1>'
    } else {
      cactusPosition -= 5 //if not, make it 'walk' to the right at 10 milliseconds
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20)

  //setTimeout - it executes a function after a given time (in this case, the randomTime set above)
  //Recursion - when a function calls itself
  setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyup)
