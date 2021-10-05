import { Component, OnInit } from '@angular/core';
import {OAuthService, AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer:'https://dev-96372766.okta.com/oauth2/default',
  redirectUri:window.location.origin,
  clientId:'0oa2400capP8XEsIJ5d7',
  scope: 'openid profile email'
}
@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {
  constructor(private oauthService:OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  logout(){
    this.oauthService.logOut();

  }

  ngOnInit() {
  }

}
