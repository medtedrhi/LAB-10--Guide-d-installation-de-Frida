console.log("[+] Hook fichiers chargé");

function hookOpen() {
    try {
        const openPtr = Module.getGlobalExportByName("open");
        console.log("[+] open trouvée à : " + openPtr);

        Interceptor.attach(openPtr, {
            onEnter(args) {
                try {
                    const path = args[0].readUtf8String();
                    console.log("[+] open appelée : " + path);
                } catch (e) {
                    console.log("[+] open appelée mais chemin illisible");
                }
            }
        });
    } catch (e) {
        console.log("[-] open non trouvée : " + e);
    }
}

function hookRead() {
    try {
        const readPtr = Module.getGlobalExportByName("read");
        console.log("[+] read trouvée à : " + readPtr);

        Interceptor.attach(readPtr, {
            onEnter(args) {
                console.log("[+] read appelée");
                console.log("    fd = " + args[0]);
                console.log("    taille = " + args[2].toInt32());
            }
        });
    } catch (e) {
        console.log("[-] read non trouvée : " + e);
    }
}

hookOpen();
hookRead();
