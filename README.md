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
```

<img width="932" height="203" alt="image" src="https://github.com/user-attachments/assets/6e9a8633-1ac6-436d-85cf-0cf932cea7fe" />


4. Vérification ADB

Commandes :

adb version
adb devices

<img width="1058" height="223" alt="image" src="https://github.com/user-attachments/assets/97e22ff7-762f-49d6-ad9a-7db4934a40d8" />


5. Identification de l’architecture Android

Commande :

adb shell getprop ro.product.cpu.abi

<img width="724" height="83" alt="image" src="https://github.com/user-attachments/assets/badb7982-02c3-4ae4-ab4c-af8d8e889b03" />


Cette information permet de choisir la version compatible de frida-server.

6. Déploiement de frida-server

Commandes :

adb push frida-server /data/local/tmp/
adb shell chmod 755 /data/local/tmp/frida-server
adb shell "nohup /data/local/tmp/frida-server -l 0.0.0.0 >/dev/null 2>&1 &"

<img width="1464" height="129" alt="image" src="https://github.com/user-attachments/assets/7628db97-2622-4c27-b358-8d4b98d4ed77" />


7. Test de connexion Frida

Commandes :

adb forward tcp:27042 tcp:27042
adb forward tcp:27043 tcp:27043
frida-ps -U
frida-ps -Uai

<img width="1585" height="1005" alt="image" src="https://github.com/user-attachments/assets/102078f2-891c-4ba0-a863-aa4ee22c915e" />
<img width="1624" height="733" alt="image" src="https://github.com/user-attachments/assets/43cfdf19-4aeb-4990-832e-f0bef344b863" />


8. Injection Java minimale

Script utilisé : scripts/hello.js

Java.perform(function () {
  console.log("[+] Frida Java.perform OK");
});

Commande :

frida -U -f com.example.app -l scripts/hello.js

<img width="1612" height="540" alt="image" src="https://github.com/user-attachments/assets/308f1f87-df68-4b2b-87ce-404a83ae2eae" />

9. Injection native minimale

Script utilisé : scripts/hello_native.js

console.log("[+] Script chargé");

Interceptor.attach(Module.getExportByName(null, "recv"), {
  onEnter(args) {
    console.log("[+] recv appelée");
  }
});

Commande :

frida -U -f "com.example.app" -l scripts/hello_native.js

<img width="1685" height="523" alt="image" src="https://github.com/user-attachments/assets/346197ab-9807-4eb8-b72e-d73f1e0741a5" />


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

<img width="1555" height="799" alt="image" src="https://github.com/user-attachments/assets/1f6a1fa8-a003-4323-9016-4b195721a13e" />
<img width="1188" height="249" alt="image" src="https://github.com/user-attachments/assets/1e28a27e-3e4d-4516-b378-6d88423e30d6" />


11. Observation des bibliothèques de chiffrement

Commande :

Process.enumerateModules().filter(m =>
  m.name.indexOf("ssl") !== -1 ||
  m.name.indexOf("crypto") !== -1 ||
  m.name.indexOf("boring") !== -1
)

<img width="1595" height="986" alt="image" src="https://github.com/user-attachments/assets/fb7cce49-afff-4b68-b4d9-7f461a8389aa" />


12. Observation réseau

Scripts utilisés :

hook_connect.js
hook_network.js

<img width="1589" height="554" alt="image" src="https://github.com/user-attachments/assets/5efa289a-5438-4903-85ca-80cc81a39853" />
<img width="1629" height="643" alt="image" src="https://github.com/user-attachments/assets/ec0455e9-dd2d-4e1a-9fc2-9e38520812ac" />



13. Observation des accès fichiers

Script utilisé :

hook_file.js

<img width="1916" height="940" alt="image" src="https://github.com/user-attachments/assets/36beff24-c766-4bec-a6cf-a6f1602abe92" />


14. Hooks Java

Scripts utilisés :

hook_prefs.js

<img width="1721" height="350" alt="image" src="https://github.com/user-attachments/assets/6d5a6a45-9044-4192-9aa3-c151c4cbbcdc" />

hook_prefs_write.js

<img width="1602" height="398" alt="image" src="https://github.com/user-attachments/assets/84215e5a-d22d-4b36-81e4-97b415d28adf" />

hook_sqlite.js

<img width="1763" height="410" alt="image" src="https://github.com/user-attachments/assets/2eedfed7-50d6-4f41-9c4a-7d0c17fa398e" />

hook_debug.js

<img width="1669" height="440" alt="image" src="https://github.com/user-attachments/assets/f89c4283-da05-4bb6-8c82-8c903408695e" />

hook_runtime.js

<img width="1643" height="397" alt="image" src="https://github.com/user-attachments/assets/615324c5-c359-42ba-ab3a-3e211b01c644" />

hook_file_java.js

<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/1822b790-f788-4664-a5f0-55d95ec1fe01" />



#Conclusion

Ce laboratoire valide l’installation complète de Frida, le déploiement de frida-server sur Android, l’injection de scripts JavaScript, l’utilisation de la console interactive et l’observation de comportements réseau, fichiers, mémoire et Java.
