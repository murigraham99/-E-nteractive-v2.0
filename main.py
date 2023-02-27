from flask import Flask, render_template, request, session
import random
import openai


UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.secret_key = '12345'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

OPEN_AI_KEY = "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"


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
    continues = True
    while continues:
        animalI = RandomAnimal().choose_random()
        animalII = RandomAnimal().choose_random()

        if animalII == animalI:
            pass
        else:
            continues = False

        audio_list = [animalI, animalII]
        audio = RandomAnimal().get_sound(random.choice(audio_list))

    return render_template("level3.html", animal1=animalI, animal2=animalII, audio_correct=audio)



class RandomAnimal:
    def __init__(self):
        self.ANIMALS_DICT = {
            "cock.png": "cock.mp3",
            "cow.png": "cow.mp3",
            "duck.png": "duck.mp3",
            "goat.png": "goat.mp3",
            "horse.png": "horse.mp3",
            "pig.png": "pig.mp3",
            "sheep.png": "sheep.mp3"
        }
        self.choose_random()


    def choose_random(self):
        key = random.choice(list(self.ANIMALS_DICT))
        return key

    def get_sound(self, animal_key):
        return self.ANIMALS_DICT[animal_key]



@app.route("/level4")
def level4():
    return render_template("level4.html")

@app.route("/start", methods=["GET", "POST"])
def start():
    global current_level, value, companion
    current_level = 0
    username = "Robert"


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

    session["companion"] = companion

    if "companion" in session:
        companion = session["companion"]

    openai.api_key = OPEN_AI_KEY
    response_raw = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Write a short story about {username} and his companion {companion} on their journey to learning morea about how things work in this world. Make it no more than 100 words",
        max_tokens=200,
        temperature=0.7
    )
    response = str(response_raw["choices"][0]["text"][2:])
    # response = "Robert and Rapunzel were on a journey to learn more about the world. They encountered many different people, animals, and landscapes along the way. They talked to everyone they encountered and asked questions to gain a better understanding of the world around them. One day they stumbled upon a village where they met a wise old man who taught them about the power of knowledge. He showed them how to think critically, use their skills, and work together to solve problems. Robert and Rapunzel left the village with a newfound appreciation for the world and each other. They continued their journey with a newfound sense of adventure, eager to learn more about the world and how it works."

    return render_template("page1.html", background=background, companion=companion, text = str(response))


if __name__ == "__main__":
    app.run(debug=True, port=4000)
