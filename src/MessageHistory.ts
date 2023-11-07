const sentButton = document.getElementById('toggle-sent') as HTMLButtonElement;
const notSentButton = document.getElementById('toggle-not-sent') as HTMLButtonElement;

const sentList = document.querySelector('.message-sent') as HTMLDivElement;
const notSentList = document.querySelector('.message-not-sent') as HTMLDivElement;

const messageHistory = document.querySelector('.messages') as HTMLDivElement;
const imageHistory = document.querySelector('.contact-history img') as HTMLDivElement;

const showHistoryListIfNotEmpty = () => {
    if (sentList.hasChildNodes() || notSentList.hasChildNodes()) {
        messageHistory.style.display = "flex";
        imageHistory.style.display = "none";
    }
}

const generateMessages = (status: MessageStatus) => {
    messages
        .filter((message) => message.status == status && message.title != '')
        .forEach((message) => {
            createMessageDiv(message, status == MessageStatus.SENT ? sentList : notSentList);
        });
}

const createMessageDiv = (message: Message, parent: HTMLDivElement) => {
    let messageRoot = document.createElement('div');
    messageRoot.classList.add('message');
    messageRoot.setAttribute('message-id', messages.indexOf(message).toString());

    let title = document.createElement('h5');
    title.classList.add('message-title');
    title.textContent = message.title.substring(0, 30);
    message.title.length >= 30 ? title.textContent += "..." : "";

    let typeAndCategory = document.createElement('p');
    typeAndCategory.classList.add('message-type-category');
    typeAndCategory.textContent = message.contactType + " | " + message.category;

    messageRoot.append(title);
    messageRoot.append(typeAndCategory);

    parent.append(messageRoot);
    messageDivs.push(messageRoot);
}

const chooseMessageFromHistory = (messageId: number) => {
    if (messageId >= messages.length)
        return;

    let message = messages[messageId] as Message;
    messages.splice(messageId, 1);

    setValueOfInput('fullName', message.fullName);
    setValueOfInput('email', message.emailAddress);
    setValueOfInput('messageTitle', message.title);
    setValueOfInput('messageContent', message.content);
    radioButtonCheckValue('contactType', message.contactType);
    selectOption('category', message.category);
}

const toggleClass = (button: HTMLButtonElement, className: string) => {
    button?.addEventListener('click', e => {
        button.parentElement?.classList.toggle(className);
    });
}
