# StormSafe Mobile

Este repositório contém o aplicativo móvel StormSafe Mobile, parte da solução integrada StormSafe, criado para o desafio Global Solution 2025 da FIAP em parceria com a Mottu.

---

## Descrição da Solução (Global Solution)

**StormSafe** é uma plataforma integrada que combina:

1. **Sensores IoT** instalados em pontos estratégicos próximos aos rios para monitorar, em tempo real, parâmetros como nível da água, chuva e temperatura.  
2. **Inteligência Artificial** que processa os dados dos sensores e, utilizando modelos preditivos, gera alertas antecipados de risco de enchente.  
3. **Geolocalização** que mapeia as regiões de risco e traça rotas de evacuação seguras, levando em conta ruas bloqueadas e obstruções em tempo real.  
4. **App Mobile** para a população, que exibe alertas via push, mostra zonas de risco em mapa interativo e orienta usuários a seguir rotas de fuga seguras.  
5. **Painel Administrativo** (em browser) para autoridades e equipes de defesa civil, permitindo visualizar dashboards de leitura de sensores, histórico de alertas, estatísticas de enchentes e configurar notificações de emergência.

**Impacto Social**  
- Redução de vítimas e do caos durante enchentes.  
- Empoderamento da população com informações acessíveis e tempo de resposta mais rápido.  
- Apoio a autoridades na tomada de decisões baseadas em dados em tempo real.

**Escalabilidade**  
- Arquitetura modular que pode ser adaptada a outras cidades ou tipos de desastres (deslizamentos, desabamentos).  
- Versão gratuita do app para usuários finais.  
- Versão avançada (paga ou sob licença) para governos, prefeituras e ONGs, incluindo relatórios customizados e integrações com sistemas de emergência.

---

## Integração com o Projeto Mobile

Este projeto “StormSafe Mobile” foi desenvolvido em **React Native (Expo)** e consome a API Java (Spring Boot) criada pelos integrantes para o backend. A aplicação móvel implementa:

- **Tela de Login / Splash**  
- **Abas de Navegação (Tabs)**: “Alertas”, “Mapa”, “Reportar” e “Configurações”  
- **CRUD de Alertas** via chamadas à API Java (GET, POST, PUT, DELETE)  
- **Mapa Interativo** exibindo zonas de risco e rotas de evacuação  
- **Formulário de Relatos Colaborativos**  
- **Tela de Configurações** para gerenciamento de perfil e preferências de notificação  
- **Tema Dark** com identidade visual para facilitar uso noturno

---

## Integrantes do Grupo

- **Pedro Valentim Merise** – RM556826  
- **Miguel Barros Ramos** – RM556652  

---

## Link do Vídeo de Demonstração

Assista ao vídeo completo (máximo 5 minutos) demonstrando todas as funcionalidades do app:

🎥 [Vídeo no YouTube – Demonstração StormSafe Mobile](https://youtu.be/SEU_LINK_DO_VIDEO)

---

## Como Rodar o Projeto

1. **Clonar o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/StormSafe_Mobile.git
   cd StormSafe_Mobile
Instalar dependências

npm uninstall -g expo-cli
npx expo install
npx expo doctor --fix-dependencies

npx expo start



Abra services/api.ts e ajuste baseURL para a URL onde a API Java (Spring Boot) está rodando (local ou produção).

Exemplo de baseURL:


export const api = axios.create({
  baseURL: "http://localhost:8080", // ou https://stormsafe-api.railway.app
  timeout: 5000,
});
Executar o app

bash
Copiar
Editar
npx expo start -c
Escaneie o QR Code com o Expo Go no seu dispositivo, ou pressione a (Android) / i (iOS) para abrir emulador.

Estrutura de Pastas
graphql
Copiar
Editar
StormSafe_Mobile/
├── app/  
│   ├── _layout.tsx           # Layout das abas (Tabs)
│   ├── login.tsx             # Tela de login
│   ├── (tabs)/  
│   │   ├── index.tsx         # Tela inicial (Splash)
│   │   ├── alertas.tsx       # Lista de alertas
│   │   ├── mapa.tsx          # Mapa interativo
│   │   ├── reportar.tsx      # Formulário de relato
│   │   └── config.tsx        # Configurações do usuário
│   └── ...
│
├── components/  
│   ├── ui/  
│   │   ├── Input.tsx         # Componente de Input customizado
│   │   ├── Button.tsx        # Componente de Botão customizado
│   │   ├── Card.tsx          # Card de alerta
│   │   └── CustomIcons.tsx   # Ícones em SVG (react-native-svg)
│   ├── hooks/                # Hooks personalizados
│   └── services/             # Serviços de API (axios)
│       ├── api.ts            # Cliente Axios com baseURL configurada
│       ├── alerta.service.ts # Funções getAlertas, postAlerta, putAlerta, deleteAlerta
│       └── usuario.service.ts# Funções getUsuario, putUsuario, deleteUsuario
│
├── constants/  
│   ├── Colors.ts             # Paleta de cores
│   ├── Typography.ts         # Tipografia (tamanhos e pesos)
│   ├── Spacing.ts            # Espaçamentos (margem/padding)
│   └── ...
│
├── assets/                   # Imagens, ícones e fontes
│   ├── logo.png  
│   └── ilustracoes/  
│
├── .eslintrc.js              # Configuração ESLint  
├── .prettierrc               # Configuração Prettier  
├── tsconfig.json             # Configuração TypeScript  
├── app.json                  # Configuração do Expo  
├── package.json              # Dependências e scripts  
└── README.md                 # Este arquivo
Dependências Principais
expo (>= 48.0.0) – Framework React Native gerenciado pelo Expo

react (>= 18.2.0) – Biblioteca React

react-native (>= 0.71.0) – Biblioteca base React Native

expo-router – Roteamento via estrutura de pastas

axios (>= 1.4.0) – Cliente HTTP para consumir a API Java

react-native-svg (>= 13.4.0) – Renderização de SVGs

react-native-safe-area-context – Gerenciamento de áreas seguras (notch, status bar)

react-native-gesture-handler – Gestos avançados (usado pelo Router)

react-native-reanimated – Animações de alta performance

react-native-screens – Otimização de telas (navegação)

@expo/vector-icons – Ícones vetoriais prontos

@react-native-async-storage/async-storage – Armazenamento local para token e preferências

expo-secure-store – Armazenamento seguro (dados sensíveis)

eslint / prettier / eslint-plugin-react-native – Ferramentas de lint e formatação

Scripts Disponíveis
No package.json, você encontra os seguintes scripts:

jsonc
Copiar
Editar
{
  "scripts": {
    "start": "expo start",                // Inicia o Expo DevTools
    "android": "expo start --android",    // Abre no emulador Android
    "ios": "expo start --ios",            // Abre no emulador iOS (macOS)
    "web": "expo start --web",            // Roda no navegador (React Native Web)
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",     // Verifica padrões de código
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,css,md}\"" // Formata código
  }
}
Contato
Para dúvidas, sugestões ou reportar problemas, abra uma issue neste repositório ou entre em contato diretamente com os integrantes:

Pedro Valentim Merise

E-mail: pedro.merise@fiap.com.br

LinkedIn: https://www.linkedin.com/in/pedro-merise

Miguel Barros Ramos

E-mail: miguel.barros@fiap.com.br

LinkedIn: https://www.linkedin.com/in/miguel-barros-ramos

