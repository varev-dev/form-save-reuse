const saveMessageButton = document.querySelector('input[type=button][name=save-contact]') as HTMLButtonElement;
let messages: Message[] = [];
let activeMessage: Message;

window.onload = () => {
    saveMessageButton.style.display = "block";
    initLocalStorageIfNull()
    loadMessagesFromLocalStorage();
    generateMessages(MessageStatus.NOT_SENT);
    generateMessages(MessageStatus.SENT);
    showHistoryListIfNotEmpty();
}

saveMessageButton?.addEventListener("click", e => {
    loadMessagesFromLocalStorage();
    activeMessage = bindValuesToMessage();
    overrideMessage();
    saveMessages();
});

toggleClass(sentButton, 'sent-active');
toggleClass(notSentButton, 'not-sent-active');