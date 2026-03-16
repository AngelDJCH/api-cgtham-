class Camara {
  #id;
  #nombre;
  #presidente;

  constructor(id, nombre, presidente) {
    this.#id = id;
    this.#nombre = nombre;
    this.#presidente = presidente;
  }

  set nombre(nombre) {
    if (!nombre) throw new Error('Dato inválido');
    this.#nombre = nombre;
  }

  set presidente(presidente) {
    if (!presidente) throw new Error('Dato inválido');
    this.#presidente = presidente;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get presidente() {
    return this.#presidente;
  }

  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      presidente: this.#presidente
    };
  }
}

module.exports = Camara;