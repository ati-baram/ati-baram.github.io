// 현재 선택된 카테고리 (변신 또는 수호)
let currentCategory = 'transformation';

function switchCategory(category, button) {
  currentCategory = category;

  // 버튼 스타일 변경
  document.querySelectorAll('.main-tab-button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // 해당 카테고리에 맞는 데이터 로드
  loadRankings();
}

function loadRankings() {
  let fileIncluded, fileExcluded;

  if (currentCategory === 'transformation') {
    fileIncluded = 'top10_t.json';
    fileExcluded = 'top10_t_legend.json';
  } else {
    fileIncluded = 'top10_p.json';
    fileExcluded = 'top10_p_legend.json';
  }

  loadRankingData('asset/json/' + fileIncluded, 'ranking-included');
  loadRankingData('asset/json/' + fileExcluded, 'ranking-excluded');
}

function loadRankingData(file, containerId) {
  fetch(file)
    .then(response => response.json())
    .then(data => {
      const rankingContainer = document.getElementById(containerId);
      rankingContainer.innerHTML = ''; // 기존 내용 초기화

      data.forEach((entry, index) => {
        // 각 랭킹 항목의 컨테이너
        const entryDiv = document.createElement('div');
        entryDiv.className = 'ranking-entry';

        // 순위 표시
        const h2 = document.createElement('h2');
        h2.textContent = (index + 1) + '위';
        entryDiv.appendChild(h2);

        // 6개의 환수 이미지를 포함하는 div
        const imagesDiv = document.createElement('div');
        imagesDiv.className = 'images';
        let factionCount = {}; // 세력 개수 저장

        entry.combo.forEach(item => {
          // 환수 이미지 추가
          const img = document.createElement('img');
          img.src = 'images/ic_' + item.ic + '.jpg';
          img.alt = item.name;
          imagesDiv.appendChild(img);

          // 세력 카운팅
          let faction = item.influence; // 세력 이름 (ex: "고요")
          factionCount[faction] = (factionCount[faction] || 0) + 1;
        });
        entryDiv.appendChild(imagesDiv);

        // 세력 정보 추가
        const factionDiv = document.createElement('div');
        factionDiv.className = 'faction-container';

        Object.entries(factionCount).forEach(([faction, count]) => {
          const factionItem = document.createElement('div');
          factionItem.className = 'faction-item';

          const factionImg = document.createElement('img');
          factionImg.src = 'asset/img/ic_' + faction + '.jpg'; // 세력 이미지 경로
          factionImg.alt = faction;

          const factionText = document.createElement('span');
          factionText.textContent = "x" + count;

          factionItem.appendChild(factionImg);
          factionItem.appendChild(factionText);
          factionDiv.appendChild(factionItem);
        });

        entryDiv.appendChild(factionDiv);

        // 점수 표시
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score';
        scoreDiv.textContent = '점수 : ' + entry.score;
        entryDiv.appendChild(scoreDiv);

        rankingContainer.appendChild(entryDiv);
      });
    })
    .catch(error => {
      console.error('JSON 데이터를 불러오는 도중 오류 발생:', error);
    });
}

// 페이지 로드 시 기본 데이터 (변신) 불러오기
loadRankings();
