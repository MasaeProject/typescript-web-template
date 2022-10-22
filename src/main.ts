export default class Main {
    constructor() {
        const helloworld: HTMLParagraphElement = document.getElementById('helloworld') as HTMLParagraphElement;
        helloworld.innerText = 'Hello World!';
    }
}