# 🔍 Guia Completo do Sentry

Este guia te ensina como usar o Sentry no seu projeto Next.js para monitoramento de erros, performance e user experience.

## 📋 Índice

1. [O que é o Sentry?](#o-que-é-o-sentry)
2. [Configuração Atual](#configuração-atual)
3. [Como Usar](#como-usar)
4. [Funcionalidades Disponíveis](#funcionalidades-disponíveis)
5. [Exemplos Práticos](#exemplos-práticos)
6. [Dashboard e Monitoramento](#dashboard-e-monitoramento)
7. [Boas Práticas](#boas-práticas)

## 🎯 O que é o Sentry?

O Sentry é uma plataforma de monitoramento de aplicações que ajuda você a:

- **Capturar erros** automaticamente
- **Monitorar performance** da aplicação
- **Rastrear user experience** com Session Replay
- **Receber alertas** quando algo dá errado
- **Debugar problemas** com contexto detalhado

## ⚙️ Configuração Atual

Seu projeto já está **100% configurado** com:

✅ **Sentry instalado** (`@sentry/nextjs`)  
✅ **Configuração do cliente** (`src/instrumentation-client.ts`)  
✅ **Configuração do servidor** (`sentry.server.config.ts`)  
✅ **Configuração do edge** (`sentry.edge.config.ts`)  
✅ **Instrumentação automática** (`src/instrumentation.ts`)  
✅ **Integração com Next.js** (`next.config.ts`)  
✅ **Session Replay habilitado**  
✅ **Utilitários personalizados** (`src/lib/sentry-utils.ts`)  

### Arquivos de Configuração

```
├── sentry.server.config.ts      # Configuração do servidor
├── sentry.edge.config.ts        # Configuração do edge runtime
├── src/
│   ├── instrumentation.ts       # Instrumentação automática
│   ├── instrumentation-client.ts # Configuração do cliente
│   └── lib/
│       └── sentry-utils.ts      # Utilitários personalizados
```

## 🚀 Como Usar

### 1. Testar a Configuração

Acesse: `http://localhost:3000/sentry-test`

Esta página tem botões para testar todas as funcionalidades do Sentry.

### 2. Capturar Erros Manualmente

```typescript
import { captureError } from '@/lib/sentry-utils';

try {
  // seu código
} catch (error) {
  captureError(error, {
    component: 'MeuComponente',
    action: 'minhaFuncao',
    userId: '12345'
  });
}
```

### 3. Enviar Mensagens Personalizadas

```typescript
import { captureMessage } from '@/lib/sentry-utils';

captureMessage('Usuário fez login com sucesso', 'info');
captureMessage('Pagamento processado', 'info');
captureMessage('Tentativa suspeita de acesso', 'warning');
```

### 4. Adicionar Breadcrumbs (Rastros)

```typescript
import { addBreadcrumb } from '@/lib/sentry-utils';

addBreadcrumb('Usuário clicou no botão de compra', 'user.action');
addBreadcrumb('API chamada iniciada', 'api.request');
```

### 5. Definir Informações do Usuário

```typescript
import { setUser } from '@/lib/sentry-utils';

setUser({
  id: '12345',
  email: 'usuario@exemplo.com',
  username: 'joao',
  subscription: 'premium'
});
```

## 🛠️ Funcionalidades Disponíveis

### 🚨 Error Tracking
- Captura automática de erros JavaScript
- Stack traces detalhados
- Contexto do navegador
- Informações do usuário

### 📊 Performance Monitoring
- Tempos de carregamento de páginas
- Performance de APIs
- Transações customizadas
- Métricas de Core Web Vitals

### 🎥 Session Replay
- Gravação de sessões dos usuários
- Replay de erros em tempo real
- Masking automático de informações sensíveis

### 🍞 Breadcrumbs
- Rastro de ações do usuário
- Logs de APIs
- Navegação entre páginas
- Interações com elementos

## 💡 Exemplos Práticos

### Monitorar Formulários

```typescript
import { captureError, addBreadcrumb } from '@/lib/sentry-utils';

const handleSubmit = async (formData) => {
  addBreadcrumb('Formulário enviado', 'form.submit');
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
  } catch (error) {
    captureError(error, {
      formData: formData,
      endpoint: '/api/submit',
      userAgent: navigator.userAgent
    });
  }
};
```

### Monitorar APIs

```typescript
import { SentryExamples } from '@/lib/sentry-utils';

const fetchData = async () => {
  try {
    const response = await SentryExamples.monitorApiCall('/api/users');
    return response.json();
  } catch (error) {
    console.error('Erro na API:', error);
  }
};
```

### Rastrear Ações do Usuário

```typescript
import { SentryExamples } from '@/lib/sentry-utils';

const handleButtonClick = (buttonName) => {
  SentryExamples.trackUserAction('button_click', {
    buttonName,
    page: window.location.pathname,
    timestamp: Date.now()
  });
};
```

### Wrapper de Função com Captura Automática

```typescript
import { withSentryCapture } from '@/lib/sentry-utils';

const minhaFuncaoRiscoosa = withSentryCapture(
  async (dados) => {
    // código que pode dar erro
    return await processarDados(dados);
  },
  {
    transactionName: 'ProcessarDados',
    tags: { feature: 'data-processing' },
    context: { version: '1.0.0' }
  }
);
```

## 📊 Dashboard e Monitoramento

### Acessar o Dashboard
1. Acesse: https://richard-y6.sentry.io
2. Login com suas credenciais
3. Selecione o projeto "javascript-nextjs"

### Seções Importantes

#### 🐛 Issues
- **Localização**: Sidebar > Issues
- **O que ver**: Todos os erros capturados
- **Informações**: Stack trace, breadcrumbs, contexto do usuário

#### 📈 Performance
- **Localização**: Sidebar > Performance
- **O que ver**: Transações, tempos de resposta, throughput
- **Métricas**: LCP, FID, CLS (Core Web Vitals)

#### 🎥 Replays
- **Localização**: Sidebar > Replays
- **O que ver**: Gravações de sessões dos usuários
- **Filtros**: Por erro, por usuário, por página

#### 🏷️ Releases
- **Localização**: Sidebar > Releases
- **O que ver**: Versões deployadas, mudanças entre versões

### Configurar Alertas

1. Vá para **Settings > Alerts**
2. Crie regras como:
   - "Mais de 10 erros em 5 minutos"
   - "Performance degradou mais de 20%"
   - "Novo tipo de erro apareceu"

## ✨ Boas Práticas

### 🔐 Segurança
- ✅ Nunca capturar senhas ou informações sensíveis
- ✅ Usar masking automático do Session Replay
- ✅ Configurar data scrubbing nas configurações

### 📊 Performance
- ✅ Ajustar sample rates em produção:
  ```typescript
  tracesSampleRate: 0.1, // 10% em produção
  replaysSessionSampleRate: 0.1, // 10% em produção
  ```

### 🏷️ Organização
- ✅ Usar tags consistentes:
  ```typescript
  setTag('feature', 'checkout');
  setTag('version', '2.1.0');
  setTag('environment', 'production');
  ```

### 🍞 Breadcrumbs Úteis
- ✅ Ações importantes do usuário
- ✅ Chamadas de API
- ✅ Mudanças de estado
- ✅ Navegação entre páginas

### 👤 Contexto do Usuário
- ✅ ID do usuário (sem informações pessoais)
- ✅ Papel/permissões
- ✅ Plano de assinatura
- ✅ Configurações relevantes

## 🎯 Próximos Passos

1. **Teste todas as funcionalidades** acessando `/sentry-test`
2. **Configure alertas** no dashboard do Sentry
3. **Integre em seus componentes** usando os utilitários
4. **Monitore regularly** o dashboard para identificar problemas
5. **Ajuste sample rates** quando for para produção

## 🆘 Suporte

- **Documentação oficial**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Troubleshooting**: https://docs.sentry.io/platforms/javascript/guides/nextjs/troubleshooting/
- **Discord da comunidade**: https://discord.gg/sentry

---

**🎉 Pronto! Agora você tem um sistema completo de monitoramento configurado!**

Para testar: `http://localhost:3000/sentry-test`  
Dashboard: https://richard-y6.sentry.io 