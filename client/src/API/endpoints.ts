export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000'

const ROUTE_USERS = '/users'
export const URL_LOGIN = ROUTE_USERS + '/login'
export const URL_AUTHORIZE = ROUTE_USERS + '/authorize'
export const URL_LOGOUT = ROUTE_USERS + '/logout'
export const URL_SIGNUP = ROUTE_USERS + '/signup'
export const URL_FORGOT_PASSWORD = ROUTE_USERS + '/forgotPassword'
export const URL_RESET_PASSWORD = ROUTE_USERS + '/resetPassword'

const ROUTE_COURSES = '/courses'
export const URL_ALL_COURSES = ROUTE_COURSES + '/all'
export const URL_COURSE_BY_SLUG = ROUTE_COURSES + '/'
export const URL_SEARCH_COURSE = ROUTE_COURSES + '/'
export const URL_SEARCH_COURSE_BY_CATEGORY = ROUTE_COURSES + '/topic'

const ROUTE_CART = '/cart'
export const URL_ADD_TO_CART = ROUTE_CART + '/add'
export const URL_CART_COURSES = ROUTE_CART + '/'
export const URL_REMOVE_FROM_CART = ROUTE_CART + '/remove'

const ROUTE_PAYMENT = '/payments'
export const URL_CREATE_ORDER = ROUTE_PAYMENT + '/createOrder'
export const URL_VERIFY_ORDER = ROUTE_PAYMENT + '/verifyOrder'
export const URL_VERIFY_VPA = ROUTE_PAYMENT + '/verifyVpa'
export const URL_GENERTE_QR = ROUTE_PAYMENT + '/generateQR'
export const URL_GET_PAYMENT_METHODS = ROUTE_PAYMENT + '/paymentMethods'

const ROUTE_PURCHASE = '/purchases'
export const URL_PURCHASE_COURSES = ROUTE_PURCHASE + '/purchase'
export const URL_GET_PURCHASES = ROUTE_PURCHASE + '/'

const ROUTE_CATEGORY = '/categories'
export const URL_GET_GROUPED_CATEGORIES = ROUTE_CATEGORY + '/getGroupedCategories'