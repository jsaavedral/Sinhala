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
        {char:'ණ',ans:'ṇa'}, {char:'ත',ans:'ta'}, {char:'ද',ans:'da'},
        {char:'ම',ans:'ma'}, {char:'ය',ans:'ya'}, {char:'ර',ans:'ra'},
        {char:'න',ans:'na'}, {char:'ප',ans:'pa'}, {char:'බ',ans:'ba'},
        {char:'ල',ans:'la'}, {char:'ව',ans:'va'}, {char:'ස',ans:'sa'},
        {char:'හ',ans:'ha'}, {char:'ළ',ans:'la'}, {char:'අං',ans:'am'}
    ];
    const consonantGroups = [];
    for (let i = 0; i < 21; i += 3) {
        consonantGroups.push(consonants.slice(i, i + 3));
    }
    // Game state
    let stage = 0; // 0..5: vowel groups, 6..12: consonant groups
    let attempts = 0;
    let solvedStages = {};

    function showGameModal() {
        document.getElementById('alphabetGameModal').style.display = 'flex';
        stage = 0;
        attempts = 0;
        solvedStages = {};
        renderStage();
    }
    function closeGameModal() {
        document.getElementById('alphabetGameModal').style.display = 'none';
    }
    function renderStage() {
        const body = document.getElementById('alphabetGameBody');
        let html = '';
        let isVowel = stage < vowelGroups.length;
        let groupIdx = isVowel ? stage : stage - vowelGroups.length;
        let group = isVowel ? vowelGroups[groupIdx] : consonantGroups[groupIdx];
        let groupType = isVowel ? 'Vowels' : 'Consonants';
        html += `<h5>${groupType} (Group ${groupIdx+1})</h5>`;
        html += `<form id="alphaForm">`;
        group.forEach((item, i) => {
            html += `<div class="mb-2 alphabet-game-row d-flex align-items-center" style="flex-wrap:nowrap;overflow-x:auto;"><span style="font-size:2rem; min-width:2.5rem;">${item.char}</span> <input type="text" class="alpha-input" data-idx="${i}" maxlength="5" style="width:60px; margin-right:10px;" /> <span class="answer-hint" id="answer-hint-${i}" style="color:#28a745; font-weight:bold; margin-left:10px; min-width:2.5rem; white-space:nowrap;"></span></div>`;
        });
        html += '<button type="button" class="btn btn-primary mt-2" id="checkAlphaBtn">Check My Answer</button>';
        html += '<div id="alphaResult" class="mt-2"></div>';
        html += '</form>';
        // Navigation
        html += '<div class="mt-3">';
        if (stage > 0) html += '<button class="btn btn-secondary me-2" id="prevStageBtn">Previous</button>';
        if (solvedStages[stage] && stage < vowelGroups.length + consonantGroups.length - 1) html += '<button class="btn btn-secondary" id="nextStageBtn">Next</button>';
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
                if (inp.value.trim().toLowerCase() === group[i].ans) {
                    correct++;
                    document.getElementById(`answer-hint-${i}`).textContent = '';
                } else {
                    mistakes.push(i);
                }
            });
            attempts++;
            if (correct === group.length) {
                solvedStages[stage] = true;
                document.getElementById('alphaResult').innerHTML = `Correct! You got all ${group.length} right.`;
                setTimeout(() => {
                    if (stage < vowelGroups.length + consonantGroups.length - 1) {
                        stage++;
                        attempts = 0;
                        renderStage();
                    }
                }, 1000);
            } else if (attempts >= 3) {
                // Show correct answers next to each input for mistakes
                mistakes.forEach(i => {
                    document.getElementById(`answer-hint-${i}`).textContent = group[i].ans;
                });
                solvedStages[stage] = true;
                document.getElementById('alphaResult').innerHTML = `You got ${correct} out of ${group.length} correct. The correct answers are shown in green.`;
                // Allow next after showing answers
                renderStageNavOnly();
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
    // Button event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const playBtn = document.getElementById('playAlphabetGameBtn');
        if (playBtn) playBtn.onclick = showGameModal;
        const closeBtn = document.getElementById('closeAlphabetGameBtn');
        if (closeBtn) closeBtn.onclick = closeGameModal;
    });
})();
