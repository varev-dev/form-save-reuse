let messages: Message[] = [];
let activeMessage: Message;

const initLocalStorageIfNull = () => {
    if (localStorage.getItem('messages') == null)
        localStorage.setItem('messages', '');
}

const loadMessagesFromLocalStorage = () => {
    let array = localStorage.getItem('messages') as string;

    try {
        messages = <Message[]> JSON.parse(array);
    } catch (e) {}
}

const saveMessages = () => {
    localStorage.setItem('messages', JSON.stringify(messages));
}

const overrideMessage = () => {
    let index = messages.indexOf(
        messages.filter((message) => message?.title === activeMessage.title)[0]
    );

    index != -1 ? messages[index] = activeMessage : messages.push(activeMessage);
}

const bindValuesToMessage = (): Message => {
    let message = new Message("", "", ContactType.PRIVATE, MessageCategory.OTHER,
        "", "", MessageStatus.UNSENT);

    message.fullName = inputValue("fullName");
    message.emailAddress = inputValue("email");
    message.title = inputValue("messageTitle");
    message.content = inputValue("messageContent");

    const category = (document.getElementById("category") as HTMLSelectElement)?.value;
    message = setEnumValueInMessage(message, category, "MessageCategory");

    const contactType = (document.querySelector("input[name=contactType]:checked") as HTMLInputElement)?.value;
    message = setEnumValueInMessage(message, contactType, "ContactType");

    return message;
}

const setEnumValueInMessage = (message: Message, value: string, enumName: string): Message => {
    let enumClass: any;

    switch (enumName) {
        case "ContactType":
            enumClass = ContactType;
            break;
        case "MessageCategory":
            enumClass = MessageCategory;
            break;
        default:
            return message;
    }

    for (let enumKey in enumClass) {
        if (value === enumKey) {
            enumClass === MessageCategory ? message.category = enumClass[enumKey as keyof typeof enumClass] : "";
            enumClass === ContactType ? message.contactType = enumClass[enumKey as keyof typeof enumClass] : "";
            break;
        }
    }

    return message;
}

const inputValue = (elementId: string): string => {
    const element = document.getElementById(elementId) as HTMLInputElement;

    return element?.value;
}