# 📊 WhatsApp Ranking

Uma aplicação web moderna e segura para analisar seus chats do WhatsApp e descobrir quem mais participa das conversas em grupo. Totalmente **privado**, **gratuito** e **sem necessidade de cadastro**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

![image](https://github.com/user-attachments/assets/9be26d9f-1c0f-4714-81bd-9ec0a08fd850)


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

### 💾 **Sistema de Cache Inteligente**
- Salvamento automático das análises por 7 dias
- Carregamento rápido de dados anteriores
- Gerenciamento inteligente de memória

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
5. Salve o arquivo `.txt` no seu dispositivo

### 2. **Faça Upload do Arquivo**
1. Acesse a página de Análise
2. Clique em **"Escolher arquivo"** ou arraste o arquivo `.txt` para a área de upload
3. Aguarde o processamento (geralmente instantâneo)

### 3. **Visualize os Resultados**
- Veja o ranking completo de participantes
- Analise percentuais e estatísticas
- Use filtros por data se necessário

### 4. **Exporte os Resultados**
- **PDF**: Para relatórios visuais
- **JSON**: Para análise de dados

## 🎯 Funcionalidades Avançadas

### **Filtros por Data**
- Filtre mensagens por período específico
- Defina data de início e/ou fim
- Aplicação instantânea dos filtros

### **Cache Automático**
- Dados salvos automaticamente por 7 dias
- Carregamento rápido de análises anteriores
- Opção de limpar cache a qualquer momento

### **Privacidade dos Dados**
- Números de telefone são automaticamente mascarados
- Exemplo: `+55119****1234` em vez do número completo
- Nomes salvos na agenda permanecem visíveis

## 📁 Estrutura do Projeto

```
src/
├── app/                     # App Router do Next.js
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── ranking/            # Página de análise
│   └── globals.css         # Estilos globais
├── components/             # Componentes React
│   ├── LandingPage/        # Componentes da página inicial
│   ├── WhatsAppRanking/    # Componentes de análise
│   └── ui/                 # Componentes de interface
├── hooks/                  # Hooks personalizados
│   ├── useCache.ts         # Gerenciamento de cache
│   ├── useExport.ts        # Exportação de dados
│   └── useFileProcessor.ts # Processamento de arquivos
├── types/                  # Definições TypeScript
├── utils/                  # Utilitários
│   ├── whatsappParser.ts   # Parser de arquivos WhatsApp
│   ├── exportUtils.ts      # Geração de PDF/JSON
│   └── dateUtils.ts        # Manipulação de datas
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com Turbopack
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta .next para Netlify
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
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

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### **Diretrizes de Contribuição**
- Use TypeScript para tipagem forte
- Siga as convenções do ESLint configurado
- Mantenha componentes pequenos e reutilizáveis
- Adicione testes quando possível
- Documente novas funcionalidades

## 🐛 Reportar Problemas

Encontrou um bug? [Abra uma issue](https://github.com/seu-usuario/whatsapp-ranking-nextjs/issues) com:
- Descrição detalhada do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do navegador/sistema

## 📊 Compatibilidade

### **Navegadores Suportados**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **Dispositivos**
- Desktop (Windows, macOS, Linux)
- Mobile (iOS Safari, Chrome Android)
- Tablets

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Dário Reis**
- GitHub: [@darioreisjr](https://github.com/darioreisjr)
- LinkedIn: [Dário Reis Jr](https://linkedin.com/in/darioreisjr)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela framework incrível
- [Tailwind CSS](https://tailwindcss.com/) pela estilização eficiente
- [Lucide](https://lucide.dev/) pelos ícones belíssimos
- Comunidade open source por inspiração e feedback

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>🔄 Compartilhe com amigos que também usam WhatsApp</p>
</div>

## 🆘 FAQ (Perguntas Frequentes)

### **P: Meus dados ficam seguros?**
R: Sim! Todo processamento é feito localmente no seu navegador. Nenhum dado sai do seu dispositivo.

### **P: Funciona com chats individuais?**
R: Sim! Funciona tanto com grupos quanto com conversas individuais.

### **P: Qual o tamanho máximo de arquivo?**
R: Não há limite fixo. A aplicação foi otimizada para processar arquivos grandes de forma eficiente.

### **P: Os números de telefone ficam visíveis?**
R: Não! Números são automaticamente mascarados para proteção da privacidade.

### **P: Posso usar offline?**
R: Após a primeira visita, muitas funcionalidades funcionam offline graças ao cache do navegador.

### **P: Como limpar os dados salvos?**
R: Use o botão "Limpar Cache" na interface ou limpe o localStorage do navegador.

### **P: O arquivo funciona em qualquer idioma?**
R: A aplicação foi desenvolvida para o formato brasileiro do WhatsApp, mas pode funcionar com outros formatos de data similares.

### **P: Preciso de internet para usar?**
R: Após carregar a página inicial, a aplicação funciona completamente offline.

---

*Feito com ❤️ usando Next.js, TypeScript e Tailwind CSS*

*Última atualização: maio 2025*
