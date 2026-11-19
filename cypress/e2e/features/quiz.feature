
# language: pt

Funcionalidade: Quiz de Inglês
  Como usuário da plataforma
  Quero responder às questões do Quiz
  Para testar meus conhecimentos e acompanhar meu desempenho

  Contexto:
    Dado que o usuário possui uma conta válida e confirmada
    E está autenticado na plataforma
    E acessou a página do Quiz

  Cenário: CT01 - Finalização de uma tentativa de Quiz em andamento
    Dado que existe uma tentativa de Quiz em andamento
    Quando o usuário responde às questões restantes
    Então o Quiz deve ser finalizado
    E o resultado final deve ser apresentado
    E o total de questões deve ser 30

  Cenário: CT02 - Conclusão das 30 questões do Quiz com respostas corretas
    Dado que o Quiz foi iniciado na primeira questão
    Quando o usuário responde corretamente às 30 questões
    Então o Quiz deve ser finalizado
    E o resultado deve apresentar 30 acertos
    E o resultado deve apresentar 0 erros
    E a porcentagem de acertos deve ser 100%
    E o total de questões deve ser 30

  Cenário: CT03 - Contabilização de acertos e erros durante o Quiz
    Dado que o Quiz foi iniciado na primeira questão
    Quando o usuário responde corretamente a 20 questões
    E responde incorretamente a 10 questões
    Então os indicadores de acertos e erros devem ser atualizados durante o Quiz
    E o Quiz deve ser finalizado
    E o resultado deve apresentar 20 acertos
    E o resultado deve apresentar 10 erros
    E a porcentagem de acertos deve ser 67%

  Cenário: CT04 - Nova tentativa para melhorar a pontuação
    Dado que o Quiz foi iniciado na primeira questão
    Quando o usuário responde corretamente a 15 questões
    E responde incorretamente a outras 15 questões
    Então o resultado deve apresentar 15 acertos
    E o resultado deve apresentar 15 erros
    E a porcentagem de acertos deve ser 50%
    Quando o usuário seleciona a opção "Refazer Quiz"
    Então o Quiz deve retornar à primeira questão
    E os indicadores de acertos e erros devem ser zerados
    Quando o usuário responde corretamente às 30 questões
    Então o resultado deve apresentar 30 acertos
    E o resultado deve apresentar 0 erros
    E a porcentagem de acertos deve ser 100%

  Cenário: CT05 - Validação das alternativas e avanço automático entre questões
    Dado que o Quiz foi iniciado na primeira questão
    Então devem ser apresentadas 3 alternativas em formato de botão
    Quando o usuário seleciona uma alternativa
    Então o Quiz deve avançar automaticamente para a segunda questão
    E devem ser apresentadas novamente 3 alternativas em formato de botão
    E o indicador de progresso deve apresentar "2/30"
