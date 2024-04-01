import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host =  '0.0.0.0';

const listaUsuarios = [];
const listaMensagens = [];

function processarCadastroUsuario(requisicao, resposta) {
    const dados = requisicao.body;
    let conteudoResposta = '';

    if (!(dados.nome && dados.nickname && dados.datanasc && dados.email && dados.senha && dados.confirmarsenha)) {
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro Usuario</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

            <style>
                body {
                    background-image: url('wallpapper.jpeg');
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .custom-div {
                    background-color: #a0cbbf;
                    border: none;
                    border-radius: 10px;
                    padding: 20px;
                    color: white;
                }
            </style>

        </head>
        <body>
            <div class="container col-6 custom-div">
                <form action='/cadastrarUsuario' method='POST' class="needs-validation" novalidate>
                    <fieldset>

                        <div class="title text-center">
                        <legend class="mb-3" style="color: white; font-size: 35px;"><b>Cadastro de <b style="color: #296656;">Usuario</b> </b></legend>
                        </div>

                        <div class="row gx-3">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nome" style="color: #296656;" class="form-label"><b>Nome</b></label>
                                    <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome || ''}" placeholder="ex.: Breno Oliveira" required>
                                    ${!dados.nome ? '<p class="text-danger">Por favor, informe seu nome!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nickname" style="color: #296656;" class="form-label"><b>Apelido</b></label>
                                    <div class="input-group has-validation">
                                        <span class="input-group-text" id="inputGroupPrepend3">@</span>
                                        <input type="text" class="form-control" id="nickname" name="nickname" value="${dados.nickname || ''}" placeholder="ex.: brenooliveira" required>
                                    </div>
                                    ${!dados.nickname ? '<p class="text-danger">Por favor, informe seu Apelido!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <label for="datanasc" style="color: #296656;" class="form-label"><b>Data de Nascimento</b></label>
                                <div>
                                    <input type="date" name="datanasc" id="datanasc" class="form-control" value="${dados.datanasc || ''}"/>
                                    ${!dados.datanasc ? '<p class="text-danger">Por favor, informe sua data de nascimento!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="email" style="color: #296656;" class="form-label"><b>E-Mail</b></label>
                                    <input type="email" class="form-control" id="email" name="email" value="${dados.email || ''}" placeholder="exemplo@gmail.com" required>
                                    ${!dados.email ? '<p class="text-danger">Por favor, informe seu e-mail!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="senha" style="color: #296656;" class="form-label"><b>Senha</b></label>
                                    <input type="password" class="form-control" id="senha" name="senha" value="${dados.senha || ''}" required>
                                    ${!dados.senha ? '<p class="text-danger">Por favor, informe sua senha!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="confirmarsenha" style="color: #296656;" class="form-label"><b>Confirmar Senha</b></label>
                                    <input type="password" class="form-control" id="confirmarsenha" name="confirmarsenha" value="${dados.confirmarsenha || ''}" required>
                                    ${dados.senha !== dados.confirmarsenha ? '<p class="text-danger">As senhas não são iguais!</p>' : ''}
                                </div>
                            </div>

                            <div class="col-md-6 mx-auto" style="padding-top: 20px;">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3 d-grid gap-2">
                                        <a href="/" class="btn btn-danger">Voltar</a>
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="mb-3 d-grid gap-2">
                                        <button class="btn btn-success" type="submit">Cadastrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </fieldset>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>`;
        resposta.end(conteudoResposta);
    }


    else{
        const usuario = {
            nome: dados.nome,
            apelido: dados.nickname,
            datanasc: dados.datanasc,
            email: dados.email,
        }

        listaUsuarios.push(usuario);

        conteudoResposta =`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios Cadastrados</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    background-image: url('wallpapper.jpeg');
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .custom-div {
                    background-color: #a0cbbf;
                    border: none;
                    border-radius: 10px;
                    padding: 20px;
                    color: white;
                    margin-top: 20px; /* Espaço acima do conteúdo */
                }
                h1 {
                    color: green;
                    text-align: center;
                    margin-bottom: 20px; /* Espaço abaixo do título */
                }
                th {
                    color: #296656;
                }
                td {
                    color: black; /* Ajuste para a cor do texto */
                }
                table {
                    border-radius: 10px; /* Ajuste conforme necessário */
                    overflow: hidden; /* Garante que os cantos sejam arredondados */
                }
            </style>
        </head>
        <body>
            <div class="container col-6 custom-div">
                <h1 style="color: white;">Lista de <b style="color: #296656;">Usuários cadastrados</b></h1>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Apelido</th>
                            <th>Data de Nascimento</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody> `;

                    for (const usuario of listaUsuarios){
                        conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>@${usuario.apelido}</td>
                                <td>${usuario.datanasc}</td>
                                <td>${usuario.email}</td>
                            <tr>
                        `;
                    }

                    conteudoResposta += `
                            </tbody>
                            </table>
                            <a class="btn btn-danger" href="/" role="button">Voltar ao menu</a>
                            <a class="btn btn-success" href="/cadastroUsuario.html" role="button">Cadastrar novo usuário</a>
                        </div>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                    </body>
                    </html>
                    `;
                    resposta.end(conteudoResposta);
        }
}

function autenticar(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}

const app = express();

app.use(cookieParser());

app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', autenticar, (requisicao, resposta) =>{
    
    const usuarioLogado = requisicao.cookies.NomeUsuario;
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    resposta.end (`
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <style>
            body {
                background-image: url('wallpapper.jpeg');
                background-size: cover;
                background-repeat: no-repeat;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            .custom-div {
                background-color: #a0cbbf;
                border: none;
                border-radius: 10px;
                padding: 20px;
                color: black;
                position: relative;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                color: #296656;
                background: none;
                border: none;
            }
            </style>
        </head>
        <body>
        <div class="container col-4 custom-div">
            <a class="btn btn-danger close-button" href="/login.html" role="button"><b>X</b></a>
            <h1 style="color: #296656;">Menu</h1>
            <nav class="nav flex-column">
                <a style="font-size: 30px;" class="nav-link" href="/cadastroUsuario.html">Cadastro de Usuários</a>
                <a style="font-size: 30px;" class="nav-link" href="/batePapo.html">Bate-papo</a>
                <a style="font-size: 30px;" class="nav-link" href="http://drive.google.com/u/0/uc?id=1qxDbV8itDC1rVUSDIr7KwkhH_GOp1b7E&export=download">Baixar</a>
            </nav>
            <br>
            <footer>
                <p>Olá ${usuarioLogado}, seu ultimo acesso foi em ${dataUltimoAcesso}</p>
            </footer>
        </div>    
        </body>
        </html>
        `);
})

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && (usuario === 'Breno') && (senha === '1234')){
        requisicao.session.usuarioAutenticado = true;
        resposta.cookie('NomeUsuario', usuario, {
            maxAge: 1800000,
            httpOnly: true
        });
        resposta.redirect('/');
    }
    else{
        resposta.end(`
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha na autenticação</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <style>
                    body {
                        background-image: url('wallpapper.jpeg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .custom-div {
                        text-align: center;
                        font-size: 20px;
                        background-color: #a0cbbf;
                        border: none;
                        border-radius: 10px;
                        padding: 20px;
                        color: red;
                    }
                    </style>
                </head>
                <body>
                <div class="container col-4 custom-div">
                    <h2>Usuário ou senha inválidos!</h2>
                    <a style="font-size: 20px;" class="btn btn-link" href="/login.html" role"button"> Voltar ao Login </a>
                </div>  
                </body>
            </html>
        `);
    }
});

function processarMensagem(requisicao, resposta, listaUsuarios) {
    const dados = requisicao.body;
    let conteudoResposta = '';

    if (!(dados.user && dados.mensagem)) {
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bate-Papo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-image: url('wallpapper.jpeg');
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .chat-wrapper {
                    width: 700px;
                    padding: 20px;
                    background-color: #a0cbbf;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                }
                .title {
                    background-color: #296656;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .message-area {
                    flex: 1;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    margin-bottom: 20px;
                    overflow-y: auto;
                }
                .message-list {
                    list-style: none;
                    padding: 0;
                }
                .message-list li {
                    margin-bottom: 10px;
                    border: 1px solid #eee;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .form-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .form-container select,
                .form-container button {
                    flex: 1;
                    margin-right: 10px;
                }
                .form-container input {
                    flex: 2;
                    margin-right: 10px;
                }
            </style>
        </head>
        <body>

            <div class="chat-wrapper">
                <form action='/postarMensagem' method='POST'>
                    <div class="title">
                        <h1 class="display-4"><b>Bate <span style="color: #a0cbbf;">Papo</span></b></h1>
                    </div>
            
                    <div class="message-area">
                        <ul class="message-list" style="list-style: none;">
                            ${listaMensagens.map(mensagem => `
                                <li style="list-style: none;">
                                    <p><strong>Usuário:</strong> ${mensagem.usuario}</p>
                                    <p><strong>Mensagem:</strong> ${mensagem.mensagem}</p>
                                    <p><strong>Postado em:</strong> ${mensagem.dataHora}</p>
                                </li>
                                <br>
                            `).join('')}
                        </ul>
                    </div>
            
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <select class="form-select user-select" aria-label="Default select example" name="user" id="user">
                                    <option selected disabled value="">Selecionar Usuário</option>
                                    ${listaUsuarios.map(usuario => `<option value="${usuario.nome}">${usuario.nome}</option>`).join('')}
                                </select>
                                    ${!dados.user ? '<p class="text-danger">Selecione um usuário!</p>' : ''}
                            </div>
                        </div>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <input type="text" class="form-control message-input" name="mensagem" id="mensagem" placeholder="Digite sua mensagem">
                                    ${!dados.mensagem ? '<p class="text-danger">Por favor, digite sua mensagem!</p>' : ''}
                                </div>
                            </div>
                        <div class="col-md-4">
                            <a class="btn btn-danger" href="/" role="button" style="text-align: center; width: 100%;">Voltar</a>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-success" style="width: 100%;">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.end(conteudoResposta);
    }
    else {
        const novaMensagem = {
            usuario: dados.user,
            mensagem: dados.mensagem,
            dataHora: new Date().toLocaleString()
        };

        listaMensagens.push(novaMensagem);

        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bate-papo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-image: url('wallpapper.jpeg');
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .chat-wrapper {
                    width: 700px;
                    padding: 20px;
                    background-color: #a0cbbf;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                }
                .title {
                    background-color: #296656;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .message-area {
                    flex: 1;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    margin-bottom: 20px;
                    overflow-y: auto;
                }
                .message-list {
                    list-style: none;
                    padding: 0;
                }
                .message-list li {
                    margin-bottom: 10px;
                    border: 1px solid #eee;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .form-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .form-container select,
                .form-container button {
                    flex: 1;
                    margin-right: 10px;
                }
                .form-container input {
                    flex: 2;
                    margin-right: 10px;
                }
            </style>
        </head>
        <body>

            <div class="chat-wrapper">
                <form action='/postarMensagem' method='POST'>
                    <div class="title">
                        <h1 class="display-4"><b>Bate <span style="color: #a0cbbf;">Papo</span></b></h1>
                    </div>
            
                    <div class="message-area">
                        <ul class="message-list" style="list-style: none;"></ul>
                            ${listaMensagens.map(mensagem => `
                            <li style="list-style: none;">
                                <p><strong>Usuário:</strong> ${mensagem.usuario}</p>
                                <p><strong>Mensagem:</strong> ${mensagem.mensagem}</p>
                                <p><strong>Postado em:</strong> ${mensagem.dataHora}</p>
                            </li>
                            <br>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <select class="form-select user-select" aria-label="Default select example" name="user" id="user">
                                    <option selected disabled value="">Selecionar Usuário</option>
                                    ${listaUsuarios.map(usuario => `<option value="${usuario.nome}">${usuario.nome}</option>`).join('')}
                                </select>
                                    ${!dados.user ? '<p class="text-danger">Selecione um usuário!</p>' : ''}
                            </div>
                        </div>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <input type="text" class="form-control message-input" name="mensagem" id="mensagem" placeholder="Digite sua mensagem">
                                    ${!dados.mensagem ? '<p class="text-danger">Por favor, digite sua mensagem!</p>' : ''}
                                </div>
                            </div>
                        <div class="col-md-4">
                            <a class="btn btn-danger" href="/" role="button" style="text-align: center; width: 100%;">Voltar</a>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-success" style="width: 100%;">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.end(conteudoResposta);
    }
}

app.post('/cadastrarUsuario', autenticar, processarCadastroUsuario);

app.post('/postarMensagem', autenticar, (requisicao, resposta) => {
    processarMensagem(requisicao, resposta, listaUsuarios);
});

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});