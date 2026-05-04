Java.perform(function () {
    console.log("[+] Hook File Java chargé");

    try {
        const File = Java.use("java.io.File");

        File.$init.overload("java.lang.String").implementation = function (path) {
            console.log("[File] nouveau chemin : " + path);
            return this.$init(path);
        };

        File.exists.implementation = function () {
            const result = this.exists();
            console.log("[File.exists] " + this.getAbsolutePath() + " => " + result);
            return result;
        };

        File.canRead.implementation = function () {
            const result = this.canRead();
            console.log("[File.canRead] " + this.getAbsolutePath() + " => " + result);
            return result;
        };

        console.log("[+] Hook File Java installé");
    } catch (e) {
        console.log("[-] Erreur File Java hook : " + e);
    }
});
