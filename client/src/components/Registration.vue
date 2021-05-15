<template>
    <div id = "registration" class = "auth">
        <div class = "floating">
            <div class = "card-item">
                <div class = "logo">
                    <img src = "@/assets/logo.svg" />
                </div>
                
                <h3>Create Account</h3>                    
                <form>
                    <div class = "elem">
                        <input type = "text" name = "email" placeholder="Enter Email"/>
                    </div>
                    <div class = "elem">
                        <input type = "password" name = "password" placeholder="Your password"/>
                    </div>
                    <div class = "elem">
                        <input type = "text" name = "name" placeholder="Full Name"/>
                    </div>
                    <div class = "line">
                        <div class = "elem">
                            <input type = "text" name = "birthDate" placeholder="Choose Borthdate" />
                        </div>

                    </div>
                    <div class = "group" data-group = "contact">
                        <div class = "group" data-group = "area" data-action = "auto_contact">
                            <div class = "line">
                                <div class = "elem half">
                                    <select name = "district" class = "ignore" data-bind = "district">
                                        <option selected disabled class = "default">Choose District</option>

                                    </select>
                                </div>
                                <div class = "elem half">
                                    <select name = "id" data-bind = "area">
                                        <option selected disabled class = "default">Choose Area</option>
                                        <option>Khilgaon</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class = "elem">
                            <input type = "text" name = "address" placeholder="address" />
                        </div>
                        <div class = "elem">
                            <input type = "text" name = "phoneNo" placeholder="Phone No." />
                        </div>                            
                    </div>

                    <div class = "line">
                        <div class = "elem half">
                        </div>
                        <div class = "elem half">
                            <submit class = "button solid small white" onclick="submitForm(this, 'users/')">
                                Submit</submit>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Registration"
}
</script>

<style lang="scss" scoped>
    @import "../scss/_auth.scss";
    #registration input, select{
        text-align: left;
    }
</style>