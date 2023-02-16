```
+from flask import Flask, render_template, request

app = Flask(__name__)

levels = [
    {
        "level": 1,
        "question": "What is 2 + 2?",
        "answer": "4"
    },
    {
        "level": 2,
        "question": "What is 3 x 3?",
        "answer": "9"
    },
    {
        "level": 3,
        "question": "What is 5 + 5?",
        "answer": "10"
    }
]

current_level = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/start", methods=["POST"])
def start():
    global current_level
    current_level = 0
    return render_template("level.html", level=levels[current_level])

@app.route("/level", methods=["POST"])
def level():
    global current_level
    answer = request.form["answer"]
    if answer == levels[current_level]["answer"]:
        current_level += 1
        if current_level >= len(levels):
            return "You won!"
        else:
            return render_template("level.html", level=levels[current_level])
    else:
        return render_template("retry.html", level=levels[current_level])


if __name__ == "__main__":
    app.run()
```