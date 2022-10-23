export default class Main {
    constructor() {
        const 标题框: HTMLHeadingElement = document.getElementById('helloworld') as HTMLHeadingElement;
        标题框.innerText = 'Hello World!';
    }
}
