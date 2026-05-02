// ===== SERVICE WORKER - Funcionalidades Offline =====

const CACHE_NAME = 'footballpro-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache criado');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.log('Erro ao criar cache:', error);
            })
    );
    
    // Força ativação imediata
    self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker ativando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Toma controle de clientes imediatamente
    return self.clients.claim();
});

// Interceptar requisições (Estratégia: Network first, Cache fallback)
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorar requisições não-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Requisições para APIs externas: Network first
    if (url.hostname.includes('api-football') || 
        url.hostname.includes('football-data') ||
        url.hostname.includes('googleapis') ||
        url.hostname.includes('rapidapi')) {
        
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache da resposta se sucesso
                    if (response.status === 200) {
                        const cacheCopy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, cacheCopy);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Retorna versão em cache se offline
                    return caches.match(request)
                        .then((cached) => cached || cacheNotFound());
                })
        );
        return;
    }
    
    // Recursos locais: Cache first
    event.respondWith(
        caches.match(request)
            .then((response) => {
                if (response) {
                    return response;
                }
                
                return fetch(request)
                    .then((response) => {
                        // Cache nova resposta
                        if (response.status === 200) {
                            const cacheCopy = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, cacheCopy);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        return cacheNotFound();
                    });
            })
    );
});

// Resposta customizada para recursos não encontrados
function cacheNotFound() {
    return new Response(
        `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Offline - FootballPro</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #1abc9c 0%, #2ecc71 100%);
                        color: white;
                    }
                    .container {
                        text-align: center;
                        padding: 20px;
                    }
                    h1 { font-size: 3em; margin: 0; }
                    p { font-size: 1.2em; margin: 10px 0; }
                    .icon { font-size: 4em; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="icon">📱</div>
                    <h1>FootballPro Offline</h1>
                    <p>Você está offline, mas o app continua acessível!</p>
                    <p>Volte online para atualizar os dados.</p>
                </div>
            </body>
        </html>`,
        {
            headers: { 'Content-Type': 'text/html' },
            status: 503,
            statusText: 'Service Unavailable'
        }
    );
}

// ===== PUSH NOTIFICATIONS (Opcional) =====

// Receber notificação push
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação FootballPro',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%231abc9c" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="white" text-anchor="middle" dy=".3em">⚽</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="96" fill="%231abc9c"/><text x="50%" y="50%" font-size="100" fill="white" text-anchor="middle" dy=".35em">⚽</text></svg>',
        tag: 'football-notification',
        requireInteraction: false,
        actions: [
            {
                action: 'open',
                title: 'Abrir FootballPro'
            },
            {
                action: 'close',
                title: 'Fechar'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('FootballPro', options)
    );
});

// Clique em notificação push
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'close') {
        return;
    }
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Procura janela aberta
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Abre nova janela
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// Fechar notificação
self.addEventListener('notificationclose', (event) => {
    console.log('Notificação fechada');
});

// ===== SINCRONIZAÇÃO EM BACKGROUND =====

// Quando volta online, sincroniza dados
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-placares') {
        event.waitUntil(
            fetch('/script.js?sync=true')
                .then(() => {
                    // Notificar sucesso
                    self.registration.showNotification('FootballPro', {
                        body: '✅ Dados sincronizados com sucesso!',
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%231abc9c" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="white" text-anchor="middle" dy=".3em">⚽</text></svg>'
                    });
                })
                .catch(() => {
                    console.log('Erro ao sincronizar');
                })
        );
    }
});

// ===== PERIODIC BACKGROUND SYNC (Atualizar dados periodicamente) =====

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-placares') {
        event.waitUntil(
            fetch('/api/placares')
                .then((response) => response.json())
                .then((data) => {
                    // Notificar se houver novos resultados
                    if (data.novos > 0) {
                        self.registration.showNotification('FootballPro', {
                            body: `⚽ ${data.novos} novo(s) resultado(s)!`,
                            tag: 'new-results',
                            requireInteraction: true
                        });
                    }
                })
                .catch((err) => console.log('Erro ao sincronizar:', err))
        );
    }
});

console.log('Service Worker carregado com sucesso!');
