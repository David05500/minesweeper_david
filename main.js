$(document).ready(function () {

    let btnStart = $("#btnStart");
    let gameBoard = $("#items");
    let btnRestart = $("#btnRestart");
    let difficulty = $("#difficulty");
    let cols = "";
    let height = "";
    let difficultyNumber = "";
    let gameStarted = false;

    btnStart.click(function() {

        if(!gameStarted){
            
            cols = $("#boardWidth").val(); //getting number of rows 
            height = $("#boardHeight").val(); //getting number of columns
            difficultyNumber = $("#difficulty").val();

            //validating inputs
            if ((height > 10) || (cols > 10) || (difficulty == "select")){
                alert("Please fill in all the fields. Board cant exceed 10x10");
                window.location.reload();

                //checking sleceted difficulty level
            }else{
                gameStarted = true;
                let nummberOfCells = height * cols; // finding out how many divs I would need
                let level = 0;

                switch(difficultyNumber){
                    case "easy": 
                        level = 3;
                    break;

                    case "medium":
                        level = 2;
                    break;

                    case "hard":
                        level = 1;
                    break;
                }
                numberOfBombs = (height - level) * (cols - level); // number of bombs per round
                console.log("Number of bombs: " + numberOfBombs);

                //creating dvs with class 'item'
                for (i=1; i <= nummberOfCells; i++) {
                    let newDiv = document.createElement("div")
                    newDiv.setAttribute("class", "item");

                    $("#items")[0].appendChild(newDiv);
                }
                displayBoard();
            }
        } 
    });

    btnRestart.click(function(){
        window.location.reload();

    });

    function displayBoard(){
        // assigning functions to variables 
        let row = index => Math.floor(index / cols) + 1;
        let col = index => (index % cols) + 1;

        //adding class of col and row to each earlier created div
        $(".item").each((index, el) => {
            let item = $(el);
            item.addClass("col-" + col(index))
                .addClass("row-" + row(index));
        });
        bombGenerator();
        return;
    }
    //see readMe for details
    function bombGenerator(){

        while(numberOfBombs!=0){

            $(".item").each((index, el) => {
                let item = $(el);
                
                if (numberOfBombs === 0 ){
                    return false;
                }else if (!item.hasClass("bomb")){
                    //get a random number from 1 to 10 then find its prime 
                    let randomNum = Math.floor(Math.random()*10 + 1) % 2;
                    if (randomNum === (index % 2)){
                        item.addClass("bomb");
                        item.text('x');
                        numberOfBombs--;
                    }
                }
            });
        }
        return;
    }
    $("#items").click(function(){
        bombCount = 0;
        if($(event.target).hasClass("bomb")){
            alert("Game Over");
            window.location.reload();
        }else{
            let coordinates = event.target.className;
            let clean = coordinates.split(" ").filter(word => (word !== "item"));
            clean = clean.join(" ").match(/[0-9]+/g);
            checkForBombs(clean);
            event.target.textContent = bombCount;
        }
    });
    //see readMe for details
    function checkForBombs(index){
        const x = index[0];
        const y = index[1];
        // let currentX = "Current col-" + x;
        // let currentY = "row-" + y;
        // let currentPosition = currentX.concat(currentY);
        // console.log(currentPosition);
        let x1 = 0;
        let y1 = 0;
        

        for(i=0; i<=8; i++){

            switch(i){
                case 1:
                    x1 = x - 1;
                    y1 = y - 1;
                    findElementIsBomb(x1, y1);
                break;

                case 2:
                    x1 = x - 1;
                    y1 = y;
                    findElementIsBomb(x1, y1);
                break;

                case 3:
                    x1 = x;
                    y1 = y - 1;
                    findElementIsBomb(x1, y1);
                break;

                case 4:
                    x1 = x - 1;
                    y1 = +y + 1;
                    findElementIsBomb(x1, y1);
                break;

                case 5:
                    x1 = +x + 1;
                    y1 = y - 1;
                    findElementIsBomb(x1, y1);
                break;

                case 6:
                    x1 = +x + 1;
                    y1 = +y + 1;
                    findElementIsBomb(x1, y1);
                break;

                case 7:
                    x1 = +x + 1;
                    y1 = y
                    findElementIsBomb(x1, y1);
                break;

                case 8:
                    x1 = x;
                    y1 = +y + 1;
                    findElementIsBomb(x1, y1);
                break;
            }
        }
        return;

    }
    //see readMe for details
    function findElementIsBomb(x, y){
        let col = "col-" + x + " ";
        let row = "row-" + y;
        let result = col.concat(row);
        let cell = document.getElementsByClassName(result);
        Array.prototype.forEach.call(cell, function(element) {
            let classNames = element.className.split(" ");
            classNames.includes('bomb') == true ? bombCount++ : 'hello';
        });
        
        return;

    }

});