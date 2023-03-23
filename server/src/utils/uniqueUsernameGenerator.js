
const generateUniqueUsername = async (username, UserModel) => {
    let uniqueUsername = username;
    if (usernameIsAvailable(uniqueUsername, UserModel)) {
        uniqueUsername = await makeUsernameUnique(username, UserModel);
    }
    return uniqueUsername;
}

const usernameIsAvailable = async (username, UserModel) => {
    const userExist = await UserModel.findOne({ username: username });
    if (userExist) {
        return false;
    } else {
        return true;
    }
}

const makeUsernameUnique = async (username, UserModel) => {
    let uniqueUsername = '';
    let strBuilder = [];
    strBuilder.push(username);
    while (true) {
        const randomDigits = generateRandomDigits(2);
        strBuilder.push(randomDigits);
        uniqueUsername = strBuilder.join('');
        if (await usernameIsAvailable(uniqueUsername, UserModel)) break;
    }
    return uniqueUsername;
}

const generateRandomDigits = (numOfDigits) => {
    let numberOfDigits = numOfDigits;
    let loopCount = 0;
    let strBuilder = [];
    while (loopCount < numberOfDigits) {
        let randomNum = Math.floor(Math.random() * 10);//random number from 0 -9
        strBuilder.push(randomNum);
        loopCount++;
    }
    const randomDigits = strBuilder.join('');
    return randomDigits;
}

module.exports = {
    generateUniqueUsername
}