// Navbar

let menuIcon = document.getElementById('menu-icon'),
    closeIcon = document.getElementById('close-icon'),
    navigation = document.getElementById('navigation');

menuIcon.addEventListener('click', (e)=> {
  if(navigation.classList.contains('menu-active')) {
    navigation.classList.remove('menu-active')
  } else {
    navigation.classList.add('menu-active')
  }
});

closeIcon.addEventListener('click', (e)=> {
  if(navigation.classList.contains('menu-active')) {
    navigation.classList.remove('menu-active')
  } 
});