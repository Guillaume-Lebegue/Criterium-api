'use strict';

const Club = require('../models/clubModel');
const User = require('../models/userModel');

class clubDataService {

    // Get Club(s)
    getClubById(clubId) {
        return Club.findById(clubId);
    }

    getClubsByRegistrationUser(userId) {
        return Club.find({ 'licenced.registration': userId });
    }

    getClubsByInvitedUser(userId) {
        return Club.find({ 'licenced.invited': userId });
    }

    getClubsByIsLicencedUser(userId) {
        return Club.find({ 'licenced.isLicenced': userId });
    }

    getAllClubsPaginate(query, limit, offset, sort = null, doPopulate = false) {
        return new Promise((resolve, reject) => {
            const populate = !doPopulate ? null :
                [
                    { path: 'licenced.registration', select: User.getPublicFields() },
                    { path: 'licenced.invited', select: User.getPublicFields() },
                    { path: 'licenced.isLicenced', select: User.getPublicFields() }
                ]
            const opts = { offset, limit, sort, populate };

            Club.paginate(query, opts)
                .then(result => resolve(result))
                .catch(error => reject(error));
        })
    }

    // Create Club
    createClub(name, address) {
        return new Promise((resolve, reject) => {
            const newClub = new Club();
            newClub.name = name;
            newClub.address = address
            newClub.save((error, doc) => {
                if (error) reject(error)
                else resolve(doc)
            });
        });
    }

    // Update Club
    updateClubDirector(clubId, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId);
                if (!user) reject('Bad user')
                const club = await Club.findByIdAndUpdate(clubId, {$set: {'director': userId}});
                if (!club) reject('Bad club')
                resolve('OK');
            } catch(error) {
                reject(error);
                return;
            }
        })
    }
}

module.exports = new clubDataService();