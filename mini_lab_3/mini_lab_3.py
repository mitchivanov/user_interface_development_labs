from flask import Flask, jsonify
import requests

app = Flask(name)

# Эндпоинт для получения случайного изображения котика
@app.route('/random_cat', methods=['GET'])
def get_random_cat():
    try:
        # Вызываем The Cat API для получения случайного изображения котика
        response = requests.get('https://api.thecatapi.com/v1/images/search')
        
        # Проверяем успешность запроса
        response.raise_for_status()

        # Извлекаем URL изображения котика
        cat_url = response.json()[0]['url']

        # Возвращаем URL в формате JSON
        return jsonify({"cat_url": cat_url})
    except Exception as e:
        return jsonify({"error": str(e)})

# Эндпоинт для получения изображения котика по конкретной породе
@app.route('/cat_by_breed/<string:breed>', methods=['GET'])
def get_cat_by_breed(breed):
    try:
        # Вызываем The Cat API для получения изображения котика по породе
        response = requests.get(f'https://api.thecatapi.com/v1/images/search?breed_ids={breed}')
        
        # Проверяем успешность запроса
        response.raise_for_status()

        # Извлекаем URL изображения котика
        cat_url = response.json()[0]['url']

        # Возвращаем URL в формате JSON
        return jsonify({"cat_url": cat_url})
    except Exception as e:
        return jsonify({"error": str(e)})

# Эндпоинт для получения списка доступных пород котиков
@app.route('/cat_breeds', methods=['GET'])
def get_cat_breeds():
    try:
        # Вызываем The Cat API для получения списка пород котиков
        response = requests.get('https://api.thecatapi.com/v1/breeds')
        
        # Проверяем успешность запроса
        response.raise_for_status()

        # Возвращаем данные в формате JSON
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)})

# Эндпоинт для получения изображения котика по конкретной категории
@app.route('/cat_by_category/<string:category>', methods=['GET'])
def get_cat_by_category(category):
    try:
        # Вызываем The Cat API для получения изображения котика по категории
        response = requests.get(f'https://api.thecatapi.com/v1/images/search?category_ids={category}')
        
        # Проверяем успешность запроса
        response.raise_for_status()

        # Извлекаем URL изображения котика
        cat_url = response.json()[0]['url']

        # Возвращаем URL в формате JSON
        return jsonify({"cat_url": cat_url})
    except Exception as e:
        return jsonify({"error": str(e)})

if name == 'main':
    app.run(debug=True)