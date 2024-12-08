// Função para imprimir pedido
function imprimirPedido() {
  const conteudoPedido = document.getElementById('orderDetails');
  if (!conteudoPedido) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor, permita popups para imprimir o pedido.');
    return;
  }

  const html = `
    <html>
      <head>
        <title>Pedido</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .pedido { padding: 20px; }
          .titulo { font-size: 24px; margin-bottom: 20px; }
          .item { margin: 10px 0; }
          .total { margin-top: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="pedido">
          ${conteudoPedido.innerHTML}
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}

// Função para validar formulário
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');
  if (!form) return;

  const campos = {
    nome: {
      elemento: document.getElementById('name'),
      erro: document.getElementById('nameError'),
      validacao: (valor) => valor.length >= 3,
      mensagem: 'O nome deve ter pelo menos 3 caracteres'
    },
    email: {
      elemento: document.getElementById('email'),
      erro: document.getElementById('emailError'),
      validacao: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
      mensagem: 'Digite um email válido'
    },
    senha: {
      elemento: document.getElementById('password'),
      erro: document.getElementById('passwordError'),
      validacao: (valor) => valor.length >= 6,
      mensagem: 'A senha deve ter pelo menos 6 caracteres'
    },
    confirmarSenha: {
      elemento: document.getElementById('confirmPassword'),
      erro: document.getElementById('confirmPasswordError'),
      validacao: (valor) => valor === document.getElementById('password').value,
      mensagem: 'As senhas não coincidem'
    }
  };

  // Limpar mensagens de erro quando o usuário digita
  Object.values(campos).forEach(campo => {
    if (campo.elemento) {
      campo.elemento.addEventListener('input', () => {
        if (campo.erro) {
          campo.erro.textContent = '';
        }
      });
    }
  });

  form.addEventListener('submit', function(event) {
    let temErro = false;

    Object.entries(campos).forEach(([nome, campo]) => {
      if (campo.elemento && campo.erro) {
        const valor = campo.elemento.value.trim();
        
        if (!valor || !campo.validacao(valor)) {
          campo.erro.textContent = campo.mensagem;
          temErro = true;
        }
      }
    });

    if (temErro) {
      event.preventDefault();
    }
  });
});

// Exportar funções para uso global
window.imprimirPedido = imprimirPedido;
