class OfertaLaboral{
    #id;
    #titulo;
    #descripcion;
    #salario;
    #jornada;
    #tipo_contrato;
    #vacantes;
    #beneficios;
    #habilidades_tecnicas;
    #habilidades_blandas;
    #departamento_area;
    #modalidad;
    #experiencia;
    #estado;
    #fecha_publicacion;
    #id_empresa;
    constructor(id, titulo, descripcion, salario, jornada, tipo_contrato, vacantes, beneficios, habilidades_tecnicas, habilidades_blandas, departamento_area, modalidad, experiencia, estado, fecha_publicacion, id_empresa){
        this.#id = id;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#salario = salario;
        this.#jornada = jornada;
        this.#tipo_contrato = tipo_contrato;
        this.#vacantes = vacantes;
        this.#beneficios = beneficios;
        this.#habilidades_tecnicas = habilidades_tecnicas;
        this.#habilidades_blandas = habilidades_blandas;
        this.#departamento_area = departamento_area;
        this.#modalidad = modalidad;
        this.#experiencia = experiencia;
        this.#estado = estado;
        this.#fecha_publicacion = fecha_publicacion;
        this.#id_empresa = id_empresa;
    }

    set id(id){
        this.#id = id;
    }

    set titulo(titulo){
        this.#titulo = titulo;
    }

    set descripcion(descripcion){
        this.#descripcion = descripcion;
    }

    set salario(salario){
        this.#salario = salario;
    }

    set jornada(jornada){
        this.#jornada = jornada;
    }

    set tipo_contrato(tipo_contrato){
        this.#tipo_contrato = tipo_contrato;
    }

    set vacantes(vacantes){
        this.#vacantes = vacantes;
    }

    set beneficios(beneficios){
        this.#beneficios = beneficios;
    }

    set habilidades_tecnicas(habilidades_tecnicas){
        this.#habilidades_tecnicas = habilidades_tecnicas;
    }

    set habilidades_blandas(habilidades_blandas){
        this.#habilidades_blandas = habilidades_blandas;
    }

    set departamento_area(departamento_area){
        this.#departamento_area =departamento_area;
    }

    set modalidad(modalidad){
        this.#modalidad = modalidad;
    }

    set experiencia(experiencia){
        this.#experiencia = experiencia;
    }

    set estado(estado){
        this.#estado;
    }

    set fecha_publicacion(fecha_publicacion){
        this.#fecha_publicacion = fecha_publicacion;
    }

    set id_empresa(id_empresa){
        this.#id_empresa = id_empresa;
    }

    get id(){
        return this.#id;
    }

    get titulo(){
        return this.#titulo;
    }

    get descripcion(){
        return this.#descripcion;
    }

    get salario(){
        return this.#salario;
    }

    get jornada(){
        return this.#jornada;
    }

    get tipo_contrato(){
        return this.#tipo_contrato;
    }

    get vacantes(){
        return this.#vacantes;
    }

    get beneficios(){
        return this.#beneficios;
    }

    get habilidades_tecnicas(){
        return this.#habilidades_tecnicas;
    }

    get habilidades_blandas(){
        return this.#habilidades_blandas;
    }

    get departamento_area(){
        return this.#departamento_area;
    }

    get modalidad(){
        return this.#modalidad;
    }

    get experiencia(){
        return this.#experiencia;
    }

    get estado(){
        return this.#estado;
    }

    get fecha_publicacion(){
        return this.#fecha_publicacion;
    }

    get id_empresa(){
        return this.#id_empresa;
    }

    toJSON(){
        return{
            id : this.#id,
            titulo : this.titulo,
            descripcion : this.descripcion,
            salario : this.salario,
            jornada : this.jornada,
            tipo_contrato : this.tipo_contrato,
            vacantes : this.vacantes,
            beneficios : this.beneficios,
            habilidades_tecnicas : this.habilidades_tecnicas,
            habilidades_blandas: this.habilidades_blandas,
            departamento_area : this.departamento_area,
            modalidad : this.modalidad,
            experiencia : this.experiencia,
            fecha_publicacion : this.fecha_publicacion,
            id_empresa : this.id_empresa
        }
    }

}

module.exports =  OfertaLaboral;