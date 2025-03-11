function showMessage(message, type = "success") {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    setTimeout(() => messageDiv.style.display = "none", 1000);
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
            const isEmail = /\S+@\S+\.\S+/.test(input);

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

    const isEmail = /\S+@\S+\.\S+/.test(inputAcesso.value.trim());
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

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showMessage("Por favor, insira um endereço de e-mail válido para redefinir a senha.", "error");
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
            const response = await fetch(`https://root.anota.ai/auth/users/find-by/?email=${email}`, {
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
                document.getElementById("loja-container-senha").style.display = "block";
                const selectElement = document.getElementById("select-loja-senha");
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

            await sendResetPasswordEmail(email, userRefs[0].page._id);
        } catch (error) {
            showMessage("Ocorreu um erro ao tentar redefinir a senha.", "error");
        } finally {
            hideLoading();
        }
    });
});

document.getElementById("select-loja-senha").addEventListener("change", async function () {
    const selectedPageId = this.value;
    const email = document.getElementById("input-acesso").value.trim();

    if (selectedPageId && email) {
        showLoading();
        try {
            await sendResetPasswordEmail(email, selectedPageId);
        } catch (error) {
            showMessage("Ocorreu um erro ao tentar redefinir a senha.", "error");
        } finally {
            hideLoading();
        }
    }
});

async function sendResetPasswordEmail(email, pageId) {
    const response = await fetch("https://api.anota.ai/auth/session/authentication/forgot-password?isNewAdmin=true", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: email, pageId })
    });

    const result = await response.json();

    if (!response.ok) {
        showMessage(`Erro: ${result.err || "Não foi possível redefinir a senha."}`, "error");
        return;
    }

    showMessage("E-mail de redefinição de senha enviado com sucesso!", "success");
}

document.getElementById("links-uteis").addEventListener("click", function () {
    const linksContainer = document.getElementById("links-container");
    if (linksContainer.style.display === "none") {
        linksContainer.style.display = "block";
    } else {
        linksContainer.style.display = "none";
    }
});