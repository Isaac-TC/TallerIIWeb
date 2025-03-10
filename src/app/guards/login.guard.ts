import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state)=> {

  if(localStorage.getItem("login")=="true"){
    if(typeof window!=='undefined'&& window.localStorage){
    return true;
  }else{
    return false;
  }
}
return false;
};
