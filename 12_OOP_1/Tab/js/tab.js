/** @format */

//编写Tab类，用来创建标签页对象
var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.add = this.main.querySelector(".tabadd");
        this.ul = this.main.querySelector(".firstnav ul:first-child"); // 新增
        this.fsection = this.main.querySelector(".tabscon"); // 新增
        this.init();
    } //构造方法
    init() {
        this.add.onclick = function () {
            that.addTab();
        };
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
        }
    }
    toggleTab() {
        that.clearClass();
        this.className = "liactive";
        that.sections[this.index].className = "conactive";
    } //切换标签页
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }
    addTab() {
        this.clearClass(); // 先清除所有的li和section的类
        var li =
            '<li class="liactive"><span>新标签页</span><span class="iconfont icon-close"></span></li>';
        var time = new Date().getTime();
        var section = '<section class="conactive">' + time + "</section>";
        this.ul.insertAdjacentHTML("beforeend", li);
        this.fsection.insertAdjacentHTML("beforeend", section);
    } //添加标签页
    removeTab() {} //删除标签页
    editTab() {} //修改标签页
}
//创建标签页对象
new Tab("#tab");
