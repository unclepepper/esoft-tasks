function deepClone(obj, visited = new WeakMap()) {

    // Возвращаем примитивные значения
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (visited.has(obj)) {
        return visited.get(obj);
    }

    // Создаем новый объект или массив в зависимости от типа
    const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

    // Сохраняем ссылку на новый объект
    visited.set(obj, result);

    // Копируем свойства объекта
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key], visited);
        }
    }

    const symbols = Object.getOwnPropertySymbols(obj);
    for (const symbol of symbols) {
        result[symbol] = deepClone(obj[symbol], visited);
    }

    return result;

}


const obj = {
    name: "Ivan",
    age: 35,
    hobbies: ["hockey", "swimming", "singing"],
    address: {
        city: "Tyumen",
        street: "Lenina",
        house: 3
    },
    func: function (obj) {
        return 'hello Ivan';
    },
    mood: "😜",
    date: new Date(),
    circularReference: null
};

obj.circularReference = obj;

const clonedObj = deepClone(obj);

console.log(clonedObj); // print clonedObj
console.log(clonedObj.circularReference === clonedObj); // true
console.log(clonedObj.circularReference.func()); // hello Ivan
console.log(clonedObj.circularReference.mood); // 😜
console.log(clonedObj.date instanceof Date); // true
console.log(clonedObj.circularReference.date instanceof Date); // true