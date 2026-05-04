Java.perform(function () {
    console.log("[+] Hook Debug chargé");

    try {
        const Debug = Java.use("android.os.Debug");

        Debug.isDebuggerConnected.implementation = function () {
            const result = this.isDebuggerConnected();
            console.log("[Debug] isDebuggerConnected() => " + result);
            return result;
        };

        Debug.waitingForDebugger.implementation = function () {
            const result = this.waitingForDebugger();
            console.log("[Debug] waitingForDebugger() => " + result);
            return result;
        };

        console.log("[+] Hook Debug installé");
    } catch (e) {
        console.log("[-] Erreur Debug hook : " + e);
    }
});
