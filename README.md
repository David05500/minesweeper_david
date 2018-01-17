# minesweeper_david
 

In order to solve this problem I firstly broke it down into stages:
	
	preGmae:
		-get user input
		-generate the board 
		-generate bombs on the board 
		-display board 

	Game: 
		-cklick event 
		-find if the cell is a bomb 
		-if not bomb do calculations
		-display results 


About the game: 

	I create x amount of divs when button start is pressed then I give each div class (col and row).

	To gernerate bombs:
	- I check what level of difficulty player has seclected, then
	- (number of columns - difficulty level) * (number of rows - difficulty level) = NUMBER OF BOMB per game, then
	-loop over created divs untill (NUMBER OF BOMB > 0)
		-generate a random number 1-10 and find if its prime 
		-check index of the div and find if its prime 
		-if both(gen number and index) are prime then add bomb class to this div
		-NUMBER OF BOMB - 1

	To calculate clues:
	-to each generated div I gave a class of (col and row)
	-when a div clicked I get its class list
	-I worked out numbers/coordinates for neighbouring cells 
	-then by using switch statement and coordinates I find neighbouring cells in DOM and get their class list 
	-check if it contains "bomb" class
	-if yes add 1 to CLUES






All I needed for this project is to listen out for events and then update the page dynamicaly depending on a triggered event. Therefore I chose JS for its simplicity in installing and starting a project. All you need is an html file, js file and you are ready to go in less than a minute. Also this game is very simple and doesnt require a database or components in my opition. Unless its required by a client.

In conclusion I think my attempt was a success. All the required features work but I dont have any styling or very minimum. If I had to make it better I would try and group some functions together to make it more tidy and efficient. Also I would need to improve mu user experience and some little bugs. 

