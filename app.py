from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import json
from datetime import timedelta

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurant.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    items = db.Column(db.Text)  
    total = db.Column(db.Float)
    datetime = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

PRICES = {
    "b": 150,
    "p": 200,
    "j": 80,
    "s": 130,
    "f": 90,
    "i": 100
}

FOODS = {
    "b": "Burger",
    "p": "Pizza",
    "j": "Juice",
    "s": "Sandwich",
    "f": "Fries",
    "i": "Ice Cream"
}


@app.route('/')
def login():
    return render_template('login.html')


@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/orders')
def orders():
    all_orders = Order.query.order_by(Order.datetime.asc()).all()
    
    IST_OFFSET = timedelta(hours=5, minutes=30) 

    for order in all_orders:
        order.parsed_items = json.loads(order.items)
        order.local_datetime = order.datetime + IST_OFFSET

    return render_template('orders.html', orders=all_orders)

@app.route('/show-total', methods=['POST'])
def show_total():
    cart = request.json
    items = []
    total = 0

    for key, qty in cart.items():
        price = PRICES[key]
        amount = price * qty
        total += amount

        items.append({
            "name": FOODS[key],
            "price": price,
            "qty": qty,
            "amount": amount
        })

    return jsonify({
        "items": items,
        "total": total
    })


@app.route('/print-bill', methods=['POST'])
def print_bill():
    cart = request.json
    invoice = "INV" + str(random.randint(100000, 999999))

    items = []
    total = 0

    for key, qty in cart.items():
        price = PRICES[key]
        amount = price * qty
        total += amount

        items.append({
            "name": FOODS[key],
            "price": price,
            "qty": qty,
            "amount": amount
        })

    order = Order(items=json.dumps(items), total=total) 
    db.session.add(order)
    db.session.commit()

    return jsonify({
        "invoice": invoice,
        "items": items,
        "total": total,
        "datetime": datetime.now().strftime("%d-%m-%Y | %I:%M %p")
    })

if __name__ == '__main__':
    app.run(debug=True)

