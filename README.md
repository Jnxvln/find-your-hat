# Find Your Hat - Codecademy Solution
This is my solution to the challenge in Module #10 of Codecademy's Back-End Engineer Career Path.

# Installation
```
git clone https://github.com/Jnxvln/find-your-hat.git
```

# Run
```
node main.js
```

Note: At the bottom of `main.js` you will find this code:

```
const myField = new Field();
myField.generateField(4, 5).then(() => {
    myField.init()
    myField.askDirection()
})
```

Feel free to change (4, 5) to any other size. This will change the number of rows and columns, respectively.