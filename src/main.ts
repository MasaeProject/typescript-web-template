export default class Main {
  constructor() {
    // 網頁載入完成後執行的程式碼
    const 标题框: HTMLHeadingElement = document.getElementById(
      "helloworld"
    ) as HTMLHeadingElement;
    标题框.innerText = "Hello World!";
  }
}
