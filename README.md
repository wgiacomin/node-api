## API para Gestão de Entregas (Deliveries)

A Associação Comercial Paranaense (ACP) solicitou o desenvolvimento de uma API que
seja capaz de gerir as entregas realizadas por seus associados. Esta API será utilizada a partir
de requisições feitas por um aplicativo para dispositivos móveis ou por um sistema Web. Ela será
responsável por fornecer o conjunto de serviços web para execução das funcionalidades do
sistema e por realizar a integração com um Banco de Dados MySQL.

## O Projeto

O projeto consiste no desenvolvimento de uma API em Node.js capaz de receber
requisições, executas ações e fornecer respostas.

Breve descrição:

Os associados da ACP são os usuários que usam o sistema para gerir seu negócio. Eles
cadastram clientes, motoboys e entregas. Podem receber relatórios administrativos e financeiros,
além de checar todas as entregas.

Os motoboys usam o sistema para receber suas entregas pendentes, informar o valor da
entrega e finalizar a entrega. Podem receber relatórios pessoais financeiros e checar seu
histórico de entregas.

Os clientes são cadastrados no sistema pelos associados da ACP. Estas informações, bem
como qualquer outra informação, é pertencente a apenas um associado, não há
compartilhamento de dados entre usuários do sistema. Os clientes não possuem acesso ao
sistema.

As entregas são cadastradas pelos associados e executadas/finalizadas pelos motoboys.


Requisitos de Sistemas

Para o desenvolvimento da API, a ACP solicitou as seguintes funcionalidades:

- CRUD de associados:
    o Cadastro de associados com os campos: Nome da empresa, CNPJ, senha e
       endereço (sendo este último o único opcional). CNPJ deve ser único, cuide
       para não permitir duplicações neste campo.
    o Listar todos os associados.
    o Listar um associado específico dado o CNPJ.
    o Editar um associado específico passando o ID. Novamente cuide o campo
       CNPJ que deve ser único.
    o Remover associado independente se há registros de entregas relacionados a
       ele. Remover todos os registros junto.
- CRUD de clientes:
    o Cadastro de clientes com os campos: Nome da empresa, CNPJ e endereço
       (todos obrigatórios).
    o Listar todos os clientes.
    o Listar um cliente específico dado o CNPJ.
    o Editar um cliente específico passando o ID.
    o Remover cliente independente se há registros de entregas relacionados a ele.
- CRUD de motoboys:
    o Cadastro de motoboys com os campos: Nome, CPF, senha e telefone (todos
       obrigatórios). CPF deve ser único no sistema.
    o Listar todos os motoboys.
    o Listar um motoboy específico dado o CPF.
    o Editar um motoboy específico passando o ID.
    o Remover motoboy independente se há registros de entregas relacionados a ele.
- CRUD de entregas:
    o Cadastro de entregas com os campos: Descrição, cliente, motoboy (status e
       valor serão campos atualizados pelo motoboy). Cada entrega é única no
       sistema.
    o Listar todas as entregas
    o Listar todas as entregas realizadas
    o Listar todas as entregas pendentes
    o Listar todas as entregas por motoboy
    o Editar uma entrega pendente.
    o Remover uma entrega pendente.


- Os associados e motoboys devem ser capazes de logar no sistema de forma segura
    com uso de hash da senha gravada no BD e token de autenticação para uso do
    sistema;
       o O login é o CNPJ para associados e o CPF para motoboys;
       o A senha deve conter ao menos 8 caracteres, uma letra, um símbolo especial e
          um número;
       o O token deve ter validade máxima de 5 horas e deve ser invalidado também no
          logout.
- A ACP possui acesso as seguintes funcionalidades:
    o CRUD de associados;
    o Considere que a ACP não tem login e/ou senha. Ela apenas acessa as rotas
       fornecidas pela API, de maneira direta, para realizar o CRUD dos associados.
- Os associados possuem acesso as seguintes funcionalidades:
    o Verificação e edição de seus dados, incluindo troca de senha;
    o CRUD de seus clientes, motoboys e entregas;
    o Relatório administrativo retornando à quantidade total de clientes, motoboys e
       entregas cadastradas; os top 5 clientes que solicitaram mais entregas; os top
       5 motoboys que realizaram mais entregas; a porcentagem de entregas
       realizadas até o momento; a porcentagem de entregas pendentes até o
       momento;
    o Relatório financeiro retornando indicador do valor total em Reais cobrado nas
       entregas realizadas, a porcentagem a ser paga para os motoboys (considerar
       70% do valor da entrega) e a porcentagem do associado (considerar 30% do
       valor da entrega).
- Os motoboys possuem acesso as seguintes funcionalidades:
    o Lista de suas entregas realizadas
    o Lista de suas entregas pendentes
    o Edição de uma entrega pessoal pendente, atualizando o status dela para
       realizada e o valor em Real do custo da entrega.
    o Relatório financeiro retornando indicador do valor total em Reais cobrado nas
       entregas realizadas e sua porcentagem a ser paga (considerar 70% do valor
       da entrega).
- A ACP solicita que arquivos de migrations e seeders para cada tabela do sistema,
    além disto, solicita também que API seja desenvolvida de acordo com o Padrão MVC,
    já que outros desenvolvedores serão responsáveis pelo frontend.
