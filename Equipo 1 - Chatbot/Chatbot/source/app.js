class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector(".chatbox__button"),
            chatBox: document.querySelector(".chatbox__support"),
            sendButton: document.querySelector(".send__button"),
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener("click", () => this.toggleState(chatBox));

        sendButton.addEventListener("click", () => this.onSendButton(chatBox));

        const node = chatBox.querySelector("input");
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add("chatbox--active");
        } else {
            chatbox.classList.remove("chatbox--active");
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector("input");
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: JSON.stringify({
                message: text1,
                old_children:
                    this.messages[this.messages.length - 2] == undefined
                        ? []
                        : this.messages[this.messages.length - 2]["children"],
            }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((r) => {
                let msg2 = {
                    name: "Asistente Virtual Atizapan",
                    message: r.answer,
                    link: r.link,
                    type: r.type,
                    children: r.children,
                };
                if (r == "Error interno") {
                    let msg2 = {
                        name: "Asistente Virtual Atizapan",
                        message:
                            "Lo siento, por el momento no tengo la respuesta. Intenta más tarde.",
                        link: null,
                        type: null,
                        children: [],
                    };
                    this.messages.push(msg2);
                    this.updateChatText(chatbox);
                    textField.value = "";
                } else {
                    this.messages.push(msg2);
                    this.updateChatText(chatbox);
                    textField.value = "";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                this.updateChatText(chatbox);
                textField.value = "";
            });
    }

    updateChatText(chatbox) {
        var html = "";
        this.messages
            .slice()
            .reverse()
            .forEach(function (item, index) {
                if (item.name === "Asistente Virtual Atizapan") {
                    if (item.type == 3) {
                        html +=
                            '<div class="messages__item messages__item--visitor_link">' +
                            "<a href=" +
                            item.link +
                            ">" +
                            "Clic aquí ..." +
                            "</a>" +
                            "</div>" +
                            '<div class="messages__item messages__item--visitor">' +
                            item.message +
                            "</div>";
                    } else {
                        html +=
                            '<div class="messages__item messages__item--visitor">' +
                            item.message +
                            "</div>";
                    }
                } else {
                    html +=
                        '<div class="messages__item messages__item--operator">' +
                        item.message +
                        "</div>";
                }
            });

        const chatmessage = chatbox.querySelector(".chatbox__messages");
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();