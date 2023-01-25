export const BASE_URL = 'http://localhost:9000'

const ROUTE_USERS = '/users'
export const URL_LOGIN = ROUTE_USERS + '/login'
export const URL_AUTHORIZE = ROUTE_USERS + '/authorize'
export const URL_LOGOUT = ROUTE_USERS + '/logout'
export const URL_SIGNUP = ROUTE_USERS + '/signup'

const ROUTE_COURSES = '/courses'
export const URL_ALL_COURSES = ROUTE_COURSES + '/all'
export const URL_COURSE_BY_SLUG = ROUTE_COURSES + '/'
export const URL_SEARCH_COURSE = ROUTE_COURSES + '/'

const ROUTE_CART = '/cart'
export const URL_ADD_TO_CART = ROUTE_CART + '/add'
export const URL_CART_COURSES = ROUTE_CART + '/'
export const URL_REMOVE_FROM_CART = ROUTE_CART + '/remove'

const ROUTE_PAYMENT = '/payments'
export const URL_CREATE_ORDER = ROUTE_PAYMENT + '/createOrder'
export const URL_VERIFY_ORDER = ROUTE_PAYMENT + '/verifyOrder'