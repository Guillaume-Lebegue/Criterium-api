'use strict'

const { query } = require('./dbService');

class LicenceService {
    constructor() {
        this.openColumn = [
            'licence',
            'prenom',
            'nom',
            'civilite',
            'datenaissance',
            'clubnom'
        ]
    }

    addLicencie(licence, name, lastname, civility, birthDate, clubName = null) {
        return new Promise((resolve, reject) => {
            query(`INSERT INTO licencie
                        (licence, prenom, nom, civilite, datenaissance, clubnom)
                    VALUES
                        ($1, $2, $3, $4, $5, $6)`,
                    [licence, name, lastname, civility, birthDate, clubName])
                .then(resolve)
                .catch(err => {
                    if (err.code == '23503') {reject('23503');}
                    else {reject(err);}
                });
        })
    }

    getAllLicencie(offSet, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM licencie
                    ORDER BY ${sort}
                    LIMIT $1
                    OFFSET $2`,
                    [limit, offSet])
                .then(res => {resolve(res);})
                .catch(err => {reject(err);});
        })
    }

    getLicencieByLicence(licence) {
        return new Promise((resolve, reject) => {
            query(`SELECT *
                    FROM licencie
                    WHERE licence = $1`,
                    [licence])
                .then(resolve)
                .catch(reject);
        })
    }

    getLicencieByLastname(lastname, offset, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM Licencie
                    WHERE nom = $1
                    ORDER BY ${sort}
                    LIMIT $2
                    OFFSET $3`,
                    [lastname, limit, offset])
                .then(resolve)
                .catch(reject);
        })
    }

    getLicencieByName(name, offset, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM Licencie
                    WHERE prenom = $1
                    ORDER BY ${sort}
                    LIMIT $2
                    OFFSET $3`,
                    [name, limit, offset])
                .then(resolve)
                .catch(reject);
        })
    }

    getLicencieByLastnameName(lastname, name, offset, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM Licencie
                    WHERE nom = $1 AND prenom = $2
                    ORDER BY ${sort}
                    LIMIT $3
                    OFFSET $4`,
                    [lastname, name, limit, offset])
                .then(resolve)
                .catch(reject);
        })
    }

    getLicencieByCivility(civility, offset, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM Licencie
                    WHERE civilite = $1
                    ORDER BY ${sort}
                    LIMIT $2
                    OFFSET $3`,
                    [civility, limit, offset])
                .then(resolve)
                .catch(reject);
        })
    }

    getLicencieByClubName(clubName, offset, limit, sort = 'licence') {
        return new Promise((resolve, reject) => {
            if (!sort.includes('licence')) { sort += ', licence'; }
            query(`SELECT *
                    FROM Licencie
                    WHERE clubnom = $1
                    ORDER BY ${sort}
                    LIMIT $2
                    OFFSET $3`,
                    [clubName, limit, offset])
                .then(resolve)
                .catch(reject);
        })
    }

    updateClubName(licence, clubName) {
        return new Promise((resolve, reject) => {
            query(`UPDATE licencie
                    SET clubnom = $1
                    WHERE licence = $2
                    returning licence`,
                    [clubName, licence])
                .then(res => {
                    if (res.length != 1) {reject(1);}
                    else {resolve();}
                })
                .catch(err => {
                    if (err.code == '23503') {reject('23503');}
                    else {reject(err);}
                })
        })
    }
}

module.exports = new LicenceService();