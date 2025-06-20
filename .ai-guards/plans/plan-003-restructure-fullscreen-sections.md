---
id: plan-003
title: Reestruturação - Seções Full-Screen do Museu Flutuante
createdAt: 2025-01-15
author: AI Assistant
status: completed
---

## 🧩 Scope

Reestruturar a aplicação "Museu Flutuante" dividindo todo o conteúdo em **7 seções distintas**, cada uma ocupando a tela inteira (100vh), criando uma experiência de navegação fluida e cinematográfica para celebrar o relacionamento de Richard e Mayanne.

## ✅ Functional Requirements

### **SEÇÃO 1 - HERO (Entrada Principal)**
- Tela de boas-vindas com "Museu Flutuante"
- Subtítulo: "Um espaço dedicado às nossas memórias mais preciosas"
- Navegação por scroll natural
- **Status**: ✅ CONCLUÍDA

### **SEÇÃO 2 - DEDICATION (Para Mayanne)**
- Texto principal: "Para a pessoa mais especial do mundo"
- Nome "Mayanne 💕" em destaque
- Card interativo com contador: "Juntos há 8 meses"
- Navegação por scroll natural
- **Status**: ✅ CONCLUÍDA

### **SEÇÃO 3 - GALLERY (Galeria de Fotos)**
- Grid responsivo com fotos do relacionamento
- Título: "Nossa Galeria de Momentos Especiais"
- Efeitos hover e zoom nas imagens
- **Status**: ⚠️ PRECISA AJUSTE PARA FULL-SCREEN

### **SEÇÃO 4 - FLOATING MEMORIES (Fotos Flutuantes)**
- Texto central "love." em fonte manuscrita
- 8 fotos flutuando com efeito parallax
- Background transparente integrado
- **Status**: ✅ CONCLUÍDA

### **SEÇÃO 5 - LETTERS (Cartinhas do Coração)**
- Cards com cartas de amor personalizadas
- Animações de abertura dos cards
- Navegação entre cartas
- **Status**: ⚠️ PRECISA AJUSTE PARA FULL-SCREEN

### **SEÇÃO 6 - TIMELINE (História de Amor)**
- Linha do tempo horizontal dos marcos
- Cards com momentos especiais
- Estatísticas do relacionamento
- **Status**: ⚠️ PRECISA AJUSTE PARA FULL-SCREEN

### **SEÇÃO 7 - MUSIC PLAYER (Trilha Sonora)**
- Player de música fixo/flutuante
- Playlist personalizada do casal
- Controles intuitivos
- **Status**: ✅ JÁ EXISTE COMO COMPONENTE FIXO

## ⚙️ Non-Functional Requirements

- **Performance**: Cada seção deve carregar em < 2s
- **Responsividade**: Funcionar perfeitamente em mobile, tablet e desktop
- **Acessibilidade**: Navegação por teclado e screen readers
- **Smooth Scrolling**: Transições suaves entre seções
- **SEO**: Meta tags apropriadas para cada seção

## 📚 Guidelines & Packages

- **Framework**: Next.js 14+ com TypeScript
- **Animations**: Framer Motion + Motion (já instalado)
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Icons**: Heroicons (já instalado)
- **Images**: Next.js Image component otimizado
- **Estado**: React hooks nativos
- **Scroll**: Intersection Observer API para navegação

## 🔐 Threat Model (Stub)

- **Performance**: Lazy loading de imagens pesadas
- **Memory Leaks**: Cleanup de animações ao desmontar componentes
- **SEO**: Estrutura semântica apropriada

## 🔢 Execution Plan

### **FASE 1: Criação da Seção Dedication** ✅ CONCLUÍDA
1. ~~Criar `src/components/sections/Dedication.tsx`~~ - REUTILIZADA SEÇÃO EXISTENTE
2. ✅ Design: fundo elegante + texto centralizado + card interativo
3. ✅ Integrar contador de tempo existente
4. ~~Adicionar botão de navegação para próxima seção~~ - REMOVIDO (scroll natural)
5. ✅ Seção 2 otimizada e limpa

### **FASE 2: Ajustar Seções Existentes para Full-Screen** ✅ CONCLUÍDA
1. **Gallery**: Modificar para ocupar 100vh
   - ✅ Títulos reduzidos para melhor proporção
   - ✅ Responsividade mantida
2. **Letters**: Adaptar layout para full-screen
   - ✅ Grid otimizado (4 colunas em lg)
   - ✅ Tipografia ajustada
3. **Timeline**: Otimizar para visualização em tela cheia
   - ✅ Títulos compactos
   - ✅ Cards otimizados

### **FASE 3: Integração na Página Principal** ✅ CONCLUÍDA
1. Atualizar `src/app/page.tsx`:
   - ✅ Remover conteúdo duplicado ("Museu Flutuante" da seção 2)
   - ✅ Otimizar seção Home para focar na Mayanne
   - ✅ Remover botões desnecessários
   - ✅ Todas seções agora são exatamente 100vh (h-screen)
   - ✅ Ordem das seções organizada e funcional

### **FASE 4: Navegação e UX** ✅ CONCLUÍDA
1. Atualizar `Navigation.tsx`:
   - ✅ Seção "home" renomeada para "Mayanne"
   - ✅ Adicionada seção "Floating Memories"
   - ✅ Smooth scroll entre seções funcional
   - ✅ Ícones atualizados (heart, sparkles)
2. ✅ SectionIndicator criado e integrado
3. ✅ Scroll natural implementado (botões removidos)

### **FASE 5: Otimizações Finais** 🔄 PARCIALMENTE CONCLUÍDA
1. ✅ Performance: Seções otimizadas para full-screen
2. ✅ Animações: Parallax e transições suaves implementadas
3. ✅ Mobile: SectionIndicator hidden em mobile, nav responsiva
4. ⚠️ Testes: navegação, performance, acessibilidade (requer teste manual)

## 🗺️ Mapa das Seções

```
┌─────────────────────────────────────┐
│ 1. HERO - "Museu Flutuante"         │ ✅
├─────────────────────────────────────┤
│ 2. HOME - "Para Mayanne"            │ ✅
├─────────────────────────────────────┤
│ 3. GALLERY - "Galeria de Fotos"     │ ✅
├─────────────────────────────────────┤
│ 4. FLOATING - "love." + Parallax    │ ✅
├─────────────────────────────────────┤
│ 5. LETTERS - "Cartinhas do Coração" │ ✅
├─────────────────────────────────────┤
│ 6. TIMELINE - "História de Amor"    │ ✅
├─────────────────────────────────────┤
│ 7. MUSIC PLAYER - Sempre presente   │ ✅
│ 8. SECTION INDICATOR - Lateral      │ ✅
└─────────────────────────────────────┘
```

**Legenda**: ✅ Pronto | 🔄 Em desenvolvimento | ⚠️ Precisa ajuste

## 🎯 Resultado Esperado

Uma experiência imersiva onde cada scroll revela uma nova "sala" do museu dedicado ao relacionamento, com transições cinematográficas e design cohesivo, transformando a visita em uma jornada emocional única. 