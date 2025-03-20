// Данные о товарах
const products = [
    {
        id: 1,
        name: 'Зефирный букет "Тюльпаны"',
        price: 2500,
        description: 'Красивый букет из зефирных тюльпанов разных цветов. Идеальный подарок для любого случая.',
        image: 'images/tulip-bouquet.jpg',
        category: 'букеты'
    },
    {
        id: 2,
        name: 'Классический зефир',
        price: 800,
        description: 'Нежный зефир из натуральных ингредиентов. Доступен в разных вкусах.',
        image: 'images/marshmallow.jpg',
        category: 'зефир'
    },
    {
        id: 3,
        name: 'Безе "Французское"',
        price: 1200,
        description: 'Хрустящее безе с нежной начинкой. Доступно в разных размерах.',
        image: 'images/meringue.jpg',
        category: 'безе'
    },
    {
        id: 4,
        name: 'Печенье с айсингом',
        price: 1500,
        description: 'Ароматное печенье с ручной росписью айсингом. Возможен индивидуальный дизайн.',
        image: 'images/cookies.jpg',
        category: 'печенье'
    }
];

// Корзина
let cart = [];

// Функция для отображения товаров
function displayProducts() {
    const productsContainer = document.querySelector('#products .grid');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image w-full">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-pink-600">${product.price} ₽</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary">
                        В корзину
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showNotification('Товар добавлен в корзину!');
    }
}

// Функция обновления корзины
function updateCart() {
    const cartContainer = document.querySelector('#cart .max-w-2xl');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-600">Корзина пуста</p>';
        return;
    }

    const cartItems = document.createElement('div');
    cartItems.className = 'space-y-4';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item bg-white p-4 rounded-lg shadow-md';
        cartItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">${item.price} ₽</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                    Удалить
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'mt-4 text-right text-xl font-bold';
    totalElement.textContent = `Итого: ${total} ₽`;

    cartContainer.appendChild(cartItems);
    cartContainer.appendChild(totalElement);
}

// Функция удаления из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Товар удален из корзины');
}

// Функция показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Инициализация сайта
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});

// Обработка формы обратной связи
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // В реальном проекте здесь будет отправка данных на сервер
    console.log('Отправка формы:', formData);
    
    // Очищаем форму и показываем уведомление
    this.reset();
    showNotification('Спасибо! Мы свяжемся с вами в ближайшее время');
}); 