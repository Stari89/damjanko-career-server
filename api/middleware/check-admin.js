module.exports = (req, res, next) => {
    const id = req.userData.userId;
    User.findById(id)
        .select('role')
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if (doc.role === 'admin') {
                next();
            } else {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        });
}