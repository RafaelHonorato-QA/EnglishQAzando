EnglishQA
Projeto de automação de testes end-to-end da plataforma English QAzando, desenvolvido com Cypress e JavaScript.

O objetivo é validar fluxos de aprendizagem, comportamento das funcionalidades, persistência de progresso e resultados apresentados ao usuário.
Tecnologias
- JavaScript
- Cypress 16.3
- Node.js e npm
- Page Object Model (POM)
- Gherkin para documentação dos cenários BDD
Estrutura do projeto
EnglishQA/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── exercicios.feature
│   │   │   ├── quiz.feature
│   │   │   └── trilha.feature
│   │   ├── exercicios.cy.js
│   │   ├── quiz.cy.js
│   │   └── trilha.cy.js
│   ├── fixtures/
│   │   ├── exercicios.json
│   │   ├── quiz.json
│   │   ├── unidade1-erros.json
│   │   └── unidade1.json
│   ├── screenshots/
│   └── support/
│       ├── pages/
│       │   ├── ExerciciosPage.js
│       │   ├── LoginPage.js
│       │   ├── QuizPage.js
│       │   └── TrilhaPage.js
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── package-lock.json
Arquivos locais de configuração e dependências, como node_modules, .env e cypress.env.json, não devem ser enviados ao repositório.
Configuração
1. Pré-requisitos
- Node.js instalado
- npm instalado
2. Clonar o repositório
git clone URL_DO_REPOSITORIO
cd EnglishQA
Substitua URL_DO_REPOSITORIO pelo endereço do repositório no GitHub.
3. Instalar as dependências
npm install
4. Configurar as credenciais
Os testes utilizam uma conta verificada com acesso à plataforma. Configure localmente as credenciais esperadas pelo projeto, usando as chaves email e password.

Não compartilhe nem envie credenciais reais ao GitHub. Mantenha arquivos com dados sensíveis fora do controle de versão.
5. Executar os testes
Abrir a interface do Cypress:
npx cypress open
Executar os testes em modo headless:
npx cypress run
Suítes de testes
Exercícios
Arquivo: cypress/e2e/exercicios.cy.js

Cenários cobertos:
- CT01: fluxo principal do exercício, com conclusão das 30 questões e validação da pontuação final.
- CT02: salvamento automático do progresso após avançar e atualizar a página.
- CT03: continuidade do exercício ao navegar para outra página e retornar.
- CT04: reinício do exercício durante a execução e após a conclusão.
- CT05: histórico de respostas corretas e incorretas.
A fixture exercicios.json fornece as respostas utilizadas nos cenários.
Quiz
Arquivo: cypress/e2e/quiz.cy.js

Cenários cobertos:
- CT01: finalização de uma tentativa em andamento.
- CT02: conclusão das 30 questões com respostas corretas.
- CT03: contabilização de acertos e erros durante o Quiz.
- CT04: nova tentativa para melhorar a pontuação.
- CT05: validação das alternativas e do avanço automático entre questões.
A fixture quiz.json contém os dados das questões e as respostas utilizadas pela automação.
Trilha do Inglês
Arquivo: cypress/e2e/trilha.cy.js

Cenários implementados:
- CT01: conclusão das cinco etapas da Unidade 1, com validação do XP recebido e da persistência do progresso.
- CT02: desbloqueio sequencial das etapas da Unidade 1.
- CT03: desconto de XP após resposta incorreta na Lição 1, na Prática e no Review.
- CT04: validação do XP recebido quando todas as questões da Lição 1 são respondidas incorretamente.
O CT02 está implementado, mas permanece temporariamente desabilitado com it.skip. Portanto, ele não faz parte da execução dos testes ativos.

As fixtures unidade1.json e unidade1-erros.json fornecem os dados de questões e respostas corretas ou incorretas utilizados nos cenários da Trilha.
Page Object Model
O projeto utiliza Page Object Model para organizar as interações com as páginas da aplicação.

Os métodos de cada página ficam concentrados em cypress/support/pages/, enquanto os arquivos de teste em cypress/e2e/ descrevem os cenários e coordenam as ações e validações.

Essa separação facilita a manutenção dos seletores e das interações, além de reduzir a repetição de código nos testes.
BDD com Gherkin
Os cenários também são documentados em arquivos .feature, organizados em cypress/e2e/features/.

Essa documentação descreve o comportamento esperado da aplicação em linguagem próxima à regra de negócio e mantém os cenários identificados pelos mesmos códigos CT utilizados nos testes.
Resultados
As suítes de Exercícios, Quiz e Trilha foram executadas, e os testes ativos foram aprovados.

Há uma ressalva: o cenário CT02 da Trilha, embora implementado, está marcado com it.skip e não foi executado. Assim, o resultado positivo se refere aos testes ativos executados, não a esse cenário desabilitado.
