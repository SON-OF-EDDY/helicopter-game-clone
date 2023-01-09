  // make an ajax call every second which updates the database value for the current users high score (if it is higher than what
  // already exists in the database)...
  // and then accordingly redraw the table every second, altering the innerHTML values accordingly...

  let secondaryBox = document.getElementById("mini-container-one")

  let usernameInput = document.getElementById("username")

  usernameInput.addEventListener('input',()=>{
      usernameInput.value = usernameInput.value.toUpperCase()
  })


   let userOne = document.getElementById('user-1')
   let userTwo = document.getElementById('user-2')
   let userThree = document.getElementById('user-3')
   let userFour = document.getElementById('user-4')
   let userFive = document.getElementById('user-5')

   let scoreOne = document.getElementById('score-1')
   let scoreTwo = document.getElementById('score-2')
   let scoreThree = document.getElementById('score-3')
   let scoreFour = document.getElementById('score-4')
   let scoreFive = document.getElementById('score-5')

  // some animations not working on some phones
  // play with smoke animations a tad

  // add a database, leaderboard and sign in, create, delete account basic functionality (look on saved youtubes videos for json database)

  // testing functionality...

  // modify for english later .... MAYBE....

  //let heloBoom = new Audio('helo_boom.m4a')
  //"{% static 'my_app/example.jpg' %}"
  let heloBoom = new Audio("/static/helo_boom.m4a")

  let heloUp = new Audio('/static/helo_up_2.mp3')

  //let heloDown = new Audio('helo_down_2.mp3')
  let heloFly= new Audio('/static/helo_track_2.mp3')

  let currentScore = 0

  let currentDistance = `DISTANCE: ${currentScore}`

  let bestScore = 0

  let bestDistance = `BEST: ${bestScore}`

  let myNotice = document.getElementById("notice")

  let gameOver = false

  let startButton = document.getElementById('start')

  let canvas = document.getElementById('my_canvas')

  const ctx = canvas.getContext("2d")

  //initialisation of heloSprite

  //const spriteArray = ['/static/big_1.png','/static/big_2.png','/static/big_3.png','/static/big_4.png']
  const spriteArray = ['/static/big_1.png']
  const deathArray = ['/static/death_1.png','/static/death_2.png','/static/death_3.png','/static/death_4.png','/static/death_5.png','/static/death_6.png','/static/death_7.png','/static/death_8.png']
  let spriteIndex = 0
  let deathIndex = 0
  let heloSprite = new Image ()
  heloSprite.src = spriteArray[spriteIndex]
  let smokeSprite = new Image ()
  smokeSprite.src = '/static/smoke_3.png'

  let screenWidth = Math.floor(window.innerWidth * 0.6)


  while (screenWidth % 100 != 0) {
      screenWidth--
  }

  console.log(screenWidth)

  let screenHeight= (screenWidth * 0.7)

  //startButton.style.width = `${screenWidth*0.2}px`

  //startButton.style.height = `${screenWidth*0.2*0.5}px`


  function checkAspectRatio () {

    console.log('checking...')

    if (window.innerWidth/window.innerHeight < 1) {
      myNotice.innerHTML = "PLEASE TURN YOUR DEVICE TO LANDSCAPE MODE"
      ctx.clearRect(0,0,screenWidth,screenHeight)

      startButton.hidden = true
      secondaryBox.style.display = "none"

    } else if (window.innerWidth/window.innerHeight >= 1) {
      myNotice.innerHTML = ""
      startButton.hidden = false
      secondaryBox.style.display = "flex"
    }

  }

  window.setInterval(checkAspectRatio,1000/10)


  let scoreNotice = document.getElementById("notice-three")
  let scoreNoticeValue = document.getElementById("notice-three-value").innerHTML
  let scoreNoticeUser = document.getElementById("notice-three-user").innerHTML


  function ajaxPoster () {

        $.ajax({

            type: "POST",
            url: "post_scores",
            data:{

                score:scoreNoticeValue,
                user_name:scoreNoticeUser,

                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            },

            success: function(result){
                console.log(result);

                userOne.innerHTML = `${result.members[0][0]}`
                userTwo.innerHTML = `${result.members[1][0]}`
                userThree.innerHTML = `${result.members[2][0]}`
                userFour.innerHTML = `${result.members[3][0]}`
                userFive.innerHTML = `${result.members[4][0]}`

                scoreOne.innerHTML = `${result.members[0][1]}`
                scoreTwo.innerHTML = `${result.members[1][1]}`
                scoreThree.innerHTML = `${result.members[2][1]}`
                scoreFour.innerHTML = `${result.members[3][1]}`
                scoreFive.innerHTML = `${result.members[4][1]}`


            }
        });
    }

  window.ajaxPosterTimer = window.setInterval(ajaxPoster,500)

  function Game () {

    function isMobileDevice() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };




    function incrementScore () {
      currentScore += 1
      currentDistance = `DISTANCE: ${currentScore}`
      if (currentScore >= bestScore) {
        bestScore = currentScore
        bestDistance = `BEST: ${bestScore}`

        if (currentScore >= scoreNoticeValue) {
            scoreNoticeValue = currentScore
            scoreNotice.innerHTML = `USER:${scoreNoticeUser} <br> HIGH SCORE:${scoreNoticeValue}`
        }

        //<p id="notice-three">USER:{{current_user}} <br> HIGH SCORE:{{current_score}}</p>
      }

    }

    let mouseIsPressed = false

      //let screenWidth = 1600

      let block_width = (screenWidth * 0.05)

      let block_height = (screenWidth * 0.15)

      let HeloWidth = block_width * 3

      let HeloHeight = HeloWidth * 0.4246



      let BoundaryHeight = block_height * 0.5

      let modifyFactor = screenWidth * 0.01

      let modifyFactorSign = 1

      ////////////////////////////////////////////////////////////////////////////////////////

      let LowerBoundary = screenHeight - block_height * 0.5

      let modifyFactorLower = screenWidth * 0.01

      let modifyFactorLowerSign = 1

      let BoundaryHeightLower = block_height * 0.5

      ////////////////////////////////////////////////////////////////////////////////////////

      let smokeArraySize = 10

      let smokeSize = ((screenWidth * 0.25) / smokeArraySize)

      let smokeArrayXspacing = smokeSize

      let boundaryBlockXspacing = block_width




      //let move_speed = (screenWidth/200)
      let move_speed = (screenWidth/100)

      let gravity = (screenHeight*0.5/60)

      let heloSpeed = 0.75*(gravity)

      canvas.width = screenWidth
      canvas.height = screenHeight

      let potentialBlockPositions =

      [0.2*screenHeight,0.25*screenHeight,0.3*screenHeight,0.35*screenHeight,0.4*screenHeight,
      0.45*screenHeight,0.5*screenHeight,0.55*screenHeight]

      //0.6*screenHeight
          //[screenHeight*0.5]


      // helicopter pos

      let HeloX = 0
      let HeloY = 0





      //blocks positons

      let block1X = 0
      let block1Y = 0

      let block2X = 0
      let block2Y = 0

      // cave walls
      //a 21st block always off-camera...

      const topBoundaryBlocks = Array(21).fill(BoundaryHeight)

      for (i=0;i<topBoundaryBlocks.length;i++) {
          topBoundaryBlocks[i] = [i*boundaryBlockXspacing,topBoundaryBlocks[i]]
      }



      const bottomBoundaryBlocks = Array(21).fill(LowerBoundary)

      for (i=0;i<bottomBoundaryBlocks.length;i++) {
          bottomBoundaryBlocks[i] = [i*boundaryBlockXspacing,bottomBoundaryBlocks[i]]
      }

      const smokeArray = Array(smokeArraySize).fill(((HeloY + HeloHeight/2) - (smokeSize/2)))

      for (i=0;i<smokeArray.length;i++) {
          smokeArray[i] = [i*smokeArrayXspacing,smokeArray[i]]
      }


      function init () {
        //set starting positions
        block1X = (screenWidth) + block_width
        block1Y = 0.55 * screenHeight

        block2X = block1X + (screenWidth * 0.8)
        block2Y = 0.35 * screenHeight

        HeloX = screenWidth * 0.25
        HeloY = (screenHeight / 2) - (HeloHeight/2)


      }


      if (isMobileDevice()) {

        console.log('MOBILE DEVICE')

        canvas.addEventListener('touchstart',(e)=>{
          e.preventDefault()
          mouseIsPressed = true

        })


        canvas.addEventListener('touchend',(e)=>{
          e.preventDefault()
          mouseIsPressed = false

        })


      } else {

        console.log('PERSONAL COMPUTER')

        canvas.addEventListener('mousedown',()=>{
          mouseIsPressed = true

        })

        canvas.addEventListener('mouseup',()=>{
          mouseIsPressed = false

        })

      }


      function myClick(event) {
        reset()
      }


      startButton.addEventListener('click',myClick)


      function smoker () {


        if (gameOver == false) {

                for (i=0;i<smokeArray.length;i++) {

                if (smokeArray[i][0]==-smokeSize) {
                    smokeArray[i][1] = (HeloY + HeloHeight/2) - (smokeSize/2)
                    smokeArray[i][0] = (screenWidth * 0.25) - smokeSize
                }


                smokeArray[i][0]-= move_speed

                }

                for (i=0;i<smokeArray.length;i++) {
                    ctx.fillStyle = 'transparent'
                    ctx.fillRect(smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
                    ctx.drawImage(smokeSprite,smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
                }



        } else {


                for (i=0;i<smokeArray.length;i++) {

                      smokeArray[i][0]-= move_speed
                }


                for (i=0;i<smokeArray.length;i++) {
                    ctx.fillStyle = 'transparent'
                    ctx.fillRect(smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
                    ctx.drawImage(smokeSprite,smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
                }


        }



      }


      function render () {


          //clear canvas
          ctx.clearRect(0,0,screenWidth,screenHeight)

          //redraw block 1
          ctx.fillStyle = '#66ff66'
          ctx.fillRect(block1X,block1Y,block_width,block_height)

          //redraw block 2
          ctx.fillStyle = '#66ff66'
          ctx.fillRect(block2X,block2Y,block_width,block_height)

          //redraw helo rectangle
          ctx.fillStyle = 'transparent'
          ctx.fillRect(HeloX,HeloY,HeloWidth,HeloHeight)

          //apply image to helo rectangle
          ctx.drawImage(heloSprite,HeloX,HeloY,HeloWidth,HeloHeight)












          // draw all top block elements...
          for (i=0;i<topBoundaryBlocks.length;i++) {
              ctx.fillStyle = '#66ff66'
              ctx.fillRect(topBoundaryBlocks[i][0],0,block_width,topBoundaryBlocks[i][1])

          }

          // all puffs in smoke array, apply image to them

          // for (i=0;i<smokeArray.length;i++) {
          //     ctx.fillStyle = 'transparent'
          //     ctx.fillRect(smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
          //     ctx.drawImage(smokeSprite,smokeArray[i][0],smokeArray[i][1],smokeSize,smokeSize)
          // }

          //draw all the bottom block elements...
          for (i=0;i<bottomBoundaryBlocks.length;i++) {
              ctx.fillStyle = '#66ff66'
              ctx.fillRect(bottomBoundaryBlocks[i][0],bottomBoundaryBlocks[i][1],block_width,(screenHeight - bottomBoundaryBlocks[i][1]))
          }


          // draw the currentDistance text
          ctx.font = `${screenHeight/40}px  'Press Start 2P'`
          ctx.fillStyle = 'black'
          let fontHeight = screenHeight/40
          ctx.fillText(`${currentDistance}`,screenWidth * 0.05,screenHeight * 0.96)

          //draw the bestDistance text
          ctx.font = `${screenHeight/40}px Press Start 2P`
          ctx.fillStyle = 'black'
          let fontHeight2 = screenHeight/40
          ctx.fillText(`${bestDistance}`,screenWidth * 0.75,screenHeight * 0.96)





          //if game over draw...

          if (gameOver) {

            ctx.font = `${screenHeight/20}px 'Press Start 2P'`
            ctx.fillStyle = 'black'
            let textWidth = ctx.measureText("CRASH!").width
            let fontHeight = screenHeight/20
            ctx.fillText("CRASH!",(screenWidth/2)-(textWidth/2),(screenHeight/2))
            //-(fontHeight/2))
          }



      }


      function randomiseModFactorValue () {

        const possibleValues =

        [screenWidth*0.005,screenWidth*0.005,screenWidth*0.005,
        screenWidth*0.005,screenWidth*0.005,screenWidth*0.005,screenWidth*0.01,
        screenWidth*0.01,screenWidth*0.01,screenWidth*0.015]

        let aRandomChoice = Math.floor(Math.random()*(possibleValues.length))


        modifyFactor = possibleValues[aRandomChoice]


      }

      function randomiseModFactorValueLower () {

        const possibleValuesLower =

        [screenWidth*0.005,screenWidth*0.005,screenWidth*0.005,
        screenWidth*0.005,screenWidth*0.005,screenWidth*0.005,screenWidth*0.01,
        screenWidth*0.01,screenWidth*0.015,screenWidth*0.02]

        let aRandomChoiceLower = Math.floor(Math.random()*(possibleValuesLower.length))

        modifyFactorLower = possibleValuesLower[aRandomChoiceLower]


      }

      function update () {



        ////////////////////////////////////////////////////////////////////////////////

        if (block1X <= -block_width){

          block1X = block2X + (screenWidth * 0.8)
          //block1Y will be in a random position

          let randomChoice = Math.floor(Math.random()*(potentialBlockPositions.length))


          block1Y = potentialBlockPositions[randomChoice]
        }

        if (block2X <= -block_width){


          block2X = block1X + (screenWidth * 0.8)
          //block1Y will be in a random position

          let randomChoice = Math.floor(Math.random()*(potentialBlockPositions.length))


          block2Y = potentialBlockPositions[randomChoice]
        }

          block1X -= move_speed
          block2X -= move_speed

        //////////////////////////////////////////////////////////////////////////

        //every block in smoke array








        //////////////////////////////////////////////////////////////////////////




        // for every block in topBlock array

        for (i=0;i<topBoundaryBlocks.length;i++) {

          if (topBoundaryBlocks[i][0]==screenWidth-block_width) {

            randomiseModFactorValue()

            if (topBoundaryBlocks[i][1] + (modifyFactor * modifyFactorSign) < (block_height * 0.5)|

            topBoundaryBlocks[i][1] + (modifyFactor * modifyFactorSign) > (screenHeight * 0.2)) {



            } else {
              BoundaryHeight = topBoundaryBlocks[i][1] + (modifyFactor * modifyFactorSign)
            }

            break

          }
        }

        for (i=0;i<topBoundaryBlocks.length;i++) {
          if (topBoundaryBlocks[i][0]==-block_width) {

              topBoundaryBlocks[i][0] = screenWidth
              topBoundaryBlocks[i][1] = BoundaryHeight
          }
        }

        for (i=0;i<topBoundaryBlocks.length;i++) {
          topBoundaryBlocks[i][0]-=move_speed
        }

        ////////////////////////////////////////////////////////////////

        // for every block in lowerBlockArray

        for (i=0;i<bottomBoundaryBlocks.length;i++) {

            if (bottomBoundaryBlocks[i][0]==screenWidth-block_width) {

              randomiseModFactorValueLower()

              BoundaryHeightLower = bottomBoundaryBlocks[i][1] - (modifyFactorLower*modifyFactorLowerSign)

              if (BoundaryHeightLower <= screenHeight * 0.8) {

                BoundaryHeightLower = screenHeight * 0.8
              } else if (BoundaryHeightLower > LowerBoundary) {

                BoundaryHeightLower = LowerBoundary
              }
              break

            }
          }




        for (i=0;i<bottomBoundaryBlocks.length;i++) {

          if (bottomBoundaryBlocks[i][0]==-block_width) {

              bottomBoundaryBlocks[i][0] = screenWidth
              bottomBoundaryBlocks[i][1] = BoundaryHeightLower
          }
        }


        for (i=0;i<bottomBoundaryBlocks.length;i++) {
          bottomBoundaryBlocks[i][0]-=move_speed
        }

        // for the helicopter

        //collision with upperCave walls
        for (i=0;i<topBoundaryBlocks.length;i++) {


            if (HeloY <= topBoundaryBlocks[i][1]) {
              if ((HeloX <= topBoundaryBlocks[i][0] && topBoundaryBlocks[i][0] <= HeloX + HeloWidth)
              | (HeloX <= topBoundaryBlocks[i][0]+block_width && topBoundaryBlocks[i][0]+block_width <= HeloX + HeloWidth)) {



                  gameOver = true
                  usernameInput.classList.remove('unselectable')
                  heloBoom.play()
                  heloUp.pause()
                  //heloDown.pause()
                  heloFly.pause()


                  startButton.removeEventListener('click',myClick)
                  setTimeout(function(){
                      startButton.hidden = false
                      startButton.disabled = false
                      startButton.addEventListener('click',myClick)

                  },550)




                  //clearInterval(window.looptimer)
                  clearInterval(window.updatetimer)
                  clearInterval(window.audiotimer)
                  clearInterval(window.invertModFactorTimer)
                  clearInterval(window.invertModFactorTimerLower)
                  clearInterval(window.incrementHeloScore)
                  clearInterval(window.animateHelicopter)
                  setTimeout(function () {
                      clearInterval(window.smoketimer)
                  },550)





              }
            }
          }



        // for each puff in smoke array
        // for (i=0;i<smokeArray.length;i++) {

        // if (smokeArray[i][0]==-smokeSize) {
        //     smokeArray[i][1] = (HeloY + HeloHeight/2) - (smokeSize/2)
        //     smokeArray[i][0] = (screenWidth * 0.25) - smokeSize
        // }


        // smokeArray[i][0]-= move_speed


        // }





        //collision with lower cave walls
        for (i=0;i<bottomBoundaryBlocks.length;i++) {


          if (HeloY + HeloHeight >= bottomBoundaryBlocks[i][1]) {
            if ((HeloX <= bottomBoundaryBlocks[i][0] && bottomBoundaryBlocks[i][0] <= HeloX + HeloWidth)
            | (HeloX <= bottomBoundaryBlocks[i][0]+block_width && bottomBoundaryBlocks[i][0]+block_width <= HeloX + HeloWidth)) {


                gameOver = true
                usernameInput.classList.remove('unselectable')
                heloBoom.play()
                heloUp.pause()
                //heloDown.pause()
                heloFly.pause()


                startButton.removeEventListener('click',myClick)
                setTimeout(function(){
                    startButton.hidden = false
                    startButton.disabled = false
                    startButton.addEventListener('click',myClick)

                  },550)




                clearInterval(window.updatetimer)
                clearInterval(window.audiotimer)
                clearInterval(window.invertModFactorTimer)
                clearInterval(window.invertModFactorTimerLower)
                clearInterval(window.incrementHeloScore)
                clearInterval(window.animateHelicopter)
                setTimeout(function () {
                      clearInterval(window.smoketimer)
                  },550)




            }
          }
        }

        //collision with blocks
        //block1 first

        //collision from above with top side block

        //if at least one point is within the bounds its gameover!

        const myPoints = [[HeloX ,HeloY],
        [HeloX+(HeloWidth*0.94),HeloY + (HeloHeight * 0.084)],
        [HeloX,HeloY+HeloHeight*0.579],
        [HeloX+HeloWidth*0.881,HeloY+HeloHeight*0.785],
        [HeloX + HeloWidth/2,HeloY],
        [HeloX + HeloWidth/2,HeloY+HeloHeight],
        [HeloX+HeloWidth*0.25,HeloY+HeloHeight*0.579],
        [HeloX + HeloWidth*0.325,HeloY+HeloHeight*0.723],
        [HeloX + HeloWidth*0.671,HeloY+HeloHeight],
        [HeloX + HeloWidth*0.770,HeloY+HeloHeight*0.860]]

        //check x values
        for (const point of myPoints) {

          if ( block1X <= point[0] && point[0] <= block1X + block_width ) {

            if (block1Y <= point[1] && point[1] <= block1Y + block_height) {

              gameOver = true
              usernameInput.classList.remove('unselectable')
              heloBoom.play()
              heloUp.pause()
              //heloDown.pause()
              heloFly.pause()


              startButton.removeEventListener('click',myClick)
              setTimeout(function(){
                      startButton.hidden = false
                      startButton.disabled = false
                      startButton.addEventListener('click',myClick)

                  },550)





              clearInterval(window.updatetimer)
              clearInterval(window.audiotimer)
              clearInterval(window.invertModFactorTimer)
              clearInterval(window.invertModFactorTimerLower)
              clearInterval(window.incrementHeloScore)
              clearInterval(window.animateHelicopter)
              setTimeout(function () {
                      clearInterval(window.smoketimer)
                  },550)



            }
          } else if (block2X <= point[0] && point[0] <= block2X + block_width) {
            if (block2Y <= point[1] && point[1] <= block2Y + block_height) {

              gameOver = true
              usernameInput.classList.remove('unselectable')
              heloBoom.play()
              heloUp.pause()
              //heloDown.pause()
              heloFly.pause()



              startButton.removeEventListener('click',myClick)
              setTimeout(function(){
                      startButton.hidden = false
                      startButton.disabled = false
                      startButton.addEventListener('click',myClick)

                  },550)




              clearInterval(window.updatetimer)
              clearInterval(window.audiotimer)
              clearInterval(window.invertModFactorTimer)
              clearInterval(window.invertModFactorTimerLower)
              clearInterval(window.incrementHeloScore)
              clearInterval(window.animateHelicopter)
              setTimeout(function () {
                      clearInterval(window.smoketimer)
                  },550)



            }






          }
        }



        if (mouseIsPressed) {

          HeloY -= heloSpeed


        } else if (!mouseIsPressed) {

          HeloY += gravity

        }




      }


      function invertModFactor () {

        modifyFactorSign = modifyFactorSign * -1
      }

      function invertModFactorLower () {

        modifyFactorLowerSign = modifyFactorLowerSign * -1
      }



      function animateHelo () {
        spriteIndex = (spriteIndex + 1) % (spriteArray.length)

        heloSprite.src = spriteArray[spriteIndex]

      }

      function deathAnimation () {



        if (gameOver == true) {

          heloSprite.src = deathArray[deathIndex]

          if (deathIndex < deathArray.length) {
            console.log(deathArray[deathIndex])
            deathIndex++
          } else {
            spriteIndex = 0
            deathIndex = 0
            heloSprite.src = spriteArray[spriteIndex]
            clearInterval(window.deathHelo)
            clearInterval(window.rendertimer)
          }
        }


      }


      function heloAudio () {
        if (mouseIsPressed) {


            //heloDown.loop = false
            //heloDown.pause()
            heloUp.play()
            //heloUp.currentTime = 0
            heloUp.loop = true

        } else {
          // heloUp.currentTime = 0
          // heloUp.pause()

          heloUp.loop = false
          heloUp.pause()
          //heloDown.play()
          //heloDown.currentTime = 0
          //heloDown.loop = true
        }
      }




      function reset () {

        heloFly.play()
        heloFly.currentTime = 0
        heloFly.loop = true
        heloFly.volume = 0.01
        heloUp.currentTime = 0
        heloUp.volume = 0.25
        //heloDown.currentTime = 0

        smokeSprite.src = '/static/smoke_3.png'

        mouseIsPressed = false

        currentScore = 0

        currentDistance = `DISTANCE: ${currentScore}`

        gameOver = false

        canvas = document.getElementById('my_canvas')
        //screenWidth = 1707

        //screenWidth = parseInt(Math.floor(window.screen.width))

        screenWidth = Math.floor(window.innerWidth * 0.6)


         while (screenWidth % 100 != 0) {
          screenWidth--
          }

        console.log(screenWidth)

        screenHeight= (screenWidth * 0.7)

        //startButton.style.width = `${screenWidth*0.2}px`
        //startButton.style.height = `${screenWidth*0.2*0.5}px`


        block_width = (screenWidth * 0.05)

        block_height = (screenWidth * 0.15)

        HeloWidth = block_width * 3

        HeloHeight = HeloWidth * 0.4246

        BoundaryHeight = block_height * 0.5

        modifyFactor = screenWidth * 0.01

        modifyFactorSign = 1

        ////////////////////////////////////////////////////////////////////////////////////////

        LowerBoundary = screenHeight - block_height * 0.5

        modifyFactorLower = screenWidth * 0.01

        modifyFactorLowerSign = 1

        lBoundaryHeightLower = block_height * 0.5

        ////////////////////////////////////////////////////////////////////////////////////////

        boundaryBlockXspacing = block_width

        //move_speed = (screenWidth/200)
        move_speed = (screenWidth/100)

        gravity = (screenHeight*0.5/60)

        heloSpeed = 0.75*(gravity)

        canvas.width = screenWidth
        canvas.height = screenHeight

        spriteIndex = 0
        deathIndex = 0
        heloSprite.src = spriteArray[spriteIndex]

        smokeSize = (screenWidth * 0.25) / smokeArraySize
        smokeArrayXspacing = smokeSize



        for (i=0;i<topBoundaryBlocks.length;i++) {
            topBoundaryBlocks[i] = [i*boundaryBlockXspacing,BoundaryHeight]
        }

        for (i=0;i<smokeArray.length;i++) {
            smokeArray[i] = [i*smokeArrayXspacing,(screenHeight/2 - smokeSize/2)]
        }


        for (i=0;i<bottomBoundaryBlocks.length;i++) {
            bottomBoundaryBlocks[i] = [i*boundaryBlockXspacing,LowerBoundary]
        }



        potentialBlockPositions =

          [0.2*screenHeight,0.25*screenHeight,0.3*screenHeight,0.35*screenHeight,0.4*screenHeight,
          0.45*screenHeight,0.5*screenHeight,0.55*screenHeight]



        init()
        render()

        //window.looptimer = window.setInterval(loop,1000/60)
        window.audiotimer = window.setInterval(heloAudio,1000/60)
        window.updatetimer = window.setInterval(update,1000/60)
        window.rendertimer = window.setInterval(render,1000/60)
        window.smoketimer = window.setInterval(smoker,1000/60)
        window.invertModFactorTimer = window.setInterval(invertModFactor,2000)
        window.invertModFactorTimerLower = window.setInterval(invertModFactorLower,2000)
        window.incrementHeloScore = window.setInterval(incrementScore,1000/20)
        window.animateHelicopter = window.setInterval(animateHelo,1000/30)
        window.deathHelo = window.setInterval(deathAnimation,500/deathArray.length)



        startButton.disabled = true
        usernameInput.classList.add('unselectable')

        if (checkAspectRatio() < 1) {
          myNotice.innerHTML = "PLEASE TURN YOUR DEVICE TO LANDSCAPE MODE"
        } else {
          myNotice.innerHTML = ""
        }

      }

    }

    Game()