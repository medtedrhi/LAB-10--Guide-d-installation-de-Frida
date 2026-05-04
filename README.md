# Frida Android Dynamic Instrumentation Lab

## 1. Objectif

Ce laboratoire présente l’installation et l’utilisation de Frida pour réaliser une analyse dynamique sur une application Android.  
L’objectif est de valider la communication entre le client Frida sur PC et frida-server sur Android, puis d’injecter plusieurs scripts JavaScript pour observer le comportement de l’application cible.

## 2. Environnement utilisé

- Système PC : Windows
- Outils : Python, pip, frida-tools, ADB Platform Tools
- Appareil cible : Android Emulator / appareil Android
- Outil principal : Frida
- Dossier Frida Server : `/data/local/tmp/frida-server`

## 3. Installation du client Frida

Commandes utilisées :

```bash
python -m pip install --upgrade frida frida-tools
frida --version
frida-ps --version
python -c "import frida; print(frida.__version__)"

Preuve :

4. Vérification ADB

Commandes :

adb version
adb devices

Preuve :

5. Identification de l’architecture Android

Commande :

adb shell getprop ro.product.cpu.abi

Preuve :

Cette information permet de choisir la version compatible de frida-server.

6. Déploiement de frida-server

Commandes :

adb push frida-server /data/local/tmp/
adb shell chmod 755 /data/local/tmp/frida-server
adb shell "nohup /data/local/tmp/frida-server -l 0.0.0.0 >/dev/null 2>&1 &"

Preuves :

7. Test de connexion Frida

Commandes :

adb forward tcp:27042 tcp:27042
adb forward tcp:27043 tcp:27043
frida-ps -U
frida-ps -Uai

Preuve :

8. Injection Java minimale

Script utilisé : scripts/hello.js

Java.perform(function () {
  console.log("[+] Frida Java.perform OK");
});

Commande :

frida -U -f com.example.app -l scripts/hello.js

Preuve :

9. Injection native minimale

Script utilisé : scripts/hello_native.js

console.log("[+] Script chargé");

Interceptor.attach(Module.getExportByName(null, "recv"), {
  onEnter(args) {
    console.log("[+] recv appelée");
  }
});

Commande :

frida -U -n "com.example.app" -l scripts/hello_native.js

Preuve :

10. Console interactive Frida

Commandes testées :

Process.arch
Process.mainModule
Process.getModuleByName("libc.so")
Process.getModuleByName("libc.so").getExportByName("recv")
Process.enumerateModules()
Process.enumerateThreads()
Process.enumerateRanges('r-x')
Java.available
Process.id
Process.platform

Preuve :

11. Observation des bibliothèques de chiffrement

Commande :

Process.enumerateModules().filter(m =>
  m.name.indexOf("ssl") !== -1 ||
  m.name.indexOf("crypto") !== -1 ||
  m.name.indexOf("boring") !== -1
)

Preuve :

12. Observation réseau

Scripts utilisés :

hook_connect.js
hook_network.js

Preuve :

13. Observation des accès fichiers

Script utilisé :

hook_file.js

Preuve :

14. Hooks Java

Scripts utilisés :

hook_prefs.js
hook_prefs_write.js
hook_sqlite.js
hook_debug.js
hook_runtime.js
hook_file_java.js

Preuve :

15. Dépannage

Erreur simulée : arrêt de frida-server.

Commande :

adb shell pkill frida-server
frida-ps -U

Résultat : Frida ne peut plus se connecter au serveur distant.

Correction :

adb shell "nohup /data/local/tmp/frida-server -l 0.0.0.0 >/dev/null 2>&1 &"
adb forward tcp:27042 tcp:27042
adb forward tcp:27043 tcp:27043
frida-ps -Uai

Preuves :

16. Conclusion

Ce laboratoire valide l’installation complète de Frida, le déploiement de frida-server sur Android, l’injection de scripts JavaScript, l’utilisation de la console interactive et l’observation de comportements réseau, fichiers, mémoire et Java.
