# Guía de Configuración: Google Sheets para Formulario de Sorteo

Esta guía te ayudará a conectar el formulario del sorteo con Google Sheets para almacenar automáticamente las respuestas.

## 📋 Resumen

Hay **2 métodos** para conectar con Google Sheets:
1. **Google Apps Script (Recomendado)** - Más fácil, no requiere API key
2. **Google Sheets API** - Más directo, requiere API key

## 🚀 Método 1: Google Apps Script (Recomendado)

### Paso 1: Crear la Hoja de Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja
3. En la primera fila, añade estos encabezados:

```
A1: Fecha/Hora
B1: Nombre
C1: Email
D1: Acepta Términos
E1: Evento ID
F1: IP Address
```

4. Guarda la hoja con un nombre como "Sorteo LareiraConf 2026"

### Paso 2: Crear Google Apps Script

1. En tu hoja de Google Sheets, ve a **Extensiones > Apps Script**
2. Borra el código existente y pega este código:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSheet();

    // Obtener los datos del formulario
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const acceptTerms = e.parameter.acceptTerms || '';
    const eventId = e.parameter.eventId || '';
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    const ipAddress = e.parameter.ipAddress || 'N/A';

    // Añadir nueva fila con los datos
    sheet.appendRow([
      new Date(timestamp),
      name,
      email,
      acceptTerms,
      eventId,
      ipAddress
    ]);

    // Respuesta de éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Datos guardados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Guarda el proyecto con un nombre como "Formulario Sorteo"

### Paso 3: Desplegar el Web App

1. Haz clic en **Desplegar > Nueva implementación**
2. En "Tipo", selecciona **Aplicación web**
3. Configuración:
   - **Descripción**: "Formulario Sorteo LareiraConf"
   - **Ejecutar como**: "Yo (tu email)"
   - **Quién tiene acceso**: "Cualquier usuario"
4. Haz clic en **Desplegar**
5. **¡IMPORTANTE!** Copia la **URL de la aplicación web** que aparece

### Paso 4: Configurar Variables de Entorno

1. En tu proyecto React, crea un archivo `.env.local` (si no existe):

```bash
# Google Sheets Integration
REACT_APP_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

2. Reemplaza `TU_SCRIPT_ID` con la URL que copiaste en el paso anterior

### Paso 5: Probar la Integración

1. Reinicia tu servidor de desarrollo:
```bash
npm start
```

2. Ve a tu formulario de sorteo y envía un registro de prueba
3. Verifica que aparezca en tu hoja de Google Sheets

---

## 🔑 Método 2: Google Sheets API (Alternativo)

### Paso 1: Obtener API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**
4. Ve a **Credenciales > Crear credenciales > Clave de API**
5. Copia la API key

### Paso 2: Configurar la Hoja

1. Crea una hoja de Google Sheets como en el Método 1
2. Haz la hoja **pública** (Compartir > Cualquier persona con el enlace puede ver)
3. Copia el ID de la hoja desde la URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_AQUI/edit
```

### Paso 3: Variables de Entorno

```bash
# Google Sheets API Integration
REACT_APP_GOOGLE_SHEETS_ID=tu_sheet_id_aqui
REACT_APP_GOOGLE_SHEETS_NAME=Registros
REACT_APP_GOOGLE_SHEETS_API_KEY=tu_api_key_aqui
```

### Paso 4: Modificar el Código

En `src/pages/RafflePage/RafflePage.tsx`, cambia:

```typescript
// Cambiar esta línea:
await googleSheetsService.submitToSheet(submissionData);

// Por esta:
await googleSheetsService.submitToSheetViaAPI(submissionData);
```

---

## ✅ Verificación Final

Para verificar que todo funciona:

1. **Formulario**: Debería enviar sin errores
2. **Google Sheets**: Los datos deben aparecer en la hoja
3. **Consola del navegador**: No debería mostrar errores
4. **Cerillas**: Debería encenderse una nueva cerilla tras el envío exitoso

## 🔧 Solución de Problemas

### Error: "Google Sheets Web App URL not configured"
- Verifica que has añadido la variable `REACT_APP_GOOGLE_SHEETS_WEB_APP_URL` en `.env.local`
- Reinicia el servidor de desarrollo

### Los datos no aparecen en Google Sheets
- Verifica que el Google Apps Script esté desplegado correctamente
- Asegúrate de que los permisos estén configurados como "Cualquier usuario"
- Revisa la consola del navegador para errores

### Error CORS
- Esto es normal con Google Apps Script, el formulario debería funcionar igualmente
- Los datos se envían correctamente aunque no puedas leer la respuesta

## 📁 Estructura de Datos en Google Sheets

Cada registro en tu hoja contendrá:

| Fecha/Hora | Nombre | Email | Acepta Términos | Evento ID | IP Address |
|------------|--------|-------|-----------------|-----------|------------|
| 2025-10-13T18:30:00.000Z | Juan Pérez | juan@email.com | true | trg | 192.168.1.1 |

---

## 🚀 Próximos Pasos

Una vez configurado, puedes:
- Crear múltiples sorteos modificando `RAFFLE_CONFIGS` en `RafflePage.tsx`
- Añadir validaciones adicionales
- Implementar notificaciones por email
- Crear un panel de administración para ver los registros

¿Necesitas ayuda con algún paso? ¡Pregúntame!
