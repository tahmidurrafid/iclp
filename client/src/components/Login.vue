<template>
    <div id = "login" class = "auth">
        <div class = "floating">
            <div class = "card-item">
                <div class = "logo">
                    <img src = "@/assets/logo.svg" />
                </div>
                <h3>Login to ICLP</h3>         
                <form>
                    <input type = "text" placeholder="Enter Email"/>
                    <input type = "password" placeholder="Your password"/>

                    <div class = "line">
                        <div class = "elem half">
                        </div>
                        <div class = "elem half">
                            <submit class = "button solid small white">Login</submit>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Login"
}
</script>

<style lang="scss" scoped>
    @import "../scss/_auth.scss";

</style>