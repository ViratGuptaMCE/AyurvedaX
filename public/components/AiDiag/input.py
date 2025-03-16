from flask import Flask, request, render_template
from transformers import pipeline, AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import os

app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def classify_wound_using_pipeline(image_path):
    pipe = pipeline("image-classification", model="Hemg/Wound-classification")
    image = Image.open(image_path).convert("RGB")
    predictions = pipe(image)
    return predictions

def classify_wound_directly(image_path):
    processor = AutoImageProcessor.from_pretrained("Hemg/Wound-classification")
    model = AutoModelForImageClassification.from_pretrained("Hemg/Wound-classification")
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    predicted_class_idx = logits.argmax().item()
    predicted_class_label = model.config.id2label[predicted_class_idx]
    predicted_class_score = torch.softmax(logits, dim=1)[0, predicted_class_idx].item()
    return {"label": predicted_class_label, "score": predicted_class_score}

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return "No file uploaded", 400
        file = request.files["file"]
        if file.filename == "":
            return "No selected file", 400
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filepath)
        
        pipeline_results = classify_wound_using_pipeline(filepath)
        direct_results = classify_wound_directly(filepath)
        
        return render_template("result.html", pipeline_results=pipeline_results, direct_results=direct_results, image_url=filepath)
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)