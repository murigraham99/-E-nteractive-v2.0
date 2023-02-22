from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)


@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    file.save("C:/Users/ROG/PycharmProjects/E-nteractive/-E-nteractive-v2.0" + file.filename)
    return jsonify({"message": "File uploaded successfully"})


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/start", methods=["GET"])
def start():
    global current_level
    current_level = 0
    return render_template("level1.html", level=levels[current_level])


@app.route("/level1")
def level1():
    return render_template("level1.html")


@app.route("/level2")
def level2():
    return render_template("level2.html")


@app.route("/level4")
def level4():
    return render_template("level4.html")

@app.route("/level", methods=["POST"])
def level():
    global current_level
    answer = request.form["answer"]
    if answer == levels[current_level]["answer"]:
        current_level += 1
        if current_level >= len(levels):
            return "You won!"
        else:
            return render_template("level1.html", level=levels[current_level])
    else:
        return render_template("retry.html", level=levels[current_level])\


if __name__ == "__main__":
    app.run()



