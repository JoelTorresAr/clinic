import store from '../store/'
export default function auth({ next, router }) {
    var password = store.getters.GET_PASSWORD;
    if (password) {
        return next();
    } else {
        return router.push({ name: "Auth" });
    }
}