const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Function to compare two arrays
const arrEquals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class Field {
    constructor (field) {
      this.field = field || []
      this.playerLocation = undefined
      this.hatLocation = undefined
      this.holeLocations = []

      // Determine player, hat, and hole locations
      this.init()
    }

    print () {
        // Clear the console and print the field
        console.clear()

        // Print each field on its own row
        for (let i=0; i<this.field.length; i++) {
            console.log(this.field[i].join(' '))
        }
    }

    init () {
        // Determine position of player
        let playerCell = this.field.find(f => f.includes(pathCharacter))    // find the row (array) containing pathCharacter (*)
        let playerRow = this.field.indexOf(playerCell)                      // index of this array
        let playerCol = this.field[playerRow].indexOf(pathCharacter)        // find the column (array) containing pathCharacter (*)

        this.playerLocation = [playerRow, playerCol]                        // set player location to the [row, col] found

        // Determine position of hat
        let hatCell = this.field.find(f => f.includes(hat))                 // find the row (array) containing hat (^)
        let hatRow = this.field.indexOf(hatCell)                            // index of this array
        let hatCol = this.field[hatRow].indexOf(hat)

        this.hatLocation = [hatRow, hatCol]                                 // set hat location to the [row, col] found

        // Determine positions of holes
        for (let i=0; i<this.field.length; i++) {
            for (let j=0; j<this.field[i].length; j++) {
                if (this.field[i][j] === hole) {
                    this.holeLocations.push([i, j])
                }
            }
        }
    }

    checkGame () {
        // Check hole collision
        for (let i=0; i<this.holeLocations.length; i++) {
            if (arrEquals(this.playerLocation, this.holeLocations[i])) {
                console.log('You fell into a hole and died.')
                return this.gameOver = true
            }
        }

        // Check hat collision
        if (arrEquals(this.playerLocation, this.hatLocation)) {
            console.log("There's that darn hat! Time to go home")
            return this.gameOver = true
        }
    }

    askDirection () {

        while (!this.gameOver) {

            // Show field and ask which direction to move
            this.print()
            let direction = prompt('Which way? (u=up, d, l, r): ')
            direction = direction.toLowerCase()

            switch (direction) {
                case 'u':
                    let posUp = [this.playerLocation[0]-1, this.playerLocation[1]]
                    this.field[posUp[0]][posUp[1]] = pathCharacter
                    this.playerLocation = posUp
            
                    this.checkGame()
                    break
                
                case 'd':
                    let posDown = [this.playerLocation[0]+1, this.playerLocation[1]]
                    this.field[posDown[0]][posDown[1]] = pathCharacter
                    this.playerLocation = posDown
            
                    this.checkGame()
                    break
            
                case 'l':
                    let posLeft = [this.playerLocation[0], this.playerLocation[1]-1]
                    this.field[posLeft[0]][posLeft[1]] = pathCharacter
                    this.playerLocation = posLeft
            
                    this.checkGame()
                    break
            
                case 'r':
                    let posRight = [this.playerLocation[0], this.playerLocation[1]+1]
                    this.field[posRight[0]][posRight[1]] = pathCharacter
                    this.playerLocation = posRight
            
                    this.checkGame()
                    break
    
                default:
                    console.log("Unknown direction. Must enter 'u' for Up, 'd' for down', 'l' for Left, or 'r' for Right.")
                    let wait = prompt('[Press any key to try again]')
                    break
            }
        }
    }
}

// EXECUTE ===============================================================================================

const myField = new Field([
    ['░', '░', 'O'],
    ['*', 'O', '░'],
    ['░', '^', '░'],
]);

myField.askDirection()