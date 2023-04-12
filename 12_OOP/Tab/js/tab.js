// 编写Tab类，用来创建标签页对象
class Tab {
  // 构造方法
  constructor(id) {
    this.main = document.querySelector(id);					        // 大盒子
    // this.lis = this.main.querySelectorAll('li');				    // 小标签
    // this.sections = this.main.querySelectorAll('section');	// 内容区域
    this.add = this.main.querySelector('.tabadd');          // 新增代码
    this.ul = this.main.querySelector('.firstnav ul:first-child'); // 新增
    this.fsection = this.main.querySelector('.tabscon');           // 新增
    this.init();
  }
  init() {
    this.updateNode();	// 放在初始化的时候调用
    var that = this;
    this.add.onclick = function () {
      that.addTab();
    };
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = function () {
        console.log(this.index);  // 目前只获取标签的索引，其他操作在后面实现
        that.toggleTab(this);
      };
      this.remove[i].onclick = function (e) {
        that.removeTab(this, e);
      };
      this.spans[i].ondblclick = function () {
        that.editTab(this);
      };
      this.sections[i].ondblclick = function () {
        that.editTab(this);
      };
    }
  }
  // 切换标签页
  toggleTab(el) {
    this.clearClass();
    el.className = 'liactive';
    this.sections[el.index].className = 'conactive';
  }
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  // 添加标签页
  addTab() {
    this.clearClass();  // 先清除所有的li和section的类
    var li = '<li class="liactive"><span>新标签页</span><span class="iconfont icon-close"></span></li>';
    var time = new Date().getTime();
    var section = '<section class="conactive">' + time + '</section>';
    this.ul.insertAdjacentHTML('beforeend', li);
    this.fsection.insertAdjacentHTML('beforeend', section);
    this.init();			// 在添加标签页后调用
  }
  updateNode() {
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.icon-close');
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
  }
  // 删除标签页
  removeTab(el, e) {
    e.stopPropagation();		          // 阻止冒泡，防止触发li的click事件切换标签页
    var index = el.parentNode.index;	// 获取父元素的索引
    this.lis[index].remove();
    this.sections[index].remove();
    this.init();
    if (!this.main.querySelector('.liactive')) {
      this.lis[index - 1] && this.lis[index - 1].click();
    }
  }
  // 修改标签页
  editTab(el) {
    var str = el.innerHTML;
    el.innerHTML = '<input type="text">';
    var input = el.children[0];
    input.value = str;
    input.select();                 // 文本框中的文本全选
    input.onblur = function () {    // 离开文本框后，修改标签页标题
      this.parentNode.innerHTML = this.value;
    };
    input.onkeyup = function (e) {  // 按回车后修改标签页标题
      if (e.keyCode === 13) {
        this.blur();                // 触发blur事件，完成修改
      }
    };
  }
}
// 创建标签页对象
new Tab('#tab');
