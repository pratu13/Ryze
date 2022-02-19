from .application import create_app

app = create_app()


@app.route('/')
def check():
    return "Ryze backend running"


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
