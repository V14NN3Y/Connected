let generatedCode = '';
let studentData = [];

const EMAILJS_SERVICE_ID = 'service_0fldbr9';
const EMAILJS_TEMPLATE_ID = 'template_9e1a2nc';
const EMAILJS_PUBLIC_KEY = 'Y0DClbSBL4znqfbwb';

(function () {
    if (typeof emailjs !== 'undefined' && emailjs.init) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error('EmailJS library is not loaded or initialized.');
    }
})();

// génération du code de sx chiffes
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// envoi de mail
async function sendEmailWithCode(email, code, nom, prenom) {
    const templateParams = {
        to_email: email,
        to_name: prenom + ' ' + nom,
        verification_code: code,
        from_name: 'Epitech Authentication'
    };

    try {
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('Email envoyé avec succès:', response.status, response.text);
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

function validateEmail(email) {
    return email.endsWith('@epitech.eu');
}

// obtention de la date du jour
function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

// obtention de l'heure actuelle'
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// sauvegarde dans le fichier
function saveToFile(nom, prenom) {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();
    const fileName = `${currentDate}_register.txt`;
    const entry = `"${nom.toUpperCase()}" "${prenom}" "${currentTime}"`;

    let fileContent = localStorage.getItem(fileName) || '';

    if (fileContent) {
        fileContent += '\n' + entry;
    } else {
        fileContent = entry;
    }
    localStorage.setItem(fileName, fileContent);
    console.log(`Sauvegardé dans le fichier ${fileName}:`, entry);
}

// téléchargement du fichier
function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById('download').addEventListener('click', function () {
    const currentDate = getCurrentDate();
    const fileName = `${currentDate}_register.txt`;
    const fileContent = localStorage.getItem(fileName) || '';

    if (!fileContent) {
        showError('Aucune donnée à télécharger.');
        return;
    }
    downloadFile(fileName, fileContent);
});

// affichage des messages d'erreurs
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// affichage des messages de succès
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.innerHTML = message;
    successDiv.style.display = 'block';
}

// génération du code quand on va cliquer
document.getElementById('generateCodeBtn').addEventListener('click', async function () {
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nom || !prenom || !email) {
        showError('Veuillez remplir tous les champs.');
        return;
    }
    if (!validateEmail(email)) {
        showError('Veuillez utiliser une adresse email Epitech valide (@epitech.eu).');
        return;
    }
    generatedCode = generateRandomCode();

    document.getElementById('loader').style.display = 'block';
    this.disabled = true;
    this.textContent = 'Envoi en cours...';

    document.getElementById('formFields').style.display = 'none';

    const emailSent = await sendEmailWithCode(email, generatedCode, nom, prenom);

    document.getElementById('loader').style.display = 'none';

    if (emailSent) {
        document.getElementById('notification').style.display = 'block';
        document.getElementById('codeSection').style.display = 'block';
        this.textContent = 'Code envoyé !';

        document.getElementById('authenticate').style.display = 'none';

    } else {
        showError('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
        this.disabled = false;
        this.textContent = 'Générer et envoyer le code';
    }
});

// vérification du code quand on clique
document.getElementById('verifyCodeBtn').addEventListener('click', function () {
    const enteredCode = document.getElementById('codeInput').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();

    if (!enteredCode) {
        showError('Veuillez entrer le code reçu.');
        return;
    }
    if (enteredCode === generatedCode) {
        saveToFile(nom, prenom);

        document.getElementById('notification').style.display = 'none';
        document.getElementById('codeSection').style.display = 'none';

        showSuccess(`
            <strong>Bienvenue ${prenom} ${nom} !</strong><br>
            Votre authentification a réussie.<br>
            Vos informations ont été enregistrées, bonne journée à vous !!
        `);

    } else {
        showError('Code incorrect. Veuillez vérifier et réessayer.');
    }
});

// vérification du code quand on appuie sur la touche Entrée
document.getElementById('codeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('verifyCodeBtn').click();
    }
});

window.onload = function () {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    textInputs.forEach(input => input.value = '');
};
