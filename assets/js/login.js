$(
    function(){
        $("#link_login").on('click',function(){
            $(".login").hide();
            $(".reg").show();
            
        })
        $("#link_reg").on("click",function(){
            $(".reg").hide();
            $(".login").show(); 
        })
         // 从layui中获取form对象
        var form = layui.form;
        var layer = layui.layer;
        form.verify({
            // 定义一个效验规则
            pwd:[/^[\S]{6,12}$/,'密码必须6-12位']
        });
        form.verify({
            // 定义一个验证密码的规则
            rpwd:function(value){
                // console.log(value);
                var pwd = $(".reg [name='password']").val();
                // console.log(pwd);
                if(pwd !== value){
                    return "两次输入的密码不一致";
                }
               

            }
        })
        // 监听注册表单的提交事件
        $("#form-reg").on('submit',function(e){
            e.preventDefault();
            // console.log("注册没成功了");
            $.post("http://api-breakingnews-web.itheima.net/api/reguser",{
                username:$(".reg [name=username]").val(),
                password:$(".reg [name=password]").val()
            },function(res){
                // console.log("注册成功了")
                console.log(res);
                layer.msg(res.message);
                $("#link_reg").click();
            })
        })
        // 监听登录事件
       $("#form-login").submit(function(e){
           e.preventDefault();
        //    console.log("没成功了");
           $.ajax({
            url : "/api/login",
            method:"post",
            data:$(this).serialize(),
            success:function(res){
                // console.log("成功了");
                
                if(res.status !== 0){
                    layer.msg("登录失败")
                }
                layer.msg("登录成功");
                localStorage.setItem('token',res.token);
                location.href = './index.html';
            }
           }
               
           )
       });
    }
)