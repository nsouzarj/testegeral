# Sistema de Gerenciamento de Usuários e Perfis

## 1. Introdução

Este é um sistema de gerenciamento de usuários e perfis, onde usuários podem ser cadastrados e associados a um perfil. O sistema demonstra como criar uma aplicação com autenticação e autorização utilizando Angular no frontend e Spring Boot no backend.
Os projetos estao nesse dois repositorios do git:
- `https://github.com/nsouzarj/testegeral` - front-end
- `https://github.com/nsouzarj/backendteste` - back-end


## 2. Tecnologias Utilizadas

*   **Frontend:**
    *   Angular 19+
    *   TypeScript
    *   HTML
    *   CSS
*   **Backend:**
    *   Java 18+
    *   Spring Boot
    *   Spring Data JPA
    *   H2 Database (em memória)
    *   Spring Security

## 3. Instalação e Execução

### 3.1 Requisitos

*   **Backend:**
    *   Java Development Kit (JDK) 18 ou superior
    *   Maven (para projetos Maven) ou Gradle (para projetos Gradle)
    *   IDE (IntelliJ IDEA, Eclipse, Visual Studio Code, etc.)
     *   [Opcional] Docker
*   **Frontend:**
    *   Node.js 19+ ou superior (recomendado 19)
    *   npm (Node Package Manager)
    *   Angular CLI
    *   IDE (Visual Studio Code, etc.)

### 3.2 Instalação do Backend

1.  Instale o JDK 18+, Maven ou Gradle e importe o projeto em sua IDE.
2.  Verifique as dependências do `pom.xml` (Maven) ou `build.gradle` (Gradle).
3.  Execute a classe principal do projeto para iniciar o backend.
4.  Execute dessa `mvn spring-boot:run` caso nao use o docker.


### 3.3 Instalação do Frontend

1.  Instale o Node.js 16+ e o Angular CLI: `npm install -g @angular/cli`.
2.  Navegue até a pasta do projeto e execute `npm install` para instalar as dependências.
4.  Caso prefira utlizar o docker `docker run -p 80:80 nelsonbrazil/testegeral` isso irá baixar a imagem já criada no docker hub e subir a aplicação executando na porta 80.

### 3.4 Execução do Frontend

1.  Na pasta do projeto Angular, execute `ng serve` para iniciar o frontend em modo de desenvolvimento.
2.  Abra o navegador em `http://localhost:4200`.

### 3.5 Execução com Docker
1. Instale o docker se nao tiver .
2. Na raiz do projeto Spring Boot execute `docker build -t backend .`
3. Após a imagem ser criada execute `docker run -p 8084:8084 backend`
4. Caso prefira baixe a image do  docker `pull nelsonbrazil/backend`  execute  `docker run -p 8084:8084 nelsonbrazil/backend` isso ira baixar a imagem pronta do back-end e subir na porta 8084.

## 4. Autenticação e Autorização

*   O sistema utiliza autenticação `httpBasic`.
*   Um usuário administrador ("admin@example.com" / "admin") é criado automaticamente na inicialização do backend.
*   Usuários autenticados podem listar os usuários e perfis.
*   Apenas administradores podem criar e editar usuários e perfis.
*   Usuários comuns podem editar seus próprios dados pessoais (exceto o perfil).
*  O frontend deve utilizar o header da requisição `Authorization: Basic <base64>` em caso de utilizar o endpoint `/auth/login` ou `Authorization: Bearer <token>` quando utilizar o endpoint de listagem e edição dos recursos.
* A autorização é feita através da verificação da role de usuário `ADMIN`.

## 5. Próximos Passos e Melhorias

*   Implementar um sistema de autenticação JWT com refresh tokens.
*   Validar os campos de formulários.
*   Implementar um sistema de tratamento de erros mais robusto.
*   Criar testes unitários e de integração.
*   Documentar os componentes, serviços e rotas da aplicação.
*  Implementar a funcionalidade de edição do perfil do usuário.
## 6. Solução de Problemas (Troubleshooting)

*   **Erro de CORS:** Verifique a anotação `@CrossOrigin` no backend.
*   **Erro de Autenticação:** Verifique as credenciais e os logs do backend e do frontend.
*   **Erro de Redirecionamento:** Verifique o método `ngOnInit` do `AppComponent` e as configurações do seu componente de login.
* **Problema ao Enviar Requisição no Backend:**
 *  Verifique a url e o método http que você está enviando a requisição.
 *  Verifique os headers que você está enviando na requisição.

## 6. Acesso ao sistema

*  **Login e senha
*  login: admin
*  semha: admin123

  
