document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const boxes = document.querySelectorAll('.content--box');

  //to add style according to their position
  const positions = ['prev', 'current', 'next'];

  //yesley starting ko y coordinates store garxa
  let touchstart = null;
  let touchend = null;

  //only one rotation chai occurs hos vanera
  let rotating = false;

  const swipeThreshold = 60;

  //yo chai position haru define garna lai
  const rotatePositions = (direction = 1) => {
    //yesma yo direction ley chai tala scroll gare +ve mathi scrolle gare -ve value dinxx
    if (rotating) return;

    rotating = true;

    if (direction > 0) {
      //tala sarauda
      //!yo chai unshift(params)=> array[params,othervalue]

      positions.unshift(positions.pop());

      //*pop vako value first ma arulai 1 position ley shift
      //*prev current next => next ,prev , current banauxa
    } else {
      //yo chai mathi sarauda
      //! position.shift( remove first element)
      //push means addiing first element to the last index of an array
      positions.push(positions.shift());
    }

    boxes.forEach((box, index) => {
      box.className = `content--box ${positions[index]}`;
    });

    setTimeout(() => {
      rotating = false;
    }, 300);
  };

  //hamel jun swipe thresshold rakhya xam ni tyo match garyokinai vanera check garma lai
  const touchEnd = (e) => {
    e.preventDefault();

    if (touchstart !== null && touchend !== null) {
      const diff = touchstart - touchend;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          rotatePositions(1);
        } else if (diff < 0) {
          rotatePositions(-1);
        }
      }
    }

    touchstart = null;
    touchend = null;
  };

  //to set the value of touchend -> kun value ma touche sakkyo
  const touchMove = (e) => {
    e.preventDefault();

    touchend = e.touches[0].clientY;
  };

  //kanira bata touch start vayo

  const touchStart = (e) => {
    e.preventDefault();
    touchstart = e.touches[0].clientY;
    touchend = null;
  };

  const Wheel = (e) => {
    e.preventDefault();
    console.log(e.deltaY);
    rotatePositions(e.deltaY > 0 ? 1 : -1);
  };

  //safe navigation operator -> check whether carousel is exist or not
  carousel?.addEventListener('wheel', Wheel);
  carousel?.addEventListener('touchstart', touchStart);
  carousel?.addEventListener('touchmove', touchMove);
  carousel?.addEventListener('touchend', touchEnd);
});
