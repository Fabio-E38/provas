# 1. Trova il processo sulla porta 4200
netstat -ano | findstr :4200

# Output esempio: TCP  0.0.0.0:4200  0.0.0.0:0  LISTENING  12345
#                                                            ↑ Questo è il PID

# 2. Termina il processo (sostituisci 12345 con il PID che trovi)
taskkill /PID 12345 /F