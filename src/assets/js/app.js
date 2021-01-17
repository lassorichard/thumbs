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

// JSON files

function bringData () {
  fetch('../info.json')
    .then(ajaxPositive)
    .catch(showError);
}

bringData();

function ajaxPositive(response) {
  if(response.ok) {
    response.text().then(showResult);
  } else {
    showError('status code: ' + response.status);
  }
}

function showResult(txt) {
  let data = JSON.parse(txt),
      grid = document.querySelector('#grid');

  for (let item of data) {
    grid.innerHTML += `
      <div class="grid__box" id="${item.id}">
        <div class="grid__box__title">
          <div class="thumbs-box thumbs-box--up">
            <i class="fas fa-thumbs-up"></i>
          </div>
          <h6 class="headline--6">
            ${item.name}
          </h6>
        </div>
        <p class="grid__box__category paragraph--4">
          <span class="bold">${item.time} ago</span> in ${item.category}
        </p>
        <p class="grid__box__description paragraph--5" id="description-box">
          ${item.description}
        </p>
        <p class="grid__box__description paragraph--5 deactive" id="thanks">
          Thanks you for voting!
        </p>
        <div class="grid__box__vote">
          <div class="grid__box__vote__thumbs" id="thumbs">
            <div class="thumbs-box thumbs-box--up" id="thumb-up">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <div class="thumbs-box thumbs-box--down" id="thumb-down">
              <i class="fas fa-thumbs-down"></i>
            </div>
          </div>
          <div class="btn btn--primary" id="vote-now">
            Vote now
          </div>
          <div class="btn btn--primary deactive" id="vote-again">
            Vote Again
          </div>
        </div>
        <div class="grid__box__footer hero__box__bottom text-white">
          <div class="thumbs thumbs--box">
            <div class="thumbs__up">
              <i class="fas fa-thumbs-up"></i>
              <div class="thumbs__percent">
                <span class="bold headerline--4">36</span>%
              </div>
            </div>
            <div class="thumbs__down">
              <div class="thumbs__percent">
                <span class="bold headerline--4">64</span>%
              </div>
              <i class="fas fa-thumbs-down"></i>
            </div>
          </div>
        </div>
        <div class="grid__box__image">
          <img src="${item.img}">
          <div class="grid__box__image__gradient"></div>
        </div>
      </div>
    ` 
  }
  thumbSelect();
}

function showError(err) { 
  console.log('error', err);
}


let thumbSelect = ()=> {

  let thumbUp = document.getElementById('thumb-up'),
    thumbDown = document.getElementById('thumb-down'),
    thumbs = document.getElementById('thumbs');

  // Thumb selected

  thumbUp.addEventListener('click', (e)=> {
    console.log('thumb up');
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    };
  });
  
  thumbDown.addEventListener('click', (e)=> {
    if(thumbDown.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbDown.classList.add('selected');
      thumbUp.classList.remove('selected');
    };
  });

  // Vote Now

  let voteNow = document.getElementById('vote-now'),
      descriptionBox = document.getElementById('description-box'),
      thanks = document.getElementById('thanks'),
      voteAgain = document.getElementById('vote-again');

  voteNow.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
      thumbs.classList.add('deactive');
      voteNow.classList.add('deactive');
      voteAgain.classList.remove('deactive');
      descriptionBox.classList.add('deactive');
      thanks.classList.remove('deactive');
    }
  });

  voteAgain.addEventListener('click', (e)=> {
    if(voteAgain.classList.contains('deactive')) {
    } else {
      thumbs.classList.remove('deactive');
      voteNow.classList.remove('deactive');
      voteAgain.classList.add('deactive');
      thumbUp.classList.remove('selected')
      thumbDown.classList.remove('selected')
      descriptionBox.classList.remove('deactive');
      thanks.classList.add('deactive');
    };
  });
}

// let thumbSelect = ()=> {

//   let thumbUp = document.getElementById('thumb-up'),
//     thumbDown = document.getElementById('thumb-down'),
//     thumbs = document.getElementById('thumbs');

//   // Thumb selected

//   thumbUp.addEventListener('click', (e)=> {
//     console.log('thumb up');
//     if(thumbUp.classList.contains('selected')) {
//       thumbUp.classList.add('selected');
//       thumbDown.classList.remove('selected');
//     } else {
//       thumbUp.classList.add('selected');
//       thumbDown.classList.remove('selected');
//     };
//   });
  
//   thumbDown.addEventListener('click', (e)=> {
//     if(thumbUp.classList.contains('selected')) {
//       thumbUp.classList.remove('selected');
//       thumbDown.classList.add('selected');
//     } else {
//       thumbDown.classList.add('selected');
//       thumbUp.classList.remove('selected');
//     };
//   });

//   // Vote Now

//   let voteNow = document.getElementById('vote-now'),
//       descriptionBox = document.getElementById('description-box'),
//       thanks = document.getElementById('thanks'),
//       voteAgain = document.getElementById('vote-again');

//   voteNow.addEventListener('click', (e)=> {
//     if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
//       thumbs.classList.add('deactive');
//       voteNow.classList.add('deactive');
//       voteAgain.classList.remove('deactive');
//       descriptionBox.classList.add('deactive');
//       thanks.classList.remove('deactive');
//     }
//   });

//   voteAgain.addEventListener('click', (e)=> {
//     if(voteAgain.classList.contains('deactive')) {
//     } else {
//       thumbs.classList.remove('deactive');
//       voteNow.classList.remove('deactive');
//       voteAgain.classList.add('deactive');
//       thumbUp.classList.remove('selected')
//       thumbDown.classList.remove('selected')
//       descriptionBox.classList.remove('deactive');
//       thanks.classList.add('deactive');
//     };
//   });
// }




