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

// Common mathematical formulas (language-independent)
const formulas = {
    recurrenceForm: '$$a \\cdot a_{n+2} + b \\cdot a_{n+1} + c \\cdot a_n = 0$$',
    recurrenceFormInline: '$a \\cdot a_{n+2} + b \\cdot a_{n+1} + c \\cdot a_n = 0$',
    varA: '$a$',
    varB: '$b$',
    varC: '$c$',
    varA1: '$a_1$',
    varA2: '$a_2$',
    exampleRecurrence: '$a_{n+2} - 5a_{n+1} + 6a_n = 0$',
    characteristicEq: '$r^2 - 5r + 6 = 0$',
    factoredForm: '$(r - 2)(r - 3) = 0$',
    root2: '$r = 2$',
    root3: '$r = 3$',
    generalSolutionDistinct: '$$a_n = A \\cdot 2^{n-1} + B \\cdot 3^{n-1}$$',
    constantA: '$A = -2$',
    constantB: '$B = 3$',
    finalSolution: '$$a_n = -2 \\cdot 2^{n-1} + 3 \\cdot 3^{n-1}$$',
    exampleValueA: '$a = 1$',
    exampleValueB: '$b = -5$',
    exampleValueC: '$c = 6$',
    exampleValueA1: '$a_1 = 1$',
    exampleValueA2: '$a_2 = 5$',
    characteristicForm: '$$a \\cdot r^2 + b \\cdot r + c = 0$$',
    quadraticFormula: '$$r = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$',
    discriminant: '$D = b^2 - 4ac$',
    generalSolutionDistinctRoots: '$$a_n = A \\cdot r_1^{n-1} + B \\cdot r_2^{n-1}$$',
    generalSolutionRepeatedRoot: '$$a_n = (A \\cdot (n-1) + B) \\cdot r^{n-1}$$',
    varR: '$r$',
    varR1: '$r_1$',
    varR2: '$r_2$',
    varD: '$D$',
    varDGreaterThan0: '$D > 0$',
    varDEqualTo0: '$D = 0$',
    varDLessThan0: '$D < 0$',
    constantA_var: '$A$',
    constantB_var: '$B$'
};

const translations = {
    en: {
        title: "Recurrence Relation Solver",
        submit: "Solve",
        introTitle: "What is a Recurrence Relation?",
        introContent: `<p>A recurrence relation is a mathematical equation that defines a sequence recursively. Each term of the sequence is expressed as a function of the preceding terms. Linear homogeneous recurrence relations with constant coefficients are among the most common types studied in discrete mathematics and computer science.</p>
                
                <p>This calculator solves second-order linear homogeneous recurrence relations of the form:</p>
                <p class="formula">${formulas.recurrenceForm}</p>
                
                <p>where ${formulas.varA}, ${formulas.varB}, and ${formulas.varC} are constants, and the initial conditions ${formulas.varA1} and ${formulas.varA2} are given.</p>`,
        howtoTitle: "How to Use This Calculator",
        howtoContent: `<ol>
                    <li><strong>Enter the coefficients:</strong> Input the values for ${formulas.varA}, ${formulas.varB}, and ${formulas.varC} from your recurrence relation equation.</li>
                    <li><strong>Enter initial conditions:</strong> Provide the values for ${formulas.varA1} and ${formulas.varA2} (the first two terms of your sequence).</li>
                    <li><strong>Click "Solve":</strong> The calculator will compute the closed-form solution using the characteristic equation method.</li>
                </ol>`,
        exampleTitle: "Example Problem",
        exampleContent: `<p><strong>Example:</strong> Solve the recurrence relation ${formulas.exampleRecurrence} with initial conditions ${formulas.varA1} = 1 and ${formulas.varA2} = 5.</p>
                
                <p><strong>Solution:</strong></p>
                <ol>
                    <li>The characteristic equation is: ${formulas.characteristicEq}</li>
                    <li>Factoring: ${formulas.factoredForm}, so ${formulas.root2} and ${formulas.root3}</li>
                    <li>Since we have two distinct real roots, the general solution is:
                        ${formulas.generalSolutionDistinct}
                    </li>
                    <li>Using the initial conditions, we find ${formulas.constantA} and ${formulas.constantB}</li>
                    <li>Therefore: ${formulas.finalSolution}</li>
                </ol>
                
                <p>Try entering ${formulas.exampleValueA}, ${formulas.exampleValueB}, ${formulas.exampleValueC}, ${formulas.exampleValueA1}, and ${formulas.exampleValueA2} into the calculator to verify this result!</p>`,
        methodTitle: "Mathematical Method",
        methodContent: `<p>The solution method used by this calculator is based on the <strong>characteristic equation</strong> technique:</p>
                
                <h3>Step 1: Characteristic Equation</h3>
                <p>For the recurrence relation ${formulas.recurrenceFormInline}, we form the characteristic equation:</p>
                <p class="formula">${formulas.characteristicForm}</p>
                
                <h3>Step 2: Find Roots</h3>
                <p>We solve for ${formulas.varR} using the quadratic formula:</p>
                <p class="formula">${formulas.quadraticFormula}</p>
                
                <h3>Step 3: General Solution</h3>
                <p>The form of the solution depends on the discriminant ${formulas.discriminant}:</p>
                <ul>
                    <li><strong>${formulas.varDGreaterThan0} (Distinct real roots ${formulas.varR1}, ${formulas.varR2}):</strong>
                        ${formulas.generalSolutionDistinctRoots}
                    </li>
                    <li><strong>${formulas.varDEqualTo0} (Repeated root ${formulas.varR}):</strong>
                        ${formulas.generalSolutionRepeatedRoot}
                    </li>
                    <li><strong>${formulas.varDLessThan0} (Complex roots):</strong>
                        <br>Currently not supported by this calculator
                    </li>
                </ul>
                
                <h3>Step 4: Determine Constants</h3>
                <p>The constants ${formulas.constantA_var} and ${formulas.constantB_var} are determined by substituting the initial conditions ${formulas.varA1} and ${formulas.varA2} into the general solution.</p>`,
        applicationsTitle: "Applications",
        applicationsContent: `<p>Recurrence relations have numerous applications in various fields:</p>
                <ul>
                    <li><strong>Computer Science:</strong> Analyzing algorithm complexity, especially for recursive algorithms like merge sort and binary search</li>
                    <li><strong>Mathematics:</strong> Studying sequences like Fibonacci numbers, Lucas numbers, and other mathematical sequences</li>
                    <li><strong>Physics:</strong> Modeling physical systems with discrete time steps</li>
                    <li><strong>Economics:</strong> Modeling population growth, financial calculations, and economic forecasting</li>
                    <li><strong>Biology:</strong> Population dynamics and genetic modeling</li>
                </ul>`,
        calculatorTitle: "Recurrence Relation Calculator",
        calculatorDesc: "Enter the coefficients and initial conditions below to solve your recurrence relation:",
        faqTitle: "Frequently Asked Questions",
        privacyLink: "Privacy Policy",
        termsLink: "Terms of Service",
        copyright: "© 2024-2025 Recurrence Relation Solver. All rights reserved.",
        languageLabel: "Language:",
        faqContent: `<div class="faq-item">
                    <h3>What types of recurrence relations can this calculator solve?</h3>
                    <p>This calculator solves second-order linear homogeneous recurrence relations with constant coefficients. The equation must be of the form ${formulas.recurrenceFormInline}.</p>
                </div>
                
                <div class="faq-item">
                    <h3>What if the discriminant is negative?</h3>
                    <p>When the discriminant is negative, the characteristic equation has complex roots. The solution involves trigonometric functions. This feature is currently not supported, but may be added in future updates.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Can I use this for non-homogeneous recurrence relations?</h3>
                    <p>No, this calculator is specifically designed for homogeneous recurrence relations (where the right-hand side is zero). For non-homogeneous relations, additional techniques are required.</p>
                </div>
                
                <div class="faq-item">
                    <h3>How accurate are the results?</h3>
                    <p>The calculator provides results with 2 decimal places. For exact solutions, you may need to perform the calculations manually or use symbolic computation software.</p>
                </div>`
    },

    jp: {
        title: "隣接3項間漸化式計算機",
        submit: "解く",
        introTitle: "漸化式とは？",
        introContent: `<p>漸化式とは、数列を再帰的に定義する数学的な方程式です。数列の各項は、前の項の関数として表現されます。定数係数を持つ線形同次漸化式は、離散数学やコンピュータサイエンスで研究される最も一般的なタイプの一つです。</p>
                
                <p>この計算機は、次の形式の2次線形同次漸化式を解きます：</p>
                <p class="formula">${formulas.recurrenceForm}</p>
                
                <p>ここで、${formulas.varA}、${formulas.varB}、${formulas.varC}は定数であり、初期条件${formulas.varA1}と${formulas.varA2}が与えられます。</p>`,
        howtoTitle: "使い方",
        howtoContent: `<ol>
                    <li><strong>係数を入力：</strong>漸化式の方程式から${formulas.varA}、${formulas.varB}、${formulas.varC}の値を入力します。</li>
                    <li><strong>初期条件を入力：</strong>${formulas.varA1}と${formulas.varA2}（数列の最初の2項）の値を入力します。</li>
                    <li><strong>「解く」をクリック：</strong>計算機が特性方程式法を使用して閉形式の解を計算します。</li>
                </ol>`,
        exampleTitle: "例題",
        exampleContent: `<p><strong>例：</strong>初期条件${formulas.varA1} = 1、${formulas.varA2} = 5で、漸化式${formulas.exampleRecurrence}を解きます。</p>
                
                <p><strong>解法：</strong></p>
                <ol>
                    <li>特性方程式は：${formulas.characteristicEq}</li>
                    <li>因数分解：${formulas.factoredForm}、したがって${formulas.root2}と${formulas.root3}</li>
                    <li>2つの異なる実根があるため、一般解は：
                        ${formulas.generalSolutionDistinct}
                    </li>
                    <li>初期条件を使用して、${formulas.constantA}、${formulas.constantB}を求めます</li>
                    <li>したがって：${formulas.finalSolution}</li>
                </ol>
                
                <p>計算機に${formulas.exampleValueA}、${formulas.exampleValueB}、${formulas.exampleValueC}、${formulas.exampleValueA1}、${formulas.exampleValueA2}を入力して、この結果を確認してみてください！</p>`,
        methodTitle: "数学的手法",
        methodContent: `<p>この計算機で使用される解法は、<strong>特性方程式</strong>の手法に基づいています：</p>
                
                <h3>ステップ1：特性方程式</h3>
                <p>漸化式${formulas.recurrenceFormInline}について、特性方程式を形成します：</p>
                <p class="formula">${formulas.characteristicForm}</p>
                
                <h3>ステップ2：根を求める</h3>
                <p>2次方程式の解の公式を使用して${formulas.varR}を解きます：</p>
                <p class="formula">${formulas.quadraticFormula}</p>
                
                <h3>ステップ3：一般解</h3>
                <p>解の形式は判別式${formulas.discriminant}によって異なります：</p>
                <ul>
                    <li><strong>${formulas.varDGreaterThan0}（異なる実根${formulas.varR1}、${formulas.varR2}）：</strong>
                        ${formulas.generalSolutionDistinctRoots}
                    </li>
                    <li><strong>${formulas.varDEqualTo0}（重根${formulas.varR}）：</strong>
                        ${formulas.generalSolutionRepeatedRoot}
                    </li>
                    <li><strong>${formulas.varDLessThan0}（複素根）：</strong>
                        <br>現在、この計算機ではサポートされていません
                    </li>
                </ul>
                
                <h3>ステップ4：定数を決定</h3>
                <p>定数${formulas.constantA_var}と${formulas.constantB_var}は、初期条件${formulas.varA1}と${formulas.varA2}を一般解に代入することで決定されます。</p>`,
        applicationsTitle: "応用",
        applicationsContent: `<p>漸化式は、さまざまな分野で多くの応用があります：</p>
                <ul>
                    <li><strong>コンピュータサイエンス：</strong>マージソートや二分探索などの再帰アルゴリズムの計算量の分析</li>
                    <li><strong>数学：</strong>フィボナッチ数、リュカ数、その他の数学的数列の研究</li>
                    <li><strong>物理学：</strong>離散時間ステップを持つ物理システムのモデリング</li>
                    <li><strong>経済学：</strong>人口増加、金融計算、経済予測のモデリング</li>
                    <li><strong>生物学：</strong>個体群動態と遺伝的モデリング</li>
                </ul>`,
        calculatorTitle: "漸化式計算機",
        calculatorDesc: "係数と初期条件を以下に入力して、漸化式を解いてください：",
        faqTitle: "よくある質問",
        privacyLink: "プライバシーポリシー",
        termsLink: "利用規約",
        copyright: "© 2024-2025 Recurrence Relation Solver. All rights reserved",
        languageLabel: "言語:",
        faqContent: `<div class="faq-item">
                    <h3>この計算機はどのようなタイプの漸化式を解くことができますか？</h3>
                    <p>この計算機は、定数係数を持つ2次線形同次漸化式を解きます。方程式は${formulas.recurrenceFormInline}の形式である必要があります。</p>
                </div>
                
                <div class="faq-item">
                    <h3>判別式が負の場合はどうなりますか？</h3>
                    <p>判別式が負の場合、特性方程式は複素根を持ちます。解には三角関数が含まれます。この機能は現在サポートされていませんが、今後の更新で追加される可能性があります。</p>
                </div>
                
                <div class="faq-item">
                    <h3>非同次漸化式に使用できますか？</h3>
                    <p>いいえ、この計算機は同次漸化式（右辺がゼロ）専用に設計されています。非同次漸化式には、追加の手法が必要です。</p>
                </div>
                
                <div class="faq-item">
                    <h3>結果の精度はどの程度ですか？</h3>
                    <p>計算機は小数点以下2桁で結果を提供します。正確な解が必要な場合は、手動で計算するか、記号計算ソフトウェアを使用する必要がある場合があります。</p>
                </div>`
    }
}

const languageSelect = document.getElementById("language-select");
let h1 = document.getElementById("h1");
let button = document.getElementById("button");

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('language-preference');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'jp')) {
        languageSelect.value = savedLanguage;
        setLanguage(savedLanguage);
    } else {
        // Default to English if no preference saved
        setLanguage('en');
    }
}

languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    // Save language preference to localStorage
    localStorage.setItem('language-preference', selectedLanguage);
    setLanguage(selectedLanguage);
})

// Wait for MathJax to be ready
function waitForMathJax(callback) {
    if (window.MathJax && window.MathJax.typesetPromise) {
        callback();
    } else if (window.MathJax && window.MathJax.startup) {
        window.MathJax.startup.promise.then(callback);
    } else {
        // MathJax not loaded yet, wait a bit
        setTimeout(() => waitForMathJax(callback), 100);
    }
}

// Initialize MathJax rendering after page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference first
    loadLanguagePreference();
    
    waitForMathJax(function() {
        if (window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    });
});

const setLanguage = (language) => {
    const t = translations[language] || translations.en;
    
    button.innerText = t.submit;
    document.getElementById("intro-title").innerText = t.introTitle;
    document.getElementById("intro-content").innerHTML = t.introContent;
    document.getElementById("howto-title").innerText = t.howtoTitle;
    document.getElementById("howto-content").innerHTML = t.howtoContent;
    document.getElementById("example-title").innerText = t.exampleTitle;
    document.getElementById("example-content").innerHTML = t.exampleContent;
    document.getElementById("method-title").innerText = t.methodTitle;
    document.getElementById("method-content").innerHTML = t.methodContent;
    document.getElementById("applications-title").innerText = t.applicationsTitle;
    document.getElementById("applications-content").innerHTML = t.applicationsContent;
    document.getElementById("calculator-title").innerText = t.calculatorTitle;
    document.getElementById("calculator-desc").innerText = t.calculatorDesc;
    document.getElementById("faq-title").innerText = t.faqTitle;
    document.getElementById("faq-content").innerHTML = t.faqContent;
    
    // Update header
    const headerTitle = document.getElementById("h1");
    const languageLabel = document.getElementById("language-label");
    if (headerTitle) headerTitle.innerText = t.title;
    if (languageLabel) languageLabel.innerText = t.languageLabel;
    
    // Update footer
    const privacyLink = document.getElementById("privacy-link");
    const termsLink = document.getElementById("terms-link");
    const copyrightText = document.getElementById("copyright-text");
    if (privacyLink) privacyLink.innerText = t.privacyLink;
    if (termsLink) termsLink.innerText = t.termsLink;
    if (copyrightText) copyrightText.innerText = t.copyright;
    
    // Re-render MathJax after content update
    // Use setTimeout to ensure DOM is fully updated
    setTimeout(function() {
        waitForMathJax(function() {
            // Clear previous MathJax rendering for the updated elements
            const elements = document.querySelectorAll('#intro-content, #howto-content, #example-content, #method-content, #faq-content');
            if (window.MathJax.typesetClear && elements.length > 0) {
                try {
                    window.MathJax.typesetClear(Array.from(elements));
                } catch(e) {
                    // If typesetClear fails, just proceed with typeset
                }
            }
            // Re-render MathJax for the entire document
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise().catch(function (err) {
                    console.log('MathJax typeset error:', err);
                });
            } else if (window.MathJax.typeset) {
                // Fallback for older MathJax versions
                window.MathJax.typeset();
            }
        });
    }, 150);
}