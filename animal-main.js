// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/z9274toV_/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    } catch (e) {
        console.error("Model failed to load", e);
    }
}

// Elements
const imageInput = document.getElementById("image-input");
const uploadArea = document.getElementById("upload-area");
const faceImage = document.getElementById("face-image");
const loading = document.getElementById("loading");
const resultArea = document.getElementById("result-area");
const animalName = document.getElementById("animal-name");
const resultExplain = document.getElementById("result-explain");
const labelContainerEl = document.getElementById("label-container");
const uploadGuide = document.querySelector(".upload-guide");

// Click upload area to trigger file input
uploadArea.addEventListener("click", () => imageInput.click());

// Handle file selection
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            faceImage.src = event.target.result;
            faceImage.style.display = "block";
            uploadGuide.style.display = "none";
            
            predict();
        };
        reader.readAsDataURL(file);
    }
});

// Drag and Drop
uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = "#fff9ed";
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.backgroundColor = "";
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = "";
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
            faceImage.src = event.target.result;
            faceImage.style.display = "block";
            uploadGuide.style.display = "none";
            predict();
        };
        reader.readAsDataURL(file);
    }
});

async function predict() {
    if (!model) await init();

    loading.style.display = "block";
    resultArea.style.display = "none";
    labelContainerEl.innerHTML = "";

    // Small delay for UX and to ensure image is loaded
    setTimeout(async () => {
        const prediction = await model.predict(faceImage);
        
        // Sort predictions by probability
        prediction.sort((a, b) => b.probability - a.probability);
        
        const topResult = prediction[0].className;
        animalName.innerText = getKoreanClassName(topResult);
        resultExplain.innerText = getExplain(topResult);

        // Create probability bars
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className;
            const probability = (prediction[i].probability * 100).toFixed(0);
            
            const barContainer = document.createElement("div");
            barContainer.className = "bar-container";
            
            const label = document.createElement("div");
            label.className = "label-text";
            label.innerText = getKoreanClassName(classPrediction);
            
            const barBg = document.createElement("div");
            barBg.className = "bar-bg";
            
            const barFill = document.createElement("div");
            barFill.className = "bar-fill";
            barFill.style.width = probability + "%";
            
            const percent = document.createElement("div");
            percent.className = "percent-text";
            percent.innerText = probability + "%";
            
            barBg.appendChild(barFill);
            barContainer.appendChild(label);
            barContainer.appendChild(barBg);
            barContainer.appendChild(percent);
            labelContainerEl.appendChild(barContainer);
        }

        loading.style.display = "none";
        resultArea.style.display = "block";
    }, 1500);
}

function getKoreanClassName(className) {
    const mapping = {
        "dog": "강아지",
        "cat": "고양이",
        "rabbit": "토끼",
        "dinosaur": "공룡",
        "bear": "곰",
        "Dog": "강아지",
        "Cat": "고양이"
    };
    return mapping[className] || className;
}

function getExplain(className) {
    const explains = {
        "dog": "다정다감하고 귀여운 당신은 모든 사람에게 즐거움을 주는 강아지상입니다! 친근한 매력으로 주변 사람들에게 인기가 많으시네요.",
        "cat": "도도하고 섹시한 매력을 가진 당신은 첫인상은 차가워 보일 수 있지만 알면 알수록 빠져드는 고양이상입니다!",
        "Dog": "다정다감하고 귀여운 당신은 모든 사람에게 즐거움을 주는 강아지상입니다! 친근한 매력으로 주변 사람들에게 인기가 많으시네요.",
        "Cat": "도도하고 섹시한 매력을 가진 당신은 첫인상은 차가워 보일 수 있지만 알면 알수록 빠져드는 고양이상입니다!",
        "rabbit": "상큼하고 발랄한 매력의 소유자! 보고만 있어도 기분이 좋아지는 토끼상이시네요.",
        "dinosaur": "무심한 듯 시크한 매력! 강한 카리스마와 반전 매력을 동시에 가진 공룡상이십니다.",
        "bear": "포근하고 든든한 느낌을 주는 당신! 편안한 인상으로 사람들에게 신뢰를 주는 곰상이시네요."
    };
    return explains[className] || "독특한 매력을 가진 동물을 닮으셨네요!";
}

// Initial load
init();
