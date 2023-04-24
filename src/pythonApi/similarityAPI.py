from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask('similarity')
api = Api(app)
CORS(app)

class SimilarityAPI(Resource):
    def post(self):
        # data = request.get_json()
        return {'hello': 'world!!!'}

api.add_resource(SimilarityAPI, '/similarity')

if __name__ == '__main__':
    app.run(debug=True)