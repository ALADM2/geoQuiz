// @ts-nocheck

/**
 * Find the correct country
 * @param {*} rightCountry 
 * @returns 
 */
async function getCorrectElement(rightCountry) {
    const list = document.querySelectorAll('.element'); //Get all list elements
    // Find correct html element
    let rightListElement;
    list.forEach((element) => {
        if (element.textContent.includes(rightCountry)) {
            rightListElement = element;
            return;
        }
    });

    return rightListElement;
}

/**
 * Actions when answer is correct
 * @param {*} selected 
 * @param {*} score 
 * @returns 
 */
async function rightAnswer(selected, score) {
    selected.classList.add('correct');
    score = Number(score) + 10; //10 points for each correct answer. Sessionstorage is string type so it needs to be parsed.
    sessionStorage.setItem('score', score); //Store score
    await new Promise((resolve) => setTimeout(resolve, 2000)); //Stop app to see correct answer
    selected.classList.remove('correct');
    console.log(score)
    return score;
}

/**
 * Actions when answer is incorrect
 */
async function wrongAnswer(rightCountry, selected) {
    const rightListElement = await getCorrectElement(rightCountry);
    console.log(rightListElement)
    if (selected) {
        selected.classList.add('incorrect');
        rightListElement.classList.add('correct');
        await new Promise((resolve) => setTimeout(resolve, 2000)); //Stop app to see correct answer
        selected.classList.remove('incorrect');
        rightListElement.classList.remove('correct');
    } else {
        //If timer runs out
        rightListElement.classList.add('correct');
        await new Promise((resolve) => setTimeout(resolve, 2000)); //Stop app to see correct answer
        rightListElement.classList.remove('correct');
    }
}

/**
 * Dissable buttons
 */
async function disableButtons() {
    const list = document.querySelectorAll('.element'); //Get all list elements
    list.forEach((element) => {
        element.classList.add('disabled');
    });
}

/**
 * Enable buttons
 */
async function enableButtons() {
    const list = document.querySelectorAll('.element'); //Get all list elements
    list.forEach((element) => {
        element.classList.remove('disabled');
    });
}

export { rightAnswer, wrongAnswer, disableButtons, enableButtons }