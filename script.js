document.addEventListener('DOMContentLoaded', function() {
    const formSteps = document.querySelectorAll('.form-step');
    const stepTabs = document.querySelectorAll('.step');
    const form = document.getElementById('prematriculaForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const iniciarProcesoBtn = document.getElementById('iniciarProcesoBtn');
    let currentStep = 0;

    // Función para mostrar el paso actual
    function showStep(stepIndex) {
        // Ocultar todos los pasos del formulario
        formSteps.forEach((step) => {
            step.classList.remove('active');
        });
        // Desactivar todas las pestañas de progreso
        stepTabs.forEach((tab) => {
            tab.classList.remove('active');
        });

        // Mostrar el paso actual
        formSteps[stepIndex].classList.add('active');
        // Activar la pestaña de progreso actual
        stepTabs[stepIndex].classList.add('active');
        
        // Mueve la vista a la sección del formulario
        document.getElementById('proceso').scrollIntoView({ behavior: 'smooth' });
    }

    // Navegación con botones "Siguiente"
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', () => {
            // **Validación simple: Simula la verificación de campos requeridos**
            const currentFormStep = formSteps[currentStep];
            let isValid = true;
            currentFormStep.querySelectorAll('[required]').forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.border = '2px solid red'; // Resaltar el campo
                } else {
                    input.style.border = '1px solid #ccc';
                }
            });

            if (isValid) {
                currentStep++;
                if (currentStep < formSteps.length) {
                    showStep(currentStep);
                }
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    });

    // Navegación con botones "Anterior"
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Botón "INICIAR PROCESO" en el HERO
    iniciarProcesoBtn.addEventListener('click', () => {
        currentStep = 0;
        showStep(currentStep);
    });

    // Envío del Formulario (el último botón)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación: Aquí se enviaría la data al servidor (e.g., a un archivo PHP/Python)
        console.log('Datos del formulario listos para enviar:', {
            nivel: document.getElementById('nivel').value,
            nombre_aspirante: document.getElementById('nombre_aspirante').value,
            // ... (resto de los campos)
        });
        
        // Ocultar el formulario y mostrar el mensaje de confirmación
        form.style.display = 'none';
        document.querySelector('.step-progress').style.display = 'none'; // Ocultar la barra de progreso
        confirmationMessage.style.display = 'block';
    });

    // Mostrar el primer paso al cargar
    showStep(currentStep);
});