// What we know: 
// - we are given a sequence of digits
// - the longest number provided in the test is 16 digits
// - the shortest is 13

// step 1: the luhn algorithm doubles (*2) every other digit from right to left, 
// starting from the second digit from the right

// PATTERN: 
// If there are an EVEN number of digits,
// double every other digit starting with the FIRST(going left to right) 

// If there are an ODD number of digits,
// double every other digit starting with the SECOND(going left to right) 

// for example:
// even: if the number is 1234,  you would double the 3 and the 1
// odd: if the number is 12345, you would double the 4 and 2


// step 2: Find the sum of all the digits--add each single digit, ex 10 = 1 + 0
// Notice: If the resulting number is greater than 9, 
// you can replace it with the sum of it own digits ex 10 = 1 + 0 = 1
// which is the same as subtracting 9 from it: 10 - 9 = 1


// step 3: If the sum is evenly divisible by 10, then the number is valid
// --check if the total sum is a multiple of 10/modulo 10, 
// if the total is a multiple of 10, the number is valid/should return true


// Test 1 (16 digits)  : 1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6
// Step 1              : 2  2  6  4  10 6  14 8  18 0  2  2  6  4  10 6
// Step 2-add single #s: 2 +2 +6 +4+1+0+6+1+4+8+1+8+0 +2 +2 +6 +4+1+0+6 =64
// Step 3              : 64 is not a multiple of 10, should result false


// Test 2 (16 digits)  : 4  4  0  8  0  4  1  2  3  4  5  6  7  8  9  3
// Step 1              : 8  4  0  8  0  4  2  2  6  4  10 6  14 8  18 3
// Step 2-add single #s: 8 +4 +0 +8 +0 +4 +2 +2 +6 +4+1+0+6+1+4+8+1+8+3 =70
// Step 3              : 70 is a multiple of 10, should result true


// Test 3 (14 digits)  : 3  8  5  2  0  0  0  0  0  2  3  2  3  7
// Step 1              : 6  8  10 2  0  0  0  0  0  2  6  2  6  7
// Step 2-add single #s: 6 +8+1+0+2 +0 +0 +0 +0 +0 +2 +6 +2 +6 +7 =40
// Step 3              : 40 is a multiple of 10,  should result true


// Test 4 (13 digits)  : 4  2  2  2  2  2  2  2  2  2  2  2  2
// Step 1              : 4  4  2  4  2  4  2  4  2  4  2  4  2 
// Step 2-add single #s: 4 +4 +2 +4 +2 +4 +2 +4 +2 +4 +2 +4 +2 =40
// Step 3              : 40 is a multiple of 10,  should result true


// ATTEMPT 1-------- does not work
function validateCard(array) {
  const output = [];
  let double = false;
  let sum;

  // Loop over each element in array from last to first.
  for (let i = array.length - 1; i >= 0; i--) {
    // Process every other element.
    if (double) {
      let doubled = array[i] * 2; // Double value in array.
      if (doubled > 9) {
        // If 'doubled' is greater than 9, minus 9.
        doubled = doubled - 9;
      }
      output.unshift(doubled); // Add processed value to 'output' array.
      double = false;
    } else {
      output.unshift(array[i]); // Add unprocessed value to 'output' array.
      double = true;
    }
  }

  // Add up all elements in 'output' array.
  sum = output.reduce((total, currentValue) => total += currentValue, 0);

  // Check whether total mod 10 is equal to 0. 
  return sum % 10 === 0;
}

console.log("================== ATTEMPT 1- string test does not work==================")
console.log(validateCard("1234567890123456")); //should be false--- logging as true
console.log(validateCard("4408041234567893")); //true
console.log(validateCard("38520000023237")); //true
console.log(validateCard("4222222222222")); //true

console.log("================== ATTEMPT 1- integer test does not work==================")
console.log(validateCard(1234567890123456)); //should be false--- logging as true
console.log(validateCard(4408041234567893)); //true
console.log(validateCard(38520000023237)); //true
console.log(validateCard(4222222222222)); //true


// ATTEMPT 2: -------- does not work
// 1. setup function
// 2. initialize the array to store our digits--- before finding the sum of them.
// 3. setup a for-loop to iterate through each digit in our “number",
// which may actually be a string since the data would most likely be received through user input.
// 4. Before we can double anything, we need to determine if the digit is odd or even
// in the context of the array, we need to determine whether the index i (i = digit) is odd or even
// 5. Test if even or odd by using an if-else statement
// if the number is even, it will be divisible by 2 or modulo 2, %2 == 0
// 6. We'll need to add another if statement for the doubled number if it is larger than 9
// If the resulting number is greater than 9, you can replace it with the sum of it own digits
// ( Ex if the original number 5 step 1 doubles 5 to 10, 
// then step 2 adds each digit of 10 like this 1 + 0 = 1. 
// You get the same result if you did 10 - 9 )
// To add the digit to the array, we will use the push method
// 7. Add the digit to the array as an integer using the parseInt() function
// so a character / string won't be pushed to the array instead of a number.
// The .parseInt() function takes two arguments, a string and a radix, or base. 
// In this case, we are using the common base 10 system so we just need to type:
// 8. Find sum of arr and return it. Instead of implementing something like this:
//  function sumOfArr(arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//       sum += arr[i]
//     }
//     return sum
//   }
// we can use built in array method reduce(). This method allows us to apply 
// a callback function against an accumulator across each value of an array
// The accumulator represents the sum
// the callback function body adds the current value to the sum as it iterates through
// each element (digit) in the array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// 8b. Now that we can find the sum- we need to see if it is a multiple of 10
// if modulo 10, the card number is valid/true

const validCardNumber = cardnumbers => {
  const arr = []
  // Loop over each number element in the array from last to first
  for (let digit = 0; digit < cardnumbers.length; digit++) {
    // test if even or odd digit in the 
    if (digit % 2 == 0) {
      // if even digit, double. 
      if (cardnumbers[digit] * 2 < 10) {
        // if the doubled digit is less than 9, push the doubled digit to the array
        arr.push(cardnumbers[digit] * 2)
      } else {
        // if the doubled digit is more than 9, subtract 9 then push the doubled digit to the array
        arr.push(cardnumbers[digit] * 2 - 9)
      }
      // else is odd digit
    } else {
      // add the digit to the array
      // arr.push(card[digit])--will add a string/character instead of a number

      // add the digit to the array- have to add built in function .parseInt()
      arr.push(parseInt(cardnumbers[digit], 10))
    }
  }
  // return sum of arr
  return arr.reduce((prv, cur) => prv + cur) % 10 === 0;
}

console.log("================== ATTEMPT 2- string test does not work ==================")

// console.log(validCardNumber("4539148803436467")) // true
// console.log(validCardNumber("8273123273520569")) // false
console.log(validCardNumber("1234567890123456")); //false
console.log(validCardNumber("4408041234567893")); //true
console.log(validCardNumber("38520000023237")); //true
console.log(validCardNumber("4222222222222")); //should be true--- logging as false


// =============================== ATTEMPT 3: does work ===============================
// Use String.prototype.split(''), Array.prototype.reverse() and Array.prototype.map() in combination with parseInt() to obtain an array of digits.

// Use Array.prototype.splice(0, 1) to obtain the last digit.

// Use Array.prototype.reduce() to implement the Luhn Algorithm.

// Return true if sum is divisible by 10, false otherwise.

const validCard = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));

  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};
console.log("================== ATTEMPT 3- string test works==================")
console.log(validCard("1234567890123456")); //false
console.log(validCard("4408041234567893")); //true
console.log(validCard("38520000023237")); //true
console.log(validCard("4222222222222")); //true

console.log("================== ATTEMPT 3- integer test works==================")
console.log(validCard(1234567890123456)); // false
console.log(validCard(4408041234567893)); // true
console.log(validCard(38520000023237)); // true
console.log(validCard(4222222222222)); //true