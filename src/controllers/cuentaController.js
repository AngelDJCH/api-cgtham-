const cuentaService = require('../services/cuentaService')
const bcrypt = require('bcrypt')

const { generateToken, verifyToken } = require('../helpers/jwtToken');
const { enviarCorreo } = require('../config/email');

// Almacén en memoria para códigos de recuperación (OTP) de un solo uso
const recuperacionTokens = new Map();

// Limpieza periódica de tokens expirados cada 15 minutos (sin retener el loop del proceso)
const intervalLimpieza = setInterval(() => {
    const ahora = Date.now();
    for (const [correo, data] of recuperacionTokens.entries()) {
        if (ahora > data.expiraEn) {
            recuperacionTokens.delete(correo);
        }
    }
}, 15 * 60 * 1000);
if (typeof intervalLimpieza.unref === 'function') {
    intervalLimpieza.unref();
}

const create = async (req, res,next) => {
    try {
        const { correo, contrasenia, id_organizacion } = req.body;
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.create(correo, contraseniaHash, ['ADMIN_ORG'], id_organizacion);
        // await enviarCorreo(
        //     correo, 'CREACIÓN DE CUENTA', 'Su cuenta ha sido creada',
        //     `
        //         <h1>Espera que un administrador valide tu cuenta!!</h1>
        //     `
        // )
        res.status(201).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res,next) => {
    try {
        res.clearCookie('tk')
        res.status(204).json({ message: 'cookie borrada' })
    } catch (error) {
        next(error)
    }
}

const verificarSesion = async (req, res,next) => {
    try {
        const token = req.cookies.tk
        const decoded = verifyToken(token)
        const usuario = {
            id: decoded.data.id,
            correo: decoded.data.correo,
            rol: decoded.data.rol,
            tipo: decoded.data.tipo,
            sector: decoded.data.sector,
            giro: decoded.data.giro,
            organizacion: decoded.data.organizacion,
            foto: decoded.data.logo
        }
        res.status(200).json(
            usuario
        )
    } catch (error) {
        res.clearCookie('tk')
        next(error)
    }
}

const login = async (req, res,next) => {
    try {
        const { correo, contrasenia } = req.body;
        const cuenta = await cuentaService.login(correo)
        const result = bcrypt.compareSync(contrasenia, cuenta.contraseña)
        delete cuenta.contraseña
        const tk = await generateToken(cuenta)
        console.log(tk)
        if (result) {
            res.cookie('tk', tk,
                {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none' //'lax'
                }
            )
            res.status(200).json(cuenta)
        }
        if (!result) throw new Error('Contrasenia incorrecta')
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const cuenta = await cuentaService.findById(id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateRolById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { roles } = req.body;
        const cuenta = await cuentaService.updateById(id, roles)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateCorreoByIdOrganizacion = async (req, res,next) => {
    try {
        const id = req.params.id
        const { correo } = req.body
        const cuenta = await cuentaService.updateCorreoByIdOrganizacion(correo, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateContraseniaByIdOrganizacion = async (req, res,next) => {
    try {
        const id = req.params.id
        const { contrasenia } = req.body
        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10)
        const cuenta = await cuentaService.updateContraseniaByIdOrganizacion(contraseniaHash, id)
        res.status(200).json(cuenta.toJSON())
    } catch (error) {
        next(error)
    }
}

const solicitarRecuperacion = async (req, res, next) => {
    try {
        const correo = req.body.correo.toLowerCase().trim();
        const cuenta = await cuentaService.findByCorreo(correo);

        if (!cuenta) {
            return res.status(404).json({
                message: 'No existe ninguna cuenta registrada con este correo electrónico.'
            });
        }

        if (cuenta.estado === false) {
            return res.status(403).json({
                message: 'La cuenta u organización vinculada se encuentra inactiva o deshabilitada.'
            });
        }

        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiraEn = Date.now() + (10 * 60 * 1000);

        recuperacionTokens.set(correo, {
            codigo,
            expiraEn,
            intentos: 0,
            verificado: false
        });

        const htmlCorreo = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #CCD5AE; box-shadow: 0 4px 14px rgba(65, 67, 27, 0.08);">
            <div style="background-color: #41431B; padding: 24px; text-align: center; color: #FFFFFF;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">CGTHAM</h1>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #CCD5AE;">Comisión de Gestión de Talento Humano de las Altas Montañas</p>
            </div>
            <div style="padding: 28px 24px; color: #2B2D42;">
                <h2 style="font-size: 17px; color: #41431B; margin-top: 0;">Recuperación de Contraseña</h2>
                <p style="font-size: 13.5px; line-height: 1.5; color: #555A38;">
                    Has solicitado restablecer la contraseña de tu cuenta institucional vinculada a <strong>${correo}</strong>.
                </p>
                <div style="background-color: #FAFBF7; border: 1.5px dashed #AEB784; border-radius: 8px; padding: 18px; text-align: center; margin: 22px 0;">
                    <span style="display: block; font-size: 12px; color: #7D8465; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">Tu código de verificación</span>
                    <span style="font-family: Consolas, monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #41431B;">${codigo}</span>
                </div>
                <p style="font-size: 12.5px; line-height: 1.5; color: #7D8465;">
                    Este código es estrictamente confidencial y tiene una vigencia de <strong>10 minutos</strong>. Si tú no realizaste esta solicitud, puedes ignorar este mensaje; tu acceso actual continuará siendo seguro.
                </p>
            </div>
            <div style="background-color: #F4F5F0; padding: 14px 24px; text-align: center; border-top: 1px solid #EAECE2; font-size: 11px; color: #888;">
                Plataforma de Vinculación Institucional CGTHAM • Residencias Profesionales 2026
            </div>
        </div>
        `;

        const textoPlano = `CGTHAM - Recuperación de Contraseña\nTu código de verificación es: ${codigo}\nVálido durante 10 minutos.`;

        await enviarCorreo(
            correo,
            'Código de Recuperación de Contraseña - CGTHAM',
            textoPlano,
            htmlCorreo
        );

        return res.status(200).json({
            message: 'Código de verificación enviado al correo electrónico institucional.'
        });
    } catch (error) {
        next(error);
    }
};

const validarCodigoRecuperacion = async (req, res, next) => {
    try {
        const correo = req.body.correo.toLowerCase().trim();
        const codigo = (req.body.codigo || '').trim();

        const tokenData = recuperacionTokens.get(correo);
        if (!tokenData) {
            return res.status(400).json({
                message: 'No existe una solicitud de recuperación activa para este correo o el código ha expirado.'
            });
        }

        if (Date.now() > tokenData.expiraEn) {
            recuperacionTokens.delete(correo);
            return res.status(400).json({
                message: 'El código de verificación ha expirado. Por favor solicita uno nuevo.'
            });
        }

        if (tokenData.codigo !== codigo) {
            tokenData.intentos += 1;
            if (tokenData.intentos >= 3) {
                recuperacionTokens.delete(correo);
                return res.status(400).json({
                    message: 'Has superado el número máximo de intentos permitidos. Solicita un nuevo código.'
                });
            }
            return res.status(400).json({
                message: `El código ingresado es incorrecto. Intentos restantes: ${3 - tokenData.intentos}.`
            });
        }

        // Código validado exitosamente
        tokenData.verificado = true;
        tokenData.expiraEn = Date.now() + (10 * 60 * 1000); // 10 minutos para definir la clave

        return res.status(200).json({
            message: 'Código verificado exitosamente. Procede a ingresar tu nueva contraseña.'
        });
    } catch (error) {
        next(error);
    }
};

const confirmarRecuperacion = async (req, res, next) => {
    try {
        const correo = req.body.correo.toLowerCase().trim();
        const { contrasenia } = req.body;

        const tokenData = recuperacionTokens.get(correo);
        if (!tokenData) {
            return res.status(400).json({
                message: 'No existe una solicitud de recuperación activa para este correo o la sesión ha expirado.'
            });
        }

        if (Date.now() > tokenData.expiraEn) {
            recuperacionTokens.delete(correo);
            return res.status(400).json({
                message: 'La sesión de recuperación ha expirado. Por favor solicita un nuevo código.'
            });
        }

        if (!tokenData.verificado) {
            return res.status(400).json({
                message: 'Debes verificar primero tu código de 6 dígitos antes de actualizar la contraseña.'
            });
        }

        const contraseniaHash = await bcrypt.hashSync(contrasenia, 10);
        await cuentaService.updateContraseniaByCorreo(contraseniaHash, correo);

        recuperacionTokens.delete(correo);

        return res.status(200).json({
            message: 'Contraseña actualizada exitosamente.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    findById,
    updateRolById,
    login,
    logout,
    verificarSesion,
    updateCorreoByIdOrganizacion,
    updateContraseniaByIdOrganizacion,
    solicitarRecuperacion,
    validarCodigoRecuperacion,
    confirmarRecuperacion
}