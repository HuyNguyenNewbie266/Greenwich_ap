/**
 * Swagger Auto-Authorization Script
 * Automatically captures and applies JWT tokens from login responses
 */

export const swaggerAutoAuthScript = `
  // Auto-authorization interceptor for login endpoint
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Store original fetch
      const originalFetch = window.fetch;
      
      // Override fetch to intercept responses
      window.fetch = function(...args) {
        return originalFetch.apply(this, args)
          .then(async (response) => {
            // Clone response to read body
            const clonedResponse = response.clone();
            
            // Check if this is a login endpoint
            const url = args[0];
            if (typeof url === 'string' && (url.includes('/auth/login') || url.includes('/login'))) {
              try {
                const data = await clonedResponse.json();
                
                // Check if response contains accessToken
                if (data && data.accessToken) {
                  console.log('🔐 Access token detected, auto-authorizing Swagger...');
                  
                  // Get Swagger UI instance
                  const ui = window.ui;
                  if (ui) {
                    // Set the authorization
                    ui.authActions.authorize({
                      'access-token': {
                        name: 'access-token',
                        schema: {
                          type: 'http',
                          scheme: 'bearer'
                        },
                        value: data.accessToken
                      }
                    });
                    
                    // Show success message
                    console.log('✅ Swagger authorized successfully!');
                    
                    // Show a toast notification
                    const toast = document.createElement('div');
                    toast.innerHTML = '✅ Auto-authorized with access token';
                    toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#4caf50;color:white;padding:15px 20px;border-radius:5px;z-index:9999;box-shadow:0 2px 5px rgba(0,0,0,0.2);font-family:sans-serif;';
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 3000);
                  }
                }
              } catch (e) {
                // Ignore JSON parse errors
                console.log('Response is not JSON or parsing failed');
              }
            }
            
            return response;
          });
      };
      
      console.log('🚀 Swagger auto-authorization interceptor initialized');
    }, 1000);
  });
`;
