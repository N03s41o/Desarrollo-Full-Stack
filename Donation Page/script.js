let currentMonto = 500;
let donationType = 'individual';

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

function validateStep(step) {
    if (step === 1) {
        const montoInput = document.getElementById('input-monto').value;
        const montoFinal = montoInput || currentMonto;
        
        if (montoFinal <= 0) { alert("Por favor ingresa un monto válido."); return false; }
        
        if (donationType === 'individual') {
            const nombre = document.getElementById('reg-nombre').value;
            const email = document.getElementById('reg-email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (nombre.length < 2) { alert("Nombre requerido."); return false; }
            if (!emailRegex.test(email)) { alert("Correo electrónico inválido."); return false; }
            
            document.getElementById('p-name').innerText = nombre;
        }
        document.getElementById('final-monto').innerText = `$${montoFinal}.00 MXN`;
    }
    
    if (step === 3) {
        const rfc = document.getElementById('fisc-rfc').value;
        if (rfc.length < 12) { alert("RFC debe tener 12 o 13 caracteres."); return false; }
    }
    
    return true;
}

function navTo(step) {
    const activeStep = parseInt(document.querySelector('.form-step:not(.d-none)').id.replace('step-', ''));
    if (step > activeStep && !validateStep(activeStep)) return;

    document.querySelectorAll('.form-step').forEach(s => s.classList.add('d-none'));
    document.getElementById('step-' + step).classList.remove('d-none');

    document.querySelectorAll('.step').forEach((s, i) => {
        s.classList.toggle('active', i + 1 === step);
        s.classList.toggle('completed', i + 1 < step);
    });
}

function updateCert(type, val, el) {
    if (type === 'logo') {
        const logos = {
            tecmilenio: "https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_Tecmilenio.png",
            tec: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Logo_Tec_de_Monterrey.svg/1200px-Logo_Tec_de_Monterrey.svg.png",
            tecsalud: "https://mexicohealth.com/wp-content/uploads/2021/03/TecSalud-logo.png"
        };
        document.getElementById('p-logo').src = logos[val];
        document.querySelectorAll('.logo-box').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
    } else {
        document.getElementById('p-msg').innerText = val ? `"${val}"` : "Mensaje personalizado";
    }
}