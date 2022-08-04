const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Function to compare two arrays
const arrEquals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class Field {
    constructor (field) {
      this._field = field || []             // field (array)
      this._playerLocation = undefined      // location of player
      this._hatLocation = undefined         // location of hat
      this._holeLocations = []              // list of holes
      this._maxHolesDivisor = 6             // affects number of holes in field
    }

    print () {

        if (!this.field || this.field.length <= 0) {
            throw new Error('ERROR field must not be empty')
        }
        // Clear the console and print the field
        console.clear()

        // Print each field on its own row
        for (let i=0; i<this.field.length; i++) {
            console.log(this.field[i].join(''))
        }
    }

    init () {

        if (this.field && this.field.length > 0) {

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
        } else {
            throw new Error('ERROR: Field cannot be empty')
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

    generateField (row, col) {

        const fieldPromise = new Promise((resolve, reject) => {
            if ((!row || !col) || (parseInt(row) <= 0 || parseInt(col) <= 0)) {
                reject(new Error('ERROR generateField(row, col): `row` and `col` must be a number greater than 0'))
            } else {
                // Create an array based on number of rows and cols
                const rows = parseInt(row)
                const cols = parseInt(col)
                const totalCells = rows * cols
                let field = []
                let holePositions = []
    
                // Generate field (array) and populate with ░ field character
                for (let i=0; i<totalCells; i++) {
                    field.push(fieldCharacter)
                }
    
                // Generate random positions of holes (random numbers between 0 and `totalCells`)
                // Note: the maxHolesDivisor affects max number of holes (the lower the number, the more holes appear)
                for (let i=0; i<totalCells/this.maxHolesDivisor; i++) {
                    holePositions.push(Math.floor(Math.random() * totalCells))
                }
                const holes = [...new Set(holePositions)]   // make sure numbers are unique and not repeating twice
    
                // Of the hole positions generated, fill each with the hole character 'O'
                for (let i=0; i<holePositions.length; i++) {
                    field[holePositions[i]] = hole
                }
    
                // Generate the hat
                const randNum = Math.floor(Math.random() * totalCells)
                field[randNum] = '^'
                let startPosition = null
                while (!startPosition || startPosition === randNum) {
                    startPosition = Math.floor(Math.random() * totalCells)
                }
                field[startPosition] = '*'

                // Convert to multidimensional array
                const newArr = [];
                while(field.length) newArr.push(field.splice(0, col));
                    
                // console.log(newArr);
    
                this.field = newArr
                resolve(newArr)
            }
        })

        return fieldPromise
    }

    // GETTERS

    get field () {
        return this._field
    }

    get playerLocation () {
        return this._playerLocation
    }

    get hatLocation () {
        return this._hatLocation
    }

    get holeLocations () {
        return this._holeLocations
    }

    get maxHolesDivisor () {
        return this._maxHolesDivisor
    }

    // SETTERS

    set field (field) {
        this._field = field
    }

    set playerLocation (location) {
        this._playerLocation = location
    }

    set hatLocation (location) {
        this._hatLocation = location
    }

    set holeLocations (locations) {
        this._holeLocations = locations
    }

    set maxHolesDivisor (scalar) {
        this._maxHolesDivisor = scalar
    }
}

// EXECUTE (CHOOSE ONE) ==================================

const myField = new Field()
myField.maxHolesDivisor = 6

myField.generateField(10, 20).then(() => {
    myField.init()
    myField.askDirection()
})

// OR ===================================================

// const testField = [
//     ['*', '░', 'O'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],
//   ]

// const myField = new Field(testField);
// myField.init()
// myField.print()
// myField.askDirection()