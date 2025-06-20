---
id: plan-002
title: Redesign UX/UI da Seção Hero - Museu Flutuante
createdAt: 2025-01-20
author: Richard
status: draft
---

## 🧩 Scope

Redesenhar completamente a seção hero (primeira tela) do site "Museu Flutuante" aplicando princípios modernos de UI/UX 2025, criando uma experiência visual sofisticada, romântica e profissional que transmita elegância e emoção.

## ✅ Functional Requirements

- **Hierarquia tipográfica clara** com 3 níveis bem definidos
- **Sistema de espaçamento consistente** baseado em grid de 8px
- **Responsividade perfeita** para mobile, tablet e desktop
- **Microinterações sutis** que aumentem o engajamento
- **Acessibilidade WCAG 2.1** com contraste adequado
- **Performance otimizada** com carregamento < 2s
- **Animações fluidas** com 60fps constante

## ⚙️ Non-Functional Requirements

- **Performance**: Lighthouse score > 90 em todas as métricas
- **Acessibilidade**: Contrast ratio mínimo 4.5:1, suporte a screen readers
- **SEO**: Estrutura semântica adequada com headings hierárquicos
- **Cross-browser**: Compatibilidade com Chrome, Firefox, Safari, Edge
- **Mobile-first**: Design responsivo com breakpoints estratégicos

## 📚 Guidelines & Packages

- **Design System**: Atomic Design + Material Design 3.0 principles
- **Typography Scale**: Modular scale 1.250 (Major Third)
- **Spacing System**: 8px base grid com multiples (8, 16, 24, 32, 48, 64, 96px)
- **Color Palette**: Expandir com tons intermediários e estados
- **Animation Library**: Framer Motion com easing curves naturais
- **Fonts**: Google Fonts otimizadas com font-display: swap

## 🔐 Threat Model (Stub)

- **Sobrecarga visual**: Evitar poluição com elementos desnecessários
- **Inconsistência**: Manter padrões visuais em toda a interface
- **Performance**: Não comprometer velocidade com elementos pesados
- **Acessibilidade**: Garantir usabilidade para todos os usuários

## 🔢 Execution Plan

### 1. **Sistema Tipográfico Profissional**
```css
H1 (Museu): Playfair Display, 64-96px, weight 600, letter-spacing -0.02em
H2 (Flutuante): Dancing Script, 48-72px, weight 500, letter-spacing 0.01em  
H3 (Mayanne): Dancing Script, 32-48px, weight 600, color accent
Body (Textos): Inter, 18-24px, weight 400, line-height 1.6
Small (Labels): Inter, 14-16px, weight 500, letter-spacing 0.01em
```

### 2. **Grid de Espaçamento Harmônico**
```css
Container padding: 64px (desktop) / 32px (mobile)
Section gaps: 96px (desktop) / 64px (mobile)  
Element spacing: 48px entre blocos principais
Text spacing: 24px entre parágrafos
Micro spacing: 16px entre elementos relacionados
```

### 3. **Redesign do Card de Tempo**
- Glassmorphism moderno com backdrop-blur-lg
- Border radius 20px com shadow sutil
- Padding interno 32px
- Ícone animado (coração pulsante)
- Typography: números em Playfair Display 42px
- Hover state com lift effect (8px translateY)

### 4. **Sistema de Botões Modernos**
```css
Primary Button:
- Background: linear-gradient(135deg, #e94560, #f5d76e)
- Padding: 16px 32px
- Border-radius: 12px
- Font: Inter 16px weight 600
- Hover: scale(1.05) + shadow-lg
- Active: scale(0.98)
- Focus: outline accent 2px
```

### 5. **Microinterações e Estados**
- **Hover states**: Todos elementos interativos
- **Loading states**: Skeleton loaders suaves
- **Success feedback**: Checkmark animado
- **Scroll indicators**: Progress bar sutil
- **Cursor customizado**: Heart pointer em elementos clicáveis

### 6. **Layout Responsivo Avançado**
```css
Desktop (1440px+): Layout em coluna única, espaçamentos generosos
Tablet (768-1439px): Elementos redimensionados proporcionalmente  
Mobile (< 768px): Stack vertical, touch targets 44px mínimo
```

### 7. **Paleta de Cores Expandida**
```css
Primary: #1a1a2e (backgrounds)
Secondary: #16213e (cards)
Accent: #e94560 (CTAs, love elements)
Gold: #f5d76e (highlights, success)
Neutral-50: #f8f9fa (text-light)
Neutral-400: #94a3b8 (text-medium)  
Neutral-800: #1e293b (text-dark)
Semantic: success, warning, error variants
```

### 8. **Otimizações de Performance**
- Font preloading com resource hints
- Lazy loading para elementos below-fold
- Image optimization com next/image
- Critical CSS inline
- Animation performance com transform/opacity only

### 9. **Acessibilidade Avançada**
- Semantic HTML5 structure
- ARIA labels em elementos interativos
- Keyboard navigation support
- Screen reader optimizations
- Reduced motion preferences support

### 10. **Testing e Validation**
- Cross-device testing (mobile, tablet, desktop)
- Performance auditing com Lighthouse
- Accessibility testing com axe-core
- Visual regression testing
- User feedback collection
