
# API USER

## Dados Usuário
- nome
- email
- endereço chave estrangeira
## Dados Endereço
- cep
- logradouro
- complemento"
- bairro
- localidade
- uf

## Dados Comentários
- id_comentário
- descricao

## Dados Usuários Comentários 
- id_usuario
- id_comentario

## Iniciando o projeto
- npm init

### Dependências

- **Adicionar ao projeto .gitignore**

### Importante




## Estrutura do Projeto
```
- src
    - modulos
        - Entidades
            - middleware
            - models
                - EntidadeModel.js
            - useCase
                - EntidadeController.js
                - EntidadeUseCase.js
        - infra
            - ConexaoBanco
    - routes
        - index.ts
        - entidadeRoutes.ts
    - server.ts
```

## Referências
- https://www.typescriptlang.org/
- https://www.toptal.com/developers/gitignore
