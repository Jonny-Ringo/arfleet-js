const Model = require('./base');
const Sequelize = require('sequelize');
const fs = require('fs');
const utils = require('../../utils');
const nodepath = require('path');

class PSPlacementChunk extends Model {
    constructor(...args) {
        super(...args);
    }

    static getPath(placement_chunk_id) {
        return utils.getDatadir('/ps_placement_chunks/' + placement_chunk_id);
    }
}

PSPlacementChunk.init(
    {
        id: {type: Sequelize.DataTypes.STRING, unique: true, primaryKey: true},
        placement_id: {type: Sequelize.DataTypes.STRING, allowNull: false},
        original_chunk_id: {type: Sequelize.DataTypes.STRING, allowNull: true},
        encrypted_chunk_id: {type: Sequelize.DataTypes.STRING, allowNull: true},
        pos: {type: Sequelize.DataTypes.INTEGER, allowNull: true},
    },
    {
        indexes: [
            {fields: ['placement_id']},
            {fields: ['original_chunk_id']},
            {fields: ['encrypted_chunk_id']},
            {fields: ['placement_id', 'pos']},
            // {fields: ['ul_status']},
            // {fields: ['dl_status']}
        ]
    }
);

// NOTE: These hooks are not working when using .update(). Had to hook into ::update() method

// const modificationHook = (m) => {
//     // if (m.changed() && m.changed().includes('ul_status')) {
//     //     markChunkUlStatusInCache(m.id, m.changed().ul_status);
//     //     processQueue(EventTypes.CHUNK_UPLOAD_STATUS_CHANGED, m.id);
//     // }
//     // if (m.changed() && m.changed().includes('dl_status')) {
//     //     processQueue(EventTypes.CHUNK_DOWNLOAD_STATUS_CHANGED, m.id);
//     // }
// };

// Chunk.addHook('afterDestroy', (m) => modificationHook(m));
// Chunk.addHook('afterUpdate', (m) => modificationHook(m));
// Chunk.addHook('afterSave', (m) => modificationHook(m));
// Chunk.addHook('afterUpsert', (m) => modificationHook(m[0]));

module.exports = { PSPlacementChunk };