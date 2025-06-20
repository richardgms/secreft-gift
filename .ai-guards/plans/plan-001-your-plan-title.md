---
id: plan-001
title: Plano Museu Flutuante - Site Presente 💕
createdAt: 2025-06-19
author: Richard
status: em-execução
---

## 🧩 Scope

Criar um site presente one-page interativo chamado "Museu Flutuante" - uma experiência digital romântica que funciona como um museu pessoal do relacionamento entre Richard e Mayanne. O site incluirá galeria de fotos, player de música, sistema de cartinhas e timeline interativa, tudo com design premium e elementos glassmorphism.

## ✅ Functional Requirements

### 🎵 Sistema de Áudio
- Player fixo na parte inferior (estilo Spotify)
- Playlist personalizada com controles completos
- Visualização da música atual com capa
- Volume ajustável

### 📸 Galeria Interativa  
- Carrossel de fotos com zoom
- Legendas personalizadas
- Transições suaves e modo fullscreen

### 💌 Sistema de Cartinhas
- Envelopes clicáveis com animação de abertura
- Diferentes tipos de carta
- Efeito typewriter ou escrita à mão

### 📅 Timeline do Relacionamento
- Linha do tempo interativa
- Marcos importantes com datas
- Scroll horizontal suave

## ⚙️ Non-Functional Requirements

- **Performance**: Carregamento < 3 segundos
- **Mobile-first**: Otimizado para dispositivos móveis
- **Acessibilidade**: Score > 90
- **Compatibilidade**: 95% dos browsers móveis
- **UX**: Tempo de permanência > 10 minutos

## 📚 Guidelines & Packages

### Stack Principal
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion (animações)
- GSAP (animações complexas)

### Bibliotecas Específicas
- SwiperJS (carrossel)
- React Howler (áudio)
- React Icons
- @headlessui/react

### Design System
```css
:root {
  --primary: #1a1a2e;
  --secondary: #16213e;
  --accent: #e94560;
  --gold: #f5d76e;
  --white: #ffffff;
  --glass: rgba(255, 255, 255, 0.1);
}
```

## 🔐 Threat Model (Stub)

- Otimização de imagens para evitar carregamento lento
- Validação de tipos de arquivo de mídia
- Sanitização de conteúdo de texto

## 🔢 Execution Plan

### Fase 1 - Setup e Estrutura Base
1. ✅ Configurar projeto Next.js com todas as dependências
2. ✅ Criar estrutura de pastas para assets (fotos/músicas)
3. ✅ Implementar design system e componentes base
4. ✅ Criar layout principal com navegação por seções

### Fase 2 - Funcionalidades Core  
5. ✅ Implementar player de música fixo com controles
6. ✅ Criar galeria de fotos interativa com carrossel
7. ✅ Desenvolver sistema de cartinhas com animações
8. ✅ Implementar timeline do relacionamento

### Fase 3 - Interatividade e Animações
9. ✅ Adicionar animações GSAP e Framer Motion
10. ✅ Implementar efeitos glassmorphism e parallax
11. ✅ Criar microinterações e hover effects
12. ✅ Otimizar para dispositivos móveis

### Fase 4 - Polish e Detalhes Finais
13. ✅ Adicionar easter eggs e elementos surpresa
14. ✅ Implementar lazy loading e otimizações
15. ✅ Testes finais e ajustes de UX

## 📝 Recursos Necessários

### Conteúdo que preciso do Richard:
- [ ] Fotos do casal para a galeria
- [ ] Lista de músicas significativas com arquivos MP3
- [ ] Textos das cartinhas/mensagens
- [ ] Datas e marcos importantes do relacionamento
- [ ] Preferências específicas de design ou elementos especiais
