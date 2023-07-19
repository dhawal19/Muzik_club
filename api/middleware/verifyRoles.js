const verifyRoles  = (...allowedRoles) => {
    return (req, res, next) =>{
        const roles = req.roles;
        console.log(roles);
        if(!roles) return res.sendStatus(401); //unauthorized
        const rolesArray = [...allowedRoles];
        const isAllowed = roles.some(role => rolesArray.includes(role)); //check if any of the roles in the request is included in the allowedRoles array
        if(!isAllowed){
            return res.sendStatus(403); //forbidden
        }
        next();
    }
}

module.exports = verifyRoles;