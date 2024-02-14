import { HttpInterceptorFn, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export class TieInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("fais coucou")
    if(localStorage.getItem("Token") != undefined) {
      let clone =
        req.clone({headers : new HttpHeaders({"authorization" : "bearer "+ localStorage.getItem("Token")})})
      return next.handle(clone)
      }
    return next.handle(req)
  }
}
