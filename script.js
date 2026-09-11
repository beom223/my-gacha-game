// 1. 뽑기 대상 인물 8명 (동일한 확률 적용)
const peoplePool = [
    "이승제", "심은섭", "정성호", "김승민", 
    "김예준", "조범준", "김재혁", "최수인"
];

// 2. 공용 칭호 풀 (등급별 확률 설정, Total: 100%)
const titlePool = [
    // [신화] 2.0%
    { title: "게이의 대두", grade: "신화", prob: 0.25, desc: "손가락 하나로 차원을 생성하는 전설의 존재.", emoji: "👑", class: "grade-mythic", color: "#ff0055", tagClass: "grade-mythic-tag" },
    { title: "차원지배자", grade: "신화", prob: 0.25, desc: "시공간을 마음대로 주무르는 완벽한 능력자.", emoji: "🌌", class: "grade-mythic", color: "#ff0055", tagClass: "grade-mythic-tag" },

    // [전설] 3.5%
    { title: "게이", grade: "전설", prob: 0.9, desc: "보이는 남자를 전부다 매혹하는 존재.  0%.", emoji: "⚡", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "레즈", grade: "전설", prob: 0.9, desc: "보이는 여자를 전부다 매혹하는 존재.", emoji: "🌟", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "퍼리", grade: "전설", prob: 0.8, desc: "동물만보면 지랄발광을 할수있는 존재.", emoji: "🔨", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },
    { title: "로리", grade: "전설", prob: 0.9, desc: "등장만 해도 위험함", emoji: "🎤", class: "grade-legendary", color: "#ffd700", tagClass: "grade-legendary-tag" },

    // [영웅] 12.0%
    { title: "칼퇴의 지배자", grade: "영웅", prob: 3.0, desc: "17시 59분 59초에 빛의 속도로 사라지는 칼퇴근러.", emoji: "💨", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "카페인 마귀", grade: "영웅", prob: 3.0, desc: "피 대신 핫식스와 아메리카노가 흐르는 자.", emoji: "☕", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "3대 500 마니아", grade: "영웅", prob: 3.0, desc: "키보드도 쇠질하듯 묵직하게 치는 헬스 마니아.", emoji: "💪", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },
    { title: "야근 거부권자", grade: "영웅", prob: 3.0, desc: "'제 법적 근로시간은 여기까지입니다.'", emoji: "🛑", class: "grade-epic", color: "#a855f7", tagClass: "grade-epic-tag" },

    // [희귀] 34.0%
    { title: "노이즈캔슬링 마스터", grade: "희귀", prob: 7.0, desc: "헤드폰을 끼고 세상과의 소통을 완벽히 차단함.", emoji: "🎧", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "주말의 침대유령", grade: "희귀", prob: 7.0, desc: "토요일 아침부터 일요일 밤까지 침대 밖으로 안 나감.", emoji: "🛌", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "디저트 폭격기", grade: "희귀", prob: 7.0, desc: "밥 배와 디저트 배는 완벽히 따로 존재하는 타입.", emoji: "🍰", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "월요병 중증 환자", grade: "희귀", prob: 7.0, desc: "일요일 저녁 8시만 되면 표정이 급격히 어두워짐.", emoji: "🤒", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },
    { title: "영혼 가출자", grade: "희귀", prob: 6.0, desc: "눈은 열려있는데 무의식의 세계를 탐험하는 중.", emoji: "👻", class: "grade-rare", color: "#3b82f6", tagClass: "grade-rare-tag" },

    // [일반] 48.5%
    { title: "단짠단짠 매니아", grade: "일반", prob: 10.0, desc: "오늘 점심 메뉴 정하기에 온 에너지를 소모함.", emoji: "🍕", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "하품하는", grade: "일반", prob: 10.0, desc: "일 시작 5분 만에 졸음과 사투를 벌이는 중.", emoji: "🥱", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "배고픈", grade: "일반", prob: 10.0, desc: "꼬르륵 소리가 가끔 렉스턴 엔진 소리처럼 남.", emoji: "🍔", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "비정상적인", grade: "일반", prob: 10.0, desc: "말을 걸면 3초 뒤에 '어?' 하고 반응함.", emoji: "⏳", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" },
    { title: "잔고 0원의", grade: "일반", prob: 10.0, desc: "월급날 D-20. 텅장의 슬픔을 몸소 체감하는 중.", emoji: "💸", class: "grade-common", color: "#94a3b8", tagClass: "grade-common-tag" }
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