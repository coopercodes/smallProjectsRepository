
function Card(cardValue,cardSuit) {
    this.value = cardValue;
    this.suit = cardSuit;
}

Card.prototype.getValue = function() {
    if((this.value == "Q" || this.value == "K") || this.value == "J") {
        return 10;
    } else if(this.value == "A") {
        return 11;
    }
    return parseInt(this.value);
}

function Deck() {
    this.cardDeck = [];
}

Deck.prototype.fillDeck = function() {
    var deck = new Array();
    var suits = ["S", "D", "C", "H"];
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	for(var i = 0; i < suits.length; i++)
	{ 
		for(var x = 0; x < values.length; x++)
		{
			var card = new Card(values[x], suits[i]);
			deck.push(card);
		}
	}
	this.cardDeck = deck;
}

Deck.prototype.shuffleDeck = function() {
    var temp = this.cardDeck;
    var newDeck = [];
    for(var i = 0; i <= 51; i++) {
        var randomIndex = Math.floor((Math.random()*(51- i)));
        var currentCard = temp[randomIndex];
        newDeck.push(temp[randomIndex]);
        temp.splice(randomIndex, 1);
    }
    this.cardDeck = newDeck;
}

function Hand(setHand /* usually set to empty array */) {
    this.hand = setHand;

}

Hand.prototype.getHandValue = function() {
    var temp = this.hand;
    var val = 0;
    for(var i = 0; i < temp.length; i++) {
        var currentCard = temp[i];
        var currentVal = currentCard.getValue();
        val += currentVal;
        for(var d = 0; d < temp.length; d++) {
            if(temp[d].value == "A") {
                val - 10;
            }
        }
    }
    return val;
}

Hand.prototype.toString = function() {
    var string = "";
    for(var i = 0; i < this.hand.length; i++) {
        var currentCard = this.hand[i];
        var currentVal = currentCard.getValue();
        var cardString = currentCard.value + " " + currentCard.suit;
        string += cardString + " ";
    }
    return string;
}

function Player(playerName, playerHand /*players hand, set to empty usually*/) {
    this.name = playerName;
    this.hand = playerHand;
}



Player.prototype.takeCard = function(card) {
    this.hand.hand.push(card);
}

function Dealer(dealerName, dealerHand ) {
    this.name = dealerName;
    this.hand = dealerHand;
}

Dealer.prototype.getCard = function(deck){
    var cardTwo = deck.cardDeck.splice(0,1);
    // console.log(cardTwo[0]);
    // this.hand.hand.push(cardTwo[0]);
    return cardTwo[0];
}

Dealer.prototype.getCardToDeck = function(deck) {
    this.hand.hand.push(this.getCard(deck));
}

Dealer.prototype.giveCard = function(deck, player) {
    var myCard = this.getCard(deck);
    player.takeCard(myCard);
}

function getResponse() {
    var response = window.prompt("Do you want to hit? (Y/N)");
    if(response == "Y") {
        return "Y";
    } else if(response == "N") {
        return "N"
    } else {
        getResponse();
    }
}

function getPlayAgainResponse() {
    var response = window.prompt("Do you want to play again?");
    if(response == "Y") {
        return "Y";
    } else if(response == "N") {
        return "N"
    } else {
        getResponse();
    }
}

function checkVal(person /*has to be player or dealer */, response) {
    var response = window.prompt("Do you want to hit? (Y/N)");
    if(response == "Y") {
        if(person.hand.getHandValue() > 21) {
            return "B";
        }
        return "Y";
    } else if(response == "N") {
        if(person.hand.getHandValue() > 21) {
            return "B";
        }
        return "N";

    } else {
        getResponse();
    }
}

function compareScores(player, dealer) {
    //True if player wins, false if dealer wins
    var playerScore = player.hand.getHandValue();
    var dealerScore = dealer.hand.getHandValue();
    if(dealerScore > 21 ) {
        return true;
    } else if (playerScore > dealerScore) {
        return true;
    } else if (playerScore == dealerScore) {
        return "push";
    }  else {
        return false;
    }
}

//Retuns true if player wins
//If dealers total is 17, he must stand
//IF dealers total is less than 16, he must take a card
//Returns false is dealer wins

function runGame() {
    var deck = new Deck();
    deck.fillDeck();
    deck.shuffleDeck();
    var player = new Player("Cooper", new Hand([]));
    var dealer = new Dealer("Deelo", new Hand([]));
    runRound(deck, player, dealer);
}

function runRound(deck , player, dealer) {
    var deck = new Deck();
    deck.fillDeck();
    deck.shuffleDeck();
    var player = new Player("Cooper", new Hand([]));
    var dealer = new Dealer("Deelo", new Hand([]));
    dealer.getCardToDeck(deck);
    console.log("The dealer currently has " + dealer.hand.toString());
    dealer.giveCard(deck , player);
    console.log("The player currently has " + player.hand.toString());
    var response = getResponse();
    console.log(response);
    while (response == "Y") {
        dealer.giveCard(deck , player);
        console.log(response);
        var handVal = player.hand.getHandValue();
        if(handVal > 21) {
            response = "B";
            break;
        }
        console.log("The player currently has " + player.hand.toString());
        // response = checkVal(player, response);
        response = checkVal(player, response);
    } 

    console.log(response);
    console.log(player.hand.getHandValue());
    if (response == "B") {
        console.log("Player busted with " + player.hand.toString() + ", dealer wins round");
        var playAgain = getPlayAgainResponse();
        if(playAgain == "Y") {
            runRound(deck, player, dealer);
        } else {
            console.log("Thanks for playing!")
            return;
        }
    } else if (response == "N"){ //Assumed response is N
        while(dealer.hand.getHandValue() < 16) {
            dealer.getCardToDeck(deck);
        }
        //Compare dealers last score vs players last score
        console.log("The dealer currently has  " + dealer.hand.toString() + dealer.hand.getHandValue());
        var comparison = compareScores(player, dealer);
        if(comparison == "push") {
            console.log("stalemate!");
            var playAgain = getPlayAgainResponse();
            if(playAgain == "Y") {
                runRound(deck, player, dealer);
            } else {
                console.log("Thanks for playing!")
                return;
            }
        } else if(comparison == true) {
            console.log("Player wins!");
            var playAgain = getPlayAgainResponse();
            if(playAgain == "Y") {
                runRound(deck, player, dealer);
            } else {
                console.log("Thanks for playing!")
                return;
            }
        } else if(comparison == false) {
            console.log("Dealer wins!");
            var playAgain = getPlayAgainResponse();
            if(playAgain == "Y") {
                runRound(deck, player, dealer);
            } else {
                console.log("Thanks for playing!")
                return;
            }
        }
    }
    
}

runGame();



















