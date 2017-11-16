
var draw = null;
var arr = [];
var arrTop = [];
var arrBot = [];
var submission = [];
var click1 = false;
var selection1, selection2;
var startButtonBool = false;
var resetButtonBool = false;
var drawArrow2Bool = false;
var set = null;

var metal = null;
var metalText = null;
var glass = null;
var glassText = null;
var wood = null;
var woodText = null;
var metal2 = null;
var metalText2 = null;
var glass2 = null;
var glassText2 = null;
var wood2 = null;
var woodText2 = null;

function init() {
  draw = SVG('board');
  arr = [];
  arrTop = [];
  arrBot = [];
  submission = [];
  click1 = false;
  selection1, selection2;
  startButtonBool = false;
  resetButtonBool = false;
  drawArrow2Bool = false;
  set = draw.set();

  <!-- ----------------GROUP 1-------------------- -->
  metal = draw.image('./img/1.png', 200, 17).attr({
    'x': 130,
    'y': 170
  }).click(function() {
    select(1)
  }).addClass('clickable');
  metalText = draw.text('Metal').x(340).y(170);

  glass = draw.image('./img/2.png', 200, 18).attr({
    'x': 130,
    'y': 210
  }).click(function() {
    select(2);
  }).addClass('clickable');
  glassText = draw.text('Glass').x(340).y(210);

  wood = draw.image('./img/3.png', 200, 17).attr({
    'x': 130,
    'y': 250
  }).click(function() {
    select(3);
  }).addClass('clickable');
  woodText = draw.text('Wood').x(340).y(250);

  drawArrow1();
  <!-- ------------------------------------------- -->

  <!-- ----------------GROUP 2-------------------- -->
  metal2 = draw.image('./img/1.png', 200, 17).attr({
    'x': 130,
    'y': 470,
    'bottom': true
  }).click(function() {
    select2(1)
  }).addClass('clickable');
  metalText2 = draw.text('Metal').x(340).y(470);

  glass2 = draw.image('./img/2.png', 200, 18).attr({
    'x': 130,
    'y': 510,
    'bottom': true
  }).click(function() {
    select2(2)
  }).addClass('clickable');
  glassText2 = draw.text('Glass').x(340).y(510);

  wood2 = draw.image('./img/3.png', 200, 17).attr({
    'x': 130,
    'y': 550,
    'bottom': true
  }).click(function() {
    select2(3)
  }).addClass('clickable');
  woodText2 = draw.text('Wood').x(340).y(550);
  <!-- ------------------------------------------- -->
}


//selects the type of material and draws it on the screen
function select(num) {
  //removes the plank/iron if it has already been drawn
  if (typeof plank !== 'undefined') {
    plank.remove();
    iron.remove();
  }
  //resets if the start button has been pressed
  if (startButtonBool === true) {
    drawStartButton();
    stopAnim();
  }
  arrow.remove()
  arrowText.remove();
  click1 = true;
  selection1 = num;
  submission[0] = num;
  plank = draw.image('./img/' + num + '.png', 400, 35).attr({
    'x': 130,
    'y': 90
  })
  set.add(plank);
  arr.push(plank);
  iron = draw.image('./img/5.png', 100, 100).attr({
    'x': 10,
    'y': 50
    });
  drawArrow2()
}

function select2(num) {
  //cannot select bottom material until top material has been selected
  if (click1 === false) {
    return;
  }
  //removes the plank/iron if it has already been drawn
  if (typeof plank2 !== 'undefined') {
    plank2.remove();
    iron2.remove();
  }
  if (startButtonBool === true) {
    stopAnim();
  }
  submission[1] = num;
  arrow2.remove()
  arrowText2.remove();
  drawStartButton();
  drawResetButton();
  selection2 = num;
  plank2 = draw.image('./img/' + num + '.png', 400, 35).attr({
    'x': 130,
    'y': 390
  })
  set.add(plank2);
  arr.push(plank2);
  iron2 = draw.image('./img/5.png', 100, 100).attr({
  'x': 10,
  'y': 350
  });
}

//begins start animations
function startAnim() {
  if (typeof chip !== 'undefined') {
    removeChips();
  }
  //makes start button unclickable during duration of animation
  startButtonIcon.click('null')
  //draws iron and then starts heat animation
  drawIron();
  heatAnim();
}

function heatAnim() {
  //calls function that draws the heat and chocolate chips
  drawHeat();
  //finds which of the the two materials selected is the slower one
  maxArr = submission.slice(0, 2)
  maxIndex = maxArr.indexOf(Math.max(...maxArr));
  //heat animation for top material, runs chocolate animation after
  rect1.animate(selection1 * 3000 + 3000, 'quadIn').attr({
    'width': 400
  }).after(poopCall1);
  //heat animation for bottom material, runs chocolate animation after
  rect2.animate(selection2 * 3000 + 3000, 'quadIn').attr({
    'width': 400
  }).after(poopCall2);
}

function poopAnim(num, bool) {
  if (num === 1) {
    chip.animate(2000).opacity(0);
    setTimeout(function() {
      chip2.animate(1000).opacity(1).after(function() {
        chip2.animate(1500).opacity(0);
      })
    }, 1000);
    setTimeout(function() {
      chip3.animate(1000).opacity(1);
    }, 2600);
    if (bool) {
      setTimeout(function() {
        startButtonIcon.click(function() {
          startButtonBool = true;
          submission[2] = new Date().toLocaleString();
          console.log(submission);
          log();
          startAnim();
        })
      }, 4000);
    }
  } else {
    chip1.animate(2000).opacity(0);
    setTimeout(function() {
      chip4.animate(1000).opacity(1).after(function() {
        chip4.animate(1500).opacity(0);
      })
    }, 1000);
    setTimeout(function() {
      chip5.animate(1000).opacity(1);
    }, 2600);
    if (bool) {
      setTimeout(function() {
        startButtonIcon.click(function() {
          startButtonBool = true;
          submission[2] = new Date().toLocaleString();
          console.log(submission);
          log();
          startAnim();
        })
      }, 4000);
    }
  }
}

function stopAnim() {
  var chips = [chip, chip1, chip2, chip3, chip4, chip5, rect1, rect2];
  // set.stop();
  for (var i = 0 ; i < chips.length; i++) {
    chips[i].remove();
  }
}

function reset() {
  click1 = false;
  startButtonBool = false;
  drawArrow2Bool = false;
  resetButtonBool = false;
  for (var i = 0; i < arr.length; i ++) {
    arr[i].stop();
    arr[i].remove();
  }
  drawArrow1();
}

function drawStartButton() {
  if (startButtonBool === false) {
    startButtonText = draw.text('Start').x(648).y(278).font({size: 25});
    startButtonIcon = draw.rect(150,50).x(600).y(270).radius(15).fill('white').stroke({width:2}).opacity(1).attr({
      'fill-opacity': 0
    }).addClass('clickable');
    arr.push(startButtonIcon, startButtonText);
  }
  startButtonIcon.click(function() {
    startButtonBool = true;
    submission[2] = new Date().toLocaleString();
    console.log(submission);
    startAnim();
  })
}

function drawResetButton() {
  if (resetButtonBool === false) {
    resetButtonText = draw.text('Reset').x(643).y(378).font({size: 25});
    resetButtonIcon = draw.rect(150,50).x(600).y(370).radius(15).fill('white').stroke({width:2}).opacity(1).attr({
      'fill-opacity': 0
    }).addClass('clickable');
    resetButtonBool = true;
    arr.push(resetButtonIcon, resetButtonText);
  }
  resetButtonIcon.click(function() {
    reset();
  })
}

function drawArrow1() {
  arrow = draw.image('./img/arrow.png', 310, 120).attr({
    'x': 560,
    'y': 50
  })
  arrowText = draw.text('Click on the first material you\n chose for your prediction').x(635).y(65)
      .font({
        family: 'Arial',
        size: 15,
        weight: 'bold'
      });
}

function drawArrow2() {
  if (drawArrow2Bool === false) {
    arrow2 = draw.image('./img/arrow.png', 310, 120).attr({
      'x': 560,
      'y': 350
      })
    arrowText2 = draw.text('Click on the second material you\n chose for your prediction').x(628).y(365)
      .font({
        family: 'Arial',
        size: 15,
        weight: 'bold'
      });
  }
  drawArrow2Bool = true;
}

function drawIron() {
  iron.back();
  iron.attr({
    'x': 50,
    'y': 50
  })
  iron2.back();
  iron2.attr({
    'x': 50,
    'y': 350
  })
}

function drawHeat() {
  if (typeof rect1 !== 'undefined') {
    rect1.remove();
    rect2.remove();
  }
  var mask = draw.polygon('130,122 130,100 150,90 525,90 525,114 515,122').fill('white');
  var mask2 = draw.polygon('130,422 130,400 150,390 525,390 525,414 515,422').fill('white');

  rect1 = draw.rect(5, 35).attr({
    'x': 130,
    'y': 90
  }).opacity(.3).fill('red')
  rect1.maskWith(mask);

  rect2 = draw.rect(5, 35).attr({
    'x': 130,
    'y': 390
  }).opacity(.3).fill('red')
  rect2.maskWith(mask2);

  chip = draw.image('./img/chip1.png', 128, 50).attr({
    'x': 410,
    'y': 70
  });

  chip1 = draw.image('./img/chip1.png', 128, 50).attr({
    'x': 410,
    'y': 370
  });

  chip2 = draw.image('./img/chip2.png', 128, 50).attr({
        'x': 410,
        'y': 70,
        'opacity': 0
      });
  chip3 = draw.image('./img/chip3.png', 128, 50).attr({
      'x': 410,
      'y': 70,
      'opacity': 0
    });
  chip4 = draw.image('./img/chip2.png', 128, 50).attr({
        'x': 410,
        'y': 370,
        'opacity': 0
      });
  chip5 = draw.image('./img/chip3.png', 128, 50).attr({
      'x': 410,
      'y': 370,
      'opacity': 0
    });
  set.add(rect1, rect2, chip, chip1, chip2, chip3, chip4, chip5);
  arr.push(rect1, rect2, chip, chip1, chip2, chip3, chip4, chip5);
}

function poopCall1() {
  var bool = maxIndex === 0;
  poopAnim(1, bool);;
  // if (maxIndex === 0) {
  //   drawStartButton();
  // }
}

function poopCall2() {
  var bool = maxIndex === 1;
  poopAnim(2, bool);
  // if (maxIndex === 1) {
  //   drawStartButton();
  // }
}

function removeChips() {
  var chips = [chip, chip1, chip2, chip3, chip4, chip5, rect1, rect2];
  for (var i = 0; i < chips.length; i ++) {
      chips[i].stop();
      chips[i].remove();
  }
}

function log() {
  state.messageType = "studentWork";
  state.isAutoSave = false;
  state.isSubmit = false;
  state.studentData = submission;
  saveWISE5State(state);
}

function saveWISE5State(componentState) {
  parent.postMessage(componentState, "*");
}
