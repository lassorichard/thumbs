// Navbar

let menuIcon = document.getElementById('menu-icon'),
    closeIcon = document.getElementById('close-icon'),
    navigation = document.getElementById('navigation');

menuIcon.addEventListener('click', (e)=> {
  if(navigation.classList.contains('menu-active')) {
    e.preventDefault();
    navigation.classList.remove('menu-active')
  } else {
    navigation.classList.add('menu-active')
  }
});

closeIcon.addEventListener('click', (e)=> {
  e.preventDefault();
  if(navigation.classList.contains('menu-active')) {
    navigation.classList.remove('menu-active')
  } 
});

// Pop up

let popUpClose = document.getElementById('popup-close'),
    popUp = document.getElementById('popup'); 
    
popUpClose.addEventListener('click', (e)=> {
  e.preventDefault();
  popUp.style.display = 'none';
});