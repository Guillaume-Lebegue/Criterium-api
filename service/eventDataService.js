'use strict';

const Event = require('../models/eventModel');

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

}

module.exports = new eventDataService();