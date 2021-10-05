import { Component, OnInit } from '@angular/core';
import {OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { NgwWowService } from 'ngx-wow';

export const authConfig: AuthConfig = {
  issuer:'https://dev-96372766.okta.com/oauth2/default',
  redirectUri:window.location.origin,
  clientId:'0oa2400capP8XEsIJ5d7',
  scope: 'openid profile email'
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private oauthService:OAuthService, private wowService: NgwWowService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

      this.wowService.init();
  }
  login(){
    this.oauthService.initImplicitFlow();
  }
  logout(){
    this.oauthService.logOut();

  }
  get getUserName() {
    const claims:any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  ngOnInit(): void {
  }

}
