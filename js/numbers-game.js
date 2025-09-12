// Sinhala Numbers Game Main Logic
// This script adds a numbers game modal, using the same UI/UX as the alphabet game.
// It uses pairs of numbers per exercise, with drag-and-drop and typing modes.

(function() {
  // Load number data
  const numberGroups = window.getNumberGroups();
  let stage = 0;
  let userAnswers = [];
  let solvedStages = {};
  let attempts = 0;
  let mode = 'typing'; // or 'dragdrop'

  function showNumbersGameModal() {
    stage = 0;
    userAnswers = [];
    solvedStages = {};
    attempts = 0;
    mode = 'typing';
    renderNumbersStage();
    document.getElementById('numbersGameModal').style.display = 'flex';
  }
  function closeNumbersGameModal() {
    document.getElementById('numbersGameModal').style.display = 'none';
  }

  function renderNumbersStage() {
    const body = document.getElementById('numbersGameBody');
    const group = numberGroups[stage];
    if (!userAnswers[stage]) userAnswers[stage] = group.map(() => '');
    let html = `<h5>Numbers (Group ${stage+1})</h5>`;
    html += `<div class="dragdrop-instructions" style="min-height:24px;margin-bottom:8px;">Type or drag the correct answer to each number.</div>`;
    html += '<form id="numbersForm" class="typing-mode">';
    group.forEach((item, i) => {
      html += `<div class="mb-2 sinhala-number-group-row d-flex align-items-center" style="flex-wrap:nowrap;overflow-x:auto;">
        <span class="sinhala-number-word" style="font-size:1.2rem; font-weight:500;">${item.word}</span>
        <span class="sinhala-number-translit" style="margin-left:8px; color:#888; font-size:1.1rem;">(${item.word_en})</span>
        <input type="text" class="form-control answer-input typing-box" data-idx="${i}" style="width:64px; display:inline-block; margin-left:14px; text-align:center; font-size:1.1rem; border:2px solid #bdbdbd; border-radius:10px; background:#f7f7f7;" maxlength="6" autocomplete="off" value="${userAnswers[stage][i] || ''}" />
      </div>`;
    });
    // Only one set of action buttons per exercise
    html += '<div class="d-flex align-items-center justify-content-center gap-2 mt-2 flex-wrap">';
    html += '<button type="button" class="btn btn-warning btn-sm mb-2" id="testFillNumbersBtn">Test</button>';
    if (stage > 0) html += '<button class="nav-arrow ms-2" id="prevNumbersStageBtn" style="font-size:1.5rem;line-height:1;">&#8592;</button>';
    html += '<button type="button" class="btn btn-primary ms-2" id="checkNumbersBtn">Check My Answer</button>';
    html += `<button type="button" class="btn btn-outline-secondary ms-2" id="toggleNumbersModeBtn">Drag & Drop</button>`;
    if (solvedStages[stage] && stage < numberGroups.length - 1) html += '<button class="nav-arrow ms-2" id="nextNumbersStageBtn" style="font-size:1.5rem;line-height:1;">&#8594;</button>';
    html += '</div>';
    html += '<div id="numbersResult" class="mt-2"></div>';
    html += '</form>';
    // Fix close button event
    setTimeout(() => {
      const closeBtn = document.getElementById('closeNumbersGameBtn');
      if (closeBtn) closeBtn.onclick = closeNumbersGameModal;
    }, 0);
    body.innerHTML = html;
    setTimeout(() => {
      document.getElementById('toggleNumbersModeBtn').onclick = () => renderNumbersDragDropStage();
      if (stage > 0) document.getElementById('prevNumbersStageBtn').onclick = () => { stage--; attempts = 0; renderNumbersStage(); };
      if (solvedStages[stage] && stage < numberGroups.length - 1) document.getElementById('nextNumbersStageBtn').onclick = () => { stage++; attempts = 0; renderNumbersStage(); };
      document.getElementById('checkNumbersBtn').onclick = () => checkNumbersAnswer(group);
      // Test button logic
      const testBtn = document.getElementById('testFillNumbersBtn');
      if (testBtn) {
        testBtn.onclick = function() {
          group.forEach((item, i) => {
            userAnswers[stage][i] = item.ans;
          });
          document.querySelectorAll('.answer-input').forEach((inp, i) => {
            inp.value = group[i].ans;
          });
        };
      }
    }, 0);
  }

  function renderNumbersDragDropStage() {
    const body = document.getElementById('numbersGameBody');
    const group = numberGroups[stage];
    if (!userAnswers[stage]) userAnswers[stage] = group.map(() => '');
    let answers = group.map(g => g.ans);
    let shuffled = answers.slice();
    shuffleArray(shuffled);
    let testBtnHtml = `<button type="button" class="btn btn-warning btn-sm mb-2" id="testFillNumbersBtn" style="float:right;">Test</button>`;
    html = `<h5>Numbers (Group ${stage+1})</h5>`;
    html += `<div class="dragdrop-instructions" style="min-height:24px;margin-bottom:8px;">Drag the correct answer to each number.</div>`;
    html += `<div id="numbers-dragdrop-rows" style="position:relative;">`;
    html += testBtnHtml;
    html += `<div class="dragdrop-rows d-flex flex-row">`;
    html += `<div class="drop-targets flex-grow-1">`;
    group.forEach((item, i) => {
      let droppedAns = userAnswers[stage][i] || '';
      html += `<div class="mb-2 sinhala-number-group-row d-flex align-items-center" style="flex-wrap:nowrap;overflow-x:auto;">
        <span class="sinhala-number-word" style="font-size:1.2rem; font-weight:500;">${item.word}</span>
        <span class="sinhala-number-translit" style="margin-left:8px; color:#888; font-size:1.1rem;">(${item.word_en})</span>
        <div class="drop-target dragdrop-box" data-idx="${i}" style="width:64px; height:48px; border:2px solid #bdbdbdbd; margin-left:14px; display:flex; align-items:center; justify-content:center; vertical-align:middle; text-align:center; background:#f7f7f7; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.04); position:relative;">`;
      if (droppedAns) {
        html += `<div class='draggable-answer btn btn-outline-dark mb-2' draggable='true' data-ans='${droppedAns}' data-source='box' style='width:56px; height:38px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; background:#fff; color:#222; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.08); border:2px solid #bdbdbd; margin:0 auto; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:2;'>${droppedAns}</div>`;
      }
      html += `</div>
      </div>`;
    });
    html += `</div>`;
    // Answer tiles column (vertical, right side)
    html += `<div class="dragdrop-answers d-flex flex-column ms-4">`;
    shuffled.forEach(ans => {
      let isDropped = userAnswers[stage].includes(ans);
      if (!isDropped) {
        html += `<div class="draggable-answer btn btn-outline-dark mb-2" draggable="true" data-ans="${ans}" data-source="tile" style="min-width:60px;">${ans}</div>`;
      }
    });
    html += `</div>`;
    html += `</div>`;
    html += `</div>`;
    // Action buttons row (horizontal, centered, as in alphabet game)
    html += '<div class="d-flex align-items-center justify-content-center gap-2 mt-2">';
    if (stage > 0) html += '<button class="nav-arrow" id="prevNumbersStageBtn" style="font-size:1.5rem;line-height:1;">&#8592;</button>';
    html += '<button type="button" class="btn btn-primary" id="checkNumbersDragBtn">Check My Answer</button>';
    html += `<button type="button" class="btn btn-outline-secondary" id="toggleNumbersModeBtn">Type Answer</button>`;
    if (solvedStages[stage] && stage < numberGroups.length - 1) html += '<button class="nav-arrow" id="nextNumbersStageBtn" style="font-size:1.5rem;line-height:1;">&#8594;</button>';
    html += '</div>';
    html += '<div id="numbersResult" class="mt-2"></div>';
    body.innerHTML = html;
    setTimeout(() => {
      document.getElementById('toggleNumbersModeBtn').onclick = () => renderNumbersStage();
      if (stage > 0) document.getElementById('prevNumbersStageBtn').onclick = () => { stage--; attempts = 0; renderNumbersDragDropStage(); };
      if (solvedStages[stage] && stage < numberGroups.length - 1) document.getElementById('nextNumbersStageBtn').onclick = () => { stage++; attempts = 0; renderNumbersDragDropStage(); };
      document.getElementById('checkNumbersDragBtn').onclick = () => checkNumbersDragDropAnswer(group);
      // Test button logic
      const testBtn = document.getElementById('testFillNumbersBtn');
      if (testBtn) {
        testBtn.onclick = function() {
          group.forEach((item, i) => {
            userAnswers[stage][i] = item.ans;
          });
          renderNumbersDragDropStage();
        };
      }
      attachNumbersDragDropEvents(group);
    }, 0);
  }

  function checkNumbersAnswer(group) {
    const inputs = document.querySelectorAll('.answer-input');
    let correct = 0;
    let mistakes = [];
    inputs.forEach((inp, i) => {
      userAnswers[stage][i] = inp.value.trim();
      if (inp.value.trim().toLowerCase() === group[i].ans) {
        correct++;
      } else {
        mistakes.push(i);
      }
    });
    attempts++;
    if (correct === group.length) {
      solvedStages[stage] = true;
      document.getElementById('numbersResult').innerHTML = `Correct! You got all ${group.length} right.`;
      setTimeout(() => {
        if (stage < numberGroups.length - 1) {
          stage++;
          attempts = 0;
          renderNumbersStage();
        } else {
          showNumbersResultsScreen();
        }
      }, 1000);
    } else {
      document.getElementById('numbersResult').innerHTML = `You got ${correct} out of ${group.length} correct. Attempts: ${attempts}`;
    }
  }

  function checkNumbersDragDropAnswer(group) {
    let correct = 0;
    let mistakes = [];
    let targets = document.querySelectorAll('.drop-target');
    targets.forEach((target, i) => {
      let ans = userAnswers[stage][i] || '';
      let tile = target.querySelector('.draggable-answer');
      if (ans.toLowerCase() === group[i].ans) {
        correct++;
        target.style.borderColor = '#28a745';
        target.style.background = '#eafbe7';
        if (tile) tile.style.borderColor = '#28a745';
      } else {
        mistakes.push(i);
        target.style.borderColor = '#dc3545';
        target.style.background = '#fbeaea';
        if (tile) tile.style.borderColor = '#dc3545';
      }
    });
    attempts++;
    if (correct === group.length) {
      solvedStages[stage] = true;
      document.getElementById('numbersResult').innerHTML = `Correct! You got all ${group.length} right.`;
      setTimeout(() => {
        if (stage < numberGroups.length - 1) {
          stage++;
          attempts = 0;
          renderNumbersDragDropStage();
        } else {
          showNumbersResultsScreen();
        }
      }, 1000);
    } else {
      document.getElementById('numbersResult').innerHTML = `You got ${correct} out of ${group.length} correct. Attempts: ${attempts}`;
    }
  }

  function showNumbersResultsScreen() {
    const body = document.getElementById('numbersGameBody');
    let total = 0, correct = 0;
    let html = `<div class="text-center py-4" style="max-height:75vh; overflow-y:auto; min-width:320px;">
      <h4 class="mb-4">Level Complete!</h4>`;
    numberGroups.forEach((group, gIdx) => {
      html += '<div class="mb-2">';
      group.forEach((item, i) => {
        total++;
        let user = (userAnswers[gIdx] && userAnswers[gIdx][i]) ? userAnswers[gIdx][i].trim() : '';
        let isCorrect = user.toLowerCase() === item.ans;
        if (isCorrect) correct++;
        let cls = isCorrect ? 'level-complete-correct' : 'level-complete-mistake';
        html += `<div class="d-flex flex-row align-items-center justify-content-center mb-1 ${cls}" style="font-size:1.1rem; gap: 0.5rem;">\
          <span class="sinhala-number-word" style="font-weight:500; min-width:90px; text-align:right;">${item.word}</span>\
          <span class="sinhala-number-translit" style="color:#888; min-width:80px; text-align:left;">(${item.word_en})</span>\
          <span style="min-width:44px; font-size:1.2rem; font-weight:bold; color:${isCorrect ? '#28a745' : '#dc3545'}; border:1.5px solid ${isCorrect ? '#28a745' : '#dc3545'}; border-radius:7px; padding:2px 12px; background:#fff; display:inline-block; text-align:center; margin-left:10px;">${user || '-'}</span>\
        </div>`;
      });
      html += '</div>';
    });
    html += `<div class="mb-3">Total Correct: <b>${correct}</b> / ${total}</div>`;
    html += `<button class="btn btn-primary mt-3" id="closeNumbersResultsBtn">Close</button></div>`;
    body.innerHTML = html;
    document.getElementById('closeNumbersResultsBtn').onclick = closeNumbersGameModal;
  }

  // Drag & drop events for numbers game
  function attachNumbersDragDropEvents(group) {
    document.querySelectorAll('.draggable-answer').forEach(tile => {
      tile.setAttribute('draggable', 'true');
      tile.style.cursor = 'pointer';
      tile.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', tile.getAttribute('data-ans'));
        e.dataTransfer.setData('source', tile.getAttribute('data-source'));
        if (tile.parentElement.classList.contains('drop-target')) {
          e.dataTransfer.setData('source-idx', tile.parentElement.getAttribute('data-idx'));
        }
      });
      // Touch support for mobile
      let touchStartX = 0, touchStartY = 0, touchMoved = false;
      tile.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchMoved = false;
          tile.classList.add('dragging-touch');
        }
      });
      tile.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1) {
          touchMoved = true;
          let touch = e.touches[0];
          tile.style.position = 'fixed';
          tile.style.left = (touch.clientX - 30) + 'px';
          tile.style.top = (touch.clientY - 20) + 'px';
          tile.style.zIndex = 9999;
        }
      });
      tile.addEventListener('touchend', function(e) {
        tile.classList.remove('dragging-touch');
        tile.style.position = '';
        tile.style.left = '';
        tile.style.top = '';
        tile.style.zIndex = '';
        if (!touchMoved) return;
        let touch = e.changedTouches[0];
        let dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        while (dropTarget && !dropTarget.classList.contains('drop-target') && dropTarget !== document.body) {
          dropTarget = dropTarget.parentElement;
        }
        if (dropTarget && dropTarget.classList.contains('drop-target')) {
          let idx = parseInt(dropTarget.getAttribute('data-idx'));
          if (!userAnswers[stage]) userAnswers[stage] = group.map(() => '');
          let ans = tile.getAttribute('data-ans');
          let source = tile.getAttribute('data-source');
          let sourceIdx = tile.parentElement.classList.contains('drop-target') ? tile.parentElement.getAttribute('data-idx') : undefined;
          if (source === 'box' && sourceIdx !== undefined && userAnswers[stage][parseInt(sourceIdx)] !== undefined) {
            userAnswers[stage][parseInt(sourceIdx)] = '';
          }
          if (userAnswers[stage][idx] !== undefined) {
            userAnswers[stage][idx] = '';
            userAnswers[stage][idx] = ans;
          }
          renderNumbersDragDropStage();
        }
      });
    });
    document.querySelectorAll('.drop-target').forEach(target => {
      target.addEventListener('dragover', function(e) {
        e.preventDefault();
        target.style.borderColor = '#444';
      });
      target.addEventListener('dragleave', function(e) {
        target.style.borderColor = '#aaa';
      });
      target.addEventListener('drop', function(e) {
        e.preventDefault();
        target.style.borderColor = '#222';
        let ans = e.dataTransfer.getData('text/plain');
        let source = e.dataTransfer.getData('source');
        let sourceIdx = e.dataTransfer.getData('source-idx');
        let idx = parseInt(target.getAttribute('data-idx'));
        if (!userAnswers[stage]) userAnswers[stage] = group.map(() => '');
        if (source === 'box' && sourceIdx !== undefined && userAnswers[stage][parseInt(sourceIdx)] !== undefined) {
          userAnswers[stage][parseInt(sourceIdx)] = '';
        }
        if (userAnswers[stage][idx] !== undefined) {
          userAnswers[stage][idx] = '';
          userAnswers[stage][idx] = ans;
        }
        renderNumbersDragDropStage();
      });
    });
  }

  // Fisher-Yates shuffle
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Expose modal open function globally
  window.showNumbersGameModal = showNumbersGameModal;
})();
