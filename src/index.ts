const saveMessageButton = document.querySelector('input[type=button][name=save-contact]') as HTMLButtonElement;
let messages: Message[] = [];
let messageDivs: HTMLDivElement[] = [];
let activeMessage: Message;

window.onload = () => {
    saveMessageButton.style.display = "block";
    initLocalStorageIfNull()
    loadMessagesFromLocalStorage();
    generateMessages(MessageStatus.NOT_SENT);
    generateMessages(MessageStatus.SENT);
    showHistoryListIfNotEmpty();

    messageDivs.forEach(e => {
        e.addEventListener('click', ev => {
            if (e.getAttribute('message-id') == null)
                return;

            let value = parseInt(e.getAttribute('message-id') as string);
            chooseMessageFromHistory(value);
        });
    });
}

saveMessageButton?.addEventListener("click", e => {
    loadMessagesFromLocalStorage();
    activeMessage = bindValuesToMessage();
    overrideMessage();
    saveMessages();
});

toggleClass(sentButton, 'sent-active');
toggleClass(notSentButton, 'not-sent-active');