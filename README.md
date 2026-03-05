#  Mesa Dupla

Plataforma SaaS White-Label de Clube Gastronômico 2x1.

**Projeto em desenvolvimento**

---

##  Visão Geral

O Mesa Dupla é uma plataforma SaaS baseada em assinatura anual que permite vender planos de acesso a benefícios 2x1 em restaurantes parceiros.

O sistema é multi-cidade (white-label), permitindo replicação do modelo para diversas cidades apenas alterando identidade visual e dados.

Não é uma cópia de aplicativo existente.  
É um produto próprio, escalável e replicável.

---

##  Modelo de Negócio

- O cliente compra um plano anual (exemplo: R$150).
- Após o pagamento aprovado, recebe acesso aos benefícios 2x1 por 1 ano.
- Pode utilizar os cupons nos restaurantes cadastrados.
- O restaurante valida o cupom via QR Code.
- A receita da plataforma vem da venda dos planos anuais.

---

##  Estrutura do Sistema

O projeto é dividido em 4 partes principais:

###  Backend (API Central)

Tecnologias:
- Node.js
- Express
- PostgreSQL
- Docker

Responsável por:
- Autenticação
- Controle de permissões
- Integração com pagamento
- Controle de assinaturas
- Cadastro de restaurantes
- Cadastro de pratos
- Geração e validação de QR Code
- Suporte multi-cidade

---

###  Aplicativo do Cliente (Mobile)

Tecnologia:
- React Native

Funções:
- Cadastro e login
- Compra de plano
- Visualização de restaurantes
- Geração de QR Code
- Histórico de uso
- Controle de validade da assinatura

---

###  Painel do Restaurante (Web)

Tecnologia:
- React (Web)

Funções:
- Login do restaurante
- Leitura de QR Code
- Validação de cupom
- Histórico de validações

---

###  Painel Administrativo (Web)

Funções:
- Criar cidades
- Configurar identidade visual
- Criar planos
- Cadastrar restaurantes
- Cadastrar pratos
- Gerenciar usuários
- Visualizar pagamentos
- Relatórios

---

##  Estrutura Multi-Cidade (White-Label)

O sistema é multi-tenant.

Cada cidade possui:
- Nome
- Logo
- Cor principal
- Restaurantes próprios
- Planos próprios
- Usuários próprios

Todas as tabelas possuem `cidade_id`, permitindo que o mesmo sistema funcione para várias cidades.

---

##  Sistema de Pagamento

Integração com gateway (Stripe ou Mercado Pago).

Fluxo:

1. Cliente escolhe plano
2. Backend cria cobrança
3. Pagamento é realizado
4. Gateway envia webhook
5. Backend ativa assinatura
6. Define validade de 1 ano

A assinatura só é ativada após confirmação oficial do pagamento.

---

##  Sistema de Cupom 2x1

Fluxo:

1. Cliente com assinatura ativa
2. Escolhe restaurante
3. Escolhe prato
4. Gera cupom
5. Backend cria token único
6. App gera QR Code
7. Restaurante escaneia
8. Backend valida e marca como utilizado

---

## Estrutura Principal do Banco de Dados

Principais entidades:

- cities
- users
- plans
- subscriptions
- payments
- restaurants
- dishes
- redemptions

---

##  Sistema de Permissões

Tipos de usuário:

- ADMIN
- RESTAURANT
- CLIENT

Permissões controladas exclusivamente pelo backend.

---

##  Infraestrutura

- PostgreSQL rodando em container Docker
- Backend em container Docker
- Frontends separados

---

##  Fases de Desenvolvimento

### Fase 1
- Configuração Docker
- Banco de dados
- CRUD básico
- Autenticação

### Fase 2
- Integração pagamento
- Webhook
- Sistema de assinatura

### Fase 3
- Sistema de QR Code
- Painel restaurante
- Painel admin

### Fase 4
- Melhorias
- Escalabilidade

---

##  Status Atual

✔ Estrutura inicial do banco de dados definida  
✔ PostgreSQL rodando via Docker  
✔ Backend configurado  
✔ CRUD de Cidades implementado  

🚧 Em desenvolvimento contínuo

---

## 🎯 Resumo

Plataforma SaaS white-label de clube gastronômico 2x1, baseada em assinatura anual, com suporte a múltiplas cidades, pagamento integrado e validação de cupons via QR Code.
