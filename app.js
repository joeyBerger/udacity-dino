function onButtonClick() {
    // Create Dino Constructor
    function Dino(dinoData) {
        const {species,weight,height,diet,where,when,fact} = dinoData;
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Objects
    const Dinos=[{species:"Triceratops",weight:13e3,height:114,diet:"herbavor",where:"North America",when:"Late Cretaceous",fact:"First discovered in 1889 by Othniel Charles Marsh"},{species:"Tyrannosaurus Rex",weight:11905,height:144,diet:"carnivor",where:"North America",when:"Late Cretaceous",fact:"The largest known skull measures in at 5 feet long."},{species:"Anklyosaurus",weight:10500,height:55,diet:"herbavor",where:"North America",when:"Late Cretaceous",fact:"Anklyosaurus survived for approximately 135 million years."},{species:"Brachiosaurus",weight:7e4,height:"372",diet:"herbavor",where:"North America",when:"Late Jurasic",fact:"An asteroid was named 9954 Brachiosaurus in 1991."},{species:"Stegosaurus",weight:11600,height:79,diet:"herbavor",where:"North America, Europe, Asia",when:"Late Jurasic to Early Cretaceous",fact:"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{species:"Elasmosaurus",weight:16e3,height:59,diet:"carnivor",where:"North America",when:"Late Cretaceous",fact:"Elasmosaurus was a marine reptile first discovered in Kansas."},{species:"Pteranodon",weight:44,height:20,diet:"carnivor",where:"North America",when:"Late Cretaceous",fact:"Actually a flying reptile, the Pteranodon is not a dinosaur."},{species:"Pigeon",weight:.5,height:9,diet:"herbavor",where:"World Wide",when:"Holocene",fact:"All birds are living dinosaurs."}];
    const dinos = Dinos.map(dino => {
        return new Dino(dino);
    })

    // Create Human Object
    let human = {}

    // Use IIFE to get human data from form
    const humanData = (function() {        
        var name = document.getElementById('name').value;
        var feet = document.getElementById('feet').value;
        var inches = document.getElementById('inches').value;
        var weight = document.getElementById('weight').value;
        var diet = document.getElementById('diet').value;
        return {
            name : name,
            height : feet*12+(inches===''?0:Number(inches)),
            weight : weight,
            diet : diet,
            allValuesDefined : name !== '' && feet !== '' && weight !== '',
            error : name !== '' && feet !== '' && weight !== '' ? null : function() {
                var error = document.createElement("p");
                error.className = 'error';
                error.innerHTML = 'All data must be filled out!';
                document.getElementById("dino-compare").appendChild(error); 
            },
            returnTile : function() {
                var tileDiv = document.createElement("DIV");
                tileDiv.className = 'grid-item';                
                var image = document.createElement("IMG");
                image.src = `images/human.png`;
                tileDiv.appendChild(image);        
                var desc = document.createElement("p");
                desc.innerHTML = `Human: ${name}`;
                tileDiv.appendChild(desc)            
                return tileDiv;
            }
        }
    })();
    
    // Check to see human data was filled out
    if (humanData.error !== null) {
        humanData.error();
        return;
    }
    
    // Set humanData to human
    human = humanData;

    // Create Dino Compare Method 1
    Dino.prototype.compareWeight = function(humanWeight) {
        return `Your weight is ${Math.abs(humanWeight-this.weight)} lbs ${humanWeight > this.weight ? 'greater' : humanWeight === this.weight ? 'equal' : 'less'} than of a ${this.species} (${this.weight} lbs).`
    }

    // Create Dino Compare Method 2
    Dino.prototype.compareHeight = function(humanHeight) {
        return `Your height is ${Math.abs(humanHeight-this.height)} inches ${humanHeight > this.height ? 'greater' : humanHeight === this.height ? 'equal' : 'less'} than of a ${this.species} (${this.height} inches).`
    }
    
    // Create Dino Compare Method 3
    Dino.prototype.compareDiet = function(humanDiet) {
        return `Your diet is ${humanDiet === this.diet ? 'the same' : 'different'} than of a ${this.species} (${this.diet}).`
    }

    Dino.prototype.pickRandomFact = function(humanData) {
        var facts = [
            this.compareWeight(humanData.weight),
            this.compareHeight(humanData.height),
            this.compareDiet(humanData.diet),
            (() => {return this.fact})(),
            (() => {return `Origin: ${this.where}`})(),
            (() => {return `Time Period: ${this.when}`})(),
        ]
        var idx = this.species === 'Pigeon' ? 3 : Math.floor(Math.random()*facts.length);
        return facts[idx];
    }

    // Generate Tiles for each Dino in Array
    var tiles = dinos.map((dino) => {
        var tileDiv = document.createElement("DIV");
        tileDiv.className = 'grid-item';        
        var image = document.createElement("IMG");
        image.src = `images/${dino.species.toLowerCase()}.png`;
        tileDiv.appendChild(image);
        var desc = document.createElement("h3");
        desc.innerHTML = dino.pickRandomFact(human);
        tileDiv.appendChild(desc)    
        return tileDiv;
    })

    // Iterate through objects to create tiles with species, image, and fact that are appended to DOM. Conditionally display appropriate information for Human, Bird and Dinosaurs.
    tiles.splice(4, 0, human.returnTile());

    // Add tiles to DOM
    var gridItem = document.getElementById("grid");
    tiles.forEach((tile) => {
        gridItem.appendChild(tile);
    })

    // Remove form from screen
    var myobj = document.getElementById("dino-compare");
    myobj.remove();
}

// On button click, prepare and display infographic
var myElem = document.getElementById('btn');
myElem.onclick = function() {
	onButtonClick();
}