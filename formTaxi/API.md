# API Документация

## Endpoints

### POST /api/passenger-booking
Создание заявки пассажира

**Тело запроса:**
```json
{
  "date": "2025-01-20",
  "time": "14:30",
  "seats": 2,
  "from": "Центр города",
  "to": "Аэропорт",
  "phone": "+7900123456", // опционально
  "name": "Иван Иванов" // опционально
}
```

**Ответ при успехе:**
```json
{
  "success": true,
  "message": "Заявка успешно создана",
  "data": {
    "id": 1,
    "attributes": {
      "date": "2025-01-20",
      "time": "14:30",
      "seats": 2,
      "from": "Центр города",
      "to": "Аэропорт"
    }
  }
}
```

### POST /api/driver-trip
Создание рейса водителя

**Тело запроса:**
```json
{
  "car": {
    "make": "Toyota",
    "model": "Camry",
    "year": "2020",
    "color": "Белый",
    "licensePlate": "А123БВ777"
  },
  "photos": [
    {
      "name": "car.jpg",
      "size": 1024000,
      "type": "image/jpeg"
    }
  ],
  "trip": {
    "type": "one_time", // или "regular"
    "date": "2025-01-20", // null для регулярных
    "time": "14:30",
    "days": [], // для регулярных: ["mon", "tue", "wed"]
    "from": "Центр города",
    "to": "Аэропорт",
    "preferences": "Не курить в салоне",
    "stops": ["Торговый центр"]
  },
  "payment": {
    "type": "per_seat", // или "package"
    "allowBuyout": true
  },
  "notifications": {
    "onMatch": true
  }
}
```

**Ответ при успехе:**
```json
{
  "success": true,
  "message": "Рейс успешно создан",
  "data": {
    "id": 1,
    "attributes": {
      "carMake": "Toyota",
      "carModel": "Camry",
      "from": "Центр города",
      "to": "Аэропорт"
    }
  }
}
```

## Коды ошибок

- **400 Bad Request** - Неверные данные запроса
- **500 Internal Server Error** - Ошибка сервера или Strapi

## Strapi Collections

### passenger-bookings
- `date` (Date) - дата поездки
- `time` (Text) - время поездки  
- `seats` (Number) - количество мест
- `from` (Text) - откуда
- `to` (Text) - куда
- `phone` (Text) - телефон
- `name` (Text) - имя

### driver-trips
- `carMake` (Text) - марка авто
- `carModel` (Text) - модель авто
- `carYear` (Text) - год авто
- `carColor` (Text) - цвет авто
- `licensePlate` (Text) - гос номер
- `isRegular` (Boolean) - регулярный рейс
- `date` (Date) - дата рейса
- `time` (Text) - время отправления
- `selectedDays` (JSON) - дни недели
- `from` (Text) - откуда
- `to` (Text) - куда
- `preferences` (Text) - предпочтения
- `stops` (JSON) - промежуточные пункты
- `paymentType` (Text) - тип оплаты
- `allowBuyout` (Boolean) - разрешить выкуп
- `notifyOnMatch` (Boolean) - уведомления
