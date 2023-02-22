from flask import Flask, render_template, request, jsonify
import random
import openai

UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

current_level = 0

OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/start", methods=["GET", "POST"])
def start():
    global current_level, value, companion
    current_level = 0
    if request.method == "POST":
        value = request.form.get("theme")
        f = request.files['file']
        f.save('static/uploads/file.png')
        print(value)

    if value == "Mickey":
        companion = "mickey"
        background = "MickeyHub.png"

    elif value == "Rapunzel":
        companion = "rapunzel"
        background = "RapunzelHub.png"

    else:
        companion = "pikachu"
        background = "PikachuHub.png"

    return render_template("page1.html", background=background, companion=companion)



@app.route("/level3")
def level3():


    class RandomAnimal:
        def __init__(self):
            self.LIST_ANIMALS = ["cock.png", "cow.png", "duck.png", "goat.png", "horse.png", "pig.png", "sheep.png"]

        def choose_random(self):

    return render_template("level3.html")



if __name__ == "__main__":
    app.run(debug=True, port=4000)
