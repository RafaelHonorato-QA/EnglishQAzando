EnglishQA 📚

Projeto de automação de testes End-to-End (E2E) desenvolvido utilizando Cypress, com foco na validação de funcionalidades de uma plataforma de aprendizagem de inglês.

O projeto foi desenvolvido com aplicação do padrão Page Object Model (POM), organização de testes por funcionalidade, utilização de fixtures e documentação de cenários com BDD.

🌐 Sistema testado
Plataforma de aprendizagem de inglês utilizada para a realização dos testes:

https://english.qazando.com.br

🎯 Objetivos do projeto

Este projeto tem como objetivos:
- Praticar automação de testes utilizando Cypress;
- Desenvolver testes End-to-End;
- Aplicar o padrão Page Object Model (POM);
- Validar funcionalidades com base em regras de negócio;
- Utilizar fixtures para organizar os dados de teste;
- Documentar cenários utilizando BDD e Gherkin;
- Verificar o comportamento da aplicação em diferentes situações;
- Construir um projeto de portfólio na área de Quality Assurance.
  
🛠️ Tecnologias utilizadas
- JavaScript
- Cypress
- Node.js
- npm
- Git
- GitHub
- Gherkin

 📋 Casos de teste em BDD

Os cenários de teste foram documentados utilizando Gherkin, seguindo a estrutura Given, When e Then.

- [Exercícios](cypress/e2e/features/exercicios.feature)
- [Quiz](cypress/e2e/features/quiz.feature)
- [Trilha](cypress/e2e/features/trilha.feature)
 
🏗️ Estrutura do projeto

A organização dos arquivos está dividida em três partes principais: testes automatizados, dados de teste e arquivos de suporte.

**EnglishQA/**
- **cypress/**
  - **e2e/**
    - **features/**
      - `exercicios.feature`
      - `quiz.feature`
      - `trilha.feature`
    - `exercicios.cy.js`
    - `quiz.cy.js`
    - `trilha.cy.js`
  - **fixtures/**
    - `exercicios.json`
    - `quiz.json`
    - `unidade1-erros.json`
    - `unidade1.json`
  - **screenshots/**
  - **support/**
    - **pages/**
      - `ExerciciosPage.js`
      - `LoginPage.js`
      - `QuizPage.js`
      - `TrilhaPage.js`
    - `commands.js`
    - `e2e.js`
- `cypress.config.js`
- `package.json`
- `package-lock.json`

Arquivos locais como `.env`, `cypress.env.json` e `node_modules/` não são incluídos no repositório.

🧪 Funcionalidades automatizadas

Exercícios
Cenários automatizados:
- CT01: Validação do fluxo principal do exercício, com conclusão das 30 questões;
- CT02: Validação do salvamento automático do progresso após atualizar a página;
- CT03: Validação da continuidade do exercício após acessar outra página;
- CT04: Validação da possibilidade de reiniciar o exercício durante e após sua conclusão;
- CT05: Validação do histórico de respostas corretas e incorretas.
  
Quiz
Cenários automatizados:
- CT01: Finalização de uma tentativa de Quiz em andamento;
- CT02: Conclusão das 30 questões com respostas corretas;
- CT03: Contabilização de acertos e erros durante o Quiz;
- CT04: Realização de uma nova tentativa para melhorar a pontuação;
- CT05: Validação das alternativas e do avanço automático entre questões.
  
Trilha do Inglês
Cenários automatizados:
- CT01: Conclusão das cinco etapas da Unidade 1 com validação do XP recebido e da persistência do progresso;
- CT03: Validação do desconto de XP após respostas incorretas;
- CT04: Validação do XP recebido quando todas as respostas são incorretas.
  
Observação: o CT02, que valida o desbloqueio sequencial das etapas da Unidade 1, está temporariamente desabilitado no código com it.skip e não faz parte dos testes executados.


📌 Boas práticas aplicadas
Durante o desenvolvimento foram aplicadas algumas práticas de organização e manutenção dos testes:

✅ Page Object Model (POM) para separar métodos de interação com as páginas dos cenários de teste;

✅ Organização dos testes por funcionalidade;

✅ Utilização de fixtures para armazenar e reutilizar dados de teste;

✅ Reutilização de métodos para ações e validações;

✅ Seleção de respostas por texto visível, evitando depender da posição das alternativas;

✅ Validação de mensagens, estados da interface e resultados apresentados;

✅ Verificação da persistência do progresso após atualização da página;

✅ Criação de cenários baseados em regras de negócio;

✅ Documentação dos cenários utilizando Gherkin.

▶️ Como executar o projeto

Pré-requisitos
É necessário possuir instalado:
- Node.js
- npm
Clonar o repositório
git clone https://github.com/RafaelHonorato-QA/EnglishQAzando
Acesse a pasta do projeto:
cd EnglishQA
Instalar dependências
npm install
Configurar as credenciais
Os testes de autenticação utilizam as variáveis email e password, acessadas pelo Cypress por meio de cy.env().

Configure essas credenciais localmente, de acordo com a configuração de ambiente do projeto. Não compartilhe senhas nem envie arquivos com credenciais para o repositório.

Arquivos locais como .env e cypress.env.json devem permanecer fora do controle de versão.
Executar o Cypress
Para abrir a interface do Cypress:
npx cypress open
Para executar os testes em modo headless:
npx cypress run
Após abrir a interface do Cypress, selecione a suíte desejada para execução.

📊 Resultado dos testes
As suítes de Exercícios, Quiz e Trilha foram executadas, e os testes ativos passaram.

O cenário CT02 da Trilha permanece desabilitado com it.skip, portanto não está incluído nesse resultado.

📚 Aprendizados
Este projeto contribuiu para o desenvolvimento prático em:
- Automação de testes End-to-End com Cypress;
- Aplicação do padrão Page Object Model;
- Organização de suítes de testes;
- Utilização de fixtures;
- Validação de regras de negócio;
- Testes de persistência de dados e progresso;
- Documentação de cenários com BDD e Gherkin;
- Identificação e validação de comportamentos da aplicação.
👨‍💻 Autor
Rafael Honorato
