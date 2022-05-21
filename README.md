
# API USER

## Dados Usuário
- nome
- email
- imagem
- endereço chave estrangeira
## Dados Endereço
- cep
- logradouro
- complemento"
- bairro
- localidade
- uf

## Dados post
- id_post
- descricao

## Dados Usuários post 
- id_usuario
- id_post

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
