console.log("[+] Hooks réseau chargés");

function hookFunction(name) {
    try {
        const ptr = Module.getGlobalExportByName(name);
        console.log("[+] " + name + " trouvée à : " + ptr);

        Interceptor.attach(ptr, {
            onEnter(args) {
                console.log("[+] " + name + " appelée");
                console.log("    fd = " + args[0]);

                if (name === "send" || name === "recv") {
                    console.log("    taille = " + args[2].toInt32());
                }

                if (name === "connect") {
                    console.log("    sockaddr = " + args[1]);
                }
            },
            onLeave(retval) {
                console.log("    retour = " + retval.toInt32());
            }
        });
    } catch (e) {
        console.log("[-] Impossible de hooker " + name + " : " + e);
    }
}

hookFunction("connect");
hookFunction("send");
hookFunction("recv");
