<template>
    <div id="login-container">
        <!-- Login管理员登陆系统 -->
        <div class="login-box">
            <div class="logo-box">
                <img src= "../assets/img/logo.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
    #login-container{
        background-color: #2b4b6b;
        height: 100%;
        overflow: hidden;
        .login-box{
            width: 450px;
            height: 304px;
            background-color: #fff;
            border-radius: 4px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        .logo-box{
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border: 1px solid #eee;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 8px;
            background-color: #fff;
            box-shadow: 0 0 10px #eee;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
</style>
