---
id: plan-005
title: Personalização do Museu Flutuante para Ana Beatriz
createdAt: 2025-06-29
author: Nathan (via Assistant)
status: draft
---

## 🧩 Scope

Modificar o site "Museu Flutuante" existente (atualmente personalizado para Mayanne pelo Richard) para criar uma versão completamente personalizada para Ana Beatriz como presente do Nathan para ela. O site manterá toda a estrutura e funcionalidades atuais, mas será 100% personalizado com:

- Nome: Ana Beatriz
- Apelidos: Bia, amor, neguinha  
- Autor/Criador: Nathan
- Fotos: já estão organizadas nas pastas `/galeria` e `/love`
- 4 cartas personalizadas fornecidas pelo usuário

## ✅ Functional Requirements

- Substituir todas as referências "Mayanne" por "Ana Beatriz", "Bia", "amor" ou "neguinha" (variando para personalização natural)
- Substituir todas as referências "Richard" por "Nathan"
- Substituir apelido "branquela" e "May" pelos apelidos da Ana Beatriz
- Atualizar as 4 cartas de amor com o conteúdo fornecido pelo usuário
- Atualizar metadata (título, descrição, author) no layout
- Manter todas as funcionalidades existentes (galeria, carrossel, player de música, timeline, etc.)
- Utilizar as fotos já organizadas nas pastas corretas

## ⚙️ Non-Functional Requirements

- Performance: manter a mesma performance atual do site
- Responsividade: manter design responsivo existente  
- Acessibilidade: preservar recursos de acessibilidade atuais
- Compatibilidade: manter compatibilidade com navegadores

## 📚 Guidelines & Packages

- Manter arquitetura Next.js 15 existente
- Preservar sistema de animações com Framer Motion
- Manter sistema de estilização com Tailwind CSS
- Utilizar TypeScript para tipagem (estrutura atual)
- Manter sistema de componentes modulares existente

## 🔐 Threat Model (Stub)

- Validação de entrada: cartas de amor devem ser sanitizadas
- Proteção de assets: manter estrutura de pastas segura
- Privacy: garantir que dados pessoais ficam apenas no cliente

## 🔢 Execution Plan

### Fase 1: Análise e Mapeamento Completo
1. Identificar TODAS as ocorrências de:
   - "Mayanne" (nome principal)
   - "Richard" (autor/criador)
   - "branquela" (apelido específico da Mayanne)
   - "May" (apelido curto)
   - Qualquer outra personalização específica

### Fase 2: Personalização de Textos e Metadados
2. Atualizar `src/app/layout.tsx`:
   - Título: "Museu Flutuante 💕 | Para Ana Beatriz"
   - Description: mencionar Ana Beatriz
   - Author/creator: Nathan

3. Atualizar `src/app/page.tsx`:
   - Seção hero: substituir "Para a branquela mais especial do mundo" 
   - Nome principal: "Ana Beatriz" ou variações com apelidos
   - Footer: "Feito com muito amor pelo seu Nathan"
   - Descrição final: usar apelidos da Ana Beatriz

### Fase 3: Personalização das Cartas de Amor
4. Atualizar `src/lib/data.ts` - seção `loveLetters`:
   - Substituir conteúdo das 4 cartas existentes pelas fornecidas
   - Manter estrutura de envelope/cores/datas
   - Ajustar títulos se necessário

5. Atualizar `src/components/sections/Letters.tsx`:
   - Assinatura das cartas: "Nathan 💕" ao invés de "Richard 💕"

### Fase 4: Personalização da Navegação e Componentes
6. Atualizar `src/components/sections/Navigation.tsx`:
   - Título da seção home: trocar "Mayanne" por "Bia" ou "Ana Beatriz"

7. Verificar `src/components/ui/EasterEggs.tsx`:
   - Ajustar mensagens que mencionam "Richard"

### Fase 5: Personalização de Dados Específicos
8. Revisar `src/lib/data.ts` completamente:
   - Descrições das fotos no carousel
   - Timeline de eventos (se houver referências pessoais)
   - Frases românticas que podem precisar de ajuste
   - Legendas das fotos da galeria

### Fase 6: Verificação e Refinamento
9. Fazer busca final por qualquer referência perdida
10. Testar todas as funcionalidades
11. Verificar se a personalização ficou natural e variada (usando diferentes apelidos)
12. Ajustar detalhes finais conforme necessário

### Fase 7: Validação das Fotos
13. Confirmar que as fotos em `/galeria` e `/love` estão sendo referenciadas corretamente
14. Verificar se todas as imagens carregam adequadamente
15. Ajustar legendas/descrições se necessário

**Observações Importantes:**
- Usar variação natural dos nomes/apelidos (Ana Beatriz, Bia, amor, neguinha) para parecer mais orgânico
- Manter o tom romântico e carinhoso do site original
- Preservar toda a estrutura técnica e funcionalidades existentes
- As 4 cartas fornecidas já estão prontas para substituição direta
