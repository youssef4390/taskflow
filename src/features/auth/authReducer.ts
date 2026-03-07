export interface User{
    id: string;
    email: string;
    name: string;
}//ceci est la définition de l'interface User qui représente un utilisateur avec un id, un email et un nom


export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}//ceci est la définition de l'interface User 
// qui représente un utilisateur avec un id, un email et un nom, 
// et de l'interface AuthState qui représente l'état 
// de l'authentification avec un utilisateur, un indicateur de chargement et un message d'erreur

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };//ceci est la définition du type AuthAction qui représente les différentes actions possibles pour l'authentification, 
// avec des types d'action pour le début de la connexion, la réussite de la connexion, l'échec de la connexion et la déconnexion par exemple içi lorsque l'utilisateur clique sur le bouton de connexion, 
// une action de type LOGIN_START est dispatchée pour indiquer que la connexion est en cours

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};//ceci est la définition de l'état initial de l'authentification avec un utilisateur null, 
// un indicateur de chargement à false et un message d'erreur null

export function authReducer(state: AuthState, action: AuthAction): AuthState {
 switch (action.type) { 
    case 'LOGIN_START':
      return { user: null, loading: true, error: null }; 
    case 'LOGIN_SUCCESS': 
      return { user: action.payload, loading: false, error: null }; 
    case 'LOGIN_FAILURE': 
      return { user: null, loading: false, error: action.payload }; 
    case 'LOGOUT': 
      return initialState; 
    default: 
      return state; 
  } 
}//ceci est la définition de la fonction authReducer qui prend l'état actuel de l'authentification et une action, et retourne le nouvel état en fonction du type de l'action, 
// en utilisant un switch pour gérer les différents types d'action et mettre à jour l'état en conséquence, 
// par exemple lorsque l'action de type LOGIN_SUCCESS est dispatchée, 
// le reducer met à jour l'état pour stocker les informations de l'utilisateur connecté et indiquer que la connexion n'est plus en cours