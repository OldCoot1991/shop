export const MOCK_CATEGORIES = [
    { id: '1', title: 'Электроника', icon: '📱', bg: 'linear-gradient(135deg, #005bff 0%, #7b2fff 100%)' },
    { id: '2', title: 'Одежда', icon: '👕', bg: 'linear-gradient(135deg, #f91155 0%, #ff7eb3 100%)' },
    { id: '3', title: 'Обувь', icon: '👟', bg: 'linear-gradient(135deg, #ff6f00 0%, #ffcc02 100%)' },
    { id: '4', title: 'Дом', icon: '🏠', bg: 'linear-gradient(135deg, #00c48c 0%, #00e0c6 100%)' },
    { id: '5', title: 'Детям', icon: '👶', bg: 'linear-gradient(135deg, #ff8c00 0%, #ffbb33 100%)' },
    { id: '6', title: 'Красота', icon: '💄', bg: 'linear-gradient(135deg, #c8007a 0%, #ff6ec7 100%)' },
    { id: '7', title: 'Спорт', icon: '⚽', bg: 'linear-gradient(135deg, #00b300 0%, #76e346 100%)' },
    { id: '8', title: 'Авто', icon: '🚗', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
    { id: '9', title: 'Зоотовары', icon: '🐕', bg: 'linear-gradient(135deg, #b8860b 0%, #daa520 100%)' },
    { id: '10', title: 'Аптека', icon: '💊', bg: 'linear-gradient(135deg, #006eff 0%, #00c6ff 100%)' },
];

export interface ProductSpec {
    label: string;
    value: string;
}

export interface ProductReview {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    text: string;
    pros?: string;
    cons?: string;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviewsCount: number;
    image: string;
    images?: string[];
    badges: string[];
    description?: string;
    specs?: ProductSpec[];
    features?: string[];
    reviews?: ProductReview[];
    brand?: string;
    category?: string;
    inStock?: boolean;
    deliveryInfo?: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        title: 'Смартфон Apple iPhone 15 Pro Max 256 ГБ, натуральный титан',
        price: 139990,
        oldPrice: 154990,
        rating: 4.9,
        reviewsCount: 1542,
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80',
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
            'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80',
        ],
        badges: ['Хит', '-10%'],
        brand: 'Apple',
        category: 'Электроника',
        inStock: true,
        deliveryInfo: 'Доставка завтра, 25 февраля',
        description: 'Apple iPhone 15 Pro Max — флагманский смартфон с чипом A17 Pro, системой камер с 5× оптическим зумом и рамой из авиационного титана. Самый мощный iPhone в истории.',
        features: [
            'Чип A17 Pro с нейронным ядром',
            'Система камер 48 МП с 5× оптическим зумом',
            'Экран Super Retina XDR 6.7" ProMotion 120 Гц',
            'Кнопка управления Action Button',
            'Разъём USB-C 3.0',
            'Батарея до 29 часов видео',
        ],
        specs: [
            { label: 'Операционная система', value: 'iOS 17' },
            { label: 'Диагональ экрана', value: '6.7"' },
            { label: 'Разрешение экрана', value: '2796 × 1290 пикселей' },
            { label: 'Процессор', value: 'Apple A17 Pro' },
            { label: 'Оперативная память', value: '8 ГБ' },
            { label: 'Встроенная память', value: '256 ГБ' },
            { label: 'Основная камера', value: '48 МП + 12 МП + 12 МП' },
            { label: 'Фронтальная камера', value: '12 МП' },
            { label: 'Аккумулятор', value: '4422 мАч' },
            { label: 'Материал корпуса', value: 'Авиационный титан' },
        ],
        reviews: [
            {
                id: 'r1',
                author: 'Максим П.',
                avatar: 'https://i.pravatar.cc/48?img=11',
                rating: 5,
                date: '15 февраля 2025',
                text: 'Отличный телефон! Камера просто огонь, снимает даже ночью как днём.',
                pros: 'Мощный процессор, отличная камера, красивый корпус',
                cons: 'Дорогой, нет зарядки в комплекте',
            },
            {
                id: 'r2',
                author: 'Елена С.',
                avatar: 'https://i.pravatar.cc/48?img=5',
                rating: 5,
                date: '2 февраля 2025',
                text: 'Перешла с Samsung — и не пожалела. iOS очень интуитивна.',
                pros: 'Плавный интерфейс, долгая поддержка обновлений',
                cons: 'Привыкаю к экосистеме Apple',
            },
            {
                id: 'r3',
                author: 'Андрей В.',
                avatar: 'https://i.pravatar.cc/48?img=7',
                rating: 4,
                date: '20 января 2025',
                text: 'Хороший телефон, но цена кусается. USB-C наконец-то приятный бонус.',
                pros: 'Быстро, экран отличный',
                cons: 'Слишком большой для одной руки',
            },
        ],
    },
    {
        id: 'p2',
        title: 'Наушники беспроводные Sony WH-1000XM5, черные',
        price: 34990,
        oldPrice: 39990,
        rating: 4.8,
        reviewsCount: 890,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
        ],
        badges: ['Выбор покупателей'],
        brand: 'Sony',
        category: 'Электроника',
        inStock: true,
        deliveryInfo: 'Доставка сегодня до 23:00',
        description: 'Sony WH-1000XM5 — наушники с лучшим в классе шумоподавлением, 30 часами работы и мягкими кожаными амбушюрами. Идеальный выбор для работы и путешествий.',
        features: [
            '8 микрофонов для шумоподавления',
            '30 ч работы без подзарядки',
            'Быстрая зарядка 3 мин = 3 часа',
            'Мультиторочное подключение к 2 устройствам',
            'Складная конструкция',
        ],
        specs: [
            { label: 'Тип', value: 'Накладные, закрытые' },
            { label: 'Подключение', value: 'Bluetooth 5.2' },
            { label: 'Шумоподавление', value: 'Активное (ANC)' },
            { label: 'Время работы', value: '30 ч (с ANC), 40 ч (без ANC)' },
            { label: 'Вес', value: '250 г' },
            { label: 'Разъём', value: 'USB-C' },
        ],
        reviews: [
            {
                id: 'r4',
                author: 'Иван Л.',
                avatar: 'https://i.pravatar.cc/48?img=3',
                rating: 5,
                date: '10 февраля 2025',
                text: 'Лучшие наушники что у меня были. Шумодав убивает весь окружающий шум.',
                pros: 'Тихий шумодав, удобные, лёгкие',
                cons: 'Дорогие',
            },
        ],
    },
    {
        id: 'p3',
        title: 'Кроссовки Nike Air Max 270, мужские, белые',
        price: 12490,
        oldPrice: 16990,
        rating: 4.7,
        reviewsCount: 320,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
            'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
        ],
        badges: ['-26%'],
        brand: 'Nike',
        category: 'Обувь',
        inStock: true,
        deliveryInfo: 'Доставка 26-27 февраля',
        description: 'Nike Air Max 270 с самой высокой воздушной подушкой Air — для максимального комфорта на протяжении всего дня.',
        features: [
            'Воздушная подушка Max Air 270°',
            'Верх из сетки с плавными перекрытиями',
            'Лёгкая пена в подошве',
        ],
        specs: [
            { label: 'Пол', value: 'Мужской' },
            { label: 'Материал верха', value: 'Текстиль, синтетика' },
            { label: 'Материал подошвы', value: 'Резина' },
            { label: 'Страна', value: 'Вьетнам' },
        ],
        reviews: [],
    },
    {
        id: 'p4',
        title: 'Ноутбук Apple MacBook Air 13" M2, 8/256 ГБ, Midnight',
        price: 109990,
        oldPrice: 119990,
        rating: 4.9,
        reviewsCount: 654,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
        ],
        badges: ['Рассрочка 0-0-12'],
        brand: 'Apple',
        category: 'Электроника',
        inStock: true,
        deliveryInfo: 'Доставка завтра',
        description: 'MacBook Air с чипом M2 — тонкий и лёгкий ноутбук с производительностью, которая удивит. Fanless-дизайн, 18 часов работы.',
        features: [
            'Чип Apple M2 (8-ядерный CPU, 8-ядерный GPU)',
            '18 часов работы от аккумулятора',
            'Экран Liquid Retina 13.6" 2560×1664',
            'MagSafe 2 для зарядки',
            'Веб-камера 1080p',
        ],
        specs: [
            { label: 'Процессор', value: 'Apple M2' },
            { label: 'ОЗУ', value: '8 ГБ' },
            { label: 'Накопитель', value: '256 ГБ SSD' },
            { label: 'Экран', value: '13.6" Liquid Retina, 2560×1664' },
            { label: 'Вес', value: '1.24 кг' },
            { label: 'ОС', value: 'macOS Sonoma' },
        ],
        reviews: [],
    },
    {
        id: 'p5',
        title: 'Кофемашина DeLonghi Magnifica S',
        price: 29990,
        oldPrice: 42990,
        rating: 4.8,
        reviewsCount: 2011,
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
        ],
        badges: ['Суперцена', '-30%'],
        brand: 'DeLonghi',
        category: 'Дом',
        inStock: true,
        deliveryInfo: 'Доставка 27 февраля',
        description: 'Автоматическая кофемашина DeLonghi Magnifica S готовит эспрессо, американо и капучино одним нажатием кнопки.',
        features: [
            'Встроенная кофемолка с 13 степенями помола',
            'Ручной капучинатор',
            'Быстрый нагрев 40 сек',
            'Давление 15 бар',
        ],
        specs: [
            { label: 'Мощность', value: '1450 Вт' },
            { label: 'Давление', value: '15 бар' },
            { label: 'Объём бака', value: '1.8 л' },
            { label: 'Объём зернохранилища', value: '250 г' },
        ],
        reviews: [],
    },
    {
        id: 'p6',
        title: 'Телевизор LG OLED 55" 4K Smart TV',
        price: 129000,
        oldPrice: 149000,
        rating: 4.6,
        reviewsCount: 120,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
        ],
        badges: ['Новинка'],
        brand: 'LG',
        category: 'Электроника',
        inStock: false,
        deliveryInfo: 'Ожидается поступление',
        description: 'LG OLED evo с технологией самосветящихся пикселей обеспечивает абсолютный чёрный цвет, яркие цвета и широкие углы обзора.',
        features: [
            'Панель OLED evo с α9 AI Processor 4K',
            'Поддержка Dolby Vision IQ и Dolby Atmos',
            'HDMI 2.1 для консолей',
            'webOS 23',
        ],
        specs: [
            { label: 'Диагональ', value: '55"' },
            { label: 'Разрешение', value: '4K UHD (3840×2160)' },
            { label: 'Тип матрицы', value: 'OLED' },
            { label: 'Частота обновления', value: '120 Гц' },
            { label: 'HDR', value: 'Dolby Vision, HDR10, HLG' },
        ],
        reviews: [],
    },
];
