const menuButton = document.querySelector('.menu-button')

const classOpen = '#nav-icon3.open'

menuButton.addEventListener('click', function (event) {
  event.preventDefault()

  const buttonClass = menuButton.classList

  const isOpen = buttonClass.contains(classOpen)

  console.log(buttonClass)

  if (isOpen) {
    return menuButton.classList.remove(classOpen)
  } else {
    return menuButton.classList.add(classOpen)
  }
})

// menuButton.ready(function () {
//   menuButton.click(function () {
//     $(this).toggleClass('#nav-icon3.open')
//   })
// })
