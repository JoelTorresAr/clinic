import store from '../store/'
export default function guest({ next, router }) {
    var password = store.getters.GET_PASSWORD;
    if (password) {
        return router.push({ name: "Home" });
    } else {
        return next();
    }
}