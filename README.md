
# 📱 StormSafe Mobile

Este repositório contém o aplicativo móvel **StormSafe Mobile**, parte da solução integrada **StormSafe**, criada para o desafio **Global Solution 2025 da FIAP** em parceria com a **Mottu**.

---

## 🌎 Descrição da Solução (Global Solution)

**StormSafe** é uma plataforma integrada que combina:

1. 📡 **Sensores IoT** para monitorar, em tempo real, dados como nível da água, chuva e temperatura.
2. 🤖 **Inteligência Artificial** com modelos preditivos para gerar alertas antecipados de enchente.
3. 🗺️ **Geolocalização** com mapeamento de áreas de risco e rotas de evacuação seguras.
4. 📲 **App Mobile** com alertas via push, mapas interativos e orientações de fuga.
5. 🖥️ **Painel Administrativo** para autoridades monitorarem dados e gerenciarem alertas.

### 📌 Impacto Social
- Redução de vítimas e caos durante enchentes.
- Informação acessível à população com respostas rápidas.
- Apoio a autoridades com dados em tempo real.

### 📈 Escalabilidade
- Arquitetura modular adaptável a outras cidades ou desastres.
- App gratuito para usuários e versão avançada para instituições.

---

## 📲 Integração com o Projeto Mobile

O app foi desenvolvido em **React Native (Expo)** e consome a **API Java (Spring Boot)**.

### Funcionalidades:
- Tela de Login e Splash
- Navegação por abas: “Alertas”, “Mapa”, “Reportar” e “Configurações”
- CRUD de Alertas via API (GET, POST, PUT, DELETE)
- Mapa interativo com zonas de risco e rotas de fuga
- Formulário de relatos colaborativos
- Tema escuro (Dark Theme)
- Configuração de perfil e preferências

---

## 👥 Integrantes do Grupo

- **Pedro Valentim Merise** – RM556826  
- **Miguel Barros Ramos** – RM556652  

---

## 🎥 Demonstração em Vídeo

Assista ao vídeo completo com até 5 minutos demonstrando o app:  
🔗 [Vídeo no YouTube – Demonstração StormSafe Mobile](https://youtu.be/SEU_LINK_DO_VIDEO)

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/StormSafe_Mobile.git
cd StormSafe_Mobile
```

### 2. Instalar Dependências

```bash
npm uninstall -g expo-cli
npx expo install
```

### 3. Instalar Dependências Específicas Ausentes (obrigatórias)

```bash
npx expo install expo-router
npx expo install expo-status-bar
npx expo install expo-splash-screen
npx expo install expo-font
npx expo install expo-location
npx expo install react-native-svg
npx expo install react-native-maps
npx expo install @react-native-async-storage/async-storage
npm install axios
```

### 4. Configurar baseURL da API

Abra `services/api.ts` e ajuste a `baseURL` para o endereço da API:

```ts
export const api = axios.create({
  baseURL: "http://localhost:8080", // ou https://stormsafe-api.railway.app
  timeout: 5000,
});
```

### 5. Executar o App

```bash
npx expo start --tunnel
```

Escaneie o QR Code com o **Expo Go** ou use as teclas `a` (Android) ou `i` (iOS).

---

## 🗂️ Estrutura de Pastas

```
StormSafe_Mobile/
├── app/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── (tabs)/
│       ├── index.tsx
│       ├── alertas.tsx
│       ├── mapa.tsx
│       ├── reportar.tsx
│       └── config.tsx
├── components/
│   ├── ui/
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── CustomIcons.tsx
│   ├── hooks/
│   └── services/
│       ├── api.ts
│       ├── alerta.service.ts
│       └── usuario.service.ts
├── constants/
│   ├── Colors.ts
│   ├── Typography.ts
│   ├── Spacing.ts
├── assets/
│   ├── logo.png
│   └── ilustracoes/
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── app.json
├── package.json
└── README.md
```

---

## 🧩 Dependências Principais

- `expo` (>= 53.0.0)
- `react` (>= 18.2.0)
- `react-native` (>= 0.79.0)
- `expo-router`
- `axios` (>= 1.4.0)
- `react-native-svg`
- `react-native-maps`
- `@react-native-async-storage/async-storage`
- `expo-splash-screen`
- `expo-status-bar`
- `expo-font`
- `expo-location`
- `eslint`, `prettier`, `eslint-plugin-react-native`

---

## 🛠️ Scripts Disponíveis

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write "**/*.{js,jsx,ts,tsx,css,md}""
  }
}
```

---

## 📬 Contato

**Pedro Valentim Merise**  
📧 rm556826@fiap.com.br  
🔗 [GitHub](https://github.com/pedrovalentim22)

**Miguel Barros Ramos**  
📧 miguelbarrosramos46@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/miguel-barros-ramos-47458a326/)
