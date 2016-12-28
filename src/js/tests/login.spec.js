describe('testing login model', function () {
    // loading main module.
    beforeEach(module('mainApp'));

    //to refer Login Model
    var loginModel;

    //inject Login Model
    beforeEach(inject(function (_LoginModel_) {
        loginModel = _LoginModel_;
    }));

    it('should get an instance of LoginModel', function () {
        expect(loginModel).toBeDefined();
    });

    //describe('test isValidPassword', function () {
    //    var isPasswordValid;
    //    beforeEach(function () {
    //        spyOn(loginModel.prototype, 'isValidPassword').and.callThrough();
    //        loginModel.prototype.isValidPassword('1234567');
    //    });

    //    it('check if isValidPassword is called', function () {
    //        expect(loginModel.prototype.isValidPassword).toHaveBeenCalled();
    //    });

    //    it('check if isValidPassword is called with \'1234567\'', function () {
    //        expect(loginModel.prototype.isValidPassword).toHaveBeenCalledWith('1234567');
    //    });

    //    it('check if isValidPassword returns false if password length < 7. (password = \'1234\')', function () {
    //        isPasswordValid = loginModel.prototype.isValidPassword('1234');
    //        expect(isPasswordValid).toBe(false);
    //    });

    //    it('check if isValidPassword returns true if password length >= 7. (password = \'1234567\')', function () {
    //        isPasswordValid = loginModel.prototype.isValidPassword('1234567');
    //        expect(isPasswordValid).toBe(true);
    //    });

    //    it('check if isValidPassword returns false if password length > 25. (password = \'12345678901234567890123456\')', function () {
    //        isPasswordValid = loginModel.prototype.isValidPassword('12345678901234567890123456');
    //        expect(isPasswordValid).toBe(false);
    //    });
    //});

    describe('test checkValidity', function () {
        var validCredentials;
        beforeEach(function () {
            spyOn(loginModel.prototype, 'checkValidity').and.callThrough();
            loginModel.prototype.checkValidity('foo', 'something');
        });

        it('check if checkValidity is called', function () {
            expect(loginModel.prototype.checkValidity).toHaveBeenCalled();
        });

        it('check if checkValidity is called with arguments. (username = \'foo\', password= \'something\')', function () {
            expect(loginModel.prototype.checkValidity).toHaveBeenCalledWith('foo', 'something');
        });

//        it('check if username is set. (username = \'foo\')', function () {
//            expect(loginModel.prototype.username).toEqual('foo');
//        });

//        it('check if isValid is set. (isValid = true)', function () {
//            expect(loginModel.prototype.isValid).toEqual(true);
//        });

//        it('check if isValid is true when username and password are correct. (username = \'foo\', password= \'something\')', function () {
//            validCredentials = loginModel.prototype.checkValidity('foo', 'something');
//            expect(loginModel.prototype.isValid).toEqual(true);
//        });

//        it('check if isValid is true when username and password are incorrect. (username = \'foo\', password= \'bar\')', function () {
//            validCredentials = loginModel.prototype.checkValidity('foo', 'bar');
//            expect(loginModel.prototype.isValid).toEqual(false);
//            expect(validCredentials).toEqual(false);
//        });
    });
});

//describe('testing Login Ctrl', function () {
//    // loading main module.
//    beforeEach(module('mainApp'));

//    //to refer Login Model
//    var loginCtrl, loginModel, scope, location, window, anchorScroll;

//    //inject Login Model
//    beforeEach(inject(function (_LoginModel_, $rootScope, $controller, _$location_, _$window_, _$anchorScroll_) {
//        location = _$location_;
//        window = _$window_;
//        anchorScroll = _$anchorScroll_;
//        scope = $rootScope.$new();
//        loginModel = _LoginModel_;
//        loginCtrl = $controller('loginCtrl', {
//            $scope: scope,
//            LoginModel: loginModel,
//            $location: location,
//            $window: window,
//            $anchorScroll: anchorScroll
//        });
//    }));

//    it('should get an instance of loginCtrl', function () {
//        expect(loginCtrl).toBeDefined();
//    });
//    //scope.userLogin.username = 'foo';
//    //        scope.userLogin.password = 'something';
//    //        scope.$digest();
//    it('check if Login() is present', function () {

//        expect(scope.Login).toBeDefined();
//    });
//    it('check if CloseMessage() is present', function () {

//        expect(scope.CloseMessage).toBeDefined();
//    });
//    it('check if GoTo() is present', function () {

//        expect(scope.GoTo).toBeDefined();
//    });

//    describe('test Login()', function () {

//            beforeEach(function () {
//                spyOn(scope, 'Login').and.callThrough();
//            });

//            it('check if Login() is called', function () {
//                scope.userLogin.username = 'foo';
//                scope.userLogin.password = 'something';
//                scope.Login();
//                expect(scope.Login).toHaveBeenCalled();
//            });

//            it('check if Message object is set when password length < 7', function () {
//                scope.userLogin.username = 'foo';
//                scope.userLogin.password = 'some';
//                scope.Login();
//                expect(scope.message.success).toEqual(false);
//                expect(scope.message.errorElement).toEqual('password');
//            });

//            it('check if Message object is set when username and password is empty string', function () {
//                scope.Login();
//                expect(scope.message.success).toEqual(false);
//                expect(scope.message.errorElement).toEqual('username');
//            });

//            it('check if Message object is set when username is empty string', function () {
//                scope.userLogin.password = 'something';
//                scope.Login();
//                expect(scope.message.success).toEqual(false);
//                expect(scope.message.errorElement).toEqual('username');
//            });

//            it('check if Message object is set when password is empty string', function () {
//                scope.userLogin.username = 'foo';
//                scope.Login();
//                expect(scope.message.success).toEqual(false);
//                expect(scope.message.errorElement).toEqual('password');
//            });

//            it('check if loginMessage shows correct message when username or password is incorrect', function () {
//                scope.userLogin.username = 'foo';
//                scope.userLogin.password = 'somethingelse';
//                scope.Login();
//                expect(scope.loginMessage).toEqual("Invalid username or password.");
//            });

//            it('check if loginMessage is cleared when username or password is correct', function () {
//                scope.userLogin.username = 'foo';
//                scope.userLogin.password = 'something';
//                scope.Login();
//                expect(scope.loginMessage).toEqual("");
//            });

//            it('check if page is redirected to home when username or password is correct', function () {
//                scope.userLogin.username = 'foo';
//                scope.userLogin.password = 'something';
//                scope.Login();
//                expect(location.path()).toBe('/home');
//            });
//    });

//    describe('test CloseMessage()', function() {
        
//        beforeEach(function () {
//            spyOn(scope, 'CloseMessage').and.callThrough();
//            scope.CloseMessage();
//        });

//        it('check if message is set to null', function() {
//            expect(scope.message).toBe(null);
//        });
//    });

//    describe('test GoTo()', function() {

//        beforeEach(function () {
//            spyOn(scope, 'GoTo').and.callThrough();
//        });

//        it('check if page focus to the goto element', function () {
//            scope.GoTo('username');
//            expect(location.hash()).toEqual('username');
//        });
//    });
//});