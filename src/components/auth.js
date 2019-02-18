export default class Auth {
 
	
isAuthenticated=(value)=>{
	let fromToken=null;
	let expiresAt=localStorage.getItem(value+'_expiresAt');
	let accessToken=localStorage.getItem('access_token_'+value)
	if(accessToken){fromToken=this.parseJwt(accessToken);}
	return (Date.now()>expiresAt || Date.now()>fromToken.expires_at); 
}

isCaptched=(value)=>{
	let expiresAtt=localStorage.getItem(value+'_CaptchaexpiresAt');
	return (Date.now()>expiresAtt); 
}
  


parseJwt=(token)=> {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }

}