# Données locales de démonstration

Insérez deux utilisateurs fictifs dans la collection `users` :

```json
[
  {"email":"alice@example.test","password":"alice-demo","role":"USER","displayName":"Alice"},
  {"email":"bob@example.test","password":"bob-demo","role":"USER","displayName":"Bob"}
]
```

Ces valeurs ne sont pas des identifiants réels. Créez aussi quelques tâches dont `ownerId` référence l'utilisateur correspondant. Le projet n'inclut volontairement pas de script de seed automatique.
