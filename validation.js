let USERS_DB = []

function resetFields() {
  document.getElementById("s-form").reset();
  document.getElementById("l-form").reset();

  
  document.getElementById("loginValid").style.display = "none";
  document.getElementById("firstValid").style.display = "none";
  document.getElementById("lastValid").style.display = "none";
  document.getElementById("emailValid").style.display = "none";
  document.getElementById("phoneValid").style.display = "none";
  document.getElementById("passwordValid").style.display = "none";
}
let savedEmail = ''
let savedPassword = ''

document.getElementById('nav-login').innerHTML = `LOGIN`


function signup() {
	let firstName = document.getElementById('first-name').value
	let lastName = document.getElementById('last-name').value
	let email = document.getElementById('email').value
	let phoneNumber = document.getElementById('phone-number').value
	let password = document.getElementById('password').value
	let confirmPassword = document.getElementById('confirm-password').value

	let error = false

  if (firstName.length >= 2) {
    document.getElementById("firstValid").style.display = "block";
    document.getElementById("firstInvalid").style.display = "none";
  } else {
    error = true;
    document.getElementById("firstInvalid").style.display = "block";
    document.getElementById("firstValid").style.display = "none";
  }

  if (lastName.length >= 2) {
    document.getElementById("lastValid").style.display = "block";
    document.getElementById("lastInvalid").style.display = "none";
  } else {
    error = true;
    document.getElementById("lastInvalid").style.display = "block";
    document.getElementById("lastValid").style.display = "none";
  }

  if (
    email.includes("@") &&
    email.includes(".") &&
    email.indexOf("@") > 0 &&
    email.substr(email.lastIndexOf(".") + 1).length >= 2
  ) {
    document.getElementById("emailValid").style.display = "block";
    document.getElementById("emailInvalid").style.display = "none";
  } else {
    error = true;
    document.getElementById("emailInvalid").style.display = "block";
    document.getElementById("emailValid").style.display = "none";
  }

  let numberphone = parseInt(phoneNumber);

  if (
    !isNaN(numberphone) &&
    numberphone > 1000000000 &&
    numberphone <= 9999999999
  ) {
    document.getElementById("phoneValid").style.display = "block";
    document.getElementById("phoneInvalid").style.display = "none";
  } else {
    error = true;
    document.getElementById("phoneInvalid").style.display = "block";
    document.getElementById("phoneValid").style.display = "none";
  }

  if (password.length >= 6) {
    document.getElementById("passwordValid").style.display = "block";
    document.getElementById("passwordInvalid").style.display = "none";
  } else {
    error = true;
    document.getElementById("passwordInvalid").style.display = "block";
    document.getElementById("passwordValid").style.display = "none";
  }

	if(password !== confirmPassword) {
		document.getElementById('confirm-password-invalid').style.display = 'block'
		error = true
	} else {
		document.getElementById('confirm-password-invalid').style.display = 'none'
	}

	if(!error) {
		let userDetails = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: encryptPassword(password),
   }
		USERS_DB.push(userDetails)
		// alert('Your details have been saved successfully!')
    document.getElementById('signup-popup').style.display = 'block'
		document.getElementById('signup-form-id').reset()
		console.log(USERS_DB)
	}
}
function popupRemove() {
  document.getElementById('signup-popup').style.display = 'none'
  document.getElementById('login-popup').style.display = 'none'
}
function login () {
	let loginEmail = document.getElementById('login-email').value
	let loginPassword = document.getElementById('login-password').value

	if(USERS_DB.find(user => user.email === loginEmail && decryptPassword(user.password) === loginPassword)) {
		// alert('Access granted')
    document.getElementById('login-popup').style.display = 'block'
    document.getElementById('alert').innerHTML = 'Access granted'
    document.getElementById('login-btn').innerHTML = 'OK'

    document.getElementById('nav-signup').style.display = 'none'
    document.getElementById('nav-login').innerHTML = `${USERS_DB[0].firstName}`
    document.getElementById('nav-signup').style.display = 'none'

    // USERS_DB[0].firstName
	} else {
		// alert('Access denied')
    document.getElementById('login-popup').style.display = 'block'
    document.getElementById('alert').innerHTML = 'Access denied'
    document.getElementById('login-btn').innerHTML = 'Try Again'
    document.getElementById('login-btn').style.letterSpacing = '2px'
    
	}
}

let encryptionRule = {
  'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
  'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
  'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
  'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
  'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
  'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
  'Y': 'L', 'Z': 'M',
  'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
  'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
  'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
  'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
  'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
  'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
  'y': 'l', 'z': 'm',
  '0': '5', '1': '6', '2': '7', '3': '8',
  '4': '9', '5': '0', '6': '1', '7': '2',
  '8': '3', '9': '4',
  '!': '#', '$': '%', '&': '+', '-': '@',
  '': '~', '#': '!', '%': '$', '+': '&',
  '@': '-', '~': ''
}

function encryptPassword (inputString){
  let encryptedString = ''
  for(let char of inputString){
    encryptedString = encryptedString + encryptionRule[char]
  }
  return encryptedString
}
function decryptPassword(encryptedString){
  let originalString = ''
  let keys = Object.keys(encryptionRule)
  let values = Object.values(encryptionRule)
  for(let char of encryptedString){
    let requiredIndex = values.indexOf(char)
    originalString = originalString + keys[requiredIndex]
  }
  return originalString
}