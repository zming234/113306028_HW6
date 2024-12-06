
function generateAnswer() {
    const digits = Array.from({ length: 10 }, (_, i) => i);
    const answer = [];
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * digits.length);
        answer.push(digits.splice(index, 1)[0]);
    }
    return answer;
}

// 核心變數
const answer = generateAnswer();
let attempts = 0;

// 驗證輸入是否有效
function validateInput(input) {
    if (input.length !== 4 || isNaN(input)) {
        alert("請輸入 4 位數字！");
        return false;
    }
    const digits = input.split('');
    if (new Set(digits).size !== digits.length) {
        alert("數字不能重複！");
        return false;
    }
    return true;
}

// 計算 XAYB
function calculateResult(input) {
    const inputArray = input.split('').map(Number);
    let A = 0, B = 0;

    inputArray.forEach((digit, index) => {
        if (digit === answer[index]) {
            A++;
        } else if (answer.includes(digit)) {
            B++;
        }
    });

    return `${A}A${B}B`;
}

// 提交答案的邏輯
function submitGuess() {
    const inputField = document.getElementById('guessInput');
    const guess = inputField.value;

    if (!validateInput(guess)) return;

    attempts++;
    const result = calculateResult(guess);

    // 顯示結果
    const resultsDiv = document.getElementById('results');
    const newResult = document.createElement('p');
    newResult.textContent = `第 ${attempts} 次: ${guess} => ${result}`;
    resultsDiv.appendChild(newResult);

    if (result === '4A0B') {
        alert(`恭喜答對！總共嘗試了 ${attempts} 次！`);
        location.reload(); // 重置遊戲
    }

    inputField.value = ''; // 清空輸入框
}