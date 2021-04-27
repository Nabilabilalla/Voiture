// data
const products = [
    { id: 1, description: "Jaune", price: 200, img: 'https://i.pinimg.com/originals/41/6d/aa/416daa9a1b31ad164c8c2a99f9961125.jpg' },
    { id: 2, description: 'Blanche', price: 20, img: 'https://i.pinimg.com/originals/9b/89/da/9b89da2977f938acc7e1e7368d66c604.jpg' },
    { id: 3, description: 'Noir', price: 5, img: 'https://i.pinimg.com/originals/60/d9/0e/60d90e62664458c1be0cda2910640602.jpg' },
    { id: 4, description: 'Rouge', price: 8, img: 'https://media.istockphoto.com/photos/ferrari-laferrari-picture-id503407231?k=6&m=503407231&s=612x612&w=0&h=Nh-scnjpLgPr9AJjTRL-NpkaHeOvkLvP5jl-9EeW3iw=' },
    { id: 5, description: 'Gris', price: 3, img: 'https://media.istockphoto.com/photos/silver-sports-car-on-a-red-background-picture-id170450727?k=6&m=170450727&s=612x612&w=0&h=5Z5wQL-9K-2BfoPAfWHvaYhFmSWsexl5cKhrQJFVWHc=' },
    { id: 6, description: 'Noir', price: 65, img: 'https://i.pinimg.com/736x/b0/ae/6e/b0ae6e2265b74850d99a48a2bbcc20c4.jpg' },
    { id: 7, description: 'Blanche', price: 25, img: 'https://media.istockphoto.com/photos/front-view-of-a-sports-car-picture-id147461273?k=6&m=147461273&s=612x612&w=0&h=681TI7v7VCFrlNt9HfLNxsDOUyRyD8_f4MVlo4Y64pY=' },
    { id: 8, description: 'Orange', price: 28, img: 'https://pixnio.com/free-images/2017/03/28/2017-03-28-16-57-06-725x408.jpg' },
    { id: 9, description: 'Blanche', price: 4, img: 'https://thumbs.dreamstime.com/b/vue-de-face-blanche-de-luxe-de-voiture-de-sport-31379248.jpg' },
    { id: 10, description: 'Bleu', price: 29, img: 'https://media.istockphoto.com/photos/racecar-in-mountains-picture-id182176602?k=6&m=182176602&s=170667a&w=0&h=N1EbLFCBjKM3kyLBVYIAZgeZTINUaxhb0oGmxWOydUg=' },
    { id: 11, description: 'vert', price: 87, img: 'https://besthqwallpapers.com/Uploads/2-12-2018/73114/thumb2-2020-mercedes-amg-gt-r-green-supercar-front-view-green-coupe.jpg' },
    { id: 12, description: 'Jaune', price: 6, img: 'https://media.istockphoto.com/photos/car-from-late-1950s-or-early-1960s-picture-id179296629?k=6&m=179296629&s=170667a&w=0&h=Z0QA9S2ykFaN_tyVa91HeFehTw2mXxtVv2VADgDJFMo=' },
    { id: 13, description: 'Rose', price: 29, img: 'https://1.bp.blogspot.com/-IctDv-3yD_4/Tpn1O2lMZeI/AAAAAAAAB-A/Ash_NZhq1FE/s1600/Ferrari_Enzo_pink.jpg' },
    { id: 14, description: 'Noir', price: 87, img: 'https://st.depositphotos.com/1121376/1415/i/950/depositphotos_14154191-stock-photo-vintage-car.jpg' },
    { id: 15, description: 'Bleu', price: 6, img: 'https://media.istockphoto.com/photos/auto-car-1955-ford-fairlane-picture-id183241545?k=6&m=183241545&s=170667a&w=0&h=nKr359co9bt4lIlws4oIsaESRnZ5WQNm4SA3bGYrbdA=' },
];

const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '',
            liked: [],
            cart: []
        }
    },
    computed: {
        filteredList() {
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
        cartTotalAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price)
            }
            return total;
        },
        itemTotalAmount() {
            let itemTotal = 0;
            for (let item in this.cart) {
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },
    methods: {
        setLikeCookie() {
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },
        addToCart(product) {
            // check if already in array
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1;
        },
        cartMinusOne(product, id) {
            if (product.quantity == 1) {
                this.cartRemoveItem(id);
            } else {
                product.quantity = product.quantity - 1;
            }
        },
        cartRemoveItem(id) {
            this.$delete(this.cart, id)
        }
    },
    mounted: () => {
        this.getLikeCookie;
    }
}
const UserSettings = {
    template: '<h1>Profil 👤</h1>',
    name: 'UserSettings'
}
const WishList = {
    template: '<h1>Mon coup de coeur💚</h1>',
    name: 'WishList'
}
const ShoppingCart = {
    template: '<h1>Mon Panier 🛒</h1>',
    name: 'ShoppingCart'
}

// router
const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/user-settings', component: UserSettings, name: 'UserSettings' },
        { path: '/wish-list', component: WishList, name: 'WishList' },
        { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' },
    ]
})

const vue = new Vue({
    router
}).$mount('#app');