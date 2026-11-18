
# language: pt

Funcionalidade: Trilha do Inglês
  Como usuário autenticado com acesso Premium
  Quero realizar as etapas da trilha de aprendizagem
  Para acompanhar minha evolução e acumular XP

  Contexto:
    Dado que o usuário possui uma conta verificada
    E realizou login com sucesso
    E possui acesso Premium
    E acessou a página Trilha do Inglês

  Cenário: CT01 - Conclusão das cinco etapas da Unidade 1 validando XP
    Quando o usuário conclui a Lição 1 respondendo corretamente às questões
    Então deve receber 25 XP
    E a Lição 1 deve ser marcada como concluída
    E o progresso deve permanecer salvo após atualizar a página

    Quando o usuário conclui a Lição 2 respondendo corretamente às questões
    Então deve receber 25 XP
    E a Lição 2 deve ser marcada como concluída
    E o progresso deve permanecer salvo após atualizar a página

    Quando o usuário conclui a Prática respondendo corretamente às questões
    Então deve receber 30 XP
    E a Prática deve ser marcada como concluída
    E o progresso deve permanecer salvo após atualizar a página

    Quando o usuário conclui a Lição 3 respondendo corretamente às questões
    Então deve receber 25 XP
    E a Lição 3 deve ser marcada como concluída
    E o progresso deve permanecer salvo após atualizar a página

    Quando o usuário conclui o Review respondendo corretamente às questões
    Então deve receber 50 XP
    E o Review deve ser marcado como concluído
    E o progresso deve permanecer salvo após atualizar a página

  Cenário: CT02 - Desbloqueio das etapas da Unidade 1 sequencialmente
    Dado que nenhuma das cinco etapas da Unidade 1 foi concluída
    Então somente a Lição 1 deve estar disponível
    E as demais etapas devem estar bloqueadas

    Quando o usuário conclui a Lição 1
    Então a Lição 1 deve estar concluída
    E a Lição 2 deve ser desbloqueada
    E as etapas seguintes devem permanecer bloqueadas

    Quando o usuário conclui a Lição 2
    Então as duas primeiras etapas devem estar concluídas
    E a Prática deve ser desbloqueada
    E as etapas seguintes devem permanecer bloqueadas

    Quando o usuário conclui a Prática
    Então as três primeiras etapas devem estar concluídas
    E a Lição 3 deve ser desbloqueada
    E o Review deve permanecer bloqueado

    Quando o usuário conclui a Lição 3
    Então as quatro primeiras etapas devem estar concluídas
    E o Review deve ser desbloqueado

    Quando o usuário conclui o Review
    Então as cinco etapas devem estar concluídas
    E o progresso deve permanecer salvo após atualizar a página

  Cenário: CT03 - Desconto de XP por resposta incorreta
    Quando o usuário responde incorretamente a uma questão da Lição 1
    E responde corretamente às demais questões
    Então deve visualizar a resposta correta da questão respondida incorretamente
    E deve receber 20 XP ao concluir a Lição 1

    Quando o usuário responde incorretamente a uma questão da Prática
    E responde corretamente às demais questões
    Então deve visualizar a resposta correta da questão respondida incorretamente
    E deve receber 24 XP ao concluir a Prática

    Quando o usuário responde incorretamente a uma questão do Review
    E responde corretamente às demais questões
    Então deve visualizar a resposta correta da questão respondida incorretamente
    E deve receber 40 XP ao concluir o Review

  Cenário: CT04 - Validação de XP com todas as respostas incorretas
    Quando o usuário responde incorretamente a todas as questões da Lição 1
    Então deve visualizar a resposta correta após cada tentativa
    E deve receber 0 XP ao concluir a Lição 1
