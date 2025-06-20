import * as Sentry from '@sentry/nextjs';

// Utilitários para facilitar o uso do Sentry

/**
 * Captura um erro customizado com contexto adicional
 */
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
    }
    Sentry.captureException(error);
  });
}

/**
 * Captura uma mensagem personalizada
 */
export function captureMessage(message: string, level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Inicia uma transação personalizada para medir performance
 */
export function startTransaction(name: string, op: string) {
  return Sentry.startSpan({ name, op }, () => {});
}

/**
 * Adiciona breadcrumb personalizado
 */
export function addBreadcrumb(message: string, category?: string, level?: Sentry.SeverityLevel) {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    level: level || 'info',
    timestamp: Date.now() / 1000,
  });
}

/**
 * Define informações do usuário
 */
export function setUser(user: { id?: string; email?: string; username?: string; [key: string]: any }) {
  Sentry.setUser(user);
}

/**
 * Define tags personalizadas
 */
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

/**
 * Define contexto adicional
 */
export function setContext(key: string, context: Record<string, any>) {
  Sentry.setContext(key, context);
}

/**
 * Wrapper para funções async com captura automática de erros
 */
export function withSentryCapture<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: { 
    context?: Record<string, any>; 
    tags?: Record<string, string>;
    transactionName?: string;
  }
): T {
  return (async (...args: any[]) => {
    return Sentry.withScope(async (scope) => {
      if (options?.tags) {
        Object.entries(options.tags).forEach(([key, value]) => {
          scope.setTag(key, value);
        });
      }
      
      if (options?.context) {
        Object.entries(options.context).forEach(([key, value]) => {
          scope.setContext(key, value);
        });
      }

      try {
        if (options?.transactionName) {
          return await Sentry.startSpan(
            { name: options.transactionName, op: 'function' },
            () => fn(...args)
          );
        }
        return await fn(...args);
      } catch (error) {
        Sentry.captureException(error);
        throw error;
      }
    });
  }) as T;
}

/**
 * Hook para componentes React
 */
export function useSentryUser(user: { id?: string; email?: string; username?: string; [key: string]: any }) {
  Sentry.setUser(user);
}

// Utilitários práticos para uso no projeto
export const SentryHelpers = {
  // Capturar erro em formulário
  handleFormError: (error: Error, formData: Record<string, any>) => {
    captureError(error, { formData, timestamp: new Date().toISOString() });
  },

  // Monitorar chamadas de API
  monitorApiCall: async (url: string, options?: RequestInit) => {
    return Sentry.startSpan(
      { name: `API ${url}`, op: 'http.client' },
      async () => {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response;
        } catch (error) {
          Sentry.captureException(error);
          throw error;
        }
      }
    );
  },

  // Rastrear ações do usuário
  trackUserAction: (action: string, details?: Record<string, any>) => {
    addBreadcrumb(`User ${action}`, 'user.action');
    if (details) {
      setContext('user.action', { action, ...details });
    }
  },
}; 