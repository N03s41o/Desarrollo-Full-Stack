let currentMonto = 500;
let donationType = 'individual';

const logos = {
    tecmilenio: "https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_Tecmilenio.png",
    tec: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Logo_Tec_de_Monterrey.svg/1200px-Logo_Tec_de_Monterrey.svg.png",
    tecsalud: "https://mexicohealth.com/wp-content/uploads/2021/03/TecSalud-logo.png"
};

// --- Validaciones ---
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateRFC = (rfc) => rfc.length >= 12 && rfc.length <= 13;
const validateTel = (tel) => /^\d{10}$/.test(tel);

function toggleDonationType(type) {
    donationType = type;
    document.getElementById('btn-ind').classList.toggle('active', type === 'individual');
    document.getElementById('btn-corp').classList.toggle('active', type === 'masiva');
    document.getElementById('fields-individual').classList.toggle('d-none', type === 'masiva');
    document.getElementById('fields-masiva').classList.toggle('d-none', type === 'individual');
}

function setMonto(val, btn) {
    currentMonto = val;
    document.querySelectorAll('.btn-monto').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('input-monto').value = '';
}

function navTo(step) {
    const activeStep = parseInt(document.querySelector('.form-step:not(.d-none)').id.replace('step-', ''));
    
    if (step > activeStep) {
        if (!processValidation(activeStep)) return;
    }

    document.querySelectorAll('.form-step').forEach(s => s.classList.add('d-none'));
    document.getElementById('step-' + step).classList.remove('d-none');

    document.querySelectorAll('.step').forEach((s, i) => {
        s.classList.toggle('active', i + 1 === step);
        s.classList.toggle('completed', i + 1 < step);
    });
}

function processValidation(step) {
    if (step === 1) {
        const monto = document.getElementById('input-monto').value || currentMonto;
        if (monto < 1) { alert("Ingresa un monto válido"); return false; }

        if (donationType === 'individual') {
            const nombre = document.getElementById('reg-nombre').value;
            const email = document.getElementById('reg-email').value;
            const tel = document.getElementById('reg-tel').value;

            if (nombre.length < 2) { alert("Escribe el nombre del destinatario"); return false; }
            if (!validateEmail(email)) { alert("Correo electrónico inválido"); return false; }
            if (!validateTel(tel)) { alert("El teléfono debe tener 10 dígitos"); return false; }
            
            document.getElementById('p-name').innerText = nombre;
        } else {
            if (!document.getElementById('bulk-file').files.length) { alert("Sube un archivo CSV"); return false; }
        }
        document.getElementById('final-monto').innerText = `$${monto}.00 MXN`;
    }

    if (step === 3) {
        const rfc = document.getElementById('fisc-rfc').value;
        if (!validateRFC(rfc)) { alert("RFC inválido (12-13 caracteres)"); return false; }
    }
    return true;
}

function updateCert(type, val, el) {
    if (type === 'logo') {
        document.getElementById('p-logo').src = logos[val];
        document.querySelectorAll('.logo-box').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
    } else {
        document.getElementById('p-msg').innerText = val ? `"${val}"` : "Mensaje personalizado";
    }
}