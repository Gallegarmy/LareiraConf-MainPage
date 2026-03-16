# Sistema de confirmación de asistencia

Permite registrar en Google Sheets quién ha confirmado asistencia al evento mediante un enlace personalizado.

## Flujo

```
Email con enlace
  → GET /api/confirmar?nombre=XXX&email=XXX
    → Escribe en Google Sheets (evita duplicados)
      → Redirect a /confirmado?status=ok
```

---

## 1. Credenciales OAuth

Reutiliza las mismas credenciales OAuth que ya tienes configuradas para el sistema de sorteos (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`). No hace falta crear nada nuevo en Google Cloud.

---

## 2. Crear y configurar el Google Sheet

1. Crea una hoja de cálculo en Google Drive.
2. En la primera pestaña (o crea una llamada **Confirmaciones**), añade esta cabecera en la fila 1:

   | A       | B     | C     | D    |
   |---------|-------|-------|------|
   | Nombre  | Email | Fecha | Hora |

3. Copia el **ID del Sheet** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```
   → `GOOGLE_SHEET_ID`

4. Comparte la hoja con la cuenta de Google que generó el `GOOGLE_REFRESH_TOKEN`:
   - Botón **Compartir** → pega ese email → rol **Editor** → Enviar.
   - Si la hoja ya pertenece a esa cuenta, no hace falta hacer nada.

---

## 3. Variables de entorno

Las credenciales OAuth (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`) ya las tienes del sistema de sorteos. Solo añade la ID de la nueva hoja:

```env
# Ya existentes (sorteos) — no tocar
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...

# Nueva — hoja de confirmaciones de asistencia
GOOGLE_CONFIRMATION_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

---

## 4. Enlace para el email

El enlace que debes incluir en el email es:

```
https://TUDOMINIO.com/api/confirmar?nombre=NOMBRE&email=EMAIL
```

Sustituye `NOMBRE` y `EMAIL` con los datos del destinatario (o usa los merge tags de tu herramienta de envío masivo).

Ejemplo real:
```
https://lareiraconf.com/api/confirmar?nombre=Ana+García&email=ana@ejemplo.com
```

---

## 5. Estados de la página /confirmado

| `?status=`      | Cuándo se muestra                                  |
|-----------------|----------------------------------------------------|
| `ok`            | Confirmación registrada con éxito                 |
| `ya_confirmado` | El email ya estaba en el Sheet (duplicado evitado)|
| `error`         | Fallo del servidor o parámetros faltantes          |

---

## 6. Verificar en local

```bash
npm run dev
# En otro terminal:
curl "http://localhost:4321/api/confirmar?nombre=Test&email=test@test.com"
# Debe redirigir a /confirmado?status=ok
```

Comprueba que aparece una nueva fila en el Sheet.
