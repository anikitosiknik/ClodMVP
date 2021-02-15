export const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const nickRegexp = /^[^0-9]\w+$/;
export const passwordRegexp = /(?=.*[0-9])/;

export const emailValidation = (mail: string) => emailRegexp.test(String(mail).toLowerCase());

export const nicklValidation = (nick: string) => nickRegexp.test(String(nick).toLowerCase())

export const passwordValidation = (password: string) => passwordRegexp.test(String(password).toLowerCase())