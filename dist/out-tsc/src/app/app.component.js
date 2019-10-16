"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AppComponent = /** @class */ (function () {
    function AppComponent(httpClient) {
        this.httpClient = httpClient;
        this.developerKey = '536077714758-4uqkfemi2gtr00nod6bojepcs2ci3lfj.apps.googleusercontent.com';
        this.clientId = "536077714758-t6topsrfcn0v80plcgakd9tnvss8hqbu.apps.googleusercontent.com";
        this.scope = [
            'profile',
            'email',
            'https://www.googleapis.com/auth/drive' //insert scope here
        ].join(' ');
        this.pickerApiLoaded = false;
    }
    AppComponent.prototype.loadGoogleDrive = function () {
        gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
        gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
    };
    AppComponent.prototype.onAuthApiLoad = function () {
        gapi.auth.authorize({
            'client_id': this.clientId,
            'scope': this.scope,
            'immediate': false
        }, this.handleAuthResult);
    };
    AppComponent.prototype.onPickerApiLoad = function () {
        this.pickerApiLoaded = true;
    };
    AppComponent.prototype.handleAuthResult = function (authResult) {
        console.log(this);
        var src;
        if (authResult && !authResult.error) {
            if (authResult.access_token) {
                var view = new google.picker.View(google.picker.ViewId.DOCS);
                view.setMimeTypes("text/csv,image/png,image/jpg,text/txt");
                var pickerBuilder = new google.picker.PickerBuilder();
                var picker = pickerBuilder.
                    enableFeature(google.picker.Feature.NAV_HIDDEN).
                    setOAuthToken(authResult.access_token).
                    addView(view).
                    addView(new google.picker.DocsUploadView()).
                    setCallback(function (e) {
                    if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                        var doc = e[google.picker.Response.DOCUMENTS][0];
                        src = doc[google.picker.Document.URL];
                        console.log("Document selected is", doc, doc.id, "and URL is ", src);
                    }
                }).
                    build();
                picker.setVisible(true);
                this.getFile(src);
            }
        }
    };
    AppComponent.prototype.getFile = function (url) {
        this.httpClient.get(url);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map