
var mySubmitFunc = function(error, state){
    if (!error) {
        if (state === "signIn") {
            //window.location.reload()
            console.log('user signed in')

        }
        if (state === "signUp") {
            // Successfully registered
            //FlowRouter.go('/settings/'+Meteor.user()._id)


        }
    }
};


AccountsTemplates.addFields([

        {
            _id: "name",
            type: "text",
            displayName: "Name",
            required:true,
        },
    ]
);

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,
    socialLoginStyle:'redirect',

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,


    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    //onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,
    hideSignInLink:false,
    hideSignUpLink:false,
    // Texts
    texts: {
        title: {
            changePwd: "Password Title",
            enrollAccount: "Enroll Title",
            forgotPwd: "Forgot Pwd Title",
            resetPwd: "Reset Pwd Title",
            signIn: "Sign In",
            signUp: "Create Your Account",
            verifyEmail: "Verify Email Title",

        },
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "error.accounts.Incorrect username or password",
            mustBeLoggedIn: "error.accounts.Must be logged in",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        }
    }
});

var pwd = AccountsTemplates.removeField('password');

//AccountsTemplates.addField({
//    _id: "address",
//    type: "text",
//    required:true,
//    // Options object with custom properties for my layout. At the moment, there are
//    // no special properties; it is up the developer to invent them
//    options: {
//        // Put a divider before this field
//        dividerBefore: true,
//
//    }
//});

AccountsTemplates.addFields([

    {
        _id: "market",
        type: "text",
        displayName: "Market",
        required:true,
    },
    {
        _id: "position",
        type: "text",
        displayName: "Position",
        required:true
    },
    {
        _id: "password",
        type: "password",
        displayName: "Password",
        required:true
    }
]);

//var pwd = AccountsTemplates.removeField('password');
//AccountsTemplates.removeField('email');

