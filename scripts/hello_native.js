console.log("[+] Script natif chargé");

const recvPtr = Module.getGlobalExportByName("recv");

console.log("[+] recv trouvée à : " + recvPtr);

Interceptor.attach(recvPtr, {
    onEnter(args) {
        console.log("[+] recv appelée");
        console.log("    fd = " + args[0]);
        console.log("    buffer = " + args[1]);
        console.log("    taille demandée = " + args[2].toInt32());
    },
    onLeave(retval) {
        console.log("    recv retourne = " + retval.toInt32());
    }
});
