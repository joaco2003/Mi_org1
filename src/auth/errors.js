// Firebase devuelve códigos técnicos ("auth/invalid-credential"). Acá los pasamos a
// mensajes que entiende cualquiera. Un valor '' significa "no mostrar nada".
const WRONG_LOGIN = 'El email o la contraseña no son correctos.'

const MESSAGES = {
  'auth/invalid-credential': WRONG_LOGIN,
  'auth/wrong-password': WRONG_LOGIN,
  'auth/user-not-found': WRONG_LOGIN,
  'auth/invalid-email': 'Ese email no parece válido.',
  'auth/missing-email': 'Escribí tu email.',
  'auth/missing-password': 'Escribí tu contraseña.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email. Probá iniciar sesión.',
  'auth/weak-password': 'La contraseña es muy corta: usá al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos y probá de nuevo.',
  'auth/network-request-failed': 'No hay conexión. Revisá tu internet y probá de nuevo.',
  'auth/user-disabled': 'Esta cuenta fue deshabilitada.',
  'auth/popup-blocked':
    'El navegador bloqueó la ventana de Google. Permití las ventanas emergentes y probá de nuevo.',
  'auth/popup-closed-by-user': '',
  'auth/cancelled-popup-request': '',
  'auth/operation-not-allowed':
    'Ese método de ingreso no está activado en Firebase (Authentication → Método de acceso).',
  'auth/unauthorized-domain':
    'Este dominio no está autorizado en Firebase (Authentication → Configuración → Dominios autorizados).',
  'auth/invalid-api-key': 'Las claves de Firebase del archivo .env no son válidas.',
}

export function authErrorMessage(error) {
  const code = error && error.code
  if (code && code in MESSAGES) return MESSAGES[code]
  return 'Ocurrió un error inesperado. Probá de nuevo.'
}