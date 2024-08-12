const $ = el => document.querySelector(el)
const $$ = el => document.querySelector(el)
const $generateBtn = $("#generate-password-button")
const $includeNumbersBtn = $("#include-numbers")
const $includeSpecialCharsBtn = $("#include-special-char")
let allowedChars = ["abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",]
const numbersString = "1234567890"
const specialCharsString = "!#$%?¿¡*+^-"
const notAllowedCharsRegex = /[&/'"]/

$generateBtn.addEventListener("click", function(){
    const correctParameters = validateParameters()
    if(correctParameters){
        generatePassword()
        const $password = $("#new_password").innerText
        checkPasswordSecurity($password)
    }
    
})

function generatePassword(){
    const $passwordLength = $("#password-length").value
    const passwordLengthNum = parseInt($passwordLength)
    let $specialWord = $("#special-word").value
    let randomPosition = Math.floor(Math.random() * (passwordLengthNum - $specialWord.length))
    const $password = $("#new_password")
    let allowedCharsString = ""
    let newPassword = ""
    allowedChars.forEach(chars =>{
        allowedCharsString += chars
    })
    let i = 0
    while(i < passwordLengthNum){
        if($specialWord.length > 0){
            if (i === randomPosition){
                newPassword += $specialWord
                i += $specialWord.length
            } else{
                let randomNum = Math.floor(Math.random() * allowedCharsString.length)
                let newChar = allowedCharsString.charAt(randomNum)
                newPassword += newChar
                i++
            }
        } else{
            let randomNum = Math.floor(Math.random() * allowedCharsString.length);
            let newChar = allowedCharsString.charAt(randomNum);
            newPassword += newChar;
            i++;
        }
    }
    $password.innerText = newPassword
}
function addChars(checkBox, chars){
    checkBox.addEventListener("click", ()=>{
        if (checkBox.checked){
            if(!allowedChars.some(el => el === chars)){
                allowedChars.push(chars)
            }
            checkBox.classList.add("highLight")
        } else{
            allowedChars = allowedChars.filter(el => !(el === chars))
            checkBox.classList.remove("highLight")
        }
    })
}
function validateParameters(){
    const $passwordLength = $("#password-length").value
    const passwordLengthIsValid =  $passwordLength > 0 && $passwordLength <= 100
    const $specialWord = $("#special-word").value
    const isWordValid = !notAllowedCharsRegex.test($specialWord)
    let errorMessages = ""
    if(!passwordLengthIsValid){
        errorMessages += " Password must be between 0 and 100 chars \n"
    } else if(!isWordValid){
        errorMessages += " Password contains not allowed chars \n"
    }
    if(errorMessages.length === 0){
        return true
    } else{
        alert(errorMessages)
        return false
    }
}
if($includeNumbersBtn){
    addChars($includeNumbersBtn, numbersString);
}
if($includeSpecialCharsBtn){
    addChars($includeSpecialCharsBtn, specialCharsString);
}
function checkPasswordSecurity(password){
    let passwordSecurity = 0
    const numberRegex = /[0-9]/
    const specialCharsRegex = /[!#$%?¿¡*+^-]/
    let containsNumber = false
    let totalChars = 0
    
    for(let char of password){
        if (numberRegex.test(char)) {
            containsNumber = true;
        }
        if (specialCharsRegex.test(char)) {
            totalChars++
        }
    }
    if (containsNumber){
        passwordSecurity += 2
    }
    passwordSecurity += totalChars
    passwordSecurity += Math.floor(password.length / 2)
    $("#security-level").textContent = "Security level: " + passwordSecurity
}