const saveMessageButton = document.querySelector('input[type=button][name=save-contact]') as HTMLButtonElement | null;

initLocalStorageIfNull()
loadMessagesFromLocalStorage();
saveMessageButton?.addEventListener("click", e => {
    loadMessagesFromLocalStorage();
    activeMessage = bindValuesToMessage();
    overrideMessage();
    saveMessages();
});
