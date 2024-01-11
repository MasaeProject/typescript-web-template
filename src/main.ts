export default class Main {
  constructor() {
    /*
    Hi, 从这里开始！
    删除下面这些代码，然后写你自己的代码就可以啦w
    然后用 npm i && npm run serve 来运行这个项目吧！
    根目录下的 index.html 就是生成好的页面。
    有关更多命令，请参阅 css/ts 文件中的注释和 README.md 。
    */
    this.刚进入网页时运行的代码("helloworld");
  }

  刚进入网页时运行的代码(标题框的ID: string) {
    const 标题框: HTMLDivElement = document.getElementById(
      标题框的ID
    ) as HTMLDivElement;
    标题框.innerHTML = "";
    const 标题行: HTMLHeadingElement = document.createElement("h1");
    标题行.innerText = "它运行了！但这里什么都没有。";
    console.warn(标题行.innerText);
    标题框.appendChild(标题行);
    const 内容行: HTMLParagraphElement = document.createElement("p");
    内容行.innerHTML = "请参考源码文件中的注释和 README.md 开始编辑吧！";
    console.log(内容行.innerText);
    标题框.appendChild(内容行);
    const 仓库链接: HTMLAnchorElement = document.createElement("a");
    仓库链接.href = "https://github.com/miyabi-project/typescript-web-template";
    仓库链接.innerText = "浏览在线指南和更新";
    console.log(`${仓库链接.innerText} : ${仓库链接.href}`);
    仓库链接.target = "_blank";
    标题框.appendChild(仓库链接);
  }
}
