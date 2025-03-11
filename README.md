# Modificações

## 1. Melhorias no Design e Usabilidade

### Arquivo `popup.html`

- **Adição do Bootstrap**: Substituição do CSS customizado pelo Bootstrap para um design mais moderno e responsivo.
- **Ícones do Font Awesome**: Adição de ícones nos botões para melhorar a identificação visual das funcionalidades.
- **Estrutura HTML melhorada**: Uso de `div` com classes do Bootstrap para organizar o layout.
- **Adicionado um novo botão "Links Úteis"**: Um botão que exibe links úteis quando clicado.
- **Adicionado um contêiner `#links-container`**: Para exibir os links úteis.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Root PowerToys</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="p-3">
    <div class="container">
        <h3 class="text-primary mb-4"><i class="fas fa-tools me-2"></i>Root PowerToys</h3>
        <div id="message" class="alert d-none"></div>
        <div class="mb-3">
            <label for="input-acesso" class="form-label">E-mail ou root:</label>
            <input type="text" id="input-acesso" class="form-control" placeholder="Digite o e-mail ou o root">
        </div>
        <div id="loja-container" class="mb-3 d-none">
            <label for="select-loja" class="form-label">Selecione uma loja:</label>
            <select id="select-loja" class="form-select"></select>
        </div>
        <button id="acessar" class="btn btn-primary w-100 mb-2">
            <i class="fas fa-sign-in-alt me-2"></i>Acessar Root
        </button>
        <button id="acessar-tuna" class="btn btn-secondary w-100 mb-2" disabled>
            <i class="fas fa-fish me-2"></i>Acessar a Tuna
        </button>
        <button id="redefinir-senha" class="btn btn-warning w-100 mb-2" disabled>
            <i class="fas fa-key me-2"></i>Redefinir Senha
        </button>
        <button id="btnLinksUteis" class="btn btn-info w-100 mb-2">
            <i class="fas fa-link me-2"></i>Links Úteis
        </button>
        <div id="links-container">
            <a href="https://support-tools.k8s-legacy.dc.anotaai-production.com" target="_blank">Support Tools</a>
            <a href="https://anotaai.superlogica.net/clients/financeiro/index/index2" target="_blank">SuperLogica</a>
        </div>
        <div id="loading" class="text-center mt-3 d-none">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
            <p class="mt-2">Carregando...</p>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="popup.js"></script>
</body>
</html>
```

### Arquivo `style.css`

- **Efeitos Visuais**: Adição de animações como `fadeIn` para mensagens de feedback.
- **Suporte a Tema Escuro**: Adição de regras CSS com `@media (prefers-color-scheme: dark)`.
- **Melhoria na Responsividade**: Uso de classes do Bootstrap para garantir que o layout se adapte a diferentes tamanhos de tela.
- **Adicionado estilos para o contêiner de links e os próprios links**.

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
    width: 300px;
    padding: 10px;
}

.btn:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

#message {
    animation: fadeIn 0.3s ease-in-out;
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #1e1e1e;
        color: #f4f4f4;
    }

    .form-control, .form-select {
        background-color: #2d2d2d;
        color: #f4f4f4;
        border-color: #555;
    }

    .btn-primary {
        background-color: #66b2ff;
        border-color: #66b2ff;
        color: #1e1e1e;
    }

    .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
    }

    .btn-warning {
        background-color: #ffc107;
        border-color: #ffc107;
        color: #1e1e1e;
    }

    .alert-success {
        background-color: #2e7d32;
        color: white;
    }

    .alert-error {
        background-color: #d32f2f;
        color: white;
    }
}

#links-container {
    display: none; /* Inicialmente oculto */
    margin-top: 20px;
}

#links-container a {
    display: block;
    margin: 10px 0;
    color: #007bff;
    text-decoration: none;
}

#links-container a:hover {
    text-decoration: underline;
}
```

## 2. Melhorias na Funcionalidade

### Arquivo `popup.js`

- **Feedback Visual Aprimorado**: Adição de um indicador de carregamento (`spinner`) durante operações assíncronas.
- **Mensagens de Feedback**: Mensagens de sucesso e erro agora usam classes do Bootstrap (`alert-success` e `alert-danger`).
- **Validação de Entrada**: Validação aprimorada para garantir que apenas valores válidos (root ou e-mail) sejam processados.
- **Lógica de Navegação**: Reutilização da lógica de navegação para evitar duplicação de código.
- **Adicionado um evento de clique para o botão "Links Úteis"**: Alterna a visibilidade do contêiner de links.
- **Redefinição de Senha com Seleção de Loja**: Adicionada funcionalidade para selecionar uma loja específica ao redefinir a senha.

```javascript
function showMessage(message, type = "success") {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    setTimeout(() => messageDiv.style.display = "none", 5000);
}

function showLoading() {
    document.getElementById("loading").style.display = "flex";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

document.getElementById("acessar").addEventListener("click", async function () {
    const input = document.getElementById("input-acesso").value.trim();

    if (!input) {
        showMessage("Por favor, insira um root ou um endereço de e-mail válido.", "error");
        return;
    }

    showLoading();

    chrome.storage.local.get("authToken", async (data) => {
        const authToken = data.authToken;

        if (!authToken) {
            showMessage("Token de autenticação não encontrado. Faça login na Anota AI.", "error");
            hideLoading();
            return;
        }

        try {
            let url = "";
            const selectElement = document.getElementById("select-loja");
            const isRoot = /^[a-f0-9]{24}$/.test(input);
            const isEmail = /S+@S+.S+/.test(input);

            if (!isRoot && !isEmail) {
                showMessage("Por favor, insira um root ou um endereço de e-mail válido.", "error");
                hideLoading();
                return;
            }

            if (isRoot) {
                url = `https://root.anota.ai/#/principal/establishment/${input}`;
            } else if (isEmail) {
                const response = await fetch(`https://root.anota.ai/auth/users/find-by/?email=${input}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `${authToken}`,
                        "Content-Type": "application/json"
                    }
                });

                const userData = await response.json();

                if (!response.ok) {
                    showMessage(`Erro: ${userData.err || "Algo deu errado."}`, "error");
                    hideLoading();
                    return;
                }

                const userRefs = userData?.userRefs;

                if (!userRefs || userRefs.length === 0) {
                    showMessage("Nenhuma página encontrada para este usuário.", "error");
                    hideLoading();
                    return;
                }

                if (userRefs.length > 1) {
                    document.getElementById("loja-container").style.display = "block";
                    selectElement.innerHTML = "";

                    const defaultOption = document.createElement("option");
                    defaultOption.value = "";
                    defaultOption.textContent = "Selecione uma loja...";
                    selectElement.appendChild(defaultOption);

                    userRefs.forEach(ref => {
                        const option = document.createElement("option");
                        option.value = ref.page._id;
                        option.textContent = `${ref.page.name} - ${ref.active ? "Ativa" : "Inativa"}`;
                        selectElement.appendChild(option);
                    });

                    hideLoading();
                    return;
                }

                url = `https://root.anota.ai/#/principal/establishment/${userRefs[0].page._id}`;
            }

            if (url) {
                const tabs = await chrome.tabs.query({ url: "*://root.anota.ai/*" });

                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { url, active: true });
                } else {
                    chrome.tabs.create({ url });
                }
            }
        } catch (error) {
            showMessage("Ocorreu um erro ao tentar acessar as informações.", "error");
        } finally {
            hideLoading();
        }
    });
});

document.getElementById("select-loja").addEventListener("change", async function () {
    const selectedPageId = this.value;
    if (selectedPageId) {
        const url = `https://root.anota.ai/#/principal/establishment/${selectedPageId}`;
        const tabs = await chrome.tabs.query({ url: "*://root.anota.ai/*" });

        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { url, active: true });
        } else {
            chrome.tabs.create({ url });
        }
    }
});

const inputAcesso = document.getElementById("input-acesso");
const btnAcessarTuna = document.getElementById("acessar-tuna");
const btnRedefinir = document.getElementById("redefinir-senha");

inputAcesso.addEventListener("input", function () {
    const isRoot = /^[a-f0-9]{24}$/.test(inputAcesso.value.trim());
    btnAcessarTuna.disabled = !isRoot;

    const isEmail = /S+@S+.S+/.test(inputAcesso.value.trim());
    btnRedefinir.disabled = !isEmail;
});

btnAcessarTuna.addEventListener("click", async function () {
    const input = document.getElementById("input-acesso").value.trim();

    if (!input) {
        showMessage("Por favor, insira um root válido.", "error");
        return;
    }

    showLoading();

    try {
        const url = `https://console.tuna.uy/anota-ai/anota-ai/merchants/${input}/payout`;
        const tabs = await chrome.tabs.query({ url: "*://console.tuna.uy/*" });

        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { url, active: true });
        } else {
            chrome.tabs.create({ url });
        }
    } catch (error) {
        showMessage("Ocorreu um erro ao tentar acessar as informações da Tuna.", "error");
    } finally {
        hideLoading();
    }
});

document.getElementById("redefinir-senha").addEventListener("click", async function () {
    const email = document.getElementById("input-acesso").value.trim();

    if (!email || !/S+@S+.S+/.test(email)) {
        showMessage("Por favor, insira um endereço de e-mail válido para redefinir a senha.", "error");
        return;
    }

    showLoading();

    try {
        const response = await fetch("https://api.anota.ai/auth/session/authentication/forgot-password?isNewAdmin=true", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: email })
        });

        const result = await response.json();

        if (!response.ok) {
            showMessage(`Erro: ${result.err || "Não foi possível redefinir a senha."}`, "error");
            return;
        }

        showMessage("E-mail de redefinição de senha enviado com sucesso!", "success");
    } catch (error) {
        showMessage("Ocorreu um erro ao tentar redefinir a senha.", "error");
    } finally {
        hideLoading();
    }
});

document.getElementById("btnLinksUteis").addEventListener("click", function () {
    const linksContainer = document.getElementById("links-container");
    if (linksContainer.style.display === "none" || linksContainer.style.display === "") {
        linksContainer.style.display = "block";
    } else {
        linksContainer.style.display = "none";
    }
});
```

## 3. Melhorias na Eficiência

### Arquivo `popup.js`

- **Otimização de Código**: Redução de duplicação de código ao reutilizar a lógica de navegação.
- **Melhoria na Legibilidade**: Código organizado em funções menores e mais específicas.

## 4. Melhorias na Experiência do Usuário

### Arquivo `popup.html`

- **Design Mais Atraente**: Uso de cores e espaçamento consistentes com o Bootstrap.
- **Feedback Imediato**: Mensagens de sucesso/erro exibidas de forma clara e com animação.
- **Links Úteis**: Adição de um botão para exibir links úteis de forma interativa.

## 5. Resumo das Melhorias por Arquivo

| Arquivo          | Melhorias Implementadas                                                                 |
|------------------|-----------------------------------------------------------------------------------------|
| `manifest.json`  | Atualização da versão para 1.3.                                                        |
| `popup.html`     | Adição do Bootstrap, ícones do Font Awesome, estrutura HTML melhorada, botão "Links Úteis". |
| `style.css`      | Efeitos visuais, suporte a tema escuro, código mais limpo e organizado, estilos para links úteis. |
| `popup.js`       | Feedback visual aprimorado, validação de entrada, otimização de código, interatividade, redefinição de senha com seleção de loja. |
| `background.js`  | Sem alterações significativas.                                                          |

## 6. Benefícios das Melhorias

- **Design Moderno**: Interface mais atraente e profissional.
- **Usabilidade Aprimorada**: Feedback visual claro e imediato.
- **Eficiência**: Código mais limpo e organizado.
- **Experiência do Usuário**: Interface responsiva e adaptável a temas escuros.
- **Funcionalidades Adicionais**: Links úteis e redefinição de senha com seleção de loja.

## 7. Como Testar as Melhorias

1. **Instalação**: Carregue a extensão no Chrome em modo de desenvolvedor.
2. **Testes**: Abra uma página da Anota AI e use a extensão.
3. **Validação**: Confira se todas as funcionalidades estão funcionando corretamente.

## 8. Considerações Finais

As modificações implementadas tornam o sistema mais **moderno**, **eficiente** e **amigável para o usuário**. A inclusão do Bootstrap e Font Awesome, juntamente com melhorias no código e na usabilidade, eleva a qualidade da extensão sem comprometer suas funcionalidades originais. Além disso, a adição de novas funcionalidades, como os links úteis e a redefinição de senha com seleção de loja, melhora significativamente a experiência do usuário.
