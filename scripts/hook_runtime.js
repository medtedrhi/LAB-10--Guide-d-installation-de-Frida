Java.perform(function () {
    console.log("[+] Hook Runtime.exec chargé");

    try {
        const Runtime = Java.use("java.lang.Runtime");

        Runtime.exec.overload("java.lang.String").implementation = function (cmd) {
            console.log("[Runtime.exec String] " + cmd);
            return this.exec(cmd);
        };

        Runtime.exec.overload("[Ljava.lang.String;").implementation = function (cmdArray) {
            console.log("[Runtime.exec Array] " + cmdArray);
            return this.exec(cmdArray);
        };

        Runtime.exec.overload("java.lang.String", "[Ljava.lang.String;").implementation = function (cmd, envp) {
            console.log("[Runtime.exec String, Env] " + cmd);
            return this.exec(cmd, envp);
        };

        Runtime.exec.overload("[Ljava.lang.String;", "[Ljava.lang.String;").implementation = function (cmdArray, envp) {
            console.log("[Runtime.exec Array, Env] " + cmdArray);
            return this.exec(cmdArray, envp);
        };

        console.log("[+] Hook Runtime.exec installé");
    } catch (e) {
        console.log("[-] Erreur Runtime.exec hook : " + e);
    }
});
