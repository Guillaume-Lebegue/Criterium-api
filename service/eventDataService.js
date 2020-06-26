'use strict';

const Event = require('../models/eventModel');
const { resolve } = require('bluebird');

class eventDataService {

    getEventById(eventId) {
        const query = Event.findById(eventId);

        return (query.exec());
    }

    getAllEventsPaginate(query, limit, offset = 0, sort = null) {
        return new Promise((resolve, reject) => {
            const opts = { offset, limit, sort };

            Event.paginate(query, opts)
                .then(result => resolve(result))
                .catch(error => reject(error));
        })
    }

    createEvent(name, dateStart, dateEnd, address, isPublic, creator) {
        return new Promise((resolve, reject) => {
            const event = new Event();

            event.name = name;
            event.dateStart = dateStart;
            event.dateEnd = dateEnd;
            event.address = address;
            event.isPublic = isPublic;
            event.creator = creator;

            event.save((error, doc) => {
                if (error) reject(error);
                else resolve(doc);
            })
        })
    }

}

module.exports = new eventDataService();