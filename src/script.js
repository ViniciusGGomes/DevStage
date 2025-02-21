const form = document.getElementById("form");
const email = document.getElementById("E-mail");
const phone = document.getElementById("Telefone");

const users = [
    { email: "test@test.com", phone: "999999999999", ref: 100, refBy: null },
    { email: "tust@tust.com", phone: "999999999999", ref: 200, refBy: 100 },
    { email: "tost@tost.com", phone: "999999999999", ref: 300, refBy: 100 },
];

const getUser = (userData) => {
    return users.find((user) => user.email === userData.email);
};

const getTotalSubscribers = (userData) => {
    return users.filter((user) => user.refBy === userData.ref).length;
};

const showInvite = (userData) => {
    window.location.href = `invite.html?ref=${userData.ref}`;
};

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.floor(Math.random() * 4000),
        refBy: 100,
    };

    users.push(newUser);
    return newUser;
};

const formAction = () => {
    form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {
            email: formData.get("E-mail"),
            phone: formData.get("telefone"),
        };

        const user = getUser(userData);
        if (user) {
            showInvite(user);
        } else {
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    };

    phone.oninput = () => {
        phone.value = phone.value.replace(/\D/g, "");
    };
};

const displayInviteLink = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = parseInt(params.get("ref"), 10); // Converte para número

    if (ref) {
        // Criar e exibir o link de convite
        const inputGroup = document.querySelector(".input-group");
        if (inputGroup) {
            const link = document.createElement("input");
            link.type = "text";
            link.id = "link";
            link.value = `https://evento.com?ref=${ref}`;
            link.disabled = true;

            inputGroup.appendChild(link);
        }

        // Encontrar o usuário pelo ref
        const user = users.find(u => u.ref === ref);
        if (user) {
            const totalSubscribers = getTotalSubscribers(user); // Pega total de inscritos usando o usuário correto

            // Exibir número de inscritos na seção .stats
            const stats = document.querySelector(".stats");
            if (stats) {
                const h4 = document.createElement("h4");
                h4.textContent = `${totalSubscribers}`; // Agora exibe corretamente
                stats.appendChild(h4);
            }
        }
    }
};

const startApp = () => {
    if (form) {
        formAction();
    }
    displayInviteLink();
};

startApp();
