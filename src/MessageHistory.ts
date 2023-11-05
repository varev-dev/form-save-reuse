const sentButton = document.getElementById('toggle-sent') as HTMLButtonElement;
const notSentButton = document.getElementById('toggle-not-sent') as HTMLButtonElement;

const sentList = document.querySelector('.message-sent') as HTMLDivElement;
const notSentList = document.querySelector('.message-not-sent') as HTMLDivElement;

const toggleClass = (button: HTMLButtonElement, className: string) => {
    button?.addEventListener('click', e => {
        button.parentElement?.classList.toggle(className);
    });
}
