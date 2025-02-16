// 환수 경험치 계산
const lowGradeRatio = 10;
const midGradeRatio = 100;
const highGradeRatio = 1000;
const midGradePackageSize = 50;
const midGradePackagePrice = 19000;

let experienceData = {};

fetch('data.json')
.then(response => response.json())
.then(data => {
    experienceData = data;  // JSON 데이터를 가져와 저장
})
.catch(error => {
    console.error('데이터 로드 실패:', error);
});

document.getElementById('calculate').addEventListener('click', () => {
const grade = document.getElementById('grade-select').value;
const currentLevel = parseInt(document.getElementById('current-level').value);
const targetLevel = parseInt(document.getElementById('target-level').value);

const currentLowSoul = parseInt(document.getElementById('current-low-soul').value);
const currentMidSoul = parseInt(document.getElementById('current-mid-soul').value);
const currentHighSoul = parseInt(document.getElementById('current-high-soul').value);

if (currentLevel >= targetLevel || currentLevel < 0 || targetLevel > 25) {
    alert('올바른 레벨 범위를 입력하세요!');
    return;
}

// 필요한 총 경험치 계산
let totalExp = 0;
for (let i = currentLevel; i < targetLevel; i++) {
    totalExp += experienceData[grade][i].experienceRequired;
}

// 필요한 환수혼 개수 계산
const lowGradeSouls = Math.ceil(totalExp / lowGradeRatio);
const midGradeSouls = Math.ceil(totalExp / midGradeRatio);
const highGradeSouls = Math.ceil(totalExp / highGradeRatio);
const midGradePackages = Math.ceil(midGradeSouls / midGradePackageSize);
const midGradeTotalPrice = midGradePackages * midGradePackagePrice;

// 부족한 환수혼 계산
const neededLowSoul = Math.max(0, lowGradeSouls - currentLowSoul);
const neededMidSoul = Math.max(0, midGradeSouls - currentMidSoul);
const neededHighSoul = Math.max(0, highGradeSouls - currentHighSoul);

const additionalPackages = Math.ceil(neededMidSoul / midGradePackageSize);
const additionalCost = additionalPackages * midGradePackagePrice;

// 필요한 사냥 시간 계산 (24시간당 300개 획득)
const huntingHoursPerDay = 24;
const soulsPerDay = 300;

// 필요한 시간
const neededHuntingTime = Math.ceil((neededLowSoul / soulsPerDay) * huntingHoursPerDay);


// 시간 -> X일 Y시간으로 변환
const days = Math.floor(neededHuntingTime / 24);
const hours = neededHuntingTime % 24;

// 몇개월인지 계산 (한 달은 약 30일 기준)
const months = Math.floor(days / 30);
const remainingDays = (neededHuntingTime / (24 * 30.44)).toFixed(2);

// 결과 표시
document.getElementById('total-exp').textContent = totalExp.toLocaleString();
document.getElementById('needed-low-soul').textContent = neededLowSoul.toLocaleString();
document.getElementById('needed-mid-soul').textContent = neededMidSoul.toLocaleString();
document.getElementById('needed-high-soul').textContent = neededHighSoul.toLocaleString();
document.getElementById('mid-grade-packages').textContent = additionalPackages.toLocaleString();
document.getElementById('mid-grade-price').textContent = additionalCost.toLocaleString();

// 하계 2층 사냥 시간 추가 (중복 방지)
let huntingTimeElement = document.getElementById('hunting-time-element');
if (!huntingTimeElement) {
    huntingTimeElement = document.createElement('p');
    huntingTimeElement.id = 'hunting-time-element';
    huntingTimeElement.innerHTML = `하계 2층으로 파밍 시, 소모시간 : <span id="hunting-time"> ${days}일 ${hours}시간 (약 : ${remainingDays}개월)</span>`;
    document.getElementById('result').appendChild(huntingTimeElement);
} else {
    document.getElementById('hunting-time').textContent = `${days}일 ${hours}시간 (약 : ${remainingDays}개월)`;
}

// 결과 섹션 페이드 인 효과
const resultSection = document.getElementById('result');
resultSection.classList.add('show');  // 페이드 인 클래스 추가
});

// 환수 성장 경험치표
let legendaryData = [];
let immortalData = [];
let currentType = 'legendary'; 

async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();

    legendaryData = data.legendary;
    immortalData = data.immortal;

    // 기본적으로 전설 환수 데이터를 표시
    currentType = 'legendary';
    updateExperienceTable(legendaryData);
}

document.getElementById('btn-legendary').addEventListener('click', () => {
    currentType = 'legendary';
    updateExperienceTable(legendaryData);
});

document.getElementById('btn-immortal').addEventListener('click', () => {
    currentType = 'immortal';
    updateExperienceTable(immortalData);
});

function updateExperienceTable(experienceData) {
    const experienceArrayContainer = document.getElementById('experience-array-container');
    experienceArrayContainer.innerHTML = '';

    const firstHalf = experienceData.slice(0, 13);
    const secondHalf = experienceData.slice(13, 25);

    let tableHtml = `<table class="experience-table">
    <thead>
        <tr class="${currentType === 'legendary' ? 'legendary-header' : 'immortal-header'}">
        <th>레벨</th>
        <th>필요 경험치</th>
        <th>레벨</th>
        <th>필요 경험치</th>
        </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < 13; i++) {
    tableHtml += `<tr>
        <td>${firstHalf[i].level}</td>
        <td>${firstHalf[i].experienceRequired.toLocaleString()}</td>
        <td>${secondHalf[i]?.level || ''}</td>
        <td>${secondHalf[i]?.experienceRequired?.toLocaleString() || ''}</td>
    </tr>`;
    }

    tableHtml += '</tbody></table>';
    experienceArrayContainer.innerHTML = tableHtml;
}

loadData();



// 환수 데이터 불러오기
let familiars = [];
let currentFamiliar = null;
let currentLevel = 0;

// JSON 파일을 불러오는 함수
fetch('familiar_data.json')
    .then(response => response.json())
    .then(data => {
        familiars = data;
        displayFamiliarImages("수호"); // 초기값은 '수호' 타입
    })
    .catch(error => {
        console.error("Error loading JSON data:", error);
    });

// 결속 효과 계산 공식 (옵션별로 다른 방식 적용)
function calculateBoundEffect(option, value, level) {
    let percentage = 0;

    if (["대인방어", "대인피해", "위력", "체력증가", "마력증가"].includes(option)) {
        // 대인방어, 대인피해, 위력
        percentage = level < 9 ? 0.05 : level < 14 ? 0.15 : 0.20;
    } else if (option === "이동속도") {
        // 이동속도
        percentage = level < 9 ? 0.05 : level < 14 ? 0.05 : 0.10;
    } else if (["체력증가%", "마력증가%"].includes(option)) {
        // 체력증가%, 마력증가%
        percentage = level < 14 ? 0 : 0.052; // 0~13까지는 0%, 14~25는 5.2%
    } else if (["체력회복향상", "마력회복향상", "경험치 획득증가", "전리품 획득증가"].includes(option)) {
        // 체력회복향상, 마력회복향상, 경험치 획득증가, 전리품 획득증가
        if (level < 9) {
            percentage = 0.02; // 0~8 레벨은 2%
        } else if (level < 14) {
            percentage = 0.045; // 9~13 레벨은 4.5%
        } else {
            // 14~25 레벨은 값 / 14.2 후 내림 처리
            return Math.floor(value / 14.2);
        }
    } 
    else {
        // 기본 비율 적용
        percentage = level < 9 ? 0.05 : level < 14 ? 0.15 : 0.25;
    }
    return Math.floor(value * percentage); // 내림 처리
}



// 환수 이미지를 화면에 표시
function displayFamiliarImages(type) {
    const familiarImagesContainer = document.getElementById('familiar-images');
    familiarImagesContainer.innerHTML = '';  // 기존 이미지 삭제

    const filteredFamiliars = familiars.filter(familiar => familiar.type === type);  // 타입에 맞는 데이터만 필터링

    filteredFamiliars.forEach(familiar => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/ic_${familiar.ic}.jpg`;  // ic 값을 사용하여 이미지 경로 설정
        imgElement.alt = familiar.name;
        imgElement.classList.add('familiar-image');
        imgElement.addEventListener('click', () => selectFamiliar(familiar));
        familiarImagesContainer.appendChild(imgElement);
    });

    // 스타일 초기화 및 이미지 간격 재설정
    familiarImagesContainer.style.display = 'flex';
    familiarImagesContainer.style.flexWrap = 'wrap';
    familiarImagesContainer.style.gap = '10px';  // 이미지 간격 설정
}

// 환수 선택 시 해당 데이터 표시
function selectFamiliar(familiar) {
    currentFamiliar = familiar;
    currentLevel = 0;

    // 환수 정보 업데이트 (기존 코드 그대로 유지)
    const influenceImageSrc = `asset/img/ic_${familiar.influence}.jpg`;
    const gradeStyle = familiar.grade === "불멸" 
        ? 'color: white; background: #fb8802; padding: 2px 5px; border-radius: 3px;' 
        : familiar.grade === "전설" 
        ? 'color: white; background: #b62b20; padding: 2px 5px; border-radius: 3px;' 
        : 'color: black;';

    const familiarNameElement = document.getElementById('familiar-name');
    familiarNameElement.innerHTML = `
        <div style="display: flex; align-items: center;">
            <img id="familiar-image" src="images/ic_${familiar.ic}.jpg" alt="${familiar.name}" style="width: 40px; height: 40px; margin-right: 10px; vertical-align: middle;">
            <span style="font-weight: bold; font-size: 25px;">${familiar.name}</span>
            <span style="margin-left: 10px; font-size: 14px; font-weight: bold; ${gradeStyle}">${familiar.grade}</span>
            <img src="${influenceImageSrc}" alt="${familiar.influence}" style="width: 30px; height: 30px; margin-left: 15px; vertical-align: middle;">
            <span style="margin-left: 5px; font-size: 14px; font-weight: bold;">${familiar.influence}</span>
            <button id="close-btn" style="margin-left: auto; background: #f00; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">닫기</button>
        </div>
    `;

    // 환수 정보 영역 표시
    document.getElementById('selected-familiar').style.display = 'block';

    // 환수 이미지 영역 숨기기
    document.getElementById('familiar-images').style.display = 'none';

    // 능력치 및 결속 효과 업데이트
    updateLevelDisplay();
    updateStats();

    // 닫기 버튼에 이벤트 리스너 추가
    document.getElementById('close-btn').addEventListener('click', () => {
        // 환수 정보 숨기기
        document.getElementById('selected-familiar').style.display = 'none';

        // 환수 이미지 영역 다시 표시하고 이미지 간격 유지
        document.getElementById('familiar-images').style.display = 'block';
        displayFamiliarImages(currentFamiliar.type);  // 다시 이미지를 일정 간격으로 표시
    });
}



// 레벨 표시 업데이트
function updateLevelDisplay() {
    document.getElementById('level-display').textContent = currentLevel;
    document.getElementById('level-input').value = currentLevel;
}

// 능력치 업데이트
function updateStats() {
    const statsTableBody = document.getElementById('stats-table').querySelector('tbody');
    const boundTableBody = document.getElementById('bound-table').querySelector('tbody');
    statsTableBody.innerHTML = '';  // 등록 효과 초기화
    boundTableBody.innerHTML = '';  // 결속 효과 초기화

    Object.keys(currentFamiliar.option).forEach(option => {
        let baseValue = currentFamiliar.option[option][currentLevel]; // 등록 효과 값
        let boundValue = calculateBoundEffect(option, baseValue, currentLevel); // 결속 효과 값

        // 등록효과 테이블에는 모든 옵션을 추가
        let row = document.createElement('tr');
        let optionCell = document.createElement('td');
        let valueCell = document.createElement('td');
        optionCell.textContent = option;
        valueCell.textContent = baseValue;
        row.appendChild(optionCell);
        row.appendChild(valueCell);
        statsTableBody.appendChild(row);

        // 결속효과가 0이 아닌 경우에만 결속효과 테이블에 추가
        if (boundValue > 0) {
            let boundRow = document.createElement('tr');
            let boundOptionCell = document.createElement('td');
            let boundValueCell = document.createElement('td');
            boundOptionCell.textContent = option;
            boundValueCell.textContent = boundValue;
            boundRow.appendChild(boundOptionCell);
            boundRow.appendChild(boundValueCell);
            boundTableBody.appendChild(boundRow);
        }
    });
}




// 레벨 업 / 다운 버튼
document.getElementById('decrease-btn').addEventListener('click', () => {
    if (currentLevel > 0) {
        currentLevel--;
        updateLevelDisplay();
        updateStats();
        updateStats();  // 레벨 변경 시 능력치 및 결속 효과 업데이트
    }
});

document.getElementById('increase-btn').addEventListener('click', () => {
    if (currentLevel < 25) {
        currentLevel++;
        updateLevelDisplay();
        updateStats();
        updateStats();  // 레벨 변경 시 능력치 및 결속 효과 업데이트
    }
});

// 레벨 입력 필드 이벤트
document.getElementById('level-input').addEventListener('input', (e) => {
    let inputLevel = parseInt(e.target.value);
    if (inputLevel >= 0 && inputLevel <= 25) {
        currentLevel = inputLevel;
        updateLevelDisplay();
        updateStats();
        updateStats();  // 레벨 변경 시 능력치 및 결속 효과 업데이트
    }
});


// 버튼 클릭 시 타입에 맞는 환수 데이터 표시
document.getElementById('btn-suhou').addEventListener('click', () => {
    displayFamiliarImages("수호");
});

document.getElementById('btn-tapsung').addEventListener('click', () => {
    displayFamiliarImages("탑승");
});

document.getElementById('btn-byeonshin').addEventListener('click', () => {
    displayFamiliarImages("변신");
});



// 버튼 클릭 시 색상을 변경하는 함수
function setActiveButton(buttonId) {
    // 모든 버튼에서 active-button 클래스를 제거
    const buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(button => {
        button.classList.remove('active-button');
    });

    // 클릭한 버튼에 active-button 클래스를 추가
    const button = document.getElementById(buttonId);
    button.classList.add('active-button');
}

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('btn-suhou').addEventListener('click', () => {
    setActiveButton('btn-suhou');
    displayFamiliarImages("수호");
});

document.getElementById('btn-tapsung').addEventListener('click', () => {
    setActiveButton('btn-tapsung');
    displayFamiliarImages("탑승");
});

document.getElementById('btn-byeonshin').addEventListener('click', () => {
    setActiveButton('btn-byeonshin');
    displayFamiliarImages("변신");
});
