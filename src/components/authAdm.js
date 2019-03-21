import history from '../routes/history';

export default class AuthAdm {

isAuthenticated = () =>{
	let fromToken=null;
	let expiresAt=localStorage.getItem('adm_expires_at');
	let accessToken=localStorage.getItem('access_token_adm')
	if(accessToken){fromToken=this.parseJwt(accessToken);}
	return (Date.now()>expiresAt || Date.now()>fromToken.adm_expires_at);
}

isCaptched = () =>{
	let expiresAtt=localStorage.getItem('adm_CaptchaexpiresAt');
	return (Date.now()>expiresAtt);
}

logout = () =>{
	localStorage.removeItem('adm_expires_at');
  localStorage.removeItem('access_token_adm');
	localStorage.removeItem('adm_CaptchaexpiresAt');
  localStorage.removeItem('captcha_token_adm');
	history.replace('/');
}

parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

}
