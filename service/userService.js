'use strict'

const { query } = require('./dbService');
const LicenceService = require('./licenceService');

class UserService {
    constructor() {
        this.openColumn = [
            'email',
            'telephone',
            'profileimage',
            'addresse',
            'createur',
            'isadmin',
            'l_date'
        ]
    }

    addUserToLicence(licence, email, password, telephone = null, profileimage = null, address = null) {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO utilisateur
                        (licencie, email, password, telephone, profileimage, addresse)
                    VALUES
                        ($1, $2, $3, $4, $5, $6)`,
                    [licence, email, password, telephone, profileimage, address])
                .then(resolve)
                .catch(err => {
                    if (err.code == '23503') {reject('23503');}
                    else {reject(err);}
                })
        })
    }

    addUserWithLicence(licence, name, lastname, civility, birthdate, email, password, clubname = null, telephone = null, profileimage = null, address = null) {
        return new Promise((resolve, reject) => {
            LicenceService.addLicencie(licence, name, lastname, civility, birthdate, clubname)
            .then(()=> {
                this.addUserToLicence(licence, email, password, telephone, profileimage, address)
                .then(resolve)
                .catch(reject);
            })
            .catch(reject);
        })
    }

    getAllConfidentialUsers(offSet, limit, what = [], populated = true, sort = 'licence') {
        return new Promise((resolve, reject) => {
            var requested = [];

            if (what.length == 0) {what = LicenceService.openColumn.concat(this.openColumn);}
            what.forEach(value => {
                if (this.openColumn.includes(value)) {requested.push('u.' + value)}
                if (LicenceService.openColumn.includes(value)) {requested.push('l.' + value)}
            })

            if (!sort.includes('licence')) { sort += ', licence'; }
            requested = requested.join(', ');
            
            query(`SELECT ${requested} 
                    FROM utilisateur u
                    INNER JOIN licencie l ON u.licencie = l.licence
                    ORDER BY ${sort}
                    LIMIT $1
                    OFFSET $2`,
                    [limit, offSet])
                .then(res => {resolve(res);})
                .catch(err => {reject(err);});
        })
    }
}

module.exports = new UserService();