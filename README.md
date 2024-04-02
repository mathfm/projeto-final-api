
# # Bright Idea

Uma API cuja ideia é promover o conhecimento, feita para que usuários possam não só aprender habilidades como também possam compartilhá-la com o próximo, incentivando uma rede de aprendizado coletiva.

## 🔗 Links
[LINK DA API](https://projeto-final-api-52ju.onrender.com)

## Funcionalidades

- Registrar usuario
- Registrar skill
- Registar skill na conta do usuario
- Criar postagens
- Fazer comentarios em postagens
- Enviar convite de troca de habilidades para usuarios
## Documentação da API

#### Retorna todos os itens

```http
  GET /user/

  GET /skill/

  GET /user/${user_id}/skills

  GET /post/

  GET /${post_id}/comment

  GET /swap-skill/${user_id}
```
#### Retorna um item

```http
  GET /user/${user_id}

  GET /skill/${skill_id}

  GET /post/${post_id}

  GET /post/%{comment_id}/comment
```

#### Deletar itens 
```http
  DELETE /user/${user_id}/delete-profile

  DELETE /skill/${skill_id}/delete-skill

  DELETE /user/${user_skill_id}/delete

  DELETE /${user_id}/post/${post_id}/delete-post

  DELETE /${user_id}/${comment_id}/delete-comment
  
  DELETE /swap-skill/${swap_skill_id}/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer. |

#### Criar usuario
```http
  POST /register-user
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Tamanho minimo de 3 caracteres. |
| `username` | `string` | **username** deve ser único para cada usuário.
| `email` | `string` | **email** deve ser único para cada usuário.
| `password` | `string` | A senha deve ser igual ou maior que 8 caracteres.


##### Exemplo
```json
{
  "name": "carlos_silva",
  "username": "carlos134",
  "email": "example123@gmail.com",
  "password": "exemplo1234"
}
```

#### Atualizar usuario
```http
  PUT /user/${user_id}/update
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Tamanho minimo de 3 caracteres. |
| `username` | `string` | **username** não pode estar sendo utilizado por outro usuario.
| `email` | `string` | **email**  não pode estar sendo utilizado por outro usuario.
| `password` | `string` | A senha deve ser igual ou maior que 8 caracteres.

#### Atualização parcial do usuario
```http
  PATCH /user/${user_id}/change-email
```
| Body   | Tipo   |
| :---------- | :--------- 
| `email`      | `string` | 

```http
  PATCH /user/${user_id}/change-password
```
| Body   | Tipo   |
| :---------- | :--------- 
| `password`      | `string` | 


#### Registar skill
```http
  POST /register-skill
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `skill_name`      | `string` | Tamanho minimo de 2 caracteres e máximo de 20 caracteres. |
| `description` | `string` | Descrição de pelo menos 5 caracteres e máximo de 200 caracteres.

##### Exemplo
```json
{
  "skill_name": "c++",
  "description": "linguagem de programação"
}
```

#### Atualizar skill
```http
  POST /skill/${skill_id}/update
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `skill_name`      | `string` | Skill não pode está registrada ou sendo utilizada por outro usuario. |
| `description` | `string` | Descrição de pelo menos 5 caracteres e máximo de 200 caracteres.



#### Criar Postagem
```http
  POST /user/${id}/create-post
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | No minimo 3 caracteres sendo permitido um máximo de 50 caracteres. |
| `description` | `string` | Pelo menos 5 caracteres com o máximo de 200.
| `skill_id` | `string` | A skill relacionada a postagem deve está registrada.

##### Exemplo
```json
{
	"title": "A importancia do java",
	"description":"O impacto do java no mercado de trabalho e sua relevancia hoje...",
	"skill_id":"67e973b7-08e3-4b5d-b2db-ad66be4d1295" 
}
```

#### Editar Postagem
```http
  PUT /{user_id}/post/{post_id}/edit-post
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | No minimo 3 caracteres sendo permitido um máximo de 50 caracteres. |
| `description` | `string` | Pelo menos 5 caracteres com o máximo de 200.
| `skill_id` | `string` | A skill relacionada a postagem deve está registrada.


#### Fazer comentario
```http
  PUT /{user_id}/{post_id}/create-comment
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `comment`      | `string` | Máximo de 200 caracteres. |

#### Editar comentario
```http
  PUT /{user_id}/{comment_id}/update-comment
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `comment`      | `string` | Máximo de 200 caracteres. |

#### Convite para troca de habilidades
```http
  PUT /${user_id}/invited/
```
| Body   | Tipo   |
| :---------- | :--------- 
| `user_recipient_id`      | `string` | 
| `skill_desired_id`      | `string` | 
| `skill_offered_id`      | `string` | 

##### Exemplo
```json
{
  "skill_offered_id": "67e973b7-08e3-4b5d-b2db-ad66be4d1295",
  "user_recipient_id": "a5f95f32-95af-4cf2-b30c-28c6c86e1a88",
  "skill_desired_id": "c2a614e2-cf35-42fb-986d-b0f70a964dcf"
}
```


## Stack utilizada

**Back-end:** Node, Express, Sequelize


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/mathfm/projeto-final-api.git
```

Entre no diretório do projeto

```bash
  cd projeto-final-api
```

Instale as dependências

```bash
  npm install
```

Verifique se existe a database "db_forum" no banco de dados
```mysql
  se não exister, crie a database.
```

Inicie o servidor

```bash
  npm run dev
```

