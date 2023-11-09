const sentButton = document.getElementById('toggle-sent') as HTMLButtonElement;
const notSentButton = document.getElementById('toggle-not-sent') as HTMLButtonElement;

let sentList = document.querySelector('.message-sent') as HTMLDivElement;
let notSentList = document.querySelector('.message-not-sent') as HTMLDivElement;

const messageHistory = document.querySelector('.messages') as HTMLDivElement;
const imageHistory = document.querySelector('.contact-history img') as HTMLDivElement;

const showHistoryListIfNotEmpty = (): void => {
    if (sentList.childNodes.length > 0 || notSentList.childNodes.length > 0) {
        messageHistory.style.display = "flex";
        imageHistory.style.display = "none";
        return;
    }
    messageHistory.style.display = "none";
    imageHistory.style.display = "block";
    return;
}

const generateMessages = (status: MessageStatus): void => {
    messages
        .filter((message) => message.status == status && message.title != '')
        .forEach((message) => {
            createMessageDiv(message, status == MessageStatus.SENT ? sentList : notSentList);
        });
}

const createMessageDiv = (message: Message, parent: HTMLDivElement): void => {
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

const removeMessageDivs = (messageDivs: HTMLDivElement[]): void => {
    messageDivs.forEach(message => {
        message.remove();
    });
}

const chooseMessageFromHistory = (messageId: number): void => {
    if (messageId >= messages.length)
        return;

    let message = messages[messageId] as Message;
    messages.splice(messageId, 1);

    setValueOfInput('fullName', message.fullName);
    setValueOfInput('email', message.emailAddress);
    setValueOfInput('messageTitle', message.title);
    setValueOfTextArea('messageContent', message.content);
    radioButtonCheckValue('contactType', message.contactType);
    selectOption('category', message.category);
}

const toggleClass = (button: HTMLButtonElement, className: string): void => {
    button?.addEventListener('click', e => {
        button.parentElement?.classList.toggle(className);
    });
}

const loadMessagesFromLocalStorage = (): void => {
    let array = localStorage.getItem('messages') as string;
    messages = [];

    try {
        let message  = new Message("", "", ContactType.PRIVATE, MessageCategory.OTHER,
            "", "", MessageStatus.NOT_SENT);

        JSON.parse(array, (key, value) => {
            switch (key) {
                case "_fullName": message.fullName = value; break;
                case "_emailAddress": message.emailAddress = value; break;
                case "_contactType": message = setEnumValueInMessage(message, value, "ContactType"); break;
                case "_category": message = setEnumValueInMessage(message, value, "MessageCategory"); break;
                case "_title": message.title = value; break;
                case "_content": message.content = value; break;
                case "_status": message = setEnumValueInMessage(message, value, "MessageStatus"); break;
                default:
                    messages.push(message);
                    message  = new Message("", "", ContactType.PRIVATE, MessageCategory.OTHER,
                        "", "", MessageStatus.NOT_SENT);
                    break;
            }
        });
    } catch (e) {}
}

const initLocalStorageIfNull = (): void => {
    if (localStorage.getItem('messages') == null)
        localStorage.setItem('messages', '');
}

const loadAndPrintMessages = (): void => {
    initLocalStorageIfNull();
    loadMessagesFromLocalStorage();
    removeMessageDivs(messageDivs);
    sentList = document.querySelector('.message-sent') as HTMLDivElement;
    notSentList = document.querySelector('.message-not-sent') as HTMLDivElement;
    generateMessages(MessageStatus.NOT_SENT);
    generateMessages(MessageStatus.SENT);
    messageClickListener(messageDivs);
    showHistoryListIfNotEmpty();
}

const messageClickListener = (messageDivs: HTMLDivElement[]): void => {
    messageDivs.forEach(e => {
        e.addEventListener('click', ev => {
            if (e.getAttribute('message-id') == null)
                return;

            let value = parseInt(e.getAttribute('message-id') as string);
            chooseMessageFromHistory(value);
            saveMessages();
            loadAndPrintMessages();
        });
    });
}