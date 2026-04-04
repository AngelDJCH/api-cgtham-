const verifyRoles = (...roles) => {
    return (req, res, next) => {
        try {
            const rolesArray = [...roles]
            const rolesArrayTk = req.roles
            console.log(rolesArrayTk)
            const result = rolesArrayTk.map(m => m).filter(r => rolesArray.includes(r))
            if (result.length === 0) throw new Error('User not authorizated')
            next()
        } catch (error) {
            res.status(401).json(
                {
                    error: error.message
                }
            )
        }
    }
}

module.exports = verifyRoles