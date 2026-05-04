Java.perform(function () {
    console.log("[+] Hook SharedPreferences chargé");

    try {
        const Impl = Java.use("android.app.SharedPreferencesImpl");

        Impl.getString.overload("java.lang.String", "java.lang.String").implementation = function (key, defValue) {
            const result = this.getString(key, defValue);
            console.log("[SharedPreferences][getString] key=" + key + " => " + result);
            return result;
        };

        Impl.getBoolean.overload("java.lang.String", "boolean").implementation = function (key, defValue) {
            const result = this.getBoolean(key, defValue);
            console.log("[SharedPreferences][getBoolean] key=" + key + " => " + result);
            return result;
        };

        Impl.getInt.overload("java.lang.String", "int").implementation = function (key, defValue) {
            const result = this.getInt(key, defValue);
            console.log("[SharedPreferences][getInt] key=" + key + " => " + result);
            return result;
        };

        console.log("[+] Hook SharedPreferences installé");
    } catch (e) {
        console.log("[-] Erreur SharedPreferences : " + e);
    }
});
