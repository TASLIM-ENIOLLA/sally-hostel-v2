export const ParseObjectToFormData = (object) => {
    const formData = new FormData()

    for(const prop in object){
        if(object[prop]){
            formData.append(prop, object[prop])
        }
    }

    return formData
}

export const FileReader = (imageFile) => new Promise((resolved) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(imageFile)

    fileReader.onload = () => {
        resolved(fileReader.result)
    }
})

export const CookieStore = {
    getCookie: () => new Promise(
        (res) => {
            decodeURIComponent(document.cookie).split(/\;\s?/)
            .forEach(
                (eachCookie) => {
                    const [cookieName, cookieValue] = eachCookie.split('=')
                    if(cookieName === name){
                        res({value: cookieValue})
                    }
                }
            )

            res()
        }
    ),
    setCookie: ({name, value, expires, path}) => new Promise((res) => res(document.cookie = `${name}=${value};expires=${new Date(expires)};path=${path}`)),
    removeCookie: (name) => CookieStore.setCookie({name, value: null, expires: new Date(0), path: '/'})
}

export class UniqueSet{
    constructor(object1, object2){
        const object1Length = Object.keys(object1).length
        const object2Length = Object.keys(object2).length

        return (
            (object1Length === object2Length)
            ? Object.keys(object1).every(key => object2.hasOwnProperty(key) && object2[key] === object1[key])
            : false
        )
    }
}

export const Base64URL = {
    encode: (string) => btoa(string)
        .replace(/\+/g, '_')
        .replace(/\//g, '-')
        .replace(/=+$/g, ''),
    decode: (string) => atob(string
        .replace(/\_/g, '+')
        .replace(/\-/g, '/'))
}

export const HMAC_SHA256_HEX = async (secret, message) => {
    const enc = new TextEncoder("utf-8");
    const algorithm = { name: "HMAC", hash: "SHA-256" };
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        algorithm,
        false,
        ["sign", "verify"]
    );
    const hashBuffer = await crypto.subtle.sign(
        algorithm.name,
        key,
        enc.encode(message)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex + '---';
}

export class JWT{
    raw_header = ''
    raw_payload = ''
    raw_secret = ''
    constructor(header, secret){
        this.raw_header = header
        this.raw_secret = secret
    }
    createJWT = (payload) => {
        this.raw_payload = payload;

        base64UrlHeader = Base64URL.encode(JSON.stringify(this.raw_header));
        base64UrlPayload = Base64URL.encode(JSON.stringify(this.raw_payload));
        base64UrlSignature = Base64URL.encode(HMAC_SHA256_HEX(
            this.raw_secret,
            `${base64UrlHeader}.${base64UrlPayload}`
        ));

        return `${base64UrlHeader}.${base64UrlPayload}.${base64UrlSignature}`
    }
}
