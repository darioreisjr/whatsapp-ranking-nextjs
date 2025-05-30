# 📊 WhatsApp Ranking

Uma aplicação web moderna e segura para analisar seus chats do WhatsApp e descobrir quem mais participa das conversas em grupo. Totalmente **privado**, **gratuito** e **sem necessidade de cadastro**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

## 🆕 Novidades da Versão 2.0

### 🗜️ **Suporte Nativo a Arquivos ZIP**
- **Upload direto de arquivos ZIP:** Não precisa mais descompactar o arquivo do WhatsApp
- **Extração automática:** O sistema detecta e extrai automaticamente o arquivo TXT do ZIP
- **Compatibilidade total:** Funciona com arquivos ZIP e TXT
- **Mais praticidade:** Cole diretamente o arquivo baixado do WhatsApp

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

### 📁 **Suporte a Múltiplos Formatos**
- **Arquivos ZIP:** Upload direto do arquivo exportado do WhatsApp
- **Arquivos TXT:** Compatibilidade com arquivos descompactados manualmente
- **Detecção automática:** O sistema identifica e processa o formato correto
- **Validação inteligente:** Verifica se o arquivo é um export válido do WhatsApp

### 💾 **Sistema de Cache Inteligente**
- Salvamento automático das análises por 7 dias
- Carregamento rápido de dados anteriores
- Gerenciamento inteligente de memória
- Funciona com arquivos ZIP e TXT

### 📤 **Exportação Profissional**
- **PDF**: Relatórios visuais com design profissional
- **JSON**: Dados estruturados para análise técnica
- Inclui estatísticas completas e filtros aplicados

### 📱 **Interface Moderna**
- Design responsivo para mobile e desktop
- Interface intuitiva e fácil de usar
- Carregamento dinâmico para arquivos grandes
- Feedback visual em tempo real

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

### 1. **Exporte o Chat do WhatsApp**
1. Abra o chat desejado no WhatsApp
2. Toque nos três pontos (⋮) no canto superior direito
3. Selecione **"Mais"** → **"Exportar conversa"**
4. Escolha **"Sem mídia"**
5. Salve o arquivo no seu dispositivo

### 2. **Faça Upload do Arquivo**
1. Acesse a página de Análise
2. **NOVO:** Arraste diretamente o arquivo ZIP baixado do WhatsApp, ou
3. Clique em **"Escolher arquivo"** e selecione o ZIP ou TXT
4. Aguarde o processamento (geralmente instantâneo)

### 3. **Visualize os Resultados**
- Veja o ranking completo de participantes
- Analise percentuais e estatísticas
- Use filtros por data se necessário

### 4. **Exporte os Resultados**
- **PDF**: Para relatórios visuais
- **JSON**: Para análise de dados

## 🎯 Funcionalidades Avançadas

### **Suporte a Arquivos ZIP** 🆕
- Upload direto do arquivo exportado do WhatsApp
- Extração automática do conteúdo TXT
- Detecção inteligente de arquivos de chat
- Tratamento de erros robusto

### **Filtros por Data**
- Filtre mensagens por período específico
- Defina data de início e/ou fim
- Aplicação instantânea dos filtros

### **Cache Automático**
- Dados salvos automaticamente por 7 dias
- Carregamento rápido de análises anteriores
- Opção de limpar cache a qualquer momento
- Funciona com ambos os formatos (ZIP e TXT)

### **Privacidade dos Dados**
- Números de telefone são automaticamente mascarados
- Exemplo: `+55119****1234` em vez do número completo
- Nomes salvos na agenda permanecem visíveis

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
│   └── ui/                 # Componentes de interface
├── hooks/                  # Hooks personalizados
│   ├── useCache.ts         # Gerenciamento de cache
│   ├── useExport.ts        # Exportação de dados
│   └── useFileProcessor.ts # Processamento de arquivos (ZIP/TXT)
├── types/                  # Definições TypeScript
├── utils/                  # Utilitários
│   ├── whatsappParser.ts   # Parser de arquivos WhatsApp
│   ├── exportUtils.ts      # Geração de PDF/JSON
│   └── dateUtils.ts        # Manipulação de datas
```

## 🔒 Privacidade e Segurança

### **Dados Locais**
- Todo processamento acontece no seu navegador
- Nenhuma informação é enviada para servidores externos
- Cache armazenado apenas localmente

### **Mascaramento Automático**
- Números de telefone são automaticamente detectados
- Exibição mascarada: `+55119****1234`
- Nomes salvos na agenda permanecem inalterados

### **Sem Rastreamento**
- Não utilizamos cookies de rastreamento
- Sem Google Analytics ou ferramentas similares
- Totalmente anônimo

## 🆘 FAQ (Perguntas Frequentes)

### **P: Posso usar arquivos ZIP diretamente?**
R: Sim! Esta é uma novidade da versão 2.0. Você pode fazer upload do arquivo ZIP baixado diretamente do WhatsApp, sem precisar descompactar.

### **P: Meus dados ficam seguros?**
R: Sim! Todo processamento é feito localmente no seu navegador. Nenhum dado sai do seu dispositivo.

### **P: Funciona com chats individuais?**
R: Sim! Funciona tanto com grupos quanto com conversas individuais.

### **P: Qual o tamanho máximo de arquivo?**
R: Não há limite fixo. A aplicação foi otimizada para processar arquivos grandes de forma eficiente.

### **P: Os números de telefone ficam visíveis?**
R: Não! Números são automaticamente mascarados para proteção da privacidade.

### **P: O que fazer se o arquivo ZIP não funcionar?**
R: Verifique se é o arquivo original exportado do WhatsApp. Se persistir o problema, descompacte manualmente e use o arquivo TXT.

---

*Feito com ❤️ usando Next.js, TypeScript, Tailwind CSS e JSZip*

*Última atualização: janeiro 2025*
