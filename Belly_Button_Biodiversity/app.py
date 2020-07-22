from flask import Flask, render_template, redirect, jsonify
# from flask_pymongo import PyMongo
from bson import ObjectId
import json
import os
import csv

# Create an instance of Flask
app = Flask(__name__)

# Route to render index.html template 

@app.route("/")
def index():
    """List all available api routes."""
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)

