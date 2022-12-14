// Luhn algorithm or luhn formula:
// - also known as the modulus 10 or mod 10 algorithm, is a simple checksum formula ro validate a variety of identification numbers- such as credit card numbers, survey codes IMEI numbers, etc.
//     - a checksum is a small block of data derived from another block of data
//         - a good checksum outputs a significantly different data value for even small changes made to the input
//         - checksums are good to verify data integrity in larger authentication algorithms
//         - purpose of a checksum is to detect errors
//         - check digits are special cases of checksums used for bank account numbers and social security 
//     - the algorithm is in the public domain and is in wide us today
//     - most credit cards and govt ids use the algorithm as a way to distinguish between valid numbers and incorrect numbers

//     The check digit works like this:
//     1. The check digit is most often the last digit
//     --if the number already contains the check digit, 
//     drop that digit to form the payload.

//     2. with the payload: start from the rightmost digit
//     -- then moving left, double the value of every second digit
//     (including the right most digit)

//     3. Sum the digits of the resulting value in each position
//     -- using the original value where a digit did not get doubled in
//     the previous step

//     4. The check digit is calculated by (10 -(smod10))mod10
//     -- this is the least number (possibly zero) that must be added to
//     s to make a multiple of 10
//     Other valid formulas giving the same value are (1000 -s)mod10and 10[s/10] -s

// Example 1: 4408041234567893

// STEP 1: Start with the next to last digit and continue with every other digit,
// going back to the beginning of the card number- double the digit
// Orignal:   4   4   0   8   0   4   1   2   3   4   5   6   7   8   9   3
// Step 1:    8   4   0   8   0   4   2   2   6   4  10   6  14   8   18  3

// STEP 2: Add all the resulting numbers from STEP 1
// Step 1:    8 + 4 + 0 + 8 + 0 + 4 + 2 + 2 + 6 + 4 + 1+0  + 6 + 1+4 + 8  + 1+8 + 3 = 70

// STEP 3: if the total number is a multiple of 10, the number is valid 70%10 =0 

// Write a function validCard that takes a number as an argument 
// and returns true for a valid number 
// and false for an invalid number

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

  console.log(validCard("1234567890123456"));
  console.log(validCard("4408041234567893"));
  console.log(validCard("38520000023237"));
  console.log(validCard("4222222222222"));

  console.log(validCard(1234567890123456)); //should be false
  console.log(validCard(4408041234567893)); //should be true
  console.log(validCard(38520000023237)); //should be true
  console.log(validCard(4222222222222)); //should be true