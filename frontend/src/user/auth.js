import decode from 'jwt-decode'

const ID_TOKEN_KEY = 'id_token'

export function login () {
}

export function logout () {
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}
