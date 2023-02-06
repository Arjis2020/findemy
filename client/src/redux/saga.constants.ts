// type ActionSet = {
//     [x: string]: string
// }

// function builder<T>(root: string, actionSet: ActionSet): T {
//     let modifiedActionSet: = {}
//     Object.keys(actionSet).forEach(key => {
//         modifiedActionSet[key as unknown as string] = root + actionSet[key]
//     })
//     return modifiedActionSet
// }

// root saga actions
const UserSagaRootAction = 'users/'
const CartSagaRootAction = 'cart/'
const CourseSagaRootAction = 'courses/'
const PurchaseSagaRootAction = 'purchases/'

// action sets
export const UserSagaActions = {
    TRIGGER_LOGIN: UserSagaRootAction + 'triggerLogin',
    TRIGGER_AUTHORIZE: UserSagaRootAction + 'triggerAuthorize',
    TRIGGER_LOGOUT: UserSagaRootAction + 'triggerLogout',
    TRIGGER_SIGNUP: UserSagaRootAction + 'triggerSignup'
}

export const CartSagaActions = {
    TRIGGER_ADD_TO_CART: CartSagaRootAction + 'triggerAddToCart',
    TRIGGER_GET_CART: CartSagaRootAction + 'triggerGetCart',
    TRIGGER_REMOVE_FROM_CART: CartSagaRootAction + 'triggerRemoveFromCart'
}

export const CourseSagaActions = {
    FETCH_COURSES: CourseSagaRootAction + 'fetchCourses'
}

export const PurchaseSagaActions = {
    PURCHASE_COURSES: PurchaseSagaRootAction + 'purchaseCourses'
}