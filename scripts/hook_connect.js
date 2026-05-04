console.log("[+] Hook connect chargé");

try {
    const connectPtr = Module.getGlobalExportByName("connect");

    console.log("[+] connect trouvée à : " + connectPtr);

    Interceptor.attach(connectPtr, {
        onEnter(args) {
            console.log("[+] connect appelée");
            console.log("    fd = " + args[0]);
            console.log("    sockaddr = " + args[1]);
        },
        onLeave(retval) {
            console.log("    retour = " + retval.toInt32());
        }
    });
} catch (e) {
    console.log("[-] Impossible de hooker connect : " + e);
}
