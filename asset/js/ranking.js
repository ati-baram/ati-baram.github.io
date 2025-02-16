let familiars = [];
let includeImmortal = true; // 기본값: 불멸 포함

// JSON 데이터 로드
fetch('linked_data.json')
    .then(response => response.json())
    .then(data => {
        familiars = data;
        console.log("데이터 로드 완료:", familiars);
        updateRanking("수호");  // 기본값: 수호 랭킹
    })
    .catch(error => {
        console.error("데이터 로드 실패:", error);
        alert("환수 데이터를 로드할 수 없습니다.");
    });

// 버튼 이벤트 등록
document.getElementById('guardian-button').addEventListener('click', () => updateRanking("수호"));
document.getElementById('transform-button').addEventListener('click', () => updateRanking("변신"));
document.getElementById('include-immortal-button').addEventListener('click', () => {
    includeImmortal = true;
    updateRanking(document.querySelector('.mode-button.active').dataset.type);
});
document.getElementById('exclude-immortal-button').addEventListener('click', () => {
    includeImmortal = false;
    updateRanking(document.querySelector('.mode-button.active').dataset.type);
});

// 조합 생성 함수 (길이 k짜리)
function getCombinations(arr, k) {
    let result = [];
    function helper(start, combo) {
        if (combo.length === k) {
            result.push(combo.slice());
            return;
        }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            helper(i + 1, combo);
            combo.pop();
        }
    }
    helper(0, []);
    return result;
}

// 결속 랭킹 업데이트
function updateRanking(type) {
    const selectedFamiliars = familiars.filter(f => 
        f.type === type && (includeImmortal || f.grade === "전설")
    );
    const combos = getCombinations(selectedFamiliars, 6);
    let ranking = [];

    // 모든 6개 조합의 점수를 계산
    combos.forEach(combo => {
        const score = calculateTotalBondScoreForCombination(combo);
        ranking.push({ combo, score });
    });

    // 점수 내림차순 정렬 후 상위 10개 선택
    ranking.sort((a, b) => b.score - a.score);
    ranking = ranking.slice(0, 10);

    // 랭킹 목록 업데이트
    displayRanking(ranking);
}

// 랭킹 표시 함수
function displayRanking(ranking) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';

    ranking.forEach((item, index) => {
        const { combo, score } = item;

        let imagesHtml = combo.map(f => 
            `<img src="images/ic_${f.ic}.jpg" alt="${f.name}" title="${f.name}">`
        ).join('');

        rankingList.innerHTML += `
            <div class="ranking-item">
                <div class="ranking-images">${imagesHtml}</div>
                <div class="ranking-score">결속 점수: ${score}</div>
            </div>
        `;
    });
}

// 등급 보너스 계산
function calculateGradeSetBonus(combo) {
    const isGuardian = combo[0].type === "수호";
    const legendCount = combo.filter(f => f.grade === "전설").length;
    const immortalCount = combo.filter(f => f.grade === "불멸" || f.grade === "멸").length;

    let bonus = { pen: 0, res: 0, dam: 0, def: 0 };

    // 등급 보너스 (수호 & 변신 차이 있음)
    if (isGuardian) {
        if (legendCount >= 6) { bonus.pen += 100; bonus.res += 100; }
        else if (legendCount >= 4) { bonus.pen += 100; }
        
        if (immortalCount >= 6) { bonus.pen += 200; bonus.res += 150; bonus.dam += 20; bonus.def += 20; }
        else if (immortalCount >= 5) { bonus.pen += 200; bonus.res += 150; bonus.dam += 20; }
        else if (immortalCount >= 3) { bonus.pen += 200; bonus.res += 150; }
        else if (immortalCount >= 2) { bonus.pen += 200; }
    } else {
        if (legendCount >= 6) { bonus.pen += 100; bonus.res += 100; }
        else if (legendCount >= 4) { bonus.pen += 100; }

        if (immortalCount >= 6) { bonus.pen += 150; bonus.res += 150; bonus.dam += 20; bonus.def += 20; }
        else if (immortalCount >= 5) { bonus.pen += 150; bonus.res += 150; bonus.dam += 20; }
        else if (immortalCount >= 3) { bonus.pen += 150; bonus.res += 150; }
        else if (immortalCount >= 2) { bonus.pen += 150; }
    }
    return bonus;
}

// 총 결속 점수 계산
function calculateTotalBondScoreForCombination(combo) {
    let baseScore = 0;
    let gradeBonus = calculateGradeSetBonus(combo);

    combo.forEach(f => {
        const opt = f.option || {};
        baseScore += Number(opt["피해저항관통"] || 0);
        baseScore += Number(opt["피해저항"] || 0);
        baseScore += (Number(opt["대인피해%"] || 0) * 10);
        baseScore += (Number(opt["대인방어%"] || 0) * 10);
    });

    return baseScore + gradeBonus.pen + gradeBonus.res + gradeBonus.dam * 10 + gradeBonus.def * 10;
}
