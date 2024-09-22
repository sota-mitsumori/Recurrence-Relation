function solveRecurrence(a, b, c, a1, a2) {
    let D = b * b - 4 * a * c;

    if (D > 0) {
        let x1 = (-b + Math.sqrt(D)) / (2 * a);
        let x2 = (-b - Math.sqrt(D)) / (2 * a);

        let A = ((x2 * a1 - a2) / (x2 - x1));
        let B = ((a2 - x1 * a1) / (x2 - x1));

        return { x1: x1, x2: x2, A: A, B: B };
    } else if (D === 0) {
        let x = -b / (2 * a);

        let A = ((a2 - x * a1) / x);
        let B = a1;
        return { x1: x, x2: null, A: A, B: B };
    } else {
        return { x1: null, x2: null, A: null, B: "Imaginary roots not supported yet" };
    }
}

document.getElementById("recurrence-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);
    let a1 = parseFloat(document.getElementById("a1").value);
    let a2 = parseFloat(document.getElementById("a2").value);

    let result = solveRecurrence(a, b, c, a1, a2);
    let solutionDiv = document.getElementById("solution");

    function formatCoefficient(coefficient) {
        // Check if the coefficient is positive or negative and add the appropriate sign
        if (coefficient >= 0) {
            return `${coefficient.toFixed(2)}`;
        } else {
            return `<img src="https://latex.codecogs.com/svg.image?-" /> ${Math.abs(coefficient).toFixed(2)}`;
        }
    }

    if (result.x1 !== null && result.x2 !== null) {
        solutionDiv.innerHTML = `<span class="result-text">
            <img src = https://latex.codecogs.com/svg.image?a_{n}= /> 
            ${result.A.toFixed(2)} 
            <img src = https://latex.codecogs.com/svg.image?%2A%28 />${result.x1.toFixed(2)}
            <img src = https://latex.codecogs.com/svg.image?%29^{n-1} />
            ${formatCoefficient(result.B)} 
            <img src = https://latex.codecogs.com/svg.image?%2A%28 />${result.x2.toFixed(2)}<img src = https://latex.codecogs.com/svg.image?%29^{n-1} /></span>`;
    } else if (result.x1 !== null) {
        solutionDiv.innerHTML = `<span class="result-text">
            <img src = https://latex.codecogs.com/svg.image?a_{n}= /> 
            <img src = https://latex.codecogs.com/svg.image?%28 />
            ${result.A.toFixed(2)} 
            <img src = https://latex.codecogs.com/svg.image?%2A%28n-1%29+ /> 
            ${result.B.toFixed(2)}
            <img src = https://latex.codecogs.com/svg.image?%29%2A%28 />
            ${result.x1.toFixed(2)}
            <img src = https://latex.codecogs.com/svg.image?%29^{n-1} /></span>`;
    } else {
        solutionDiv.innerHTML = result.B;
    }
});

const translations = {
    en: {
        title : "Recurrence Relation Solver",
        submit : "Solve",
    },

    jp: {
        title: "隣接3項間漸化式計算機",
        submit: "解く",
    }
}

const languageSelecttop = document.querySelector("select");
let h1 = document.getElementById("h1");
let button = document.getElementById("button");

languageSelecttop.addEventListener("change", (event) => {
    setLanguage(event.target.value)
})

const setLanguage = (language) => {
    if(language == "jp"){
        h1.innerText = translations.jp.title;
        button.innerText = translations.jp.submit;
    }
    else if(language == "en"){
        h1.innerText = translations.en.title;
        button.innerText = translations.en.submit;
    }
}