//gpt 모델
const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');

// OpenAI에서 발급한 API 키
const apiKey = '';  // 🔒 반드시 실제 OpenAI 키로 교체
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.append(messageElement);  // append로 UX 개선
}

async function fetchAIResponse(prompt) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 또는 "gpt-4" 가능
            messages: [
                { role: "user", content: prompt }
            ],
            max_tokens: 512
        }),
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            return data.choices[0].message.content;
        } else if (data.error) {
            console.error('API 오류:', data.error.message);
            return `[오류] ${data.error.message}`;
        } else {
            console.error('응답 형식 이상:', data);
            return '[오류] 알 수 없는 응답입니다.';
        }
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return '[오류] 네트워크 오류 또는 서버 응답 없음';
    }
}

sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message.length === 0) return;

    addMessage('나', message);
    userInput.value = '';

    const aiResponse = await fetchAIResponse(message);
    addMessage('챗봇', aiResponse);
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});


//무료모델
// const chatMessages = document.querySelector('#chat-messages');
// const userInput = document.querySelector('#user-input input');
// const sendButton = document.querySelector('#user-input button');

// // OpenRouter에서 발급한 API 키
// const apiKey = '';
// const apiEndpoint = 'https://openrouter.ai/api/v1/chat/completions';

// function addMessage(sender, message) {
//     const messageElement = document.createElement('div');
//     messageElement.className = 'message';
//     messageElement.textContent = `${sender}: ${message}`;
//     chatMessages.append(messageElement);  // append가 채팅 UX에 더 적합
// }

// async function fetchAIResponse(prompt) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//             'HTTP-Referer': 'http://localhost',
//             'X-Title': 'My Chatbot'
//         },
//         body: JSON.stringify({
//             model: "google/gemma-3n-e2b-it:free",  // ✅ 검증된 모델명
//             messages: [
//                 { role: "user", content: prompt }
//             ],
//             max_tokens: 512  // 보수적으로 설정
//         }),
//     };

//     try {
//         const response = await fetch(apiEndpoint, requestOptions);
//         const data = await response.json();

//         // 에러 메시지 출력
//         if (data.choices && data.choices.length > 0 && data.choices[0].message) {
//             return data.choices[0].message.content;
//         } else if (data.error) {
//             console.error('API 오류:', data.error.message);
//             return `[오류] ${data.error.message}`;
//         } else {
//             console.error('응답 형식 이상:', data);
//             return '[오류] 알 수 없는 응답입니다.';
//         }
//     } catch (error) {
//         console.error('OpenRouter API 호출 중 오류 발생:', error);
//         return '[오류] 네트워크 오류 또는 서버 응답 없음';
//     }
// }

// sendButton.addEventListener('click', async () => {
//     const message = userInput.value.trim();
//     if (message.length === 0) return;

//     addMessage('나', message);
//     userInput.value = '';

//     const aiResponse = await fetchAIResponse(message);
//     addMessage('챗봇', aiResponse);
// });

// userInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         sendButton.click();
//     }
// });
