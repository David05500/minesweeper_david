$(document).ready(function () {

    let btnStart = $("#btnStart");
    let gameBoard = $("#items");
    let gameStarted = false;

    btnStart.click(function() {

        if(!gameStarted){
            gameStarted = true;
            cols = $("#boardWidth").val();//getting number of colums 

            //getting user input on size of the grid
            let height = $("#boardHeight").val();
            let nummberOfCells = height * cols; // finding out how many divs I would need
            numberOfBombs = (height - 2) * (cols - 2); // number of bombs per round
            console.log(numberOfBombs);

            //adding all the requierd divs with class 'item'
            for (i=1; i <= nummberOfCells; i++) {
                let newDiv = document.createElement("div")
                newDiv.setAttribute("class", "item");

                $("#items")[0].appendChild(newDiv);
            }
            displayBoard();
        } else {  
            //error or ask if player wants to start again 

        }
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

    function bombGenerator(){

        while(numberOfBombs!=0){

            $(".item").each((index, el) => {
                let item = $(el);
                console.log(numberOfBombs);
                
                if (numberOfBombs === 0 ){
                    return false;
                }else if (!item.hasClass("bomb")){
                    let randomNum = Math.floor(Math.random()*10 + 1) % 2;
                    if (randomNum === (index % 2)){
                        item.addClass("bomb");
                        item.text('b');
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
            console.log("game over");
        }else{
            let coordinates = event.target.className;
            let clean = coordinates.split(" ").filter(word => (word !== "item"));
            clean = clean.join(" ").match(/[0-9]+/g);
            checkForBombs(clean);
            event.target.textContent = bombCount;
        }
    });
    function checkForBombs(index){
        const x = index[0];
        const y = index[1];
        let currentX = "Current col-" + x;
        let currentY = "row-" + y;
        let currentPosition = currentX.concat(currentY);
        console.log(currentPosition);
        let x1 = 0;
        let y1 = 0;
        

        for(i=0; i<=8; i++){

            switch(i){
                case 1:
                    x1 = x - 1;
                    y1 = y - 1;
                    // findElementIsBomb(x1, y1) === false? bombCount=+1 : console.log("its false");
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