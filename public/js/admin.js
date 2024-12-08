document.addEventListener('DOMContentLoaded', function() {
    // Highlight menu ativo
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    menuLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.style.backgroundColor = '#34495e';
        }
    });

    // Fechar alertas automaticamente
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    });

    // Confirmação para ações de exclusão
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!confirm('Tem certeza que deseja excluir este item?')) {
                e.preventDefault();
            }
        });
    });

    // Preview de imagem para upload
    const imageInput = document.querySelector('input[type="file"]');
    const imagePreview = document.querySelector('.image-preview');
    
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Formatação de valores monetários
    const priceInputs = document.querySelectorAll('.price-input');
    priceInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value/100).toFixed(2);
            e.target.value = value;
        });
    });
});
