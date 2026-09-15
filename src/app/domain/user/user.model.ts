// Entidades de dominio de autenticación. Mismos campos que UsuarioDTO /
// SesionDTO del backend (dominio/modelo/Usuario.ts, aplicacion/casos-uso/IniciarSesion.ts).
export interface User {
  id: string;
  nombre: string;
  correo: string;
  creadoEn: string; // llega como ISO string por HTTP; se formatea donde se muestre
}

export interface RegisterData {
  nombre: string;
  correo: string;
  clave: string;
}

export interface LoginData {
  correo: string;
  clave: string;
}

export interface AuthSession {
  token: string;
  usuario: User;
}
