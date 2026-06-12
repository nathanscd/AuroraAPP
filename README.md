# Memórias Especiais - Valentine's Day Memory Collection

Uma aplicação web completa e interativa para presentear seu amor com cinco experiências únicas e personalizáveis.

## 🎯 Visão Geral

**Memórias Especiais** é um aplicativo web elegante e responsivo desenvolvido com React + TypeScript + Vite + Tailwind CSS. Combina cinco experiências interativas em um único presente digital:

1. **Cápsula do Tempo** - Timeline visual dos momentos especiais
2. **100 Motivos** - Catálogo de razões pelas quais você ama alguém
3. **Livro Interativo** - Narrativa da história de vocês, capítulo por capítulo
4. **Lugares Especiais** - Mapa interativo dos locais significativos
5. **Jardim Virtual** - Coleção de flores representando memórias

## 🏗️ Arquitetura do Projeto

```
client/
├── src/
│   ├── assets/
│   │   └── placeholders/          # Placeholders de imagens
│   ├── components/
│   │   ├── common/                # Componentes reutilizáveis
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageTitle.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ImagePlaceholder.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── index.ts
│   │   ├── timeline/
│   │   │   └── TimelineCard.tsx
│   │   ├── reasons/
│   │   │   └── ReasonCard.tsx
│   │   ├── storybook/
│   │   │   └── StoryPage.tsx
│   │   ├── map/
│   │   │   └── PlaceMarker.tsx
│   │   └── garden/
│   │       └── FlowerCard.tsx
│   ├── data/
│   │   ├── timelineData.ts        # Dados da timeline
│   │   ├── reasonsData.ts         # Dados dos 100 motivos
│   │   ├── storyData.ts           # Dados do livro
│   │   ├── placesData.ts          # Dados dos lugares
│   │   └── flowersData.ts         # Dados do jardim
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript
│   ├── constants/
│   │   └── index.ts               # Constantes e configurações
│   ├── utils/
│   │   ├── dateFormatter.ts       # Formatação de datas
│   │   └── storage.ts             # Gerenciamento de localStorage
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Contexto de tema
│   ├── hooks/
│   │   ├── useComposition.ts
│   │   ├── useMobile.tsx
│   │   └── usePersistFn.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── TimelinePage.tsx
│   │   ├── ReasonsPage.tsx
│   │   ├── StoryBookPage.tsx
│   │   ├── PlacesPage.tsx
│   │   ├── GardenPage.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                    # Componente raiz
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Estilos globais
├── public/
│   ├── favicon.ico
│   └── robots.txt
└── index.html
```

## 🎨 Design & Tema

O aplicativo utiliza uma paleta de cores romântica e elegante:

- **Tons Creme**: Fundo principal suave
- **Branco**: Cartões e componentes
- **Rosa Claro**: Acentos e destaques
- **Vermelho Suave**: Elementos principais e CTA
- **Dourado Discreto**: Detalhes sofisticados

### Tipografia

- **Display**: Serif (títulos e headings)
- **Body**: Sans-serif (conteúdo)
- **Hierarquia**: Bem definida com pesos variados

## 🚀 Como Começar

### Requisitos

- Node.js 18+
- pnpm 10+

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📦 Dependências Principais

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animações suaves
- **Wouter** - Roteamento
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes UI

## 🎯 Funcionalidades

### 1. Cápsula do Tempo
- Timeline vertical animada
- Eventos com data, título, descrição e imagem
- Alternância de layout esquerda/direita
- Animações ao scroll

### 2. 100 Motivos
- Grid responsivo de cartões
- Busca em tempo real
- Filtro por categoria
- Sistema de favoritos com localStorage
- Animações ao abrir

### 3. Livro Interativo
- Navegação entre capítulos
- Barra de progresso
- Transições suaves
- Indicador de capítulo atual
- Scroll automático ao mudar capítulo

### 4. Lugares Especiais
- Visualização de marcadores
- Modal com detalhes do lugar
- Coordenadas geográficas
- Imagens e descrições

### 5. Jardim Virtual
- Grid de flores coloridas
- Animações de entrada
- Modal com detalhes de cada flor
- Hover effects interativos

## 💾 Gerenciamento de Estado

- **localStorage**: Armazenamento de favoritos
- **React Hooks**: Estado local dos componentes
- **Context API**: Gerenciamento de tema

## 📱 Responsividade

O aplicativo é totalmente responsivo:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- Lazy loading de componentes
- Otimização de imagens
- CSS-in-JS com Tailwind
- Animações GPU-aceleradas
- Code splitting automático

## 🎬 Animações

Utiliza Framer Motion para:

- Entrada de componentes
- Hover effects
- Transições entre páginas
- Scroll animations
- Interações de botões

## 🔧 Customização

### Adicionar Novos Motivos

Edite `src/data/reasonsData.ts`:

```typescript
{
  id: "16",
  number: 16,
  title: "Seu Título",
  description: "Descrição do motivo",
  category: "Categoria",
}
```

### Adicionar Novos Eventos na Timeline

Edite `src/data/timelineData.ts`:

```typescript
{
  id: "9",
  title: "Título do Evento",
  date: "2023-12-25",
  description: "Descrição do evento",
  imageUrl: undefined,
}
```

### Adicionar Novos Capítulos

Edite `src/data/storyData.ts`:

```typescript
{
  id: "9",
  chapterNumber: 9,
  title: "Capítulo 9",
  subtitle: "Subtítulo",
  text: "Texto do capítulo",
  imageUrl: undefined,
}
```

### Modificar Cores

Edite `src/constants/index.ts` e `src/index.css`:

```typescript
export const COLORS = {
  cream: "#FAF8F3",
  // ... outras cores
};
```

## 📝 Estrutura de Dados

### TimelineItem
```typescript
{
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}
```

### Reason
```typescript
{
  id: string;
  number: number;
  title: string;
  description: string;
  category: string;
  isFavorite?: boolean;
}
```

### StoryChapter
```typescript
{
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  text: string;
  imageUrl?: string;
}
```

### Place
```typescript
{
  id: string;
  name: string;
  date: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}
```

### Flower
```typescript
{
  id: string;
  name: string;
  date: string;
  description: string;
  imageUrl?: string;
  color: string;
}
```

## 🎯 Princípios de Código

- **SOLID**: Responsabilidade única, aberto/fechado
- **DRY**: Não repita código
- **Clean Code**: Legibilidade e manutenibilidade
- **Componentização**: Máxima reutilização
- **Type Safety**: TypeScript strict mode

## 🚀 Deployment

O projeto está pronto para deploy em:

- Vercel
- Netlify
- GitHub Pages
- Manus Platform

```bash
npm run build
```

A pasta `dist/` contém a build otimizada.

## 📄 Licença

MIT

## 💝 Notas

Este é um presente especial criado com amor. Personalize cada seção com suas próprias memórias e histórias para torná-lo ainda mais significativo.

---

**Feito com ❤️ para alguém especial**
