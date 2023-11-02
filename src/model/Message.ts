export class Message {
    private _fullName: string;
    private _emailAddress: string;
    private _contactType: ContactType;
    private _category: MessageCategory;
    private _title: string;
    private _content: string;
    private _status: MessageStatus;

    constructor(fullName: string, emailAddress: string, contactType: ContactType, category: MessageCategory,
                title: string, content: string, status: MessageStatus) {
        this._fullName = fullName;
        this._emailAddress = emailAddress;
        this._contactType = contactType;
        this._category = category;
        this._title = title;
        this._content = content;
        this._status = status;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get contactType(): ContactType {
        return this._contactType;
    }

    set contactType(value: ContactType) {
        this._contactType = value;
    }

    get category(): MessageCategory {
        return this._category;
    }

    set category(value: MessageCategory) {
        this._category = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get status(): MessageStatus {
        return this._status;
    }

    set status(value: MessageStatus) {
        this._status = value;
    }
}

enum ContactType {
    PRIVATE, BUSINESS
}

enum MessageCategory {
    PROJECT_ORDER, JOB_OFFER, OTHER
}

enum MessageStatus {
    UNSENT, SENT
}