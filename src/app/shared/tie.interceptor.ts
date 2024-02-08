import { HttpInterceptorFn, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// export const tieInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


export class TieInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("fais coucou")
    if(localStorage.getItem("token") != undefined) {
      let clone =
        req.clone({headers : new HttpHeaders({"authorization" : "bearer "+ localStorage.getItem("token")})})
      return next.handle(clone)
      }
    return next.handle(req)
  }

}
