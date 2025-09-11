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
        if (solvedStages[stage] && stage < window.vowelGroupsShuffled.length + window.consonantGroupsShuffled.length - 1) html += '<button class="btn btn-secondary" id="nextStageBtn">Next</button>';
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
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. The correct answers are shown in green. Please enter all correct answers to continue.`;
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
    });
})();
