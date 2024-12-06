document.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.getElementById("messageForm");
    const messagesList = document.getElementById("messagesList");

    // Load messagens from localStorage
    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messagesList.innerHTML = "";
        messages.forEach((message, index) => addMessageToList(message, index));
    };

    // Save messages to localStorage
    const saveMessages = (messages) => {
        localStorage.setItem("messages", JSON.stringify(messages));
    };

    // Add a message to the list
    const addMessageToList = (message, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>
                De: <strong>${message.sender}</strong><br>Para: ${message.recipient}<br>${message.message}
            </span>
            <button class="btn btn-danger btn-sm" onclick="deleteMessage(${index})">Excluir</button>
        `;
        messagesList.appendChild(li);
    };

    // Add a new message
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const sender = document.getElementById("sender").value;
        const recipient = document.getElementById("recipient").value;
        const message = document.getElementById("message").value;

        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push({ sender, recipient, message });
        saveMessages(messages);
        loadMessages();
        messageForm.reset();
    });

    // Delete a message
    window.deleteMessage = (index) => {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.splice(index, 1);
        saveMessages(messages);
        loadMessages();
    };

    // Initialize the list
    loadMessages();
});
