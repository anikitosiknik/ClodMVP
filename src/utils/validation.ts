export const emailValidation = (mail: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase())
}

export const nicklValidation = (nick: string) => {
    const re = /^[^0-9]\w+$/;
    return re.test(String(nick).toLowerCase())
}

export const passwordValidation = (password: string) => {
    const re = /(?=.*[0-9])/;
    return re.test(String(password).toLowerCase())
}