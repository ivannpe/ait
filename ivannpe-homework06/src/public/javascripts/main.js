//function to create a standard 52 card deck
function deck(){
    const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const values = ["K", "Q", "J","10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
    const worth = [10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 11];
    let deck = [];
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            let card = {'value': values[j], 'suit': suits[i], 'worth': worth[j]};
            deck.push(card);
        }
    }

    return deck;
}

function main(){
    const game = document.getElementById('#game');
    //initializing player and cpu hand and totals
    let playerHand = [];
    let cpuHand = [];
    let playerTotal = 0;
    let cpuTotal = 0;
    //initializaing deck
    const cardDeck = deck();
    //handling the submit button on the form and making the form disappear
    document.querySelector(".playBtn").addEventListener("click", function(evt){
        evt.preventDefault();
        let deck = [];
        //views input for startvalues
        const input = document.querySelector("#startValues");
        const startvalues = input.value.split(',');
        let worth = 0;
        //if player added start values
        if(startvalues[0] !== ''){
            for(let i = 0; i < startvalues.length; i++){
                // console.log(startvalues[i]);
                if(startvalues[i] === 'K' | startvalues[i] === 'Q' | startvalues[i] === 'J'){
                    worth = 10;
                }else if(startvalues[i] === 'A'){
                    worth = 11;
                }else{
                    worth = startvalues[i];
                }
                //add those cards to the deck
                // console.log(worth);
                const card = {'value': startvalues[i], 'suit': 'Spades', 'worth': parseInt(worth)};
                deck.push(card);
            }
        }
        //adds the start values to the front of the card deck
        deck = deck.concat(cardDeck);
        //Deal the cards - alternate between the computer and player
            // the computer gets the first and third card
            // the player gets the second card and fourth card

        //using .shift() to remove first value of deck and push that into user hand 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
        cpuHand.push(deck.shift());
		playerHand.push(deck.shift());
		cpuHand.push(deck.shift());
        playerHand.push(deck.shift());
        //adding starting cards
        playerTotal = playerHand[0].worth + playerHand[1].worth;
        // console.log(playerTotal);
        cpuTotal = cpuHand[0].worth + cpuHand[1].worth;
        // console.log(cpuTotal);

        // Remember that aces can be 1 or 11
        // Make sure that your algorithm optimizes the values of aces so that the hand total is as close to 21 as possible without going over
		if (playerTotal > 21 && (playerHand[0].value === 'A' || playerHand[1].value === 'A')){
			playerTotal = playerTotal - 10;
		}

		if (cpuTotal > 21 && (cpuHand[0].value === 'A' || cpuHand[1].value === 'A')){
			cpuTotal = cpuTotal - 10;
        }
        //displaying the cards and user interface
        let blackjack = document.querySelector(".game");
        //heading for cpu total
        let cpuHeading = document.createElement("h1");
        let cpuText = document.createTextNode("Computer Hand - Total: ?");
        cpuHeading.appendChild(cpuText);
        document.body.appendChild(cpuHeading, blackjack);

        let cpuCard = document.createElement("div");
        let cpuvalue = document.createElement("div");
        let cpusuit = document.createElement("div");
        cpuCard.className = "card";
		cpuvalue.className = "value";
		cpusuit.className = "suit " + cpuHand[1].suit;
        cpuvalue.innerHTML = cpuHand[0].value;
        cpuCard.appendChild(cpuvalue);
        cpuCard.appendChild(cpusuit);

        document.body.appendChild(cpuCard, blackjack);
        
        //heading for displaying player total
        let playerHeading = document.createElement("h1");
        let playerText = document.createTextNode("Player Hand - Total: " +playerTotal);
        playerHeading.appendChild(playerText);
        document.body.appendChild(playerHeading, blackjack);

        let playerCard = document.createElement("div");
        let playervalue = document.createElement("div");
        let playersuit = document.createElement("div");
        playerCard.className = "card";
		playervalue.className = "value";
		playersuit.className = "suit " + playerHand[0].suit;
        playervalue.innerHTML = playerHand[0].value;
        playerCard.appendChild(playervalue);
        playerCard.appendChild(playersuit);

        document.body.appendChild(playerCard, blackjack);

        let playerCard1 = document.createElement("div");
        let playervalue1 = document.createElement("div");
        let playersuit1 = document.createElement("div");
        playerCard1.className = "card";
		playervalue1.className = "value";
		playersuit1.className = "suit " + playerHand[1].suit;
        playervalue1.innerHTML = playerHand[1].value;
        playerCard1.appendChild(playervalue1);
        playerCard1.appendChild(playersuit1);

        document.body.appendChild(playerCard1, blackjack);

        //create buttons

        //hit button
        //https://www.w3schools.com/jsref/met_document_createelement.asp
        let hitButton = document.createElement("BUTTON");
        hitButton.innerHTML = "HIT";
        hitButton.className = "HIT";
        document.body.appendChild(hitButton, blackjack);


            


        hitButton.addEventListener("click", function(evt){
            //pressing Hit should deal the next card from the deck
            let hit = deck.shift();
            playerHand.push(hit);
            playerTotal = playerTotal + parseInt(hit.worth);
            if (playerTotal > 21 && (playerHand[playerHand.length - 1].value === 'A' || playerHand[playerHand.length - 1].value === 'A')){
                playerTotal = playerTotal - 10;
            }
            // the next card should be moved from the deck to the user's hand
            // an element should be created to add the card to the user's hand in the user interface
            let playerCardi = document.createElement("div");
            let playervaluei = document.createElement("div");
            let playersuiti = document.createElement("div");
            playerCardi.className = "card";
            playervaluei.className = "value";
            playersuiti.className = "suit " + playerHand[playerHand.length - 1].suit;
            playervaluei.innerHTML = playerHand[playerHand.length - 1].value;
            playerCardi.appendChild(playervaluei);
            playerCardi.appendChild(playersuiti);

            document.body.appendChild(playerCardi, blackjack);


            //updating player total
            let newplayerHeading = document.createElement("h1");
            newplayerHeading.id = "replace";
            let newplayerText = document.createTextNode("Player Hand - Total: " + playerTotal);
            console.log(playerTotal); // correct player total is printing
            newplayerHeading.appendChild(newplayerText);
            document.body.appendChild(newplayerHeading, blackjack);


            const oldHeading = document.getElementById('replace');
            oldHeading.parentNode.replaceChild(newplayerHeading, oldHeading);
            // if hitting makes a user's total go over 21:
            //     then the user's turn ends immediately
            //     … and they lose the hand
            //     (the computer does not even need to decided to hit or stand)
            if(playerTotal > 21){
                let winlose = document.createElement("h1");
                let youLost = document.createTextNode("YOU LOST");
                winlose.appendChild(youLost);
                document.body.appendChild(winlose, blackjack);
            }
        });
        //stand button
        //https://www.w3schools.com/jsref/met_document_createelement.asp
        let standButton = document.createElement("BUTTON");
        standButton.innerHTML = "STAND";
        standButton.className = "STAND";
        document.body.appendChild(standButton, blackjack);

        // pressing Stand should end the user's turn and allow the computer to Hit or Stand

        // the computer's strategy is your discretion
        // though the computer must hit in some situations or stand in others
        // an easy strategy is to always hit if a hand total is underneath a threshold, but stand if it's eqaul to or above that threshold
    
        standButton.addEventListener("click", function(evt){
            //https://stackoverflow.com/questions/45136711/javascript-random-generate-0-or-1-integer
            if(Math.round(Math.random()) === 0){
                let stand = deck.shift();
                cpuHand.push(stand);
                cpuTotal = cpuTotal + parseInt(stand.worth);
                if (cpuTotal > 21 && (cpuHand[cpuHand.length - 1].value === 'A' || cpuHand[cpuHand.length - 1].value === 'A')){
                    cpuTotal = cpuTotal - 10;
                }else if(cpuTotal > 21){
                    let winlose = document.createElement("h1");
                    let youWom = document.createTextNode("YOU WON");
                    winlose.appendChild(youWon);
                    document.body.appendChild(winlose, blackjack);

                    let cpuHeading = document.createElement("h1");
                    cpuHeading.id = "replace";
                    let cpuText = document.createTextNode("Computer Hand - Total: " +cpuTotal);
                    cpuHeading.appendChild(cpuText);
                    document.body.appendChild(cpuHeading, blackjack);

                }
            }else{
                if(playerTotal > cpuTotal){
                    let winlose = document.createElement("h1");
                    let youWom = document.createTextNode("YOU WON");
                    winlose.appendChild(youWon);
                    document.body.appendChild(winlose, blackjack);

                    let cpuHeading = document.createElement("h1");
                    cpuHeading.id = "replace";
                    let cpuText = document.createTextNode("Computer Hand - Total: " +cpuTotal);
                    cpuHeading.appendChild(cpuText);
                    document.body.appendChild(cpuHeading, blackjack);

                }
                if(playerTotal < cpuTotal){
                    let winlose = document.createElement("h1");
                    let youLost = document.createTextNode("YOU LOST");
                    winlose.appendChild(youLost);
                    document.body.appendChild(winlose, blackjack);

                    let cpuHeading = document.createElement("h1");
                    cpuHeading.id = "replace";
                    let cpuText = document.createTextNode("Computer Hand - Total: " +cpuTotal);
                    cpuHeading.appendChild(cpuText);
                    document.body.appendChild(cpuHeading, blackjack);

                }
                if(playerTotal === cpuTotal){
                    let winlose = document.createElement("h1");
                    let tie = document.createTextNode("TIE");
                    winlose.appendChild(tie);
                    document.body.appendChild(winlose, blackjack);

                    let cpuHeading = document.createElement("h1");
                    cpuHeading.id = "replace";
                    let cpuText = document.createTextNode("Computer Hand - Total: " +cpuTotal);
                    cpuHeading.appendChild(cpuText);
                    document.body.appendChild(cpuHeading, blackjack);

                }
            }
        });
        //makes form dissapear on click
        document.querySelector('form').classList.toggle('hide');
    });
    
}

document.addEventListener('DOMContentLoaded', main);


