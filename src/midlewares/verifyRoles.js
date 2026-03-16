const verifyRoles = (...roles)=>{
    return (req, res, next)=>{
        try {
            const rolesArray = [...roles]
        const rolesArrayTk = req.roles //es un array de roles
        // console.log(rolesArray)
        // console.log(rolesArrayTk)
        // for(let r of rolesArrayTk){
        //     console.log(r)
        //     //if(!rolesArray.includes(r)) res.status(401).json({error:'Token invalido'})
        // }
        // for(let r of rolesArray){
        //     console.log(r)
        //     if(r===rolesArrayTk) next()
        // }

        const result = rolesArrayTk.map(m=>m).filter(r => rolesArray.includes(r))

        if(result.length===0) throw new Error('User not authorizated')

        // console.log(result)
        next()
        //next()
        //throw new Error('Error de rol')
        } catch (error) {
            res.status(401).json(
                {
                    error : error.message
                }
            )
        }
    }
}

module.exports = verifyRoles