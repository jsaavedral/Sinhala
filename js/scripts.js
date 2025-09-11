        // Debug: log mousedown and click on draggable tiles
    console.log('scripts.js loaded');
        document.querySelectorAll('.draggable-answer').forEach(tile => {
            tile.addEventListener('mousedown', function(e) {
                console.log('TILE MOUSEDOWN', tile.getAttribute('data-ans'));
            });
            tile.addEventListener('click', function(e) {
                console.log('TILE CLICK', tile.getAttribute('data-ans'));
            });
        });
        // Debug: log mousedown and click on drop targets
        document.querySelectorAll('.drop-target').forEach(target => {
            target.addEventListener('mousedown', function(e) {
                console.log('DROP TARGET MOUSEDOWN', target.getAttribute('data-idx'));
            });
            target.addEventListener('click', function(e) {
                console.log('DROP TARGET CLICK', target.getAttribute('data-idx'));
            });
        });
        // Allow player to click a drop target to remove its answer and return the tile
        document.querySelectorAll('.drop-target').forEach(target => {
            target.addEventListener('click', function() {
                let ans = target.getAttribute('data-ans');
                if (ans) {
                    let tile = document.querySelector('.draggable-answer[data-ans="' + ans + '"]');
                    if (tile) tile.style.visibility = 'visible';
                    target.textContent = '';
                    target.removeAttribute('data-ans');
                    target.style.borderColor = '#aaa';
                    target.style.background = '#f8f9fa';
                }
            });
        });
/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// === Sinhala Alphabet Game ===
(function() {
    // Alphabet data
    const vowels = [
        {char: 'අ', ans: 'a'}, {char: 'ආ', ans: 'aa'},
        {char: 'ඇ', ans: 'ae'}, {char: 'ඈ', ans: 'aeae'},
        {char: 'ඉ', ans: 'i'}, {char: 'ඊ', ans: 'ii'},
        {char: 'උ', ans: 'u'}, {char: 'ඌ', ans: 'uu'},
        {char: 'එ', ans: 'e'}, {char: 'ඒ', ans: 'ee'},
        {char: 'ඔ', ans: 'o'}, {char: 'ඕ', ans: 'oo'}
    ];
    // Divide vowels into groups of 2
    const vowelGroups = [];
    for (let i = 0; i < vowels.length; i += 2) {
        vowelGroups.push(vowels.slice(i, i + 2));
    }
    // Consonants in groups of 3 (7 groups)
    const consonants = [
        {char:'ක',ans:'ka'}, {char:'ග',ans:'ga'}, {char:'ච',ans:'che'},
        {char:'ඡ',ans:'ja'}, {char:'ට',ans:'ta'}, {char:'ඬ',ans:'nda'},
        {char:'ණ',ans:'na'}, {char:'ත',ans:'ta'}, {char:'ද',ans:'da'},        
        {char:'න',ans:'na'}, {char:'ප',ans:'pa'}, {char:'බ',ans:'ba'},
        {char:'ම',ans:'ma'}, {char:'ය',ans:'ya'}, {char:'ර',ans:'ra'},
        {char:'ල',ans:'la'}, {char:'ව',ans:'va'}, {char:'ස',ans:'sa'},
        {char:'හ',ans:'ha'}, {char:'ළ',ans:'la'}, {char:'අං',ans:'am'}
    ];
    // Define consonant groups by indices for correct order (matching the fixed array)
    const consonantGroupIndices = [
        [0,1,2],    // ක ග ච
        [3,4,5],    // ඡ ට ඬ
        [6,7,8],    // ණ ත ද
        [9,10,11],  // න ප බ
        [12,13,14], // ම ය ර
        [15,16,17], // ල ව ස
        [18,19,20]  // හ ළ අං
    ];

    // Game state
    let stage = 0; // 0..5: vowel groups, 6..12: consonant groups
    let attempts = 0;
    let solvedStages = {};
    let gameMode = 'basic'; // 'basic', 'intermediate', 'advanced'
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalAttempts = 0;

    // Track user answers for results
    let userAnswers = [];
    // Track user mistakes for results
    let userMistakes = [];

    function shuffleArray(arr) {
        // Fisher-Yates shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function showGameModal(mode = 'basic') {
        document.getElementById('alphabetGameModal').style.display = 'flex';
        stage = 0;
        attempts = 0;
        solvedStages = {};
        gameMode = mode;
        totalCorrect = 0;
        totalQuestions = 0;
        totalAttempts = 0;
        userAnswers = [];
        userMistakes = [];
        window.vowelGroupsShuffled = [];
        window.consonantGroupsShuffled = [];
        if (gameMode === 'advanced') {
            let vowelsCopy = vowels.slice();
            shuffleArray(vowelsCopy);
            for (let i = 0; i < vowelsCopy.length; i += 2) {
                window.vowelGroupsShuffled.push(vowelsCopy.slice(i, i + 2));
            }
            let consonantsCopy = consonants.slice();
            shuffleArray(consonantsCopy);
            for (let i = 0; i < consonantsCopy.length; i += 3) {
                window.consonantGroupsShuffled.push(consonantsCopy.slice(i, i + 3));
            }
        } else if (gameMode === 'intermediate') {
            for (let i = 0; i < vowels.length; i += 2) {
                let group = vowels.slice(i, i + 2);
                shuffleArray(group);
                window.vowelGroupsShuffled.push(group);
            }
            consonantGroupIndices.forEach(idxArr => {
                let group = idxArr.map(idx => consonants[idx]);
                shuffleArray(group);
                window.consonantGroupsShuffled.push(group);
            });
        } else {
            for (let i = 0; i < vowels.length; i += 2) {
                window.vowelGroupsShuffled.push(vowels.slice(i, i + 2));
            }
            consonantGroupIndices.forEach(idxArr => {
                window.consonantGroupsShuffled.push(idxArr.map(idx => consonants[idx]));
            });
        }
        renderStage();
    }
    function closeGameModal() {
        document.getElementById('alphabetGameModal').style.display = 'none';
    }
    function renderStage() {
    const body = document.getElementById('alphabetGameBody');
    // Set a fixed min width and height for the modal body to avoid resizing between modes
    body.style.minWidth = '420px';
    body.style.maxWidth = '420px';
    body.style.minHeight = '440px';
    body.style.maxHeight = '440px';
    body.style.overflow = 'hidden';
        let html = '';
        let isVowel = stage < window.vowelGroupsShuffled.length;
        let groupIdx = isVowel ? stage : stage - window.vowelGroupsShuffled.length;
        let group = isVowel ? window.vowelGroupsShuffled[groupIdx] : window.consonantGroupsShuffled[groupIdx];
        let groupType = isVowel ? 'Vowels' : 'Consonants';
    html += `<h5>${groupType} (Group ${groupIdx+1})</h5>`;
    // Always reserve space for drag-and-drop instructions for smooth transition
    html += `<div class="dragdrop-instructions" style="min-height:24px;margin-bottom:8px;opacity:0;">Drag the correct answer to each letter.</div>`;
        // Prepare userAnswers for this group if not present and render input boxes for typing mode
        if (!userAnswers[stage]) {
            userAnswers[stage] = group.map(() => '');
        }
        if (!userMistakes[stage]) {
            userMistakes[stage] = group.map(() => false);
        }
    html += '<form id="alphaForm" class="typing-mode">';
    // Add TEST button for fast testing
    html += '<button type="button" class="btn btn-warning btn-sm mb-2" id="testFillBtn" style="float:right;">Test</button>';
        group.forEach((item, i) => {
            html += `<div class="mb-2 alphabet-game-row d-flex align-items-center" style="flex-wrap:nowrap;overflow-x:auto;">
                <span style="font-size:2rem; min-width:2.5rem;">${item.char}</span>
                <input type="text" class="form-control answer-input typing-box" data-idx="${i}" style="width:64px; display:inline-block; margin-right:14px; text-align:center; font-size:1.1rem; border:2px solid #bdbdbd; border-radius:10px; background:#f7f7f7;" maxlength="6" autocomplete="off" value="${userAnswers[stage][i] || ''}" />
                <span class="answer-hint" id="answer-hint-${i}" style="color:#28a745; font-weight:bold; margin-left:10px; min-width:2.5rem; white-space:nowrap;"></span>
            </div>`;
        });
    html += '<div class="d-flex align-items-center justify-content-center gap-2 mt-2">';
    if (stage > 0) html += '<button class="nav-arrow" id="prevStageBtn" style="font-size:1.5rem;line-height:1;">&#8592;</button>';
    html += '<button type="button" class="btn btn-primary" id="checkAlphaBtn">Check My Answer</button>';
    html += `<button type="button" class="btn btn-outline-secondary" id="toggleModeBtn">Drag & Drop</button>`;
    if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length - 1) html += '<button class="nav-arrow" id="nextStageBtn" style="font-size:1.5rem;line-height:1;">&#8594;</button>';
    html += '</div>';
        html += '<div id="alphaResult" class="mt-2"></div>';
        html += '</form>';
        body.innerHTML = html;
        // TEST button logic for typing mode
        setTimeout(function() {
            const testBtn = document.getElementById('testFillBtn');
            if (testBtn) {
                testBtn.onclick = function() {
                    group.forEach((item, i) => {
                        userAnswers[stage][i] = item.ans;
                    });
                    // Update input fields
                    document.querySelectorAll('.answer-input').forEach((inp, i) => {
                        inp.value = group[i].ans;
                    });
                };
            }
        }, 0);
        // Toggle button event (must be set after rendering)
        setTimeout(function() {
            const toggleBtn = document.getElementById('toggleModeBtn');
            if (toggleBtn) {
                toggleBtn.onclick = function() {
                    renderDragDropStage(group);
                };
            }
        }, 0);
    // Render drag & drop UI for the current stage
    function renderDragDropStage(group) {
    const body = document.getElementById('alphabetGameBody');
    // Set a fixed min width and height for the modal body to avoid resizing between modes
    body.style.minWidth = '420px';
    body.style.maxWidth = '420px';
    body.style.minHeight = '440px';
    body.style.maxHeight = '440px';
    body.style.overflow = 'hidden';
        let html = '';
        let isVowel = stage < window.vowelGroupsShuffled.length;
        let groupIdx = isVowel ? stage : stage - window.vowelGroupsShuffled.length;
        let groupType = isVowel ? 'Vowels' : 'Consonants';
        html += `<h5>${groupType} (Group ${groupIdx+1})</h5>`;
    html += `<div class="dragdrop-instructions" style="min-height:24px;margin-bottom:8px;opacity:1;">Drag the correct answer to each letter.</div>`;
        html += `<div id="dragdrop-rows">`;
        // Shuffle answers for drag items
        let answers = group.map(g => g.ans);
        let shuffled = answers.slice();
        shuffleArray(shuffled);
            html += `<div class="dragdrop-rows d-flex">`;
            html += `<div class="drop-targets flex-grow-1">`;
            group.forEach((item, i) => {
                let droppedAns = '';
                if (window.userAnswers && window.userAnswers[stage] && window.userAnswers[stage][i]) {
                    droppedAns = window.userAnswers[stage][i];
                }
                html += `<div class="mb-2 alphabet-game-row d-flex align-items-center">
                    <span style="font-size:2rem; min-width:2.5rem;">${item.char}</span>
                    <div class="drop-target dragdrop-box" data-idx="${i}" style="width:64px; height:48px; border:2px solid #bdbdbd; margin-right:14px; display:flex; align-items:center; justify-content:center; vertical-align:middle; text-align:center; background:#f7f7f7; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.04); position:relative;">`;
                if (droppedAns) {
                    html += `<div class='draggable-answer btn btn-outline-dark mb-2' draggable='true' data-ans='${droppedAns}' data-source='box' style='width:56px; height:38px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; background:#fff; color:#222; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.08); border:2px solid #bdbdbd; margin:0 auto; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:2;'>${droppedAns}</div>`;
                }
                    html += `</div>
                    <span class="answer-hint" id="answer-hint-${i}" style="color:#28a745; font-weight:bold; margin-left:10px; min-width:2.5rem; white-space:nowrap;"></span>
                </div>`;
            });
            html += `</div>`;
            // Show only tiles not currently dropped in any box
            html += `<div class="dragdrop-answers d-flex flex-column ms-4">`;
            shuffled.forEach((ans, i) => {
                let isDropped = false;
                if (window.userAnswers && window.userAnswers[stage]) {
                    isDropped = window.userAnswers[stage].includes(ans);
                }
                if (!isDropped) {
                    html += `<div class="draggable-answer btn btn-outline-dark mb-2" draggable="true" data-ans="${ans}" data-source="tile" style="min-width:60px;">${ans}</div>`;
                }
            });
            html += `</div>`;
            html += `</div>`;
    html += '<button type="button" class="btn btn-warning btn-sm mb-2" id="testFillBtn" style="float:right;">Test</button>';
    html += '<div class="d-flex align-items-center justify-content-center gap-2 mt-2">';
    if (stage > 0) html += '<button class="nav-arrow" id="prevStageBtn" style="font-size:1.5rem;line-height:1;">&#8592;</button>';
    html += '<button type="button" class="btn btn-primary" id="checkDragDropBtn">Check My Answer</button>';
    html += `<button type="button" class="btn btn-outline-secondary" id="toggleModeBtn">Type Answer</button>`;
    if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length - 1) html += '<button class="nav-arrow" id="nextStageBtn" style="font-size:1.5rem;line-height:1;">&#8594;</button>';
    html += '</div>';
        // CRAZY button event
        const crazyBtn = document.getElementById('crazyBtn');
        if (crazyBtn) {
            crazyBtn.onclick = function() {
                alert('CRAZY button was clicked!');
            };
        }
        html += '<div id="alphaResult" class="mt-2"></div>';
    // No legacy navigation row
    body.innerHTML = html;
    // TEST button logic for drag-and-drop mode
    setTimeout(function() {
        const testBtn = document.getElementById('testFillBtn');
        if (testBtn) {
            testBtn.onclick = function() {
                if (!window.userAnswers) window.userAnswers = [];
                if (!window.userAnswers[stage]) window.userAnswers[stage] = group.map(() => '');
                group.forEach((item, i) => {
                    window.userAnswers[stage][i] = item.ans;
                });
                renderDragDropStage(group);
            };
        }
    }, 0);
    // Diagnostic logs
    console.log('RENDER HTML:', html);
    console.log('Tiles:', document.querySelectorAll('.draggable-answer'));
    console.log('Drop targets:', document.querySelectorAll('.drop-target'));
    attachDragDropEvents(group);
    }

    // Drag & drop event logic
    function attachDragDropEvents(group) {
        // Drag events for answers
        // Make all tiles draggable and set dragstart event
        document.querySelectorAll('.draggable-answer').forEach(tile => {
            tile.setAttribute('draggable', 'true');
            tile.style.cursor = 'pointer';
            tile.addEventListener('dragstart', function(e) {
                console.log('DRAGSTART', tile.getAttribute('data-ans'));
                e.dataTransfer.setData('text/plain', tile.getAttribute('data-ans'));
                e.dataTransfer.setData('source', tile.getAttribute('data-source'));
                if (tile.parentElement.classList.contains('drop-target')) {
                    e.dataTransfer.setData('source-idx', tile.parentElement.getAttribute('data-idx'));
                }
            });
            // --- Touch support for mobile drag-and-drop ---
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
                    if (!window.userAnswers) window.userAnswers = [];
                    if (!window.userAnswers[stage]) window.userAnswers[stage] = group.map(() => '');
                    // Remove from previous box if needed
                    let ans = tile.getAttribute('data-ans');
                    let source = tile.getAttribute('data-source');
                    let sourceIdx = tile.parentElement.classList.contains('drop-target') ? tile.parentElement.getAttribute('data-idx') : undefined;
                    if (source === 'box' && sourceIdx !== undefined && window.userAnswers[stage][parseInt(sourceIdx)] !== undefined) {
                        window.userAnswers[stage][parseInt(sourceIdx)] = '';
                    }
                    if (window.userAnswers[stage][idx] !== undefined) {
                        window.userAnswers[stage][idx] = '';
                        window.userAnswers[stage][idx] = ans;
                    }
                    renderDragDropStage(group);
                }
            });
        });
        document.querySelectorAll('.drop-target').forEach(target => {
            target.addEventListener('dragover', function(e) {
                e.preventDefault();
                target.style.borderColor = '#444'; // darker shade for hover
            });
            target.addEventListener('dragleave', function(e) {
                target.style.borderColor = '#aaa';
            });
            target.addEventListener('drop', function(e) {
                e.preventDefault();
                target.style.borderColor = '#222'; // even darker shade for placed
                let ans = e.dataTransfer.getData('text/plain');
                let source = e.dataTransfer.getData('source');
                let sourceIdx = e.dataTransfer.getData('source-idx');
                let idx = parseInt(target.getAttribute('data-idx'));
                console.log('DROP DEBUG', {stage, idx, ans, source, sourceIdx, userAnswers: window.userAnswers, group});
                if (!window.userAnswers) window.userAnswers = [];
                if (!window.userAnswers[stage]) window.userAnswers[stage] = group.map(() => '');
                if (source === 'box' && sourceIdx !== undefined && window.userAnswers[stage][parseInt(sourceIdx)] !== undefined) {
                    window.userAnswers[stage][parseInt(sourceIdx)] = '';
                }
                if (window.userAnswers[stage][idx] !== undefined) {
                    window.userAnswers[stage][idx] = '';
                    window.userAnswers[stage][idx] = ans;
                } else {
                    console.warn('Drop target idx is undefined:', idx, window.userAnswers[stage]);
                }
                // Re-render to update UI
                renderDragDropStage(group);
            });
        });
        // Check button
        const checkBtn = document.getElementById('checkDragDropBtn');
        checkBtn.onclick = function() {
            // Prevent double-clicks/rapid clicks
            checkBtn.disabled = true;
            let correct = 0;
            let mistakes = [];
            let targets = document.querySelectorAll('.drop-target');
            let tiles = document.querySelectorAll('.draggable-answer');
            targets.forEach((target, i) => {
                let ans = window.userAnswers[stage][i] || '';
                let tile = target.querySelector('.draggable-answer');
                if (ans.toLowerCase() === group[i].ans) {
                    correct++;
                    target.style.borderColor = '#28a745'; // green for correct
                    target.style.background = '#eafbe7';
                    if (tile) tile.style.borderColor = '#28a745';
                    document.getElementById(`answer-hint-${i}`).textContent = '';
                } else {
                    mistakes.push(i);
                    target.style.borderColor = '#dc3545'; // red for incorrect
                    target.style.background = '#fbeaea';
                    if (tile) tile.style.borderColor = '#dc3545';
                    // Only show answer after third attempt
                    if (attempts >= 2) {
                        document.getElementById(`answer-hint-${i}`).textContent = group[i].ans;
                    } else {
                        document.getElementById(`answer-hint-${i}`).textContent = '';
                    }
                }
            });
            attempts++;
            totalAttempts++;
            totalQuestions += group.length;
            totalCorrect += correct;
            if (correct === group.length) {
                solvedStages[stage] = true;
                document.getElementById('alphaResult').innerHTML = `Correct! You got all ${group.length} right.`;
                // DEBUG: log stage and totalStages
                console.log('[DEBUG] DragDrop: correct group, stage:', stage);
                setTimeout(() => {
                    const totalStages = window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length;
                    console.log('[DEBUG] DragDrop: setTimeout, stage:', stage, 'totalStages:', totalStages);
                    if (stage < totalStages - 1) {
                        stage++;
                        attempts = 0;
                        console.log('[DEBUG] DragDrop: advancing to next stage', stage);
                        renderStage();
                    } else {
                        console.log('[DEBUG] DragDrop: calling showResultsScreen() at stage', stage);
                        // Show a visual debug message in the modal
                        const body = document.getElementById('alphabetGameBody');
                        if (body) {
                            let dbg = document.createElement('div');
                            dbg.style.color = 'red';
                            dbg.style.fontWeight = 'bold';
                            dbg.textContent = '[DEBUG] showResultsScreen() called!';
                            body.appendChild(dbg);
                        }
                        showResultsScreen();
                    }
                }, 1000);
            } else if (attempts >= 3) {
                mistakes.forEach(i => {
                    userMistakes[stage][i] = true;
                    document.getElementById(`answer-hint-${i}`).textContent = group[i].ans;
                });
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. Please drag the correct answers as shown to move on.`;
            } else {
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. Attempts: ${attempts}/3`;
                // Re-enable the button for another attempt
                checkBtn.disabled = false;
            }
        };
        // Toggle button event for switching back to type mode
        const toggleBtn = document.getElementById('toggleModeBtn');
        if (toggleBtn) {
            toggleBtn.onclick = function() {
                renderStage();
            };
        }
        // Navigation
        const prevBtn = document.getElementById('prevStageBtn');
        if (stage > 0 && prevBtn) {
            prevBtn.onclick = function() {
                stage--;
                attempts = 0;
                renderStage();
            };
        }
        const nextBtn = document.getElementById('nextStageBtn');
        if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length - 1 && nextBtn) {
            nextBtn.onclick = function() {
                stage++;
                attempts = 0;
                renderStage();
            };
        }
    }
    // No legacy navigation
        body.innerHTML = html;
        attachGameEvents(group);
    }
    function attachGameEvents(group) {
        document.getElementById('checkAlphaBtn').onclick = function() {
            const inputs = document.querySelectorAll('.answer-input');
        // No need to check for empty boxes; allow checking even if some are empty
            let correct = 0;
            let mistakes = [];
            inputs.forEach((inp, i) => {
                userAnswers[stage][i] = inp.value.trim();
                if (inp.value.trim().toLowerCase() === group[i].ans) {
                    correct++;
                    document.getElementById(`answer-hint-${i}`).textContent = '';
                } else {
                    mistakes.push(i);
                }
            });
            attempts++;
            totalAttempts++;
            totalQuestions += group.length;
            totalCorrect += correct;
            if (correct === group.length) {
                solvedStages[stage] = true;
                document.getElementById('alphaResult').innerHTML = `Correct! You got all ${group.length} right.`;
                setTimeout(() => {
                    const totalStages = window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length;
                    if (stage < totalStages - 1) {
                        stage++;
                        attempts = 0;
                        renderStage();
                    } else {
                        showResultsScreen();
                    }
                }, 1000);
            } else if (attempts >= 3) {
                // Mark mistakes for this group, only once per letter
                mistakes.forEach(i => {
                    userMistakes[stage][i] = true;
                    document.getElementById(`answer-hint-${i}`).textContent = group[i].ans;
                });
                // Do NOT allow navigation yet; require all correct answers
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. Please type the correct answers as shown to move on.`;
                // Disable navigation buttons if present
                renderStageNavOnly(true);
            } else if (attempts > 1) {
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. Attempts: ${attempts}/3`;
            } else {
                document.getElementById('alphaResult').innerHTML = '';
            }
        };
        if (stage > 0) {
            document.getElementById('prevStageBtn').onclick = function() {
                stage--;
                attempts = 0;
                renderStage();
            };
        }
        if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length - 1) {
            document.getElementById('nextStageBtn').onclick = function() {
                stage++;
                attempts = 0;
                renderStage();
            };
        }
    }
    // Only re-render navigation buttons after showing answers
    function renderStageNavOnly() {
        let navDiv = document.querySelector('#alphabetGameBody .mt-3');
        if (!navDiv) return;
        let html = '';
        // If forceDisable is true, do not show navigation buttons
        if (arguments[0] === true) {
            navDiv.innerHTML = html;
            return;
        }
    navDiv.innerHTML = '';
    }
    function showResultsScreen() {
        // Force sync: ensure userAnswers is up to date for all groups/letters
        let allGroups = window.vowelGroupsShuffled.concat(window.consonantGroupsShuffled);
        allGroups.forEach((group, gIdx) => {
            if (!userAnswers[gIdx]) userAnswers[gIdx] = group.map(() => '');
            group.forEach((item, i) => {
                if (typeof userAnswers[gIdx][i] !== 'string') userAnswers[gIdx][i] = '';
            });
        });
        const body = document.getElementById('alphabetGameBody');
        // Count total mistakes (one per letter, only if player gave up)
        let mistakeCount = 0;
        let totalLetters = 0;
        let totalCorrectFinal = 0;
        allGroups.forEach((group, gIdx) => {
            group.forEach((item, i) => {
                totalLetters++;
                const user = (userAnswers[gIdx] && userAnswers[gIdx][i]) ? userAnswers[gIdx][i].trim().toLowerCase() : '';
                if (user === item.ans) {
                    totalCorrectFinal++;
                } else {
                    mistakeCount++;
                }
            });
        });
        let html = `<div class="text-center py-4">
            <h4 class="mb-4">Level Complete!</h4>
            <div class="mb-3">Total Correct: <b>${totalCorrectFinal}</b> / ${totalLetters}</div>
            <div class="mb-3">Total Mistakes: <b style='color:#dc3545;'>${mistakeCount}</b></div>
            <div class="mb-4 text-center mx-auto" style="max-width:400px;">
        `;
        // Show vowels in their original order
        let vowelItems = [];
        let consonantItems = [];
        // Find the indices for vowels and consonants in allGroups
        let vowelCount = window.vowelGroupsShuffled.reduce((acc, g) => acc + g.length, 0);
        let consonantCount = window.consonantGroupsShuffled.reduce((acc, g) => acc + g.length, 0);
        // Map for quick lookup of user answers/mistakes by char and ans
        let answerMap = {};
        allGroups.forEach((group, gIdx) => {
            group.forEach((item, i) => {
                answerMap[item.char + '|' + item.ans] = { gIdx, i };
            });
        });
        // Vowels: use the original vowels array order
        vowels.forEach(v => {
            let key = v.char + '|' + v.ans;
            if (answerMap[key]) {
                let {gIdx, i} = answerMap[key];
                vowelItems.push({
                    char: v.char,
                    ans: v.ans,
                    gIdx,
                    i
                });
            }
        });
        // Consonants: use the original consonants array order
        consonants.forEach(c => {
            let key = c.char + '|' + c.ans;
            if (answerMap[key]) {
                let {gIdx, i} = answerMap[key];
                consonantItems.push({
                    char: c.char,
                    ans: c.ans,
                    gIdx,
                    i
                });
            }
        });
        // Display vowels (if any)
        if (vowelItems.length > 0) {
            html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
            vowelItems.forEach(item => {
                let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
                let isCorrect = user === item.ans;
                let cls = isCorrect ? 'level-complete-correct' : 'level-complete-mistake';
                html += `<span class="${cls}" style="font-size:1.5rem; margin:0 10px 10px 0; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
            });
            html += '</div>';
        }
        // Display consonants (if any)
        if (consonantItems.length > 0) {
            html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
            consonantItems.forEach(item => {
                let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
                let isCorrect = user === item.ans;
                let cls = isCorrect ? 'level-complete-correct' : 'level-complete-mistake';
                html += `<span class="${cls}" style="font-size:1.5rem; margin:0 10px 10px 0; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
            });
            html += '</div>';
        }
        html += `</div><button class="btn btn-primary mt-3" id="closeResultsBtn">Close</button></div>`;
        body.innerHTML = html;
        document.getElementById('closeResultsBtn').onclick = closeGameModal;
    }
    // Button event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const playBtn = document.getElementById('playAlphabetGameBtn');
        if (playBtn) playBtn.onclick = function() { showGameModal('basic'); };
        const playIntBtn = document.getElementById('playAlphabetGameIntermediateBtn');
        if (playIntBtn) playIntBtn.onclick = function() { showGameModal('intermediate'); };
        const playAdvBtn = document.getElementById('playAlphabetGameAdvancedBtn');
        if (playAdvBtn) playAdvBtn.onclick = function() { showGameModal('advanced'); };
        const playTestBtn = document.getElementById('testAlphabetGameBtn');
        if (playTestBtn) playTestBtn.onclick = runAlphabetGameTests;
        const closeBtn = document.getElementById('closeAlphabetGameBtn');
        if (closeBtn) closeBtn.onclick = closeGameModal;

        // Realistic test runner for all 3 levels
        function runAlphabetGameTests() {
            const levels = [
                {mode: 'basic', mistakes: 1},
                {mode: 'intermediate', mistakes: 2},
                {mode: 'advanced', mistakes: 3}
            ];
            let html = '<div style="max-height:60vh;overflow-y:auto">';
            levels.forEach(({mode, mistakes}) => {
                // Setup game state as in showGameModal
                let vowelsCopy = vowels.slice();
                let consonantsCopy = consonants.slice();
                let vowelGroupsTest = [];
                let consonantGroupsTest = [];
                if (mode === 'advanced') {
                    shuffleArray(vowelsCopy);
                    for (let i = 0; i < vowelsCopy.length; i += 2) {
                        vowelGroupsTest.push(vowelsCopy.slice(i, i + 2));
                    }
                    shuffleArray(consonantsCopy);
                    for (let i = 0; i < consonantsCopy.length; i += 3) {
                        consonantGroupsTest.push(consonantsCopy.slice(i, i + 3));
                    }
                } else if (mode === 'intermediate') {
                    for (let i = 0; i < vowels.length; i += 2) {
                        let group = vowels.slice(i, i + 2);
                        shuffleArray(group);
                        vowelGroupsTest.push(group);
                    }
                    consonantGroupIndices.forEach(idxArr => {
                        let group = idxArr.map(idx => consonants[idx]);
                        shuffleArray(group);
                        consonantGroupsTest.push(group);
                    });
                } else {
                    for (let i = 0; i < vowels.length; i += 2) {
                        vowelGroupsTest.push(vowels.slice(i, i + 2));
                    }
                    consonantGroupIndices.forEach(idxArr => {
                        consonantGroupsTest.push(idxArr.map(idx => consonants[idx]));
                    });
                }
                let allGroups = vowelGroupsTest.concat(consonantGroupsTest);
                // Flatten all items for random mistake selection
                let allItems = [];
                allGroups.forEach((group, gIdx) => {
                    group.forEach((item, i) => {
                        allItems.push({char: item.char, ans: item.ans, gIdx, i});
                    });
                });
                // Pick random unique indices for mistakes
                let mistakeIndices = [];
                while (mistakeIndices.length < mistakes && mistakeIndices.length < allItems.length) {
                    let idx = Math.floor(Math.random() * allItems.length);
                    if (!mistakeIndices.includes(idx)) mistakeIndices.push(idx);
                }
                let testRows = [];
                allItems.forEach((item, idx) => {
                    let isMistake = mistakeIndices.includes(idx);
                    let userInput, isCorrect;
                    if (isMistake) {
                        userInput = 'xxx'; // wrong answer
                        isCorrect = false;
                    } else {
                        userInput = item.ans;
                        isCorrect = true;
                    }
                    testRows.push({char: item.char, ans: item.ans, userInput, isCorrect});
                });
                let correct = testRows.filter(r => r.isCorrect).length;
                let total = testRows.length;
                html += `<h5 style='margin-top:1.5em;'>${mode.charAt(0).toUpperCase() + mode.slice(1)} Level</h5>`;
                html += `<div style='margin-bottom:0.5em;'>Result: <span style='color:#28a745;font-weight:bold;'>${correct} correct</span>, <span style='color:#dc3545;font-weight:bold;'>${total-correct} mistakes</span> (expected ${mistakes} mistakes)</div>`;
                html += `<table class='table table-bordered table-sm' style='width:auto;min-width:300px'><thead><tr><th>Char</th><th>Your Input</th><th>Correct Answer</th></tr></thead><tbody>`;
                testRows.forEach(row => {
                    html += `<tr>`;
                    html += `<td style='font-size:1.5em'>${row.char}</td>`;
                    html += `<td style='color:${row.isCorrect ? '#28a745' : '#dc3545'};font-weight:bold;'>${row.userInput}</td>`;
                    html += `<td style='color:#28a745;font-weight:bold;'>${row.ans}</td>`;
                    html += `</tr>`;
                });
                html += `</tbody></table>`;
            });
            html += '</div><button class="btn btn-primary mt-3" id="closeTestResultsBtn">Close</button>';
            // Show in the game modal
            document.getElementById('alphabetGameModal').style.display = 'flex';
            document.getElementById('alphabetGameBody').innerHTML = html;
            document.getElementById('closeTestResultsBtn').onclick = closeGameModal;
        }
    });
})();
