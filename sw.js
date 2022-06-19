self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.text() : 'no payload';
  
    // Keep the service worker alive until the notification is created.
    event.waitUntil(
      // Show a notification with title 'ServiceWorker Cookbook' and use the payload
      // as the body.
      self.registration.showNotification('Push通知を実装してみる', {
        body: payload,
      })
    );
  });