// Navbar

let menuIcon = document.getElementById('menu-icon'),
    closeIcon = document.getElementById('close-icon'),
    body = document.querySelector('body'),
    html = document.querySelector('html'),
    navigation = document.getElementById('navigation');

menuIcon.addEventListener('click', (e)=> {
  if(navigation.classList.contains('menu-active')) {
    e.preventDefault();
    navigation.classList.remove('menu-active');
  } else {
    navigation.classList.add('menu-active')
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
  }
});

closeIcon.addEventListener('click', (e)=> {
  e.preventDefault();
  if(navigation.classList.contains('menu-active')) {
    navigation.classList.remove('menu-active')
    body.style.overflow = 'initial';
    html.style.overflow = 'initial';
  } 
});

// Pop up

let popUpClose = document.getElementById('popup-close'),
    popUp = document.getElementById('popup'); 
    
popUpClose.addEventListener('click', (e)=> {
  e.preventDefault();
  popUp.style.display = 'none';
});

// Hero
