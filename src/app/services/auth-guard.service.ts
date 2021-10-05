import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import {OAuthService, AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer:'https://dev-96372766.okta.com/oauth2/default',
  redirectUri:window.location.origin,
  clientId:'0oa2400capP8XEsIJ5d7',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private oauthService:OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //const isAuthorized = this.oauthService.hasValidAccessToken();
    // const claims=this.oauthService.getIdentityClaims();

    // if(isAuthorized&&claims){
    //   return true;

    // }else{
    //   this.router.navigate(['/','landing']);
    //   return false;
    // }

    const claims:any = this.oauthService.getIdentityClaims();
    if (!claims) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
