
# language: pt

Funcionalidade: Página de Exercícios
  Como usuário autenticado da plataforma
  Quero realizar o exercício de completar frases
  Para acompanhar meu progresso e verificar meu desempenho

  Contexto:
    Dado que o usuário possui uma conta verificada
    E realizou login com sucesso
    E acessou a página de Exercícios

  Cenário: CT01 - Validar o fluxo principal do exercício
    Quando o usuário inicia o exercício
    E responde às 30 questões utilizando as respostas corretas
    Então deve avançar pelas 30 questões
    E deve visualizar o resultado final de 30 de 30
    E deve visualizar o percentual de aproveitamento de 100%

  Cenário: CT02 - Validar o salvamento automático do progresso
    Quando o usuário responde corretamente à primeira questão
    E avança para a segunda questão
    E atualiza a página
    Então o exercício deve continuar na segunda questão
    E o progresso anterior deve permanecer salvo

  Cenário: CT03 - Validar a continuidade do exercício
    Quando o usuário responde às duas primeiras questões
    E acessa outra página da plataforma
    E retorna à página de Exercícios
    Então o exercício deve continuar na terceira questão
    E o progresso anterior deve permanecer salvo

  Cenário: CT04 - Validar a possibilidade de reiniciar o exercício
    Quando o usuário responde à primeira questão
    E avança para a segunda questão
    E reinicia o exercício durante sua execução
    Então o exercício deve retornar à primeira questão
    Quando o usuário responde corretamente às 30 questões
    Então deve visualizar o resultado final de 30 de 30
    E deve visualizar o percentual de aproveitamento de 100%
    Quando o usuário reinicia o exercício após sua conclusão
    Então o exercício deve retornar à primeira questão

  Cenário: CT05 - Validar o histórico de respostas corretas e incorretas
    Quando o usuário responde corretamente à primeira questão
    E responde incorretamente à segunda questão
    Então deve visualizar o histórico da resposta correta
    E deve visualizar o histórico da resposta incorreta
    E o histórico da resposta incorreta deve apresentar a resposta correta
