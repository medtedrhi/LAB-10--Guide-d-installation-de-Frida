Java.perform(function () {
    console.log("[+] Hook écriture SharedPreferences chargé");

    try {
        const EditorImpl = Java.use("android.app.SharedPreferencesImpl$EditorImpl");

        EditorImpl.putString.overload("java.lang.String", "java.lang.String").implementation = function (key, value) {
            console.log("[SharedPreferences][putString] key=" + key + " value=" + value);
            return this.putString(key, value);
        };

        EditorImpl.putBoolean.overload("java.lang.String", "boolean").implementation = function (key, value) {
            console.log("[SharedPreferences][putBoolean] key=" + key + " value=" + value);
            return this.putBoolean(key, value);
        };

        EditorImpl.putInt.overload("java.lang.String", "int").implementation = function (key, value) {
            console.log("[SharedPreferences][putInt] key=" + key + " value=" + value);
            return this.putInt(key, value);
        };

        console.log("[+] Hook écriture SharedPreferences installé");
    } catch (e) {
        console.log("[-] Erreur écriture SharedPreferences : " + e);
    }
});
