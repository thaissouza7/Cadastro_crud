function criarUsuario(event) {
    event.preventDefault();

    // pega valores dos campos de entrada do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const habilidade = document.getElementById('habilidade').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    //criacao do objeto com os valores captados
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        habilidade: habilidade
    };

   
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // coloca o usuário ao array
    usuarios.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // limpa os campos do formulario
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('complemento').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('habilidade').value = '';


    exibirUsuarios();
}

function exibirUsuarios() {
   
    const usuariosTable = document.getElementById('usuarios');
    usuariosTable.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // estrutura da tabela de usuários
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    table.appendChild(thead);

    // linha de cabeçalho da tabela
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>Nome</th>
      <th>Email</th>
      <th>Telefone</th>
      <th>Cidade</th>
      <th>Habilidade</th>
      <th>Ações</th>
    `;
    headerRow.style.backgroundColor = 'rgb(31, 30, 30)';
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // preenche tabela com os dados dos usuários
    usuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.nome} ${usuario.sobrenome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.cidade}</td>
            <td>${usuario.habilidade}</td>
            <td>
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
                <button class="visualizar">Visualizar</button>
            </td>
        `;
        row.classList.add('tabelaUsuarios');
        tbody.appendChild(row);
    });

    // adiciona a tabela de usuários em html
    usuariosTable.appendChild(table);

   
    registrarEventosEdicao();
    registrarEventosExclusao();
    registrarEventosVisualizacao();
}

function visualizarUsuario(index) {
   
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    
    const usuario = usuarios[index];

    //  string de conteúdo com os detalhes do usuário
    const conteudo = `
        Nome: ${usuario.nome} ${usuario.sobrenome}
        Email: ${usuario.email}
        Telefone: ${usuario.telefone}
        CEP: ${usuario.habilidade}
        Rua:${usuario.rua}
        Número: ${usuario.numero}
        Bairro:${usuario.bairro}
        Cidade:${usuario.cidade}
        Estado:  ${usuario.estado}
        Habilidades: ${usuario.habilidade}
    `;

    // exibe um alerta com o conteúdo do usuário
    alert(conteudo);
}

function registrarEventosVisualizacao() {

    const botoesVisualizar = document.getElementsByClassName('visualizar');


    for (let i = 0; i < botoesVisualizar.length; i++) {
        const botaoVisualizar = botoesVisualizar[i];
        botaoVisualizar.addEventListener('click', function () {
            visualizarUsuario(i);
        });
    }
}

function editarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios[index];

    // Preenche os campos do formulário com os dados do usuário
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('sobrenome').value = usuario.sobrenome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('telefone').value = usuario.telefone;
    document.getElementById('cep').value = usuario.cep;
    document.getElementById('habilidade').value = usuario.habilidade;
    document.getElementById('numero').value = usuario.numero;

    usuarios.splice(index, 1);

    // atualiza o localStorage com o array de usuarios atualizado
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

   
    exibirUsuarios();
}

function excluirUsuario(index) {
  
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);

    // atualiza o localStorage com  todos os usuarios atualizados
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

   
    exibirUsuarios();
}

async function buscarEndereco(cep) {
    try {
        // faz uma requisição com base no cep digitad
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const endereco = response.data;

        // preenche os campos do formulário 
        document.getElementById('rua').value = endereco.street || '';
        document.getElementById('bairro').value = endereco.neighborhood || '';
        document.getElementById('cidade').value = endereco.city || '';
        document.getElementById('estado').value = endereco.state || '';
    } catch (error) {
        console.log(error);
    }
}

function registrarEventosEdicao() {
    const botoesEditar = document.getElementsByClassName('editar');
    for (let i = 0; i < botoesEditar.length; i++) {
        const botaoEditar = botoesEditar[i];
        botaoEditar.addEventListener('click', function () {
            editarUsuario(i);
        });
    }
}

function registrarEventosExclusao() {
    //pega todos os botões de exclusão
    const botoesExcluir = document.getElementsByClassName('excluir');

    for (let i = 0; i < botoesExcluir.length; i++) {
        const botaoExcluir = botoesExcluir[i];
        botaoExcluir.addEventListener('click', function () {
            excluirUsuario(i);
        });
    }
}

document.getElementById('formulario').addEventListener('submit', criarUsuario);
document.getElementById('cep').addEventListener('change', function (event) {
    const cep = event.target.value;
    buscarEndereco(cep);
});

// quando a pagina carregar, aparece os usuarios
exibirUsuarios();

// adiciona o nome e a foto do usuario do github
document.addEventListener("DOMContentLoaded", function () {
    var logins = localStorage.getItem("logins");
    if (logins) {
        var loginsObj = JSON.parse(logins);
        document.getElementById("foto").src = loginsObj.avatar_url;
        document.getElementById("nomeGithub").textContent = loginsObj.name;
    }
});

// exclui os dados do usuário e redireciona para a pagina de login
var sair = document.getElementById("sair");
sair.addEventListener("click", function () {
    localStorage.removeItem("logins");
    localStorage.removeItem("usuarios");
    window.location.href = "login.html";
});
