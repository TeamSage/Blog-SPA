// globals describe, it, beforeEach, afterEach,
// jshint esversion: 6
import {requester} from 'requester';
import {userData} from 'user-data';
import {controller} from 'controller';
import {kiveyConst} from 'kinvey-constants';
import {usersController} from 'user-controller';
import {templatesLoader} from 'templates-loader';

mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = 'SOME_AUTH_KEY';
const user = {
    username: 'SOME_USERNAME',
    password: 'SOME_PASSWORD'

};

const APP_ID = 'kid_r1xa-7ta',
     APP_SECRET = '4d06f90f827d47ebab23e57efb7556e5';

describe('UNIT TESTS', function () { 
    describe('UserData tests', function () { 
        describe('Register tests', function () { 
            beforeEach(function () { 
                sinon.stub(requester, 'post')
                    .returns(new Promise((resolve, reject) => {
                        resolve({
                            result: {
                                username: user.username,
                                authKey: AUTH_KEY
                            }
                        });
                    }));
                    localStorage.clear();
             });

             afterEach(function () { 
                 requester.post.restore();
                 localStorage.clear();
              });

            it('Expect post() to be called once', function (done) { 
                userData.register(user)
                    .then(() => {
                        expect(requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done);
             });
            it('Expect userData.register() to call POST method with valid url', function (done) { 
                userData.register(user)
                    .then(() => {
                        expect(requester.post.firstCall.args[0]).to.equal(`http://baas.kinvey.com/user/${APP_ID}`);
                    })
                    .then(done, done);
             });
            
            it('Expect userData.register() to make correct post request', function (done) { 
                let url = `http://baas.kinvey.com/user/${APP_ID}`;
                userData.register(user)
                    .then(() => {
                        const actual = requester.post.firstCall.args[0];
                        
                        expect(actual).to.equal(url);
                    })
                    .then(done, done);
             });

            it('Expect userData.register() to call post with two parameters', function (done) { 
                 userData.register(user)
                    .then(() => {
                        expect(requester.post.firstCall.args.length).to.equal(2);
                    })
                    .then(done, done);
              });

            it('Expect userData.register() to post correct data', function (done) { 
                userData.register(user)
                    .then(() => {
                        const actual = requester.post.firstCall.args[1];
                        const prop = Object.keys(actual).sort();
                        expect(prop[0]).to.equal('data');
                        expect(prop[1]).to.equal('headers');
                    }).
                    then(done, done);
             });
         });

        describe('Login tests', function () {
            beforeEach(function () { 
                sinon.stub(requester, 'post')
                .returns(new Promise((resolve, reject) => {
                    resolve({
                        result: {
                            username: user.username,
                            authKey: AUTH_KEY
                        }
                    });
                }));
                
                localStorage.clear();
             });

             afterEach(function () { 
                 requester.post.restore();
                 localStorage.clear();
              });

            it('Expect post to be called once', function (done) { 
                userData.login(user)
                .then(() => {
                    expect(requester.post.calledOnce).to.be.true;
                })
                .then(done, done);
             });

            it('Expect userData.login() to make correct POST request', function (done) { 
                let url = `http://baas.kinvey.com/user/${APP_ID}/login`;
                userData.login(user)
                .then(() => {
                    const actual = requester.post.firstCall.args[0];

                    expect(actual).to.equal(url);
                })
                .then(done, done);
             });

            it('Expect userData.login() to call post with two parameters', function (done) { 
                userData.login(user)
                .then(() => {
                    expect(requester.post.firstCall.args.length).to.equal(2);
                })
                .then(done, done);
             });

            it('Expect userData.login() to call post with valid url', function (done) { 
                userData.login(user)
                .then(() => {
                    expect(requester.post.firstCall.args[0]).to.equal(`http://baas.kinvey.com/user/${APP_ID}/login`)
                })
                .then(done, done);
             });

            it('Expect userData.login() to put correct user data', function (done) { 
                userData.login(user)
                .then(() => {
                    const actual = requester.post.firstCall.args[1];
                    const prop = Object.keys(actual).sort();

                    expect(prop[0]).to.equal('data');
                    expect(prop[1]).to.equal('headers');
                })
                .then(done, done);
             });
          });

          describe('Logout tests', function () { 
                beforeEach(function () { 
                sinon.stub(requester, 'post')
                .returns(new Promise((resolve, reject) => {
                    resolve({
                        result: {
                            username: user.username,
                            authKey: AUTH_KEY
                        }
                    });
                }));
                
                localStorage.clear();
             });

             afterEach(function () { 
                 requester.post.restore();
                 localStorage.clear();
              });

              it('Expect localStorage to have no user after logout', function (done) { 
                  userData.login(user)
                  .then(() => {
                      return userData.logout();
                  })
                  .then(() => {
                      expect(localStorage.getItem('user')).to.be.null;
                  }).
                  then(done, done);
               });

               it('Expect localStorage to have not authKey after logout', function (done) { 
                   userData.login(user)
                   .then(() => {
                       return userData.logout();
                   })
                   .then(() => {
                       expect(localStorage.getItem('authKey')).to.be.null;
                   })
                   .then(done, done);
                });
           });
    });

 });

describe('INTEGRATION TESTS', function () { 
    describe('userData tests', function () { 
        it('Expect login(user) to log in the user', function (done) { 
            let user = {
                "username": "adm",
                "password": "adm"
            };

            userData.login(user)
            .then(function (success) { 
                localStorage.setItem('user', success.username);
                localStorage.setItem('authKey', success._kmd.authtoken);
             })
             .then(() => {
                 expect(localStorage.getItem('user')).to.equal('adm');
             })
             .then(done, done);
         });
     });
 });

 mocha.run();