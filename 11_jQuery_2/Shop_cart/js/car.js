$(function () {
  $(".checkall").change(function () {
    $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    getSum();	// 调用
    if ($(this).prop("checked")) {
      $(".cart-item").addClass("check-cart-item");
    } else {
      $(".cart-item").removeClass("check-cart-item");
    }
  });
  $(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
    getSum();	// 调用
    if ($(this).prop("checked")) {
      $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item");
    }
  });
  $(".increment").click(function () {
    // 得到当前兄弟文本框的值
    var n = $(this).siblings(".itxt").val();
    n++;
    $(this).siblings(".itxt").val(n);
    // 以下是新增代码
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    var price = (p * n).toFixed(2);  // 将计算结果保留2位小数
    $(this).parents(".p-num").siblings(".p-sum").html("¥" + price);
    getSum();	// 调用
  });
  $(".decrement").click(function () {
    // 得到当前兄弟文本框的值
    var n = $(this).siblings(".itxt").val();
    if (n == 1) {
      return false;
    }
    n--;
    $(this).siblings(".itxt").val(n);
    // 将“+”按钮中新增的代码复制到此处即可
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    var price = (p * n).toFixed(2);  // 将计算结果保留2位小数
    $(this).parents(".p-num").siblings(".p-sum").html("¥" + price);
    getSum();	// 调用
  });
  $(".itxt").change(function () {
    // 先得到文本框的里面的值，然后乘以当前商品的单价
    var n = $(this).val();
    // 当前商品的单价
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    var price = (p * n).toFixed(2);
    $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
    getSum();	// 调用
  });
  function getSum() {
    // 计算总件数
    var count = 0;
    var item = $(".j-checkbox:checked").parents(".cart-item");
    item.find(".itxt").each(function (i, ele) {
      count += parseInt($(ele).val());
    });
    $(".amount-sum em").text(count);
    // 计算总额
    var money = 0;
    item.find(".p-sum").each(function (i, ele) {
      money += parseFloat($(ele).text().substr(1));
    });
    $(".price-sum em").text("¥" + money.toFixed(2));
  }
  getSum();
  $(".p-action a").click(function () {
    $(this).parents(".cart-item").remove();
    getSum();
  });
  $(".remove-batch").click(function () {
    $(".j-checkbox:checked").parents(".cart-item").remove();
    getSum();
  });
  $(".clear-all").click(function () {
    $(".cart-item").remove();
    getSum();
  })
});
