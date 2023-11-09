const saveMessageButton = document.querySelector('input[type=button][name=save-contact]') as HTMLButtonElement;
const sendMessageButton = document.querySelector('input[type=submit][name=submit-contact]') as HTMLButtonElement;

let messages: Message[] = [];
let messageDivs: HTMLDivElement[] = [];
let activeMessage: Message;

window.onload = () => {
    saveMessageButton.style.display = "block";
    loadAndPrintMessages();
}

saveMessageButton?.addEventListener("click", e => {
    saveMessageWithStatus(MessageStatus.NOT_SENT);
    loadAndPrintMessages();
});

sendMessageButton?.addEventListener("click", e => {
    saveMessageWithStatus(MessageStatus.SENT);
});

toggleClass(sentButton, 'sent-active');
toggleClass(notSentButton, 'not-sent-active');