import http.server
import socketserver
import os
import sys

# Default port
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Extract the path without query parameters or fragments
        path = self.path.split('?')[0].split('#')[0]
        
        # If path doesn't have an extension and isn't a directory, try adding .html
        if not os.path.splitext(path)[1] and not path.endswith('/'):
            # The literal file path check
            local_path = path[1:] + '.html'
            if os.path.exists(os.path.join(DIRECTORY, local_path)):
                self.path = path + '.html' + self.path[len(path):]
                
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def log_message(self, format, *args):
        # Cleaner logging
        sys.stdout.write(f"[INFO] {self.address_string()} - {format%args}\n")

# Use a custom class to set allow_reuse_address to True
# This prevents the frustrating "Address already in use" error if changing code rapidly
class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    try:
        # Create server instance
        with ReusableTCPServer(("", PORT), ExtensionlessHandler) as httpd:
            print("=" * 45)
            print(" 🎂 Be'Loved Bakery Local Server 🎂")
            print("=" * 45)
            print(f" Directory:        {DIRECTORY}")
            print(f" URL:              http://localhost:{PORT}")
            print(" Extensionless URL routing enabled!")
            print("=" * 45)
            print("Press Ctrl+C to stop the server.")
            print("Starting...\n")
            
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 98 or e.errno == 10048: # Address already in use
            print(f"\n[ERROR] Port {PORT} is already in use by another program.")
            print("        Please wait a second, close the other server, or change PORT.\n")
        else:
            print(f"\n[ERROR] Failed to start server: {e}\n")
    except KeyboardInterrupt:
        print("\n\n[INFO] Keyboard interrupt received. Shutting down gracefully...")
    finally:
        print("[INFO] Server stopped.")
