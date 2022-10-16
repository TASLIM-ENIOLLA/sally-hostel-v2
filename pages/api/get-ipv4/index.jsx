export default async function handler(_, res){
    getIPv4Address()
    .then(result => res.status(404).json({
        type: 'success',
        data: result
    }))
}

function getIPv4Address(){
    return new Promise((res, rej) => {
        const {exec} = require("child_process")

        exec("ipconfig", (error, stdout, stderr) => {
            if(error) rej(error.message)
            else if(stderr) rej(stderr)
            else res(
                stdout
                .split(/\n/)
                .filter(e => !['\n', '\r'].includes(e))
                .map(e => e.replace('\r', ''))
                .filter(e => /IPv4 Address/.test(e))
                .map(e => e.replace('\r', ''))[0]
                .match(/\d{1,3}(\.\d{1,3}){3}/)[0]
            )
        });
    })
}
