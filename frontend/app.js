// const API_URL = 'http://localhost:3000/api';
// let usuarioAtual = JSON.parse(localStorage.getItem('sighas_user') || 'null');
// let listaAssistidos = [];
// let editandoId = null;

// window.onload = () => {
//     if (usuarioAtual) {
//         document.getElementById('login-screen').style.display = 'none';
//         document.getElementById('app-screen').style.display = 'flex';
//         configurarInterface();
//         carregarDashboard();
//     }
// };

// document.getElementById('login-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const senha = document.getElementById('senha').value;
//     try {
//         const res = await fetch(`${API_URL}/login`, {
//             method: 'POST', headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, senha })
//         });
//         const data = await res.json();
//         if (data.sucesso) {
//             usuarioAtual = data.usuario;
//             localStorage.setItem('sighas_user', JSON.stringify(usuarioAtual));
//             document.getElementById('login-screen').style.display = 'none';
//             document.getElementById('app-screen').style.display = 'flex';
//             configurarInterface();
//             carregarDashboard();
//         } else { alert(data.erro); }
//     } catch { alert('Erro de conexão.'); }
// });

// function logout() {
//     localStorage.clear();
//     usuarioAtual = null;
//     window.location.reload();
// }

// function showScreen(screenId) {
//     document.getElementById('view-dashboard').style.display = 'none';
//     document.getElementById('view-prontuarios').style.display = 'none';
//     document.getElementById('view-cadastro').style.display = 'none';
//     document.getElementById(`view-${screenId}`).style.display = 'block';
// }

// function configurarInterface() {
//     document.getElementById('user-name').innerText = usuarioAtual.nome;
//     document.getElementById('user-role').innerText = usuarioAtual.cargo;
//     const isClinico = (usuarioAtual.cargo === 'Psicologo' || usuarioAtual.cargo === 'Coordenador');
//     document.querySelectorAll('.col-psico').forEach(el => el.style.display = isClinico ? 'table-cell' : 'none');
//     document.querySelector('.core-secret').style.display = isClinico ? 'flex' : 'none';
// }

// async function carregarDashboard() {
//     showScreen('dashboard');
//     const res = await fetch(`${API_URL}/dashboard`);
//     const data = await res.json();
//     document.getElementById('dash-total').innerText = data.total || 0;
// }

// function formatarCpf(cpf) {
//     if (!cpf) return '-';
//     let v = cpf.toString().replace(/\D/g, "");
//     return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
// }

// async function carregarProntuarios() {
//     const res = await fetch(`${API_URL}/assistidos?cargo=${usuarioAtual.cargo}`);
//     listaAssistidos = await res.json();
//     renderizarTabela(listaAssistidos);
// }

// function filtrarTabela() {
//     const termo = document.getElementById('filtro-nome').value.toLowerCase().replace(/\D/g, '');
//     const filtrada = listaAssistidos.filter(a => 
//         a.nome.toLowerCase().includes(document.getElementById('filtro-nome').value.toLowerCase()) || 
//         (a.cpf && a.cpf.replace(/\D/g, '').includes(termo))
//     );
//     renderizarTabela(filtrada);
// }

// function renderizarTabela(dados) {
//     const tbody = document.getElementById('tbody-assistidos');
//     tbody.innerHTML = '';
//     const isClinico = (usuarioAtual.cargo === 'Psicologo' || usuarioAtual.cargo === 'Coordenador');

//     dados.forEach(a => {
//         const tr = document.createElement('tr');
        
//         if (editandoId === a.id) {
//             // MODO EDIÇÃO (Mantive a ordem para bater com o novo cabeçalho)
//             tr.innerHTML = `
//                 <td><input type="text" id="edit-nome-${a.id}" value="${a.nome}" class="edit-input"></td>
//                 <td><input type="text" id="edit-bairro-${a.id}" value="${a.bairro || ''}" class="edit-input"></td>
//                 <td><input type="text" id="edit-tel-${a.id}" value="${a.telefone || ''}" class="edit-input"></td>
//                 <td>
//                     <select id="edit-nec-${a.id}" class="edit-select">
//                         <option value="Cesta Básica" ${a.necessidade_principal === 'Cesta Básica' ? 'selected' : ''}>Cesta Básica</option>
//                         <option value="Medicamentos" ${a.necessidade_principal === 'Medicamentos' ? 'selected' : ''}>Medicamentos</option>
//                         <option value="Documentação" ${a.necessidade_principal === 'Documentação' ? 'selected' : ''}>Documentação</option>
//                         <option value="Acompanhamento Social" ${a.necessidade_principal === 'Acompanhamento Social' ? 'selected' : ''}>Acompanhamento Social</option>
//                         <option value="Ajuda de Custo" ${a.necessidade_principal === 'Ajuda de Custo' ? 'selected' : ''}>Ajuda de Custo</option>
//                     </select>
//                 </td>
//                 <td><textarea id="edit-soc-${a.id}" class="edit-area">${a.observacoes_sociais || ''}</textarea></td>
//                 ${isClinico ? `<td><textarea id="edit-psi-${a.id}" class="edit-area">${a.observacoes_psicologicas || ''}</textarea></td>` : ''}
//                 <td>
//                     <button onclick="salvarEdicao(${a.id})" class="btn-save">Salvar</button>
//                     <button onclick="cancelarEdicao()" class="btn-cancel">X</button>
//                 </td>
//             `;
//         } else {
//             // MODO LEITURA (Agora com Telefone no meio)
//             tr.innerHTML = `
//                 <td><strong>${a.nome}</strong><br><small>CPF: ${formatarCpf(a.cpf)}</small></td>
//                 <td>${a.bairro || '-'}</td>
//                 <td>${a.telefone || '-'}</td>
//                 <td><span class="tag ${getCorTag(a.necessidade_principal)}">${a.necessidade_principal}</span></td>
//                 <td>${a.observacoes_sociais || '-'}</td>
//                 ${isClinico ? `<td style="color:#b91c1c; font-style:italic;">${a.observacoes_psicologicas || '-'}</td>` : ''}
//                 <td><button onclick="iniciarEdicao(${a.id})" class="btn-edit">✏️ Editar</button></td>
//             `;
//         }
//         tbody.appendChild(tr);
//     });
// }

// async function salvarEdicao(id) {
//     const payload = {
//         nome: document.getElementById(`edit-nome-${id}`).value,
//         bairro: document.getElementById(`edit-bairro-${id}`).value,
//         telefone: document.getElementById(`edit-tel-${id}`).value, // <--- ADICIONE ISSO
//         necessidade_principal: document.getElementById(`edit-nec-${id}`).value,
//         observacoes_sociais: document.getElementById(`edit-soc-${id}`).value,
//         cargo: usuarioAtual.cargo,
//         observacoes_psicologicas: document.getElementById(`edit-psi-${id}`) ? document.getElementById(`edit-psi-${id}`).value : null
//     };
//     await fetch(`${API_URL}/assistidos/${id}`, {
//         method: 'PUT', headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     editandoId = null;
//     carregarProntuarios();
// }

// document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const payload = {
//         nome: document.getElementById('cad-nome').value,
//         cpf: document.getElementById('cad-cpf').value,
//         telefone: document.getElementById('cad-telefone').value,
//         bairro: document.getElementById('cad-bairro').value,
//         necessidade_principal: document.getElementById('cad-necessidade').value,
//         observacoes_sociais: document.getElementById('cad-social').value,
//         observacoes_psicologicas: document.getElementById('cad-psico').value,
//         cadastrado_por: usuarioAtual.nome,
//         cargo: usuarioAtual.cargo
//     };
//     const res = await fetch(`${API_URL}/assistidos`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     const data = await res.json();
//     if (res.ok) {
//         alert('Ficha cadastrada!');
//         document.getElementById('cadastro-form').reset();
//         showScreen('prontuarios');
//         carregarProntuarios();
//     } else {
//         alert(data.erro);
//     }
// });


const API_URL = 'http://localhost:3000/api';
let usuarioAtual = JSON.parse(localStorage.getItem('sighas_user') || 'null');
let listaAssistidos = [];
let editandoId = null;

window.onload = () => {
    if (usuarioAtual) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        configurarInterface();
        carregarDashboard();
    }
};

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const data = await res.json();
        if (data.sucesso) {
            usuarioAtual = data.usuario;
            localStorage.setItem('sighas_user', JSON.stringify(usuarioAtual));
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'flex';
            configurarInterface();
            carregarDashboard();
        } else { alert(data.erro); }
    } catch { alert('Erro de conexão.'); }
});

function logout() {
    localStorage.clear();
    usuarioAtual = null;
    window.location.reload();
}

function showScreen(screenId) {
    document.getElementById('view-dashboard').style.display = 'none';
    document.getElementById('view-prontuarios').style.display = 'none';
    document.getElementById('view-cadastro').style.display = 'none';
    document.getElementById(`view-${screenId}`).style.display = 'block';
}

function configurarInterface() {
    document.getElementById('user-name').innerText = usuarioAtual.nome;
    document.getElementById('user-role').innerText = usuarioAtual.cargo;
    const isClinico = (usuarioAtual.cargo === 'Psicologo' || usuarioAtual.cargo === 'Coordenador');
    document.querySelectorAll('.col-psico').forEach(el => el.style.display = isClinico ? 'table-cell' : 'none');
    document.querySelector('.core-secret').style.display = isClinico ? 'flex' : 'none';
}

async function carregarDashboard() {
    showScreen('dashboard');
    const res = await fetch(`${API_URL}/dashboard`);
    const data = await res.json();
    document.getElementById('dash-total').innerText = data.total || 0;
}

function formatarCpf(cpf) {
    if (!cpf) return '-';
    let v = cpf.toString().replace(/\D/g, "");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function getCorTag(necessidade) {
    if (necessidade === 'Medicamentos' || necessidade === 'Ajuda de Custo') return 'tag-red';
    if (necessidade === 'Cesta Básica') return 'tag-orange';
    if (necessidade === 'Acompanhamento Social') return 'tag-green';
    return 'tag-blue';
}

async function carregarProntuarios() {
    const res = await fetch(`${API_URL}/assistidos?cargo=${usuarioAtual.cargo}`);
    listaAssistidos = await res.json();
    renderizarTabela(listaAssistidos);
}

function filtrarTabela() {
    const termo = document.getElementById('filtro-nome').value.toLowerCase().replace(/\D/g, '');
    const filtrada = listaAssistidos.filter(a => 
        a.nome.toLowerCase().includes(document.getElementById('filtro-nome').value.toLowerCase()) || 
        (a.cpf && a.cpf.replace(/\D/g, '').includes(termo))
    );
    renderizarTabela(filtrada);
}

function renderizarTabela(dados) {
    const tbody = document.getElementById('tbody-assistidos');
    tbody.innerHTML = '';
    const isClinico = (usuarioAtual.cargo === 'Psicologo' || usuarioAtual.cargo === 'Coordenador');

    dados.forEach(a => {
        const tr = document.createElement('tr');
        
        if (editandoId === a.id) {
            tr.innerHTML = `
                <td><input type="text" id="edit-nome-${a.id}" value="${a.nome}" class="edit-input"></td>
                <td><input type="text" id="edit-bairro-${a.id}" value="${a.bairro || ''}" class="edit-input"></td>
                <td><input type="text" id="edit-tel-${a.id}" value="${a.telefone || ''}" class="edit-input"></td>
                <td>
                    <select id="edit-nec-${a.id}" class="edit-select">
                        <option value="Cesta Básica" ${a.necessidade_principal === 'Cesta Básica' ? 'selected' : ''}>Cesta Básica</option>
                        <option value="Medicamentos" ${a.necessidade_principal === 'Medicamentos' ? 'selected' : ''}>Medicamentos</option>
                        <option value="Documentação" ${a.necessidade_principal === 'Documentação' ? 'selected' : ''}>Documentação</option>
                        <option value="Acompanhamento Social" ${a.necessidade_principal === 'Acompanhamento Social' ? 'selected' : ''}>Acompanhamento Social</option>
                        <option value="Ajuda de Custo" ${a.necessidade_principal === 'Ajuda de Custo' ? 'selected' : ''}>Ajuda de Custo</option>
                    </select>
                </td>
                <td><textarea id="edit-soc-${a.id}" class="edit-area">${a.observacoes_sociais || ''}</textarea></td>
                ${isClinico ? `<td><textarea id="edit-psi-${a.id}" class="edit-area">${a.observacoes_psicologicas || ''}</textarea></td>` : '<td class="col-psico"></td>'}
                <td>
                    <button onclick="salvarEdicao(${a.id})" class="btn-save">Salvar</button>
                    <button onclick="editandoId = null; renderizarTabela(listaAssistidos);" class="btn-cancel">X</button>
                </td>
            `;
        } else {
            tr.innerHTML = `
                <td><strong>${a.nome}</strong><br><small>CPF: ${formatarCpf(a.cpf)}</small></td>
                <td>${a.bairro || '-'}</td>
                <td>${a.telefone || '-'}</td>
                <td><span class="tag ${getCorTag(a.necessidade_principal)}">${a.necessidade_principal}</span></td>
                <td>${a.observacoes_sociais || '-'}</td>
                ${isClinico ? `<td style="color:#b91c1c; font-style:italic;">${a.observacoes_psicologicas || '-'}</td>` : '<td class="col-psico"></td>'}
                <td><button onclick="editandoId = ${a.id}; renderizarTabela(listaAssistidos);" class="btn-edit">✏️ Editar</button></td>
            `;
        }
        tbody.appendChild(tr);
    });
}

function salvarEdicao(id) {
    const payload = {
        nome: document.getElementById(`edit-nome-${id}`).value,
        bairro: document.getElementById(`edit-bairro-${id}`).value,
        telefone: document.getElementById(`edit-tel-${id}`).value,
        necessidade_principal: document.getElementById(`edit-nec-${id}`).value,
        observacoes_sociais: document.getElementById(`edit-soc-${id}`).value,
        cargo: usuarioAtual.cargo,
        observacoes_psicologicas: document.getElementById(`edit-psi-${id}`) ? document.getElementById(`edit-psi-${id}`).value : null
    };
    fetch(`${API_URL}/assistidos/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(() => { editandoId = null; carregarProntuarios(); });
}

document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        nome: document.getElementById('cad-nome').value,
        cpf: document.getElementById('cad-cpf').value,
        telefone: document.getElementById('cad-telefone').value,
        bairro: document.getElementById('cad-bairro').value,
        necessidade_principal: document.getElementById('cad-necessidade').value,
        observacoes_sociais: document.getElementById('cad-social').value,
        observacoes_psicologicas: document.getElementById('cad-psico').value,
        cadastrado_por: usuarioAtual.nome,
        cargo: usuarioAtual.cargo
    };
    const res = await fetch(`${API_URL}/assistidos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
        alert('Ficha cadastrada!');
        document.getElementById('cadastro-form').reset();
        showScreen('prontuarios');
        carregarProntuarios();
    } else {
        alert(data.erro);
    }
});