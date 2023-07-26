from flask import Flask, request, jsonify
from utils import predict_number

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return 'The server is running!'

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    # check if the data is correct
    if('table' not in data):
        return jsonify({'error': 'no table'});
    table = data['table'];
    if(not isinstance(table, list)):
        return jsonify({'error': 'table must be a list'});
    if(len(table) != 28*28):
        return jsonify({'error': 'table must be 28x28'});
    # looks good, let's predict
    # call a function that will predict the number
    predict = predict_number(table)
    # predict = 12

    output = {
        'prediction': predict
    }
    return jsonify(output)





if __name__ == '__main__':
    app.run(debug=True)
