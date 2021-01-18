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
      // total = (votes-up + vote-down),
      // percentUp = (vote-up / total) * 100,
      // percentDown = (vote-down / total) * 100;

      // ${ ( (item.likes * 100) / ( item.likes + item.dislikes ) ) }

  for (let item of data) {
    grid.innerHTML += `
      <div class="grid__box">
        <div class="grid__box__title">
          <div class="thumbs-box thumbs-box--down" id="title-thumb-${item.id}">
            <i class="fas fa-thumbs-down" id="title-thumb-icon-${item.id}"></i>
          </div>
          <h6 class="headline--6">
            ${item.name}
          </h6>
        </div>
        <p class="grid__box__category paragraph--4">
          <span class="bold">${item.time} ago</span> in ${item.category}
        </p>
        <p class="grid__box__description paragraph--5" id="description-box-${item.id}">
          ${item.description}
        </p>
        <p class="grid__box__description paragraph--5 deactive" id="thanks-${item.id}">
          Thanks you for voting!
        </p>
        <div class="grid__box__vote">
          <div class="grid__box__vote__thumbs" id="thumbs-${item.id}">
            <div class="thumbs-box thumbs-box--up" id="thumb-up-${item.id}">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <div class="thumbs-box thumbs-box--down" id="thumb-down-${item.id}">
              <i class="fas fa-thumbs-down"></i>
            </div>
          </div>
          <div class="btn btn--primary" id="vote-now-${item.id}">
            Vote now
          </div>
          <div class="btn btn--primary deactive" id="vote-again-${item.id}">
            Vote Again
          </div>
        </div>
        <div class="grid__box__footer hero__box__bottom text-white">
          <div class="thumbs thumbs--box">
            <div class="thumbs__up" style="width: ${Math.round(( (item.likes) / (item.likes + item.dislikes) ) * 100 )}%">
              <i class="fas fa-thumbs-up"></i>
              <div class="thumbs__percent">
                <span id="percentone-${item.id}" class="bold headerline--4">${Math.round(( (item.likes) / (item.likes + item.dislikes) ) * 100 )}</span>%
              </div>
            </div>
            <div class="thumbs__down" style="width: ${Math.round(( (item.dislikes) / (item.likes + item.dislikes) ) * 100 )}%"">
              <div class="thumbs__percent">
                <span id="percenttwo-${item.id}" class="bold headerline--4">${Math.round(( (item.dislikes) / (item.likes + item.dislikes) ) * 100 )}</span>%
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
  thumbSelectKanye();
  thumbSelectMark();
  thumbSelectCristina();
  thumbSelectMalala();
}

function showError(err) { 
  console.log('error', err);
}

let thumbSelectKanye = ()=> {

  let thumbUp = document.getElementById('thumb-up-kanye'),
      thumbDown = document.getElementById('thumb-down-kanye'),
      thumbTitle = document.getElementById('title-thumb-kanye'),
      thumbTitleIcon = document.getElementById('title-thumb-icon-kanye'),
      percentOne = document.getElementById('percentone-kanye'),
      p1 = percentOne.innerHTML,
      percentTwo = document.getElementById('percenttwo-kanye'),
      p2 = percentTwo.innerHTML,
      thumbs = document.getElementById('thumbs-kanye');

  // Title thumb

  if(p1 > p2) {
    thumbTitle.classList.remove('thumbs-box--down')
    thumbTitle.classList.add('thumbs-box--up')
    thumbTitleIcon.classList.add('fa-thumbs-up')
    thumbTitleIcon.classList.remove('fa-thumbs-down')
  } else {
    thumbTitle.classList.remove('thumbs-box--up')
    thumbTitle.classList.add('thumbs-box--down')
    thumbTitleIcon.classList.add('fa-thumbs-down')
    thumbTitleIcon.classList.remove('fa-thumbs-up')
  }

  // Thumb selected

  thumbUp.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    };
  });
  
  thumbDown.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.add('selected');
    } else {
      thumbDown.classList.add('selected');
      thumbUp.classList.remove('selected');
    };
  });

  // Vote Now

  let voteNow = document.getElementById('vote-now-kanye'),
      descriptionBox = document.getElementById('description-box-kanye'),
      thanks = document.getElementById('thanks-kanye'),
      voteAgain = document.getElementById('vote-again-kanye'),
      votedStorage = window.localStorage;

  voteNow.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
      thumbs.classList.add('deactive');
      voteNow.classList.add('deactive');
      voteAgain.classList.remove('deactive');
      descriptionBox.classList.add('deactive');
      thanks.classList.remove('deactive');
    } if (thumbUp.classList.contains('selected')){
      console.log('contiene up')
      votedStorage.setItem('kanye', 1)
    } if (thumbDown.classList.contains('selected')){
      console.log('contiene down')
    };
    
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

let thumbSelectMark = ()=> {

  let thumbUp = document.getElementById('thumb-up-mark'),
      thumbDown = document.getElementById('thumb-down-mark'),
      thumbTitle = document.getElementById('title-thumb-mark'),
      thumbTitleIcon = document.getElementById('title-thumb-icon-mark'),
      percentOne = document.getElementById('percentone-mark'),
      p1 = percentOne.innerHTML,
      percentTwo = document.getElementById('percenttwo-mark'),
      p2 = percentTwo.innerHTML,
      thumbs = document.getElementById('thumbs-mark');

  // Title thumb

  if(p1 > p2) {
    thumbTitle.classList.remove('thumbs-box--down')
    thumbTitle.classList.add('thumbs-box--up')
    thumbTitleIcon.classList.add('fa-thumbs-up')
    thumbTitleIcon.classList.remove('fa-thumbs-down')
  } else {
    thumbTitle.classList.remove('thumbs-box--up')
    thumbTitle.classList.add('thumbs-box--down')
    thumbTitleIcon.classList.add('fa-thumbs-down')
    thumbTitleIcon.classList.remove('fa-thumbs-up')
  }

  // Thumb selected

  thumbUp.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    };
  });
  
  thumbDown.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.add('selected');
    } else {
      thumbDown.classList.add('selected');
      thumbUp.classList.remove('selected');
    };
  });

  // Vote Now

  let voteNow = document.getElementById('vote-now-mark'),
      descriptionBox = document.getElementById('description-box-mark'),
      thanks = document.getElementById('thanks-mark'),
      voteAgain = document.getElementById('vote-again-mark'),
      votedStorage = window.localStorage;

  voteNow.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
      thumbs.classList.add('deactive');
      voteNow.classList.add('deactive');
      voteAgain.classList.remove('deactive');
      descriptionBox.classList.add('deactive');
      thanks.classList.remove('deactive');
    } if (thumbUp.classList.contains('selected')){
      console.log('contiene up')
      votedStorage.setItem('mark', 1)
    } if (thumbDown.classList.contains('selected')){
      console.log('contiene down')
    };
    
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

let thumbSelectCristina = ()=> {

  let thumbUp = document.getElementById('thumb-up-cristina'),
      thumbDown = document.getElementById('thumb-down-cristina'),
      thumbTitle = document.getElementById('title-thumb-cristina'),
      thumbTitleIcon = document.getElementById('title-thumb-icon-cristina'),
      percentOne = document.getElementById('percentone-cristina'),
      p1 = percentOne.innerHTML,
      percentTwo = document.getElementById('percenttwo-cristina'),
      p2 = percentTwo.innerHTML,
      thumbs = document.getElementById('thumbs-cristina');

  // Title thumb

  if(p1 > p2) {
    thumbTitle.classList.remove('thumbs-box--down')
    thumbTitle.classList.add('thumbs-box--up')
    thumbTitleIcon.classList.add('fa-thumbs-up')
    thumbTitleIcon.classList.remove('fa-thumbs-down')
  } else {
    thumbTitle.classList.remove('thumbs-box--up')
    thumbTitle.classList.add('thumbs-box--down')
    thumbTitleIcon.classList.add('fa-thumbs-down')
    thumbTitleIcon.classList.remove('fa-thumbs-up')
  }

  // Thumb selected

  thumbUp.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    };
  });
  
  thumbDown.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.add('selected');
    } else {
      thumbDown.classList.add('selected');
      thumbUp.classList.remove('selected');
    };
  });

  // Vote Now

  let voteNow = document.getElementById('vote-now-cristina'),
      descriptionBox = document.getElementById('description-box-cristina'),
      thanks = document.getElementById('thanks-cristina'),
      voteAgain = document.getElementById('vote-again-cristina'),
      votedStorage = window.localStorage;

  voteNow.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
      thumbs.classList.add('deactive');
      voteNow.classList.add('deactive');
      voteAgain.classList.remove('deactive');
      descriptionBox.classList.add('deactive');
      thanks.classList.remove('deactive');
    } if (thumbUp.classList.contains('selected')){
      console.log('contiene up')
      votedStorage.setItem('cristina', 1)
    } if (thumbDown.classList.contains('selected')){
      console.log('contiene down')
    };
    
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

let thumbSelectMalala = ()=> {

  let thumbUp = document.getElementById('thumb-up-malala'),
      thumbDown = document.getElementById('thumb-down-malala'),
      thumbTitle = document.getElementById('title-thumb-malala'),
      thumbTitleIcon = document.getElementById('title-thumb-icon-malala'),
      percentOne = document.getElementById('percentone-malala'),
      p1 = percentOne.innerHTML,
      percentTwo = document.getElementById('percenttwo-malala'),
      p2 = percentTwo.innerHTML,
      thumbs = document.getElementById('thumbs-malala');

  // Title thumb

  if(p1 > p2) {
    thumbTitle.classList.remove('thumbs-box--down')
    thumbTitle.classList.add('thumbs-box--up')
    thumbTitleIcon.classList.add('fa-thumbs-up')
    thumbTitleIcon.classList.remove('fa-thumbs-down')
  } else {
    thumbTitle.classList.remove('thumbs-box--up')
    thumbTitle.classList.add('thumbs-box--down')
    thumbTitleIcon.classList.add('fa-thumbs-down')
    thumbTitleIcon.classList.remove('fa-thumbs-up')
  }

  // Thumb selected

  thumbUp.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    } else {
      thumbUp.classList.add('selected');
      thumbDown.classList.remove('selected');
    };
  });
  
  thumbDown.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected')) {
      thumbUp.classList.remove('selected');
      thumbDown.classList.add('selected');
    } else {
      thumbDown.classList.add('selected');
      thumbUp.classList.remove('selected');
    };
  });

  // Vote Now

  let voteNow = document.getElementById('vote-now-malala'),
      descriptionBox = document.getElementById('description-box-malala'),
      thanks = document.getElementById('thanks-malala'),
      voteAgain = document.getElementById('vote-again-malala'),
      votedStorage = window.localStorage;

  voteNow.addEventListener('click', (e)=> {
    if(thumbUp.classList.contains('selected') || thumbDown.classList.contains('selected')) {
      thumbs.classList.add('deactive');
      voteNow.classList.add('deactive');
      voteAgain.classList.remove('deactive');
      descriptionBox.classList.add('deactive');
      thanks.classList.remove('deactive');
    } if (thumbUp.classList.contains('selected')){
      console.log('contiene up')
      votedStorage.setItem('malala', 1)
    } if (thumbDown.classList.contains('selected')){
      console.log('contiene down')
    };
    
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



