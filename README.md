# Find Your Hat - Codecademy Solution
This is my solution to the challenge in Module #10 of Codecademy's Back-End Engineer Career Path.

# Installation
```
git clone https://github.com/Jnxvln/find-your-hat.git
```
Or download and unzip

# Run
```
node main.js
```

Note: At the bottom of `main.js` you will find this code:

```
// EXECUTE (CHOOSE ONE) ==================================

const myField = new Field()

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
```

I recommend playing with the default (first) option, using `generateField(row, col)` to randomize the field each time. However, if you wish to supply your own field, comment out the first bit and uncomment the code below 'OR', altering `testField` to your liking.

# HOW TO ADJUST DIFFICULTY

Adjust `maxHolesDivisor` to your liking. The larger the divisor, the fewer the number of holes. The default is 6.

This is the number that the total field size is divided by. (For example, if you choose a 5x4 field, there's a total of 20 cells. 20 divided by 6 is 3.33, rounded to 3; the max number of holes that will appear.

---

***IMPORTANT: Do this BEFORE you run `init()` or `generateField()`. I recommend just after instantiation (see example below)***

---

**`myField.maxHolesDivisor = 2`**

See this example:

```
const myField = new Field()
myField.maxHolesDivisor = 2

myField.generateField(10, 20).then(() => {
    myField.init()
    myField.askDirection()
})

```

# Enjoy! :grin: