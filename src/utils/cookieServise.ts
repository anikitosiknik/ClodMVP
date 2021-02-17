// export function getCookie(cookieName: string) {
//     let matches = document.cookie.match(new RegExp(
//       "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
//   }



export function setCookie(name: string, value: string, options: {expires?: Date | string, age?: number}) {

  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    if (options.age) {
        updatedCookie += `; max-age=${options.age}`;
    }
  
    document.cookie = updatedCookie;
  }

export function deleteCookie(name: string) {
    setCookie(name, "", {
      age: -1
    })
  }