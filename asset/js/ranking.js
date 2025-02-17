// top10_t.json 파일에서 데이터를 불러옵니다.
fetch('top10_t.json')
.then(response => response.json())
.then(data => {
  const rankingContainer = document.getElementById('ranking');
  data.forEach((entry, index) => {
    // 순위별 랭킹 박스 생성
    const entryDiv = document.createElement('div');
    entryDiv.className = 'ranking-entry';
    
    // 순위 제목 (1위, 2위, ...)
    const rankTitle = document.createElement('h2');
    rankTitle.textContent = (index + 1) + '위';
    entryDiv.appendChild(rankTitle);
    
    // 환수 이미지 6개 생성
    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'images';
    entry.combo.forEach(item => {
      const img = document.createElement('img');
      // 이미지 경로는 images 폴더에 ic_숫자.jpg 형태로 되어있습니다.
      img.src = 'images/ic_' + item.ic + '.jpg';
      img.alt = item.name;
      imagesDiv.appendChild(img);
    });
    entryDiv.appendChild(imagesDiv);
    
    // 결속점수 표시
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