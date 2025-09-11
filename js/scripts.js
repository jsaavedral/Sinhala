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

    const levels = [
        {name: 'Basic', mistakes: 1},
        {name: 'Intermediate', mistakes: 2},
        {name: 'Advanced', mistakes: 3}
    ];
    let html = '';
    levels.forEach(level => {
        let total = vowels.length + consonants.length;
        let correct = total - level.mistakes;
        html += `<div class="mb-5 p-3 border rounded">
            <h5 class="mb-3">${level.name} (Mistakes: ${level.mistakes})</h5>
            <div><b>Total Correct:</b> ${correct} / ${total} &nbsp; <b>Total Mistakes:</b> <span style='color:#dc3545;'>${level.mistakes}</span></div>
            <div class="mb-2 mt-3"><strong>Vowels</strong></div>
            <div class="mb-2 d-flex flex-wrap justify-content-center">`;
        vowels.forEach(v => {
            html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:#28a745; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${v.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${v.ans})</span></span>`;
        });
        html += `</div><div class="mb-2"><strong>Consonants</strong></div><div class="mb-2 d-flex flex-wrap justify-content-center">`;
        consonants.forEach((c, i) => {
            let color = i < level.mistakes ? '#dc3545' : '#28a745';
            html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:${color}; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${c.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${c.ans})</span></span>`;
        });
        html += `</div></div>`;
    });
    document.getElementById('alphabetTestModalBody').innerHTML = html;
    function closeGameModal() {
        document.getElementById('alphabetGameModal').style.display = 'none';
    }
    function renderStage() {
        const body = document.getElementById('alphabetGameBody');
        let html = '';
        let isVowel = stage < window.vowelGroupsShuffled.length;
        let groupIdx = isVowel ? stage : stage - window.vowelGroupsShuffled.length;
        let group = isVowel ? window.vowelGroupsShuffled[groupIdx] : window.consonantGroupsShuffled[groupIdx];
        let groupType = isVowel ? 'Vowels' : 'Consonants';
        html += `<h5>${groupType} (Group ${groupIdx+1})</h5>`;
        // Prepare userAnswers for this group if not present
        if (!userAnswers[stage]) {
            userAnswers[stage] = group.map(() => '');
        }
        if (!userMistakes[stage]) {
            userMistakes[stage] = group.map(() => false);
        }
        html += `<form id="alphaForm">`;
        group.forEach((item, i) => {
            html += `<div class="mb-2 alphabet-game-row d-flex align-items-center" style="flex-wrap:nowrap;overflow-x:auto;"><span style="font-size:2rem; min-width:2.5rem;">${item.char}</span> <input type="text" class="alpha-input" data-idx="${i}" maxlength="5" style="width:60px; margin-right:10px; text-transform:lowercase;" autocapitalize="off" autocomplete="off" inputmode="text" value="${userAnswers[stage][i] || ''}" /> <span class="answer-hint" id="answer-hint-${i}" style="color:#28a745; font-weight:bold; margin-left:10px; min-width:2.5rem; white-space:nowrap;"></span></div>`;
        });
        html += '<button type="button" class="btn btn-primary mt-2" id="checkAlphaBtn">Check My Answer</button>';
        html += '<div id="alphaResult" class="mt-2"></div>';
        html += '</form>';
        // Navigation
        html += '<div class="mt-3">';
        if (stage > 0) html += '<button class="btn btn-secondary me-2" id="prevStageBtn">Previous</button>';
        if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled - 1) html += '<button class="btn btn-secondary" id="nextStageBtn">Next</button>';
        html += '</div>';
        body.innerHTML = html;
        attachGameEvents(group);
    }
    function attachGameEvents(group) {
        document.getElementById('checkAlphaBtn').onclick = function() {
            const inputs = document.querySelectorAll('.alpha-input');
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
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. <span style='color:#28a745;'>Correct answers are shown in green.</span><br><span style='color:#dc3545;font-weight:bold;'>Type the correct answers to move on.</span>`;
                // Disable navigation buttons if present
                renderStageNavOnly(true);
            } else {
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. Attempts: ${attempts}/3`;
            }
        };
        if (stage > 0) {
            document.getElementById('prevStageBtn').onclick = function() {
                stage--;
                attempts = 0;
                renderStage();
            };
        }
        if (solvedStages[stage] && stage < vowelGroups.length + consonantGroups.length - 1) {
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
        if (stage > 0) html += '<button class="btn btn-secondary me-2" id="prevStageBtn">Previous</button>';
        if (solvedStages[stage] && stage < vowelGroups.length + consonantGroups.length - 1) html += '<button class="btn btn-secondary" id="nextStageBtn">Next</button>';
        navDiv.innerHTML = html;
        // Re-attach navigation events
        if (stage > 0) {
            document.getElementById('prevStageBtn').onclick = function() {
                stage--;
                attempts = 0;
                renderStage();
            };
        }
        if (solvedStages[stage] && stage < vowelGroups.length + consonantGroups.length - 1) {
            document.getElementById('nextStageBtn').onclick = function() {
                stage++;
                attempts = 0;
                renderStage();
            };
        }
    }
    function showResultsScreen() {
        const body = document.getElementById('alphabetGameBody');
        // Count total mistakes (one per letter, only if player gave up)
        let mistakeCount = 0;
        let allGroups = window.vowelGroupsShuffled.concat(window.consonantGroupsShuffled);
        userMistakes.forEach((group, gIdx) => {
            if (group) group.forEach(m => { if (m) mistakeCount++; });
        });
        // Calculate total letters (all letters in all groups)
        let totalLetters = 0;
        allGroups.forEach(group => { totalLetters += group.length; });
        // Total correct is total letters minus mistakes
        let totalCorrectFinal = totalLetters - mistakeCount;
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
            html += '<div class="mb-2"><strong>Vowels</strong></div>';
            html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
            vowelItems.forEach(item => {
                let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
                let isMistake = userMistakes[item.gIdx] && userMistakes[item.gIdx][item.i];
                let isCorrect = user === item.ans && !isMistake;
                html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:${isCorrect ? '#28a745' : (isMistake ? '#dc3545' : '#333')}; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
            });
            html += '</div>';
        }
        // Display consonants (if any)
        if (consonantItems.length > 0) {
            html += '<div class="mb-2"><strong>Consonants</strong></div>';
            html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
            consonantItems.forEach(item => {
                let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
                let isMistake = userMistakes[item.gIdx] && userMistakes[item.gIdx][item.i];
                let isCorrect = user === item.ans && !isMistake;
                html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:${isCorrect ? '#28a745' : (isMistake ? '#dc3545' : '#333')}; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
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
        const closeBtn = document.getElementById('closeAlphabetGameBtn');
        if (closeBtn) closeBtn.onclick = closeGameModal;

        // Test button logic
        const testBtn = document.getElementById('testAlphabetGameBtn');
        if (testBtn) testBtn.onclick = showTestScenariosModal;
    });

    // Show test scenarios modal
    function showTestScenariosModal() {
        // Create modal if not exists
        let modal = document.getElementById('alphabetTestModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'alphabetTestModal';
            modal.className = 'modal fade show';
            modal.style.display = 'block';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.zIndex = '2000';
            modal.innerHTML = `
                <div class="modal-dialog modal-xl" style="margin-top:40px;">
                  <div class="modal-content">
                    <div class="modal-header border-0">
                      <h4 class="modal-title">Test Scenarios</h4>
                      <button class="btn-close" type="button" id="closeAlphabetTestModalBtn"></button>
                    </div>
                    <div class="modal-body" id="alphabetTestModalBody"></div>
                  </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        // Render test scenarios
        renderTestScenarios();
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.getElementById('closeAlphabetTestModalBtn').onclick = function() {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        };
    }

    function renderTestScenarios() {
    // Real test runner for each level
    const testLevels = [
        {name: 'Basic', mode: 'basic', mistakes: 1},
        {name: 'Intermediate', mode: 'intermediate', mistakes: 2},
        {name: 'Advanced', mode: 'advanced', mistakes: 3}
    ];
    let html = '';
    testLevels.forEach(test => {
        const result = runAlphabetGameTest(test.mode, test.mistakes);
        html += `<div class="mb-5 p-3 border rounded">
            <h5 class="mb-3">${test.name} (Mistakes: ${test.mistakes})</h5>
            ${result}
        </div>`;
    });
    document.getElementById('alphabetTestModalBody').innerHTML = html;
    }

    // Simulate the real game logic for a level, making N mistakes, and return the result HTML
    function runAlphabetGameTest(mode, mistakesToMake) {
        // Use the real game data and logic
        // Setup game state as in showGameModal
    let vowelsCopy = vowels.slice();
    let consonantsCopy = consonants.slice();
        let vowelGroupsShuffled = [];
        let consonantGroupsShuffled = [];
        if (mode === 'advanced') {
            // Shuffle for advanced (simulate shuffle, but for test, keep order for determinism)
            for (let i = 0; i < vowelsCopy.length; i += 2) {
                vowelGroupsShuffled.push(vowelsCopy.slice(i, i + 2));
            }
            for (let i = 0; i < consonantsCopy.length; i += 3) {
                consonantGroupsShuffled.push(consonantsCopy.slice(i, i + 3));
            }
        } else {
            for (let i = 0; i < vowels.length; i += 2) {
                vowelGroupsShuffled.push(vowels.slice(i, i + 2));
            }
            const consonantGroupIndices = [
                [0,1,2], [3,4,5], [6,7,8], [9,10,11], [12,13,14], [15,16,17], [18,19,20]
            ];
            consonantGroupIndices.forEach(idxArr => {
                consonantGroupsShuffled.push(idxArr.map(idx => consonants[idx]));
            });
        }
        // Simulate user answers and mistakes
        let userAnswers = [];
        let userMistakes = [];
        let allGroups = vowelGroupsShuffled.concat(consonantGroupsShuffled);
        let mistakeCount = 0;
        allGroups.forEach((group, gIdx) => {
            userAnswers[gIdx] = [];
            userMistakes[gIdx] = [];
            group.forEach((item, i) => {
                // Only make mistakes for consonants, not vowels
                let consonantIdx = consonants.findIndex(c => c.char === item.char);
                if (mistakeCount < mistakesToMake && consonantIdx === mistakeCount) {
                    userAnswers[gIdx][i] = 'WRONG';
                    userMistakes[gIdx][i] = true;
                    mistakeCount++;
                } else {
                    userAnswers[gIdx][i] = item.ans;
                    userMistakes[gIdx][i] = false;
                }
            });
        });
        // Now, use the real showResultsScreen logic to build the result HTML
        // (copy the relevant part, but use our simulated state)
        let totalLetters = 0;
        allGroups.forEach(group => { totalLetters += group.length; });
        let totalCorrectFinal = totalLetters - mistakesToMake;
        let html = `<div class="mb-3">Total Correct: <b>${totalCorrectFinal}</b> / ${totalLetters}</div>
            <div class="mb-3">Total Mistakes: <b style='color:#dc3545;'>${mistakesToMake}</b></div>`;
        // Map for quick lookup of user answers/mistakes by char and ans
        let answerMap = {};
        allGroups.forEach((group, gIdx) => {
            group.forEach((item, i) => {
                answerMap[item.char + '|' + item.ans] = { gIdx, i };
            });
        });
        // Vowels: use the original vowels array order
        let vowelItems = [];
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
        let consonantItems = [];
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
        // Display vowels
        html += '<div class="mb-2"><strong>Vowels</strong></div>';
        html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
        vowelItems.forEach(item => {
            let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
            let isMistake = userMistakes[item.gIdx] && userMistakes[item.gIdx][item.i];
            let isCorrect = user === item.ans && !isMistake;
            html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:${isCorrect ? '#28a745' : (isMistake ? '#dc3545' : '#333')}; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
        });
        html += '</div>';
        // Display consonants
        html += '<div class="mb-2"><strong>Consonants</strong></div>';
        html += '<div class="mb-2 d-flex flex-wrap justify-content-center">';
        consonantItems.forEach((item, idx) => {
            let user = (userAnswers[item.gIdx] && userAnswers[item.gIdx][item.i]) ? userAnswers[item.gIdx][item.i].trim().toLowerCase() : '';
            let isMistake = userMistakes[item.gIdx] && userMistakes[item.gIdx][item.i];
            let isCorrect = user === item.ans && !isMistake;
            html += `<span style="font-size:1.5rem; margin:0 10px 10px 0; color:${isCorrect ? '#28a745' : (isMistake ? '#dc3545' : '#333')}; font-weight:bold; display:inline-block; min-width:2.5rem; text-align:center;">${item.char}<br><span style='font-size:1rem; color:#333; font-weight:normal;'>(${item.ans})</span></span>`;
        });
        html += '</div>';
    return html;
    }
})(); // Properly close the IIFE
