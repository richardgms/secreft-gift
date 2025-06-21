---
id: plan-004
title: Atualização Tailwind CSS v4.1.10 e TypeScript 5.8.3
createdAt: 2025-06-21
author: Richard
status: draft
---

## 🧩 Scope

Atualizar o projeto secreft-gift das versões atuais (Tailwind CSS 3.4.17 e TypeScript 5.x) para as versões mais recentes oficiais disponíveis (Tailwind CSS 4.1.10 e TypeScript 5.8.3) para aproveitar as melhorias de performance, novos recursos e correções de bugs.

## ✅ Functional Requirements

- Atualizar Tailwind CSS de v3.4.17 para v4.1.10
- Atualizar TypeScript de v5.x para v5.8.3
- Migrar configuração do Tailwind para o novo formato CSS-first do v4
- Garantir compatibilidade com Next.js 15.3.4
- Manter todas as funcionalidades existentes do projeto
- Atualizar dependências relacionadas se necessário

## ⚙️ Non-Functional Requirements

- Performance: Aproveitar o engine 5x mais rápido do Tailwind v4
- Compatibilidade: Garantir suporte para Safari 16.4+, Chrome 111+, Firefox 128+
- Estabilidade: Manter a funcionalidade existente sem quebras
- Modernização: Usar recursos CSS modernos (cascade layers, @property, color-mix())

## 📚 Guidelines & Packages

- Seguir o guia oficial de upgrade do Tailwind CSS v4
- Usar a ferramenta automática de upgrade: `npx @tailwindcss/upgrade`
- Packages principais:
  - `tailwindcss@4.1.10` (Apache-2.0)
  - `@tailwindcss/postcss@4.1.10` (Apache-2.0)
  - `typescript@5.8.3` (Apache-2.0)
- Manter compatibilidade com React 19 e Next.js 15

## 🔐 Threat Model (Stub)

- Risco de breaking changes na migração do Tailwind v3 para v4
- Possível incompatibilidade de sintaxe CSS em browsers antigos
- Potencial quebra de componentes customizados
- Mudanças na configuração que podem afetar o build

## 🔢 Execution Plan

1. **Backup e Preparação**
   - Criar branch para a atualização
   - Fazer backup do projeto atual
   - Verificar compatibilidade do browser target

2. **Atualização do TypeScript**
   - Atualizar TypeScript para 5.8.3
   - Verificar e corrigir possíveis erros de tipos
   - Testar build e funcionalidades

3. **Atualização do Tailwind CSS**
   - Executar `npx @tailwindcss/upgrade` para migração automática
   - Instalar `tailwindcss@4.1.10` e `@tailwindcss/postcss`
   - Migrar `tailwind.config.js` para configuração CSS-first
   - Atualizar imports CSS (`@import "tailwindcss"`)

4. **Ajustes de Configuração**
   - Atualizar PostCSS config para usar `@tailwindcss/postcss`
   - Revisar e ajustar classes que mudaram (shadow-sm → shadow-xs, etc.)
   - Testar gradientes e cores (migração para OKLCH)

5. **Testes e Validação**
   - Executar build completo
   - Testar todas as páginas e componentes
   - Verificar responsividade e animações
   - Validar player de música e galeria

6. **Otimizações**
   - Aproveitar novos recursos do v4 (text shadows, mask utilities, etc.)
   - Implementar melhorias de performance
   - Documentar mudanças significativas
