from flask import Flask, render_template, request, jsonify
import random

UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/level1")
def level1():
    return render_template("level1.html")


@app.route("/level2")
def level2():
    return render_template("level2.html")


@app.route("/level3")
def level3():
    return render_template("level3.html")

    # class RandomAnimal:
    #     def __init__(self):
    #         self.LIST_ANIMALS = ["cock.png", "cow.png", "duck.png", "goat.png", "horse.png", "pig.png", "sheep.png"]
    #
    #     def choose_random(self):


@app.route("/level4")
def level4():
    return render_template("level4.html")


@app.route("/start", methods=["GET", "POST"])
def start():
    global current_level, value, companion
    current_level = 0
    if request.method == "POST":
        value = request.form.get("theme")
        f = request.files['file']
        f.save('static/images/file.png')
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


if __name__ == "__main__":
    app.run(debug=True, port=4000)
