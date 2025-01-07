const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";

let conversation = [];

sendButton.addEventListener("click", () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    updateChatBox("User: " + userMessage);

    conversation.push({ role: "user", content: userMessage });

    fetchChatGPTResponse(conversation)
        .then(response => {
            const message = response.choices[0].message.content;
            updateChatBox("ChatGPT: " + message);

            conversation.push({ role: "assistant", content: message });
        })
        .catch(error => {
            console.error("Error:", error);
        });

    userInput.value = "";
});

function updateChatBox(message) {
    chatBox.innerHTML += "<p>" + message + "</p>";
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchChatGPTResponse(conversation) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    };

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: conversation
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    return response.json();
}

userInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault(); // 기본 Enter 키 동작 방지
        sendUserMessage();
    }
});

sendButton.addEventListener("click", sendUserMessage);

// 사용자 메시지 전송 함수
function sendUserMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    updateChatBox("User: " + userMessage);

    conversation.push({ role: "user", content: userMessage });

    fetchChatGPTResponse(conversation)
        .then(response => {
            const message = response.choices[0].message.content;
            updateChatBox("ChatGPT: " + message);

            conversation.push({ role: "assistant", content: message });
        })
        .catch(error => {
            console.error("Error:", error);
        });

    userInput.value = "";
}
