

export class ContactUs{
    constructor(){
        $('#userName').on('input',() => {if(this.userNameValidation()){$('#userName').next(0).hide(300);}else{$('#userName').next(0).show(300);}});
        $('#userEmail').on('input',() => {if(this.userEmailValidation()){$('#userEmail').next(0).hide(300);}else{$('#userEmail').next(0).show(300);}});
        $('#userPhoneNumber').on('input',() => {if(this.userPhoneNumberValidation()){$('#userPhoneNumber').next(0).hide(300);}else{$('#userPhoneNumber').next(0).show(300);}});
        $('#userAge').on('input',() => {if(this.userAgeValidation()){$('#userAge').next(0).hide(300);}else{$('#userAge').next(0).show(300);}});
        $('#userPassword').on('input',() => {if(this.userPasswordValidation()){$('#userPassword').next(0).hide(300);}else{$('#userPassword').next(0).show(300);}});
        $('#userRePassword').on('input',() => {if(this.userRePasswordValidation()){$('#userRePassword').next(0).hide(300);}else{$('#userRePassword').next(0).show(300);}});

        $('#contactUsSection input').on('input',(e) => {
            let submitButton = $('#contactUsSection button[type="submit"]');
            if(this.userNameValidation() && this.userEmailValidation() &&
                this.userPhoneNumberValidation() && this.userAgeValidation() &&
                this.userPasswordValidation() && this.userRePasswordValidation()){
                    submitButton.prop('disabled',false);
                    submitButton.addClass('animate-bounce bg-red-800 !text-black');
            }
            else{
                submitButton.prop('disabled',true);
                submitButton.removeClass('animate-bounce bg-red-800 !text-black');
            }
        });
    }

    userNameValidation(){
        return ((/^[^\d\W_]+(?:\s[^\d\W_]{0,})*$/).test($('#userName').val()));
    }

    userEmailValidation(){
        return ((/^[^\W.][^\\@]*[^.\W@]@[^\W@.]+(\.[^\W@.\d_]{3,})+$/).test($('#userEmail').val()));
    }

    userPhoneNumberValidation(){
        return ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test($('#userPhoneNumber').val()));
    }

    userAgeValidation(){
        return ((/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/).test($('#userAge').val()));
    }

    userPasswordValidation(){
        return ((/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/).test($('#userPassword').val()));
    }

    userRePasswordValidation(){
        return ($('#userPassword').val() == $('#userRePassword').val());
    }
};