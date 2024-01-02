// @ts-nocheck
const getRandCountry = async (randomNums) => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    let random = sessionStorage.getItem('random') || Math.floor(Math.random() * data.length); //Generate random country number;
    sessionStorage.setItem('random', random);

    while (randomNums.includes(random)) {
        random = Math.floor(Math.random() * data.length); //Generate random country number
        sessionStorage.setItem('random', random);
    }
    return {
        data: data,
        country: data[random],
        num: random
    }
}

export { getRandCountry }