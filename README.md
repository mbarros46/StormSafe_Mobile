# 🌧️ StormSafe Mobile

Aplicativo React Native desenvolvido como parte da Global Solution 2025 para auxiliar a população durante enchentes, fornecendo **alertas em tempo real**, **rotas seguras de evacuação** e um canal de **relato colaborativo**.

---

## 🚀 Funcionalidades

- 🗺️ Mapa interativo com rotas de evacuação seguras *(em construção)*
- 🚨 Listagem de alertas de enchentes em tempo real (com fallback offline)
- 📝 Formulário para reportar pontos de alagamento (crowdsourcing)
- ⚙️ Tela de configurações personalizada
- 🌙 Tema escuro com identidade visual consistente

---

## 🧑‍💻 Tecnologias utilizadas

- [Expo](https://expo.dev/) + React Native
- Axios (para requisições à API)
- Expo Router (navegação)
- TypeScript
- AsyncStorage (local storage)
- Tema escuro com suporte a `useColorScheme`

---

## 👥 Integrantes do Grupo

- Miguel Barros Ramos — RM556652  
- Pedro Valentim Merise — RM556826

---

## 🎥 Demonstração em Vídeo

🔗 [Link do vídeo no YouTube](https://youtube.com/seu-video)

---

## 🗂️ Estrutura do Projeto

```shell
StormSafeMobile/
├── app/
│   ├── (tabs)/                  # Telas principais
│   │   ├── index.tsx            # Início
│   │   ├── alertas.tsx          # Lista de alertas
│   │   ├── mapa.tsx             # Mapa com zonas de risco
│   │   ├── reportar.tsx         # Formulário de relato
│   │   └── config.tsx           # Configurações
│   ├── types.ts                 # Tipagens
│   └── _layout.tsx             # Layout de navegação
├── components/                  # Componentes reutilizáveis
├── constants/Colors.ts          # Paleta de cores
├── hooks/useColorScheme.ts      # Suporte a tema escuro
├── services/api.ts              # Configuração do Axios
└── README.md                    # Este arquivo
