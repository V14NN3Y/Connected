# Connected

## Description
Ce projet vise à faciliter l'enregistrement des présences des étudiants via un site web. Actuellement, le système utilise une authentification par email pour générer et vérifier un code de validation. À long terme, l'objectif est d'intégrer un module webcam pour permettre une authentification faciale plus avancée.

## Fonctionnalités
- Génération d'un code de validation à 6 chiffres.
- Envoi du code par email via le service EmailJS.
- Vérification du code saisi par l'utilisateur.
- Enregistrement des informations des étudiants (nom, prénom, heure) dans un fichier local.
- Téléchargement des données enregistrées au format texte.

## Technologies utilisées
- **HTML/CSS** : Pour la structure et le style de l'interface utilisateur.
- **JavaScript** : Pour la logique côté client, y compris l'intégration avec EmailJS.
- **EmailJS** : Pour l'envoi des emails de validation.
- **Arduino** : Un fichier `.ino` est inclus pour contrôler une lampe connectée (optionnel).

## Installation
1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous que vous avez une connexion Internet pour charger les bibliothèques externes (comme EmailJS).
3. Ouvrez le fichier `file.html` dans un navigateur web.

## Utilisation
1. Remplissez les champs "Nom", "Prénom" et "Mail Epitech" sur le site.
2. Cliquez sur le bouton "Générer et envoyer le code".
3. Vérifiez votre boîte mail pour récupérer le code de validation.
4. Entrez le code reçu dans le champ prévu à cet effet et cliquez sur "Vérifier le code".
5. Les informations seront enregistrées localement et pourront être téléchargées en cliquant sur le bouton "Download file".

## Améliorations futures
- Intégration d'un module webcam pour l'authentification faciale.
- Stockage des données sur un serveur distant pour une meilleure gestion.
- Ajout d'une interface administrateur pour consulter et gérer les présences.
