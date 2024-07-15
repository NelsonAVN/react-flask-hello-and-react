import click
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""

def setup_commands(app):
    """
    Este es un comando de ejemplo "insert-test-users" que puedes ejecutar desde la línea de comandos
    escribiendo: $ flask insert-test-users 5
    Nota: 5 es el número de usuarios a agregar
    """
    @app.cli.command("insert-test-users")  # nombre de nuestro comando
    @click.argument("count")  # argumento de nuestro comando
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = f"test_user{x}@test.com"
            user.password = "123456"  # En un entorno real, asegúrate de hashear las contraseñas
            user.is_active = True
            db.session.add(user)
        db.session.commit()  # Mover commit fuera del bucle para mejorar el rendimiento
        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass