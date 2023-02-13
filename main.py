from flask import Flask, render_template, request, jsonify
import random

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


@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    file.save("C:/Users/ROG/PycharmProjects/E-nteractive/-E-nteractive-v2.0" + file.filename)
    return jsonify({"message": "File uploaded successfully"})


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



class Cube:
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"Cube({self.value})"

class Tower:
    def __init__(self):
        self.cubes = []

    def add_cube(self, cube):
        self.cubes.append(cube)

    def total(self):
        return sum(cube.value for cube in self.cubes)

    def __repr__(self):
        return f"Tower({self.cubes})"

class Game:
    def __init__(self, target_sum):
        self.target_sum = target_sum
        self.tower = Tower()

    def generate_cubes(self, count, max_value):
        return [Cube(random.randint(1, max_value)) for _ in range(count)]

    def play(self):
        cubes = self.generate_cubes(10, 9)
        print(f"Cubes: {cubes}, {self.target_sum}")
        while self.tower.total() < self.target_sum:
            for index, cube in enumerate(cubes):1
                print(f"{index + 1}. Add cube {cube}")
            choice = int(input("Enter your choice (1-10): ")) - 1
            selected_cube = cubes.pop(choice)
            self.tower.add_cube(selected_cube)
            print(f"Tower: {self.tower}")
        print("Congratulations, you have reached the target sum!")

if __name__ == "__main__":
    game = Game(30)
    game.play()

Game().play()