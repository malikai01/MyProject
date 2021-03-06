var i=1;
function nextStep() {
    if($('#loginName').val()=="" ){
        alert("家庭名称不能为空");
        return false;
    }
    if($('#password').val()=="" ){
        alert("密码不能为空");
        return false;
    }
    checkPassword();
    checkCode()
    var loginName = $("#loginName").val();
    var password = $("#password").val();
    $.ajax({
        url :'/home-web/manager/register/add',
        type : 'POST',
        cache : false,
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ 'loginName' : loginName ,'password' : password }),
        success : function(data) {
            if(data.success){
                //alert(data.msg);
                var loginId=data.obj;
                window.location="/home-web/manager/register/nextStep/"+loginId;
            }else{
                alert(data.msg);
            }
        },error :function(){
            alert("网络异常，请稍后再试");
        }
    });
}

function addList() {
    alert($("#bankListTable").html());
}

function add_tr(obj) {
    var tr = $(obj).parent().parent();
    tr.after(tr.clone());
}
function del_tr(obj) {
    $(obj).parent().parent().remove();
}

function saveBinding(e){
    var name=$('#name').val();
    var age=$('#age').val();
    var memo=$('#memo').val();
    var gender=$('#gender').val();
    var relation=$('#relation').val();
    var loginId=$('#loginId').val();
    var id = $('#id').val();

    var $btn = $(e);
    $btn.button('loading');

    setTimeout(function() {
        $.ajax({
            url:"/home-web/manager/register/binding",
            contentType: "application/json;charset=utf-8",
            clearForm : false,
            resetForm : false,
            type : 'post',
            data: JSON.stringify({ 'id' : id,'name' : name ,'age' : age,'memo' : memo,'gender' : gender,'relation' : relation,'loginId':loginId }),
            success : function(data) {
                $btn.button('reset');
                if(data.success){
                    alert(data.msg);
                    getBinding(data);
                    emptyBinding();
                }else{
                    alert(data.msg);
                }
            },error:function(data){
                alert("网络异常，请稍后再试");
                $btn.button('reset');
            }
        });
    }, 100);
}

function getBinding(data){
    $("#bindingTable tbody").html('');
    var htmlt="";
    var data = data.obj;//得到一个LIST
    if(data){
        for(var i = 0;i<data.length;i++){  //循环LIST
            var binding = data[i];//获取LIST里面的对象
            var gender= binding.gender=="00"?"男":"女";
            var name = binding.name == null?"": binding.name;
            var age = binding.age == null ? "":binding.age;
            var relation = binding.relation == null ? "" : binding.relation;
            var memo = binding.memo == null || binding.memo == "null" ? "":binding.memo;
            htmlt=htmlt+'<tr>';
            htmlt=htmlt+'<td style="word-wrap:break-word;word-break:break-all;">'+name+'</td>';
            htmlt=htmlt+'<td>'+age+'</td>';
            htmlt=htmlt+'<td style="word-wrap:break-word;word-break:break-all;">'+relation+'</td>';
            htmlt=htmlt+'<td>'+gender+'</td>';
            htmlt=htmlt+'<td style="word-wrap:break-word;word-break:break-all;">'+memo+'</td>';
            htmlt=htmlt+'<td style="word-wrap:break-word;word-break:break-all;">';
            htmlt=htmlt+'<a href="javascript:;"  class="blue" style="padding-right:5px" onclick="editBinding(\''+binding.id+'\',\''+binding.name+'\',\''+binding.age+'\',\''+binding.relation+'\',\''+binding.gender+'\',\''+binding.memo+'\')">编辑</a>';
            htmlt=htmlt+'<a href="javascript:;"  class="blue"  onclick="delBinding(\''+binding.id+'\')">删除</a>';

            htmlt=htmlt+'</td></tr>';
        }
    }
    $("#bindingTable tbody").html(htmlt);
}

function editBinding(id,name,age,relation,gender,memo){
    emptyBinding();
    $("#id").val(id);
    $("#name").val(name);
    $("#age").val(age);
    $("#relation").val(relation);
    $("#gender").val(gender);
    $("#memo").val(memo);
    $("#name").focus()
}

function emptyBinding(){
    $("#id").val("");
    $("#name").val("");
    $("#age").val("");
    $("#relation").val("");
    $("#gender").val("");
    $("#memo").val("");

}

function delBinding(id){

    if(confirm("您确定要删除这条绑定信息吗")){
        $.ajax({
            type : "post",
            async:false,
            cache:false,
            url :"/home-web/manager/register/cancelBinding/"+id,
            dataType : "json",
            success : function(data) {
                if(data.success){
                    alert(data.msg);
                    getBinding(data);
                    emptyBinding();
                }else{
                    alert(data.msg);
                }
            },error:function(data){
               alert("网络异常,请稍后再试!");
            }
        });

    }
}

function toLogin() {
    window.location="/home-web/manager/login";
}

function checkPassword() {
    var password = $('#password').val();
    var confirm = $('#confirm').val();
    if(password != confirm){
        alert("密码不一致");
    }
}
// 验证码验证
function checkCode() {
    var code = $("#veryCode").val();
    // alert(code);
    $.ajax({
        type : "POST",
        url : "/home-web/veryCode/checkCode",
        data : {"code":code},
        success : function (data) {
            if(data==0){
                alert("验证码失效");
                return false;
            }
        }
    });
}


function validateInputValue(ele, isCheckAll) {
    if (isCheckAll || $(ele).attr('id') == 'username') {
        if ($("#username").val().length <= 0) {
            showTips($('#username'), false, "姓名为必填项 请填写");
            return false;
        }
        if (!Util.checkValue($("#username").val(), YUI.Validator.RULES['name12'])) {
            showTips($('#username'), false, "您的名称格式不符,请重新输入填项");
            return false;
        }
        if (Util.checkForbiddenChar('/bsp', $("#username").val())) {
            showTips($('#username'), false, "包含非法字符，请重新输入");
            return false;
        }
        showTips($('#username'), true);
    }

    //证件号码
    if (isCheckAll || $(ele).attr('id') == 'cardNumber') {
        if ($("#cardNumber").val().length <= 0) {
            showTips($('#cardNumber'), false, "身份证号码为必填项，请填写");
            return false;
        }
        if (!Util.checkValue($("#cardNumber").val(), YUI.Validator.RULES['name122'])) {
            showTips($('#cardNumber'), false, "身份证号码格式错误，请正确填写");
            return false;
        }
        var result = Util.ajaxValidate("/bsp/userRegister/checkCarNum", {cardNumber: $('#cardNumber').val()}, function (data) {
            if (data.result) {
                showTips($('#cardNumber'), false, "已有用户使用该身份证注册");
            }
            return data.result;
        }, "json");
        if (!result) {
            showTips($('#cardNumber'), true);
        } else {
            return result;
        }
    }

    //登录账号
    if (isCheckAll || $(ele).attr('id') == 'loginNickName') {
        if ($("#loginNickName").val().length <= 0) {
            showTips($('#loginNickName'), false, "登录账号为必填项");
            return false;
        }
        var reg = /^[uUvV].*$/;
        if (reg.test($('#loginNickName').val())) {
            showTips($('#loginNickName'), false, "登录账号不能以u、U、v、V开头");
            return false;
        }
        if (!isNaN($('#loginNickName').val())) {
            showTips($('#loginNickName'), false, "6-18个字符，由字母、数字或下划线组成");
            return false;
        }
        if (!Util.checkValue($("#loginNickName").val(), YUI.Validator.RULES['username2'])) {
            showTips($('#loginNickName'), false, "6-18个字符，由字母、数字或下划线组成");
            return false;
        }
        if (Util.checkForbiddenChar('/bsp', $("#loginNickName").val())) {
            showTips($('#loginNickName'), false, "包含非法字符，请重新输入");
            return false;
        }
        var result = Util.ajaxValidate("/bsp/userRegister/checkUserName", {username: $('#loginNickName').val()}, function (data) {
            if (data == "success") {
                return true;
            } else if (data == "failure") {
                showTips($('#loginNickName'), false, "对不起，该账号已被注册，请更换账号");
                return false;
            }
        }, "text");
        if (result) {
            showTips($('#loginNickName'), true);
        } else {
            return result;
        }
    }

    //密码
    if (isCheckAll || $(ele).attr('id') == 'password') {
        if ($("#password").val().length <= 0) {
            showTips($('#password'), false, "密码为必填项");
            return false;
        }
        //校验密码是否为组合形式
        if(YUI.Validator.RULES['password2_1'].test($("#password").val()) || YUI.Validator.RULES['password2_2'].test($("#password").val())
            || YUI.Validator.RULES['password2_3'].test($("#password").val())){
            showTips($('#password'), false, "8—20个字符，组合字母、数字或符号(两种或以上)");
            return false;
        }
        if (!Util.checkValue($("#password").val(), YUI.Validator.RULES['password2'], isCheckAll)) {
            showTips($('#password'), false, "8—20个字符，组合字母、数字或符号(两种或以上)");
            return false;
        }
        showTips($('#password'), true);
    }

    //确认密码
    if (isCheckAll || $(ele).attr('id') == 'confirm-password') {
        if (!Util.checkValue($("#confirm-password").val(), null, isCheckAll)) {
            showTips($('#confirm-password'), false, "两次输入密码不一致");
            return false;
        }
        if ($("#confirm-password").val() != $("#password").val()) {
            showTips($('#confirm-password'), false, "两次输入密码不一致");
            return false;
        }
        showTips($('#confirm-password'), true);
    }

    //手机号码
    if (isCheckAll || $(ele).attr('id') == 'mobile') {
        var phone = $("#mobile").val();
        if (phone == null || $.trim(phone) == '') {
            showTips($('#mobile'), false, "请输入手机号码");
            return false;
        }
        var reg = YUI.Validator.RULES['mobile'];//11位数字为手机号码
        if (!reg.test($.trim(phone))) {
            showTips($('#mobile'), false, "手机号码格式不正确");
            return false;
        }
        var data = {mobile: document.getElementById('mobile').value};
        var result = Util.ajaxValidate("/bsp/userRegister/checkMobile", {mobile: $('#mobile').val()}, function (data) {
            if (data.result) {
                showTips($('#mobile'), false, "已有用户使用该手机注册");
            }
            return data.result;
        }, "json");
        if (!result) {
            showTips($('#mobile'), true);
        } else {
            return result;
        }
    }

    //手机验证码
    if ((isCheckAll || $(ele).attr('id') == 'securityCode') && true) {
        if ($("#securityCode").val().length == 0) {
            if (isCheckAll) {
                showTips($('#securityCode'), false, "手机验证码未填写");
            }
            return false
        }
        if (!checkSecurityCode()) {
            return false;
        }
        showTips($('#securityCode'), true);
    }

    //图片验证码
    if ((!isCheckAll && $(ele).attr('id') == 'ccode') && true) {
        if ($("#ccode").val().length == 0) {
            showTips($('#ccode'), false, "验证码未填写");
            return false;
        } else {
            Util.checkCcode('/bsp', $("#ccode").val(), false, function (d) {
                if (!d.isCorrect) {
                    showTips($('#ccode'), false, d.msg);
                    return false;
                } else {
                    showTips($('#ccode'), true);
                    return true;
                }
            });
        }
    }

    //手机验证码
    if ((isCheckAll || $(ele).attr('id') == 'securityCode') && true) {
        if ($("#securityCode").val().length == 0) {
            if (isCheckAll) {
                showTips($('#securityCode'), false, "请输入手机验证码");
                return false
            }
            showTips($('#securityCode'), true);
            return true;
        }
        if (!checkSecurityCode()) {
            return false;
        }
        showTips($('#securityCode'), true);
    }
    return true;
}