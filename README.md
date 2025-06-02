# 📊 WhatsApp Ranking

Uma aplicação web moderna e segura para analisar seus chats do WhatsApp e descobrir quem mais participa das conversas em grupo. Totalmente **privado**, **gratuito** e **sem necessidade de cadastro**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

## 🆕 Novidades da Versão 2.5

### 👥 **Análise de Múltiplos Grupos (NOVO!)**
- **Upload simultâneo:** Até 10 grupos de uma só vez
- **Análise individual:** Veja estatísticas de cada grupo separadamente
- **Dados combinados:** Mescle rankings de todos os grupos em um só
- **Comparação avançada:** Compare atividade entre diferentes grupos
- **Interface com tabs:** Navegação intuitiva entre diferentes visualizações

### 🗜️ **Suporte Nativo a Arquivos ZIP**
- **Upload direto de arquivos ZIP:** Não precisa mais descompactar o arquivo do WhatsApp
- **Extração automática:** O sistema detecta e extrai automaticamente o arquivo TXT do ZIP
- **Compatibilidade total:** Funciona com arquivos ZIP e TXT
- **Mais praticidade:** Cole diretamente o arquivo baixado do WhatsApp

### 📊 **Modos de Análise**
- **Modo Único:** Análise tradicional de um grupo por vez
- **Modo Múltiplo:** Análise avançada de vários grupos simultaneamente
- **Toggle simples:** Alterne facilmente entre os modos conforme sua necessidade

## 🚀 Funcionalidades

### 🔒 **100% Privado e Seguro**
- Processamento totalmente local no navegador
- Nenhum dado é enviado para servidores
- Mascaramento automático de números de telefone
- Sem rastreamento ou cookies

### 📈 **Análises Completas**
- Ranking detalhado de participantes por número de mensagens
- Percentual de participação de cada membro
- Estatísticas visuais com gráficos e barras de progresso
- Filtros avançados por período de datas
- **NOVO:** Comparação estatística entre múltiplos grupos

### 👥 **Análise Multi-Grupos** 🌟
#### **Análise Individual**
- Visualize cada grupo separadamente
- Seletor dinâmico para navegar entre grupos
- Estatísticas específicas de cada comunidade
- Rankings independentes

#### **Dados Combinados**
- Mescle dados de todos os grupos em um ranking único
- Opções configuráveis de merge:
  - Prefixar nomes com grupo de origem
  - Mesclar participantes similares (em desenvolvimento)
- Visão panorâmica da atividade geral

#### **Comparação Entre Grupos**
- Compare estatísticas entre diferentes grupos
- Métricas comparativas:
  - Total de mensagens por grupo
  - Número de participantes únicos
  - Média de mensagens por pessoa
  - Participante mais ativo de cada grupo
- Cards visuais com estatísticas resumidas

### 📁 **Suporte a Múltiplos Formatos**
- **Arquivos ZIP:** Upload direto do arquivo exportado do WhatsApp
- **Arquivos TXT:** Compatibilidade com arquivos descompactados manualmente
- **Upload múltiplo:** Até 10 arquivos simultâneos (ZIP ou TXT)
- **Detecção automática:** O sistema identifica e processa o formato correto
- **Validação inteligente:** Verifica se o arquivo é um export válido do WhatsApp

### 💾 **Sistema de Cache Inteligente Aprimorado**
- Salvamento automático das análises por 7 dias
- **NOVO:** Cache separado para análises únicas e múltiplas
- Carregamento rápido de dados anteriores
- Gerenciamento inteligente de memória
- Migração automática entre versões
- Funciona com arquivos ZIP e TXT

### 📤 **Exportação Profissional Avançada**
#### **Exportação Tradicional**
- **PDF**: Relatórios visuais com design profissional
- **JSON**: Dados estruturados para análise técnica

#### **Exportação Multi-Grupos** 🆕
- **PDF Individual:** Relatório específico de cada grupo
- **PDF Combinado:** Relatório consolidado com dados mesclados
- **PDF Comparativo:** Relatório com comparação entre grupos
- **JSON Consolidado:** Todos os dados estruturados em um arquivo
- Inclui estatísticas completas e filtros aplicados

### 📱 **Interface Moderna e Responsiva**
- Design responsivo para mobile e desktop
- **NOVO:** Interface com tabs para navegação multi-grupos
- Toggle intuitivo entre modos único e múltiplo
- Carregamento dinâmico para arquivos grandes
- Feedback visual em tempo real
- Progress tracking individual e geral para múltiplos arquivos

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de estilização
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[JSZip](https://stuk.github.io/jszip/)** - Manipulação de arquivos ZIP

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/whatsapp-ranking-nextjs.git
cd whatsapp-ranking-nextjs
```

### 2. Instale as dependências
```bash
npm install jszip
npm install @types/jszip --save-dev
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o projeto
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📋 Como Usar

### 🔄 **Escolha o Modo de Análise**
1. **Modo Único:** Para analisar um grupo por vez (tradicional)
2. **Modo Múltiplo:** Para analisar vários grupos simultaneamente 🆕

### 📱 **Modo Único (Tradicional)**

#### 1. **Exporte o Chat do WhatsApp**
1. Abra o chat desejado no WhatsApp
2. Toque nos três pontos (⋮) no canto superior direito
3. Selecione **"Mais"** → **"Exportar conversa"**
4. Escolha **"Sem mídia"**
5. Salve o arquivo no seu dispositivo

#### 2. **Faça Upload do Arquivo**
1. Acesse a página de Análise
2. **NOVO:** Arraste diretamente o arquivo ZIP baixado do WhatsApp, ou
3. Clique em **"Escolher arquivo"** e selecione o ZIP ou TXT
4. Aguarde o processamento (geralmente instantâneo)

#### 3. **Visualize os Resultados**
- Veja o ranking completo de participantes
- Analise percentuais e estatísticas
- Use filtros por data se necessário

### 👥 **Modo Múltiplo (NOVO!)** 🌟

#### 1. **Exporte Múltiplos Chats**
1. Repita o processo de exportação para cada grupo desejado
2. Salve todos os arquivos (ZIP ou TXT) em uma pasta
3. Você pode analisar até 10 grupos simultaneamente

#### 2. **Upload Múltiplo**
1. Alterne para o **"Modo Múltiplos Grupos"**
2. Arraste e solte múltiplos arquivos de uma vez, ou
3. Clique em **"Escolher arquivos"** e selecione vários arquivos
4. Visualize a lista de arquivos selecionados
5. Aguarde o processamento de todos os arquivos

#### 3. **Navegue pelas Análises**
- **Aba Individual:** Veja cada grupo separadamente
- **Aba Combinados:** Visualize dados mesclados de todos os grupos
- **Aba Comparação:** Compare estatísticas entre grupos

#### 4. **Configure Opções de Merge**
- **Prefixar nomes:** Adicione o nome do grupo antes dos participantes
- **Mesclar similares:** (Em desenvolvimento) Agrupe participantes com nomes parecidos

### 📤 **Exporte os Resultados**
#### **Modo Único**
- **PDF**: Para relatórios visuais
- **JSON**: Para análise de dados

#### **Modo Múltiplo** 🆕
- **PDF Individual**: Relatório de um grupo específico
- **PDF Combinado**: Relatório consolidado de todos os grupos
- **PDF Comparativo**: Relatório comparando grupos
- **JSON Consolidado**: Todos os dados estruturados

## 🎯 Funcionalidades Avançadas

### **Análise Multi-Grupos** 👥 🆕
- Upload simultâneo de até 10 grupos
- Três modos de visualização: Individual, Combinado, Comparação
- Configurações avançadas de merge
- Estatísticas comparativas entre grupos
- Interface com tabs para navegação intuitiva

### **Suporte a Arquivos ZIP** 🗜️
- Upload direto do arquivo exportado do WhatsApp
- Extração automática do conteúdo TXT
- Detecção inteligente de arquivos de chat
- Tratamento de erros robusto
- Funciona tanto em modo único quanto múltiplo

### **Filtros por Data**
- Filtre mensagens por período específico
- Defina data de início e/ou fim
- Aplicação instantânea dos filtros
- **NOVO:** Filtros aplicados a todos os grupos no modo múltiplo

### **Cache Automático Aprimorado**
- Dados salvos automaticamente por 7 dias
- **NOVO:** Cache separado para análises únicas e múltiplas
- Carregamento rápido de análises anteriores
- Migração automática entre versões
- Opção de limpar cache a qualquer momento
- Funciona com ambos os formatos (ZIP e TXT)

### **Privacidade dos Dados**
- Números de telefone são automaticamente mascarados
- Exemplo: `+55119****1234` em vez do número completo
- Nomes salvos na agenda permanecem visíveis
- **NOVO:** Privacidade mantida mesmo com múltiplos grupos

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com Turbopack
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📁 Estrutura do Projeto

```
src/
├── app/                     # App Router do Next.js
├── components/             # Componentes React
│   ├── LandingPage/        # Componentes da página inicial
│   ├── WhatsAppRanking/    # Componentes de análise
│   │   ├── MultiFileUpload.tsx     # Upload múltiplo (NOVO)
│   │   ├── MultiFileResults.tsx    # Resultados múltiplos (NOVO)
│   │   └── index.tsx               # Componente principal aprimorado
│   └── ui/                 # Componentes de interface
├── hooks/                  # Hooks personalizados
│   ├── useCache.ts         # Gerenciamento de cache aprimorado
│   ├── useExport.ts        # Exportação de dados
│   ├── useFileProcessor.ts # Processamento de arquivos (ZIP/TXT)
│   └── useMultiFileProcessor.ts    # Processamento múltiplo (NOVO)
├── types/                  # Definições TypeScript expandidas
│   └── index.ts            # Tipos para multi-arquivo (ATUALIZADO)
├── utils/                  # Utilitários
│   ├── whatsappParser.ts   # Parser de arquivos WhatsApp
│   ├── exportUtils.ts      # Geração de PDF/JSON aprimorada
│   └── dateUtils.ts        # Manipulação de datas
```

## 🔒 Privacidade e Segurança

### **Dados Locais**
- Todo processamento acontece no seu navegador
- Nenhuma informação é enviada para servidores externos
- Cache armazenado apenas localmente
- **NOVO:** Privacidade mantida mesmo com múltiplos grupos

### **Mascaramento Automático**
- Números de telefone são automaticamente detectados
- Exibição mascarada: `+55119****1234`
- Nomes salvos na agenda permanecem inalterados
- **NOVO:** Funciona consistentemente em análises múltiplas

### **Sem Rastreamento**
- Não utilizamos cookies de rastreamento
- Sem Google Analytics ou ferramentas similares
- Totalmente anônimo

## 💡 Casos de Uso

### **Para Administradores de Grupo**
- Compare atividade entre diferentes grupos que você administra
- Identifique padrões de participação
- Analise engajamento em múltiplas comunidades

### **Para Pesquisadores**
- Estude dinâmicas de comunicação em grupos
- Compare comportamentos entre diferentes comunidades
- Exporte dados estruturados para análise científica

### **Para Usuários Curiosos**
- Descubra quem mais fala nos seus grupos
- Compare sua participação em diferentes grupos
- Visualize estatísticas interessantes das suas conversas

## 🆘 FAQ (Perguntas Frequentes)

### **P: Posso analisar múltiplos grupos ao mesmo tempo?** 🆕
R: Sim! Esta é a grande novidade da versão 2.5. Você pode fazer upload de até 10 grupos simultaneamente e comparar entre eles.

### **P: Como funciona a análise combinada?** 🆕
R: A análise combinada mescla dados de todos os grupos em um ranking único, permitindo ver quem mais participa considerando todas as conversas.

### **P: Posso usar arquivos ZIP diretamente?**
R: Sim! Esta é uma funcionalidade da versão 2.0. Você pode fazer upload do arquivo ZIP baixado diretamente do WhatsApp, tanto no modo único quanto múltiplo.

### **P: Meus dados ficam seguros com múltiplos grupos?** 🆕
R: Sim! Todo processamento continua sendo feito localmente no seu navegador. Nenhum dado sai do seu dispositivo, independente da quantidade de grupos.

### **P: Funciona com chats individuais?**
R: Sim! Funciona tanto com grupos quanto com conversas individuais, inclusive no modo múltiplo.

### **P: Qual o limite de grupos que posso analisar?** 🆕
R: Você pode analisar até 10 grupos simultaneamente. Este limite garante boa performance e experiência do usuário.

### **P: Qual o tamanho máximo de arquivo?**
R: Não há limite fixo. A aplicação foi otimizada para processar arquivos grandes de forma eficiente, tanto no modo único quanto múltiplo.

### **P: Os números de telefone ficam visíveis?**
R: Não! Números são automaticamente mascarados para proteção da privacidade, mesmo em análises múltiplas.

### **P: O que fazer se um arquivo ZIP não funcionar?**
R: Verifique se é o arquivo original exportado do WhatsApp. Se persistir o problema, descompacte manualmente e use o arquivo TXT.

### **P: Posso exportar dados de múltiplos grupos?** 🆕
R: Sim! Você pode exportar relatórios individuais, combinados ou comparativos em PDF, além de dados estruturados em JSON.

## 🚀 Roadmap Futuro

### **Versão 3.0 (Planejada)**
- **Análise Temporal:** Comparação de atividade ao longo do tempo
- **Filtros Avançados:** Por participante, tipo de mensagem, emojis
- **Merge Inteligente:** Algoritmo para mesclar participantes similares
- **Análise de Sentimentos:** Detecção de tom das conversas
- **Compartilhamento:** URLs para compartilhar análises (sem dados sensíveis)

### **Melhorias Contínuas**
- Performance otimizada para arquivos ainda maiores
- Interface ainda mais intuitiva
- Novos formatos de exportação
- Análises estatísticas avançadas

---

## 🏆 Destaques da Versão 2.5

✅ **Upload múltiplo de até 10 grupos**  
✅ **Análise individual, combinada e comparativa**  
✅ **Interface com tabs intuitiva**  
✅ **Cache inteligente aprimorado**  
✅ **Exportação avançada (individual, combinada, comparativa)**  
✅ **Processamento otimizado para múltiplos arquivos**  
✅ **Privacidade mantida com múltiplos grupos**  
✅ **Compatibilidade total com ZIP e TXT**  

*Feito com ❤️ usando Next.js, TypeScript, Tailwind CSS e JSZip*

*Última atualização: junho 2025 - Versão 2.5 Multi-Grupos*