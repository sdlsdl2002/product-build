const translations = {
    ko: {
        siteTitle: "📜 조선 비책: 사주팔자 기반 천기누설 로또 생성기",
        navLogo: "🪙 황금로또",
        weatherLoading: "천기를 살피는 중...",
        sajuTitle: "⛩️ 정통 명리학의 비책: 사주팔자에 새겨진 '천기누설' 대박 번호",
        sajuDesc: "타고난 사주의 음양오행과 성명의 기운을 정밀히 분석하여, 당신의 부족한 기운을 보완(裨補)하고 막힌 재물운을 틔워줄 '인생 역전의 행운수'를 점지해 드립니다.",
        namePlaceholder: "성함 입력",
        sajuBtn: "운명의 번호 분석하기",
        randomTitle: "🎲 만물의 기운 랜덤 번호 (5세트)",
        generateBtn: "새로운 기운으로 생성",
        tipsTitle: "🔮 부를 부르는 로또 당첨 비법",
        col1Title: "음양의 조화 (홀짝)",
        col1Desc: "우주의 섭리는 음과 양의 조화에 있습니다. 홀수와 짝수가 3:3 혹은 2:4의 비율을 이룰 때 재물운이 가장 강하게 작용합니다.",
        col2Title: "오행의 분산",
        col2Desc: "숫자가 한곳에 치우치지 않고 골고루 퍼져 있어야 막힌 기운이 뚫리고 당첨의 문이 열립니다. 연속된 번호는 가급적 피하십시오.",
        articleTitle: "📘 로또와 명리학: 숫자의 신비",
        col3Title: "숫자 속에 담긴 오행",
        col3Desc: "동양 철학에서 각 숫자는 고유의 오행(목, 화, 토, 금, 수)을 가집니다. 자신의 사주에서 부족한 기운을 숫자로 보강하면 운의 흐름이 바뀝니다.",
        col4Title: "확률과 운명의 만남",
        col4Desc: "로또는 수학적 확률이지만, 그 기회를 잡는 것은 운명입니다. 긍정적인 마음가짐으로 도전하는 것이 가장 큰 당첨 비결입니다.",
        contactTitle: "🤝 제휴 및 문의",
        formName: "성함 또는 상호명",
        formEmail: "이메일",
        formMsg: "내용",
        formSubmit: "메시지 보내기",
        footerText: "© 2026 천운의 황금 로또. 당신의 대박을 기원합니다.",
        lineLabel: "제 {n}행운",
        sajuResultPrefix: "✨ {name}님의 사주 분석 결과",
        sajuLoading: "운명의 기운을 분석 중입니다...",
        sajuInterpretation: "당신의 사주는 {element}의 기운이 강합니다. 추천된 번호는 {luckyNumbers}를 포함하여 당신의 부족한 기운을 보완하고 재물운을 끌어당기도록 설계되었습니다."
    },
    en: {
        siteTitle: "Golden Fortune Lotto - Saju Based Lucky Number Generator",
        navLogo: "🪙 GoldenLotto",
        weatherLoading: "Reading the heavens...",
        sajuTitle: "💰 Saju Fortune Number Extraction",
        sajuDesc: "Combining your name and birth energy to extract 1 set of 'Destiny Numbers'.",
        namePlaceholder: "Enter Name",
        sajuBtn: "Analyze Numbers",
        randomTitle: "🎲 Universal Energy Random Numbers (5 Sets)",
        generateBtn: "Generate with New Energy",
        tipsTitle: "🔮 Secret to Attracting Wealth",
        col1Title: "Yin-Yang Balance (Odd/Even)",
        col1Desc: "The universe's providence lies in the balance of Yin and Yang. Wealth luck is strongest when odd and even numbers are 3:3 or 2:4.",
        col2Title: "Five Elements Dispersion",
        col2Desc: "Energy must flow freely across all areas for the door to victory to open. Avoid consecutive numbers if possible.",
        articleTitle: "📘 Lotto and Saju: Mystery of Numbers",
        col3Title: "Five Elements in Numbers",
        col3Desc: "In Eastern philosophy, each number holds unique energy (Wood, Fire, Earth, Metal, Water). Supplementing your missing energy with numbers changes your fortune.",
        col4Title: "Probability Meets Destiny",
        col4Desc: "Lotto is mathematical probability, but seizing the chance is destiny. Challenging with a positive mindset is the biggest secret.",
        contactTitle: "🤝 Partnership & Inquiry",
        formName: "Name or Company",
        formEmail: "Email",
        formMsg: "Message",
        formSubmit: "Send Message",
        footerText: "© 2026 Golden Fortune Lotto. Wishing you the ultimate jackpot.",
        lineLabel: "Luck {n}",
        sajuResultPrefix: "✨ Saju Analysis for {name}",
        sajuLoading: "Analyzing the energy of destiny...",
        sajuInterpretation: "Your destiny has strong {element} energy. The recommended numbers, including {luckyNumbers}, are designed to balance your energy and attract financial luck."
    }
};

let currentLang = 'ko';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
    updateUI();
}

function updateUI() {
    const t = translations[currentLang];
    document.getElementById('site-title').textContent = t.siteTitle;
    document.getElementById('nav-logo').textContent = t.navLogo;
    document.getElementById('saju-title').textContent = t.sajuTitle;
    document.getElementById('saju-desc').textContent = t.sajuDesc;
    document.getElementById('user-name').placeholder = t.namePlaceholder;
    document.getElementById('saju-btn').textContent = t.sajuBtn;
    document.getElementById('random-title').textContent = t.randomTitle;
    document.getElementById('generate-btn').textContent = t.generateBtn;
    document.getElementById('tips-title').textContent = t.tipsTitle;
    document.getElementById('col1-title').textContent = t.col1Title;
    document.getElementById('col1-desc').textContent = t.col1Desc;
    document.getElementById('col2-title').textContent = t.col2Title;
    document.getElementById('col2-desc').textContent = t.col2Desc;
    document.getElementById('footer-text').textContent = t.footerText;
    
    if (document.getElementById('results-container').children.length > 0) {
        generateRandomSets();
    }
}

const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results-container');
const weatherInfo = document.getElementById('weather-info');

function generateLotteryNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function createNumberElement(num) {
    const div = document.createElement('div');
    div.className = 'number';
    div.textContent = num;
    return div;
}

function generateRandomSets() {
    resultsContainer.innerHTML = '';
    const t = translations[currentLang];
    for (let i = 0; i < 5; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'numbers-line';
        
        const label = document.createElement('span');
        label.className = 'line-label';
        label.textContent = t.lineLabel.replace('{n}', i + 1);
        
        const numSet = document.createElement('div');
        numSet.className = 'number-set';
        
        const numbers = generateLotteryNumbers();
        numbers.forEach(num => numSet.appendChild(createNumberElement(num)));
        
        lineDiv.appendChild(label);
        lineDiv.appendChild(numSet);
        resultsContainer.appendChild(lineDiv);
    }
}

generateBtn.addEventListener('click', generateRandomSets);

const sajuBtn = document.getElementById('saju-btn');
const sajuResultArea = document.getElementById('saju-result-area');
const userNameInput = document.getElementById('user-name');
const userBirthInput = document.getElementById('user-birth');

const elements = {
    ko: ['목(木 - 나무)', '화(火 - 불)', '토(土 - 흙)', '금(金 - 쇠)', '수(水 - 물)'],
    en: ['Wood', 'Fire', 'Earth', 'Metal', 'Water']
};

function getSajuInterpretation(hash, numbers) {
    const idx = Math.abs(hash) % 5;
    const t = translations[currentLang];
    const element = elements[currentLang][idx];
    const luckyNumbers = numbers.slice(0, 2).join(', ');
    
    return t.sajuInterpretation
        .replace('{element}', element)
        .replace('{luckyNumbers}', luckyNumbers);
}

sajuBtn.addEventListener('click', () => {
    const name = userNameInput.value.trim();
    const birth = userBirthInput.value;
    const t = translations[currentLang];

    if (!name || !birth) {
        alert(currentLang === 'ko' ? "성함과 생년월일을 입력해주세요." : "Please enter your name and birthdate.");
        return;
    }

    sajuResultArea.innerHTML = `<p class="jackpot-text">${t.sajuLoading}</p>`;

    setTimeout(() => {
        const combined = name + birth + new Date().toDateString();
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash |= 0;
        }
        
        const numbers = new Set();
        let seed = Math.abs(hash);
        while (numbers.size < 6) {
            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
            numbers.add((seed % 45) + 1);
        }
        const sortedNums = Array.from(numbers).sort((a, b) => a - b);
        
        const interpretation = getSajuInterpretation(hash, sortedNums);
        
        sajuResultArea.innerHTML = `
            <div class="saju-result-box">
                <p><strong>${t.sajuResultPrefix.replace('{name}', name)}</strong></p>
                <div class="numbers-line" style="justify-content:center; background:transparent; border:none;">
                    <div class="number-set"></div>
                </div>
                <div class="saju-interpretation">${interpretation}</div>
            </div>
        `;
        
        const numSet = sajuResultArea.querySelector('.number-set');
        sortedNums.forEach(num => numSet.appendChild(createNumberElement(num)));
    }, 1200);
});

function fetchWeather() {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`)
            .then(res => res.json())
            .then(data => {
                const temp = data.current.temperature_2m;
                weatherInfo.textContent = currentLang === 'ko' ? `📍 현재 기온: ${temp}°C` : `📍 Local Temp: ${temp}°C`;
            });
    });
}

window.setLanguage = setLanguage;
generateRandomSets();
fetchWeather();