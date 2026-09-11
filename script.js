// 1. 뽑기 대상 인물 8명 (동일한 확률 적용)
const peoplePool = [
    "이승제", "심은섭", "정성호", "김승민", 
    "김예준", "조범준", "김재혁", "최수인"
];

// 2. 공용 칭호 풀 (등급별 확률 설정, Total: 100%)
const titlePool = [
    // [신화] 2.0%
    { title: "모든 남자들의 주인", grade: "신화", prob: 0.25, desc: "손가락 하나로 모든 남자를 부리는", emoji: "👑", class: "grade-mythic", color: "#ff0055", tagClass: "grade-mythic-tag" },
    { title: "일단 박고보는", grade: "신화", prob: 0.25, desc: "생명체면 일단 박고 보는", emoji: "💥", class: "grade-mythic", color: "#ff0055", tagClass: "grade-mythic-tag" },

    // [전설] 5.0%
    { title: "게이", grade: "전설", prob: 0.9, desc: "보이는 남자를 전부다 매혹하는 존재  0%.", emoji: "👨‍❤️‍👨", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "레즈", grade: "전설", prob: 0.9, desc: "보이는 여자를 전부다 매혹하는 존재", emoji: "👩‍❤️‍👩", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "퍼리", grade: "전설", prob: 0.8, desc: "동물만보면 지랄발광을 할수있는 존재", emoji: "🐾", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "로리", grade: "전설", prob: 0.9, desc: "등장만 해도 위험함", emoji: "🚨", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },

    // [영웅] 12.0%
    { title: "발가락 성애자", grade: "영웅", prob: 3.0, desc: "발가락을 미친듯이 좋아함", emoji: "🦶", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "사회 부적응자", grade: "영웅", prob: 3.0, desc: "그냥 사부자 병신임", emoji: "🚷", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "정병멘헤라", grade: "영웅", prob: 3.0, desc: "정병 병신임", emoji: "💊", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "개 사이코", grade: "영웅", prob: 3.0, desc: "그냥 미친놈임", emoji: "🤡", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },

    // [희귀] 32.5%
    { title: "승민병 걸린", grade: "희귀", prob: 7.0, desc: "말귀를 다르게 쳐 알아먹음", emoji: "🙉", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "범준병 걸린", grade: "희귀", prob: 7.0, desc: "이상한소리를 내고있음", emoji: "🔊", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "안아줘병 걸린", grade: "희귀", prob: 7.0, desc: "ㅇㅇㅇ한테 안아달라고 함", emoji: "🫂", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "범죄 지망생", grade: "희귀", prob: 7.0, desc: "그냥 미친 사이코임", emoji: "🗡️", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "은섭병 걸린", grade: "희귀", prob: 6.0, desc: "시간집착 미친 변태임", emoji: "⏱️", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },

    // [일반] 48.5%
    { title: "정신이상의", grade: "일반", prob: 10.0, desc: "정신이 이상함", emoji: "🤯", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "평범한", grade: "일반", prob: 10.0, desc: "그냥 평범함", emoji: "😐", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "지하철의", grade: "일반", prob: 10.0, desc: "지하철 타는중임", emoji: "🚇", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "비정상적인", grade: "일반", prob: 10.0, desc: "그냥 병신임", emoji: "🌀", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "노래방에서의 ", grade: "일반", prob: 10.0, desc: "노래방에서 drowning 부르고 있는중", emoji: "🎤", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" }
];

const gradeRank = { "신화": 5, "전설": 4, "영웅": 3, "희귀": 2, "일반": 1 };

let totalDrawCount = 0;
let isAnimating = false;
let bestDraw = null;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 독립 뽑기 로직 (칭호 확률 추첨 + 인물 무작위 선택)
function getRandomDraw() {
    // 1. 칭호 추첨
    const rand = Math.random() * 100;
    let cumulativeProb = 0;
    let selectedTitle = titlePool[titlePool.length - 1];

    for (const item of titlePool) {
        cumulativeProb += item.prob;
        if (rand <= cumulativeProb) {
            selectedTitle = item;
            break;
        }
    }

    // 2. 인물 추첨 (인원 8명 중 무작위 1명)
    const randomPerson = peoplePool[Math.floor(Math.random() * peoplePool.length)];

    // 3. 데이터 결합
    return {
        ...selectedTitle,
        personName: randomPerson,
        fullName: `${selectedTitle.title} ${randomPerson}`
    };
}

function setButtonsDisabled(disabled) {
    document.getElementById('drawBtn').disabled = disabled;
    document.getElementById('draw10Btn').disabled = disabled;
}

function checkAndUpdateBest(newItem) {
    if (!bestDraw || gradeRank[newItem.grade] > gradeRank[bestDraw.grade]) {
        bestDraw = newItem;
        renderBestDraw();
    }
}

function renderBestDraw() {
    const display = document.getElementById('bestCardDisplay');
    display.innerHTML = `
        <div class="best-card-content">
            <div class="best-card-emoji">${bestDraw.emoji}</div>
            <div class="best-card-info">
                <span class="tag ${bestDraw.tagClass}">${bestDraw.grade}</span>
                <h4>${bestDraw.fullName}</h4>
            </div>
        </div>
    `;
    display.className = `best-card-display ${bestDraw.class}`;
}

async function drawSingle() {
    if (isAnimating) return;
    isAnimating = true;
    setButtonsDisabled(true);

    const card = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const drawText = document.getElementById('drawText');
    const cardIcon = document.getElementById('cardIcon');

    card.classList.remove('flipped');
    await sleep(300);

    drawText.innerText = "소환 중...";
    cardIcon.innerText = "🔮";
    card.classList.add('shake');
    cardFront.classList.add('glowing');

    await sleep(1000);

    const result = getRandomDraw();
    updateCardUI(result);

    card.classList.remove('shake');
    cardFront.classList.remove('glowing');

    card.classList.add('flipped');

    totalDrawCount++;
    document.getElementById('totalCount').innerText = totalDrawCount;
    addHistory(result);
    checkAndUpdateBest(result);

    drawText.innerText = "Click Draw!";
    cardIcon.innerText = "❓";

    isAnimating = false;
    setButtonsDisabled(false);
}

function updateCardUI(item) {
    const cardBack = document.getElementById('cardBack');
    const gradeBadge = document.getElementById('cardGrade');

    cardBack.className = 'card-back ' + item.class;
    
    gradeBadge.innerText = item.grade;
    gradeBadge.style.backgroundColor = item.color;
    gradeBadge.style.color = '#fff';

    document.getElementById('cardEmoji').innerText = item.emoji;
    document.getElementById('cardTitle').innerText = item.fullName;
    document.getElementById('cardDesc').innerText = item.desc;
}

function addHistory(item) {
    const historyList = document.getElementById('historyList');
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.fullName}</span> <strong style="color:${item.color}">[${item.grade}]</strong>`;
    
    historyList.insertBefore(li, historyList.firstChild);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

async function drawTen() {
    if (isAnimating) return;
    isAnimating = true;
    setButtonsDisabled(true);

    const modalGrid = document.getElementById('modalGrid');
    const closeBtn = document.getElementById('closeBtn');
    modalGrid.innerHTML = '';
    closeBtn.disabled = true;

    document.getElementById('modal').style.display = 'flex';

    for (let i = 0; i < 10; i++) {
        const result = getRandomDraw();
        totalDrawCount++;
        addHistory(result);
        checkAndUpdateBest(result);

        const itemDiv = document.createElement('div');
        itemDiv.className = `modal-item ${result.class}`;
        itemDiv.innerHTML = `
            <div style="font-size: 1.5rem">${result.emoji}</div>
            <div style="color:${result.color}; font-weight:bold; font-size:0.7rem;">[${result.grade}]</div>
            <div style="font-size:0.75rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${result.fullName}</div>
        `;

        modalGrid.appendChild(itemDiv);
        document.getElementById('totalCount').innerText = totalDrawCount;

        await sleep(150);
    }

    closeBtn.disabled = false;
    isAnimating = false;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    setButtonsDisabled(false);
}
