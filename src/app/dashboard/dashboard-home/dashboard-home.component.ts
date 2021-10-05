import { Component, OnInit } from '@angular/core';
import {OAuthService, AuthConfig } from 'angular-oauth2-oidc';
export const authConfig: AuthConfig = {
  issuer:'https://dev-96372766.okta.com/oauth2/default',
  redirectUri:window.location.origin,
  clientId:'0oa2400capP8XEsIJ5d7',
  scope: 'openid profile email'
}
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
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
