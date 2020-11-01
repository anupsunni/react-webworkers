/*

░██╗░░░░░░░██╗░█████╗░██████╗░██╗░░██╗███████╗██████╗░  ░█████╗░░█████╗░██████╗░███████╗
░██║░░██╗░░██║██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗  ██╔══██╗██╔══██╗██╔══██╗██╔════╝
░╚██╗████╗██╔╝██║░░██║██████╔╝█████═╝░█████╗░░██████╔╝  ██║░░╚═╝██║░░██║██║░░██║█████╗░░
░░████╔═████║░██║░░██║██╔══██╗██╔═██╗░██╔══╝░░██╔══██╗  ██║░░██╗██║░░██║██║░░██║██╔══╝░░
░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██║░╚██╗███████╗██║░░██║  ╚█████╔╝╚█████╔╝██████╔╝███████╗
░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝  ░╚════╝░░╚════╝░╚═════╝░╚══════╝
* */

/* Worker Function -----> */
const workercode = () => {

    onmessage = (e) => {
        const num = e.data;
        let result = 0;
        for (let i = 1; i <= num; i++) {
            const data = { type: 'LOADING', i, num};
            postMessage(data);

            for (let j = 0; j < i; j++) {
                result++;
            }
        }
        const data = { type: 'RESULT', result };
        postMessage(data);
    };

};
/* <------ Worker Function */




/*
▒█▀▀█ █▀▀█ ░▀░ █░░ █▀▀ █▀▀█ 　 ▒█▀▀█ █░░ █▀▀█ ▀▀█▀▀ █▀▀ 　 ▒█▀▀█ █▀▀█ █▀▀▄ █▀▀
▒█▀▀▄ █░░█ ▀█▀ █░░ █▀▀ █▄▄▀ 　 ▒█▄▄█ █░░ █▄▄█ ░░█░░ █▀▀ 　 ▒█░░░ █░░█ █░░█ █▀▀
▒█▄▄█ ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀░▀▀ 　 ▒█░░░ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀ 　 ▒█▄▄█ ▀▀▀▀ ▀▀▀░ ▀▀▀
* */

/* Converting to String */
let code = workercode.toString();

/* Taking only code inside { and } */
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

/* Converting to a Blob of type js file */
const blob = new Blob([ code ], { type: "application/javascript" } );

/* Creating a URL for the Blob Object */
const worker_script = URL.createObjectURL(blob);

/* Exporting the Code */
module.exports = worker_script;
