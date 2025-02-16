
    let familiars = [];           // 전체 환수 데이터
    let selectedFamiliars = [];   // 사용자가 선택한 환수 (최대 40개)

    // JSON 데이터 로드
    fetch('linked_data.json')
      .then(response => response.json())
      .then(data => {
          familiars = data;
          console.log("데이터 로드 완료:", familiars);
          displayFamiliars("수호");  // 기본값은 수호 환수
      })
      .catch(error => {
          console.error("데이터 로드 실패:", error);
          alert("환수 데이터를 로드할 수 없습니다.");
      });

    // 환수 목록 표시
    function displayFamiliars(type) {
      const familiarList = document.getElementById('familiar-list');
      familiarList.innerHTML = '';
      familiars.filter(f => f.type === type).forEach(familiar => {
          let img = document.createElement('img');
          img.src = `images/ic_${familiar.ic}.jpg`;
          img.alt = familiar.name;
          img.title = `${familiar.name} (${familiar.grade})`;
          img.classList.add('familiar-image');
          img.addEventListener('click', () => selectFamiliar(familiar, img));
          familiarList.appendChild(img);
      });
    }

    // 환수 선택 기능
    function selectFamiliar(familiar, img) {
      if (selectedFamiliars.includes(familiar)) {
          selectedFamiliars = selectedFamiliars.filter(f => f !== familiar);
          img.classList.remove('selected');
      } else {
          if (selectedFamiliars.length < 40) {
              selectedFamiliars.push(familiar);
              img.classList.add('selected');
          } else {
              alert("최대 40개의 환수만 선택할 수 있습니다!");
          }
      }
      document.getElementById('selected-count').innerText = `선택된 환수: ${selectedFamiliars.length}/40`;
    }

    // 버튼 이벤트 등록
    document.getElementById('guardian-button').addEventListener('click', () => displayFamiliars("수호"));
    document.getElementById('transform-button').addEventListener('click', () => displayFamiliars("변신"));
    document.getElementById('calculate-button').addEventListener('click', () => {
      updateBondScore();
    });

    // =======================
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

    // =======================
    // 점수 계산 관련 함수들
    // =======================

    // 1. 기본 점수 계산: 
    // 공식 → 피해저항관통 + 피해저항 + (대인피해% * 10) + (대인방어% * 10)
    function calculateBaseScore(familiar) {
      const opt = familiar.option || {};
      const pen = Number(opt["피해저항관통"] || 0);
      const res = Number(opt["피해저항"] || 0);
      const dam = Number(opt["대인피해%"] || 0);
      const def = Number(opt["대인방어%"] || 0);
      return pen + res + (dam * 10) + (def * 10);
    }

    // 2. 수호 등급 세트 효과
    function calculateGuardianGradeSetBonus(famils) {
      const guardians = famils.filter(f => f.type === "수호");
      const legendCount = guardians.filter(f => f.grade === "전설").length;
      // 불멸 판별: grade가 "불멸" 또는 "멸"이면
      const immortalCount = guardians.filter(f => f.grade === "불멸" || f.grade === "멸").length;
      let bonus = { pen: 0, res: 0, dam: 0, def: 0 };
      if (legendCount >= 6) { bonus.pen += 100; bonus.res += 100; }
      else if (legendCount >= 4) { bonus.pen += 100; }
      if (immortalCount >= 6) { bonus.pen += 200; bonus.res += 150; bonus.dam += 20; bonus.def += 20; }
      else if (immortalCount >= 5) { bonus.pen += 200; bonus.res += 150; bonus.dam += 20; }
      else if (immortalCount >= 3) { bonus.pen += 200; bonus.res += 150; }
      else if (immortalCount >= 2) { bonus.pen += 200; }
      return bonus;
    }

    // 3. 변신 등급 세트 효과
    function calculateTransformationGradeSetBonus(famils) {
      const trans = famils.filter(f => f.type === "변신");
      const legendCount = trans.filter(f => f.grade === "전설").length;
      // 불멸 판별: grade가 "불멸" 또는 "멸"이면
      const immortalCount = trans.filter(f => f.grade === "불멸" || f.grade === "멸").length;
      let bonus = { pen: 0, res: 0, dam: 0, def: 0 };
      if (legendCount >= 6) { bonus.pen += 100; bonus.res += 100; }
      else if (legendCount >= 4) { bonus.pen += 100; }
      if (immortalCount >= 6) { bonus.pen += 150; bonus.res += 150; bonus.dam += 20; bonus.def += 20; }
      else if (immortalCount >= 5) { bonus.pen += 150; bonus.res += 150; bonus.dam += 20; }
      else if (immortalCount >= 3) { bonus.pen += 150; bonus.res += 150; }
      else if (immortalCount >= 2) { bonus.pen += 150; }
      return bonus;
    }

    // 4. 수호 세력세트 효과
    function calculateGuardianInfluenceSetBonus(famils) {
      const guardians = famils.filter(f => f.type === "수호");
      let bonus = { pen: 0, res: 0 };
      ["결의", "고요", "의지"].forEach(infl => {
          const count = guardians.filter(f => f.influence === infl).length;
          if (count >= 2) {
              if (count === 2) bonus.res += 50;
              else if (count === 3) bonus.res += 80;
              else if (count === 4) bonus.res += 130;
              else if (count === 5) bonus.res += 150;
              else if (count >= 6) bonus.res += 200;
          }
      });
      ["침착", "냉정", "활력"].forEach(infl => {
          const count = guardians.filter(f => f.influence === infl).length;
          if (count >= 2) {
              if (count === 2) bonus.pen += 30;
              else if (count === 3) bonus.pen += 50;
              else if (count === 4) bonus.pen += 80;
              else if (count === 5) bonus.pen += 90;
              else if (count >= 6) bonus.pen += 130;
          }
      });
      return bonus;
    }

    // 5. 변신 세력세트 효과
    function calculateTransformationInfluenceSetBonus(famils) {
      const trans = famils.filter(f => f.type === "변신");
      let bonus = { pen: 0, res: 0 };
      ["활력", "침착", "의지"].forEach(infl => {
          const count = trans.filter(f => f.influence === infl).length;
          if (count >= 2) {
              if (count === 2) bonus.res += 50;
              else if (count === 3) bonus.res += 80;
              else if (count === 4) bonus.res += 130;
              else if (count === 5) bonus.res += 150;
              else if (count >= 6) bonus.res += 200;
          }
      });
      ["결의", "고요", "냉정"].forEach(infl => {
          const count = trans.filter(f => f.influence === infl).length;
          if (count >= 2) {
              if (count === 2) bonus.pen += 30;
              else if (count === 3) bonus.pen += 50;
              else if (count === 4) bonus.pen += 80;
              else if (count === 5) bonus.pen += 90;
              else if (count >= 6) bonus.pen += 130;
          }
      });
      return bonus;
    }

    // 6. 총 결속점수 계산 (입력 배열에 대해)
    // 수정: grade bonus의 대인피해%(dam)와 대인방어%(def) 보너스를 *10 해서 합산
    function calculateTotalBondScoreForCombination(combo) {
      let baseScore = 0;
      combo.forEach(f => { baseScore += calculateBaseScore(f); });
      const guardianGradeBonus = calculateGuardianGradeSetBonus(combo);
      const guardianInfluenceBonus = calculateGuardianInfluenceSetBonus(combo);
      const transformationGradeBonus = calculateTransformationGradeSetBonus(combo);
      const transformationInfluenceBonus = calculateTransformationInfluenceSetBonus(combo);
      const bonusPenRes = guardianGradeBonus.pen + guardianGradeBonus.res +
                          guardianInfluenceBonus.pen + guardianInfluenceBonus.res +
                          transformationGradeBonus.pen + transformationGradeBonus.res +
                          transformationInfluenceBonus.pen + transformationInfluenceBonus.res;
      const bonusDamDef = (guardianGradeBonus.dam + transformationGradeBonus.dam) * 10 +
                          (guardianGradeBonus.def + transformationGradeBonus.def) * 10;
      return baseScore + bonusPenRes + bonusDamDef;
    }

    // =======================
    // 결과 업데이트: 선택된 환수가 6개 이상이면 6개 조합 중 최고 결속 조합 결과 표시
    function updateBondScore() {
      if (selectedFamiliars.length < 6) {
          alert("최소 6개의 환수를 선택해야 계산할 수 있습니다.");
          return;
      }
      let bestCombo;
      if (selectedFamiliars.length === 6) {
          bestCombo = selectedFamiliars;
      } else {
          const combos = getCombinations(selectedFamiliars, 6);
          let bestScore = -Infinity;
          for (let combo of combos) {
              let score = calculateTotalBondScoreForCombination(combo);
              if (score > bestScore) {
                  bestScore = score;
                  bestCombo = combo;
              }
          }
      }
      
      const totalScore = calculateTotalBondScoreForCombination(bestCombo);
      
      // 기본 스탯 합산
      let basePen = 0, baseRes = 0, baseDam = 0, baseDef = 0;
      bestCombo.forEach(f => {
          const opt = f.option || {};
          basePen += Number(opt["피해저항관통"] || 0);
          baseRes += Number(opt["피해저항"] || 0);
          baseDam += Number(opt["대인피해%"] || 0);
          baseDef += Number(opt["대인방어%"] || 0);
      });
      
      const guardianGradeBonus = calculateGuardianGradeSetBonus(bestCombo);
      const transformationGradeBonus = calculateTransformationGradeSetBonus(bestCombo);
      const guardianInfluenceBonus = calculateGuardianInfluenceSetBonus(bestCombo);
      const transformationInfluenceBonus = calculateTransformationInfluenceSetBonus(bestCombo);
      
      const bonusPen = guardianGradeBonus.pen + transformationGradeBonus.pen + guardianInfluenceBonus.pen + transformationInfluenceBonus.pen;
      const bonusRes = guardianGradeBonus.res + transformationGradeBonus.res + guardianInfluenceBonus.res + transformationInfluenceBonus.res;
      const bonusDam = guardianGradeBonus.dam + transformationGradeBonus.dam;
      const bonusDef = guardianGradeBonus.def + transformationGradeBonus.def;
      
      const finalPen = basePen + bonusPen;
      const finalRes = baseRes + bonusRes;
      const finalDam = baseDam + bonusDam;
      const finalDef = baseDef + bonusDef;
      
      let gradeCounts = {};
      bestCombo.forEach(f => {
          gradeCounts[f.grade] = (gradeCounts[f.grade] || 0) + 1;
      });
      let gradeStr = "";
      for (const [grade, count] of Object.entries(gradeCounts)) {
          gradeStr += `${count}${grade} `;
      }
      
      let influenceCounts = {};
      bestCombo.forEach(f => {
          influenceCounts[f.influence] = (influenceCounts[f.influence] || 0) + 1;
      });
      let influenceStr = "";
      for (const [infl, count] of Object.entries(influenceCounts)) {
          influenceStr += `${count}${infl} `;
      }
      
      const resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = `
        <div style="font-weight: bold;">환산점수 : ${totalScore}</div>
        <div id="selected-images" style="display: flex; gap: 5px; margin: 10px 0;"></div>
        <div>등급 : ${gradeStr.trim()}</div>
        <div>세력 : ${influenceStr.trim()}</div>
        <div>피해저항관통 : ${finalPen}</div>
        <div>피해저항 : ${finalRes}</div>
        <div>대인피해% : ${finalDam}</div>
        <div>대인방어% : ${finalDef}</div>
      `;
      
      const selectedImagesDiv = document.getElementById('selected-images');
      selectedImagesDiv.innerHTML = "";
      bestCombo.forEach(f => {
          let img = document.createElement('img');
          img.src = `images/ic_${f.ic}.jpg`;
          img.alt = f.name;
          img.style.width = "60px";
          img.style.height = "60px";
          selectedImagesDiv.appendChild(img);
      });
    }
  
document.getElementById('reset-button').addEventListener('click', () => {
    // 선택된 환수 배열 초기화
    selectedFamiliars = [];
    
    // 모든 환수 이미지에서 선택 표시 제거
    const images = document.querySelectorAll('.familiar-image');
    images.forEach(img => {
        img.classList.remove('selected');
    });
    
    // 선택 개수 업데이트
    document.getElementById('selected-count').innerText = `선택된 환수: 0/40`;
    });