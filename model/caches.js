const redis = require('redis')
const {EXPRIRED_TIME} = require('../config/cache.config')

const redisCon = redis.createClient()
redisCon.connect()

async function setWithDefaultExpires(key, value) {
    redisCon.setEx(key,EXPRIRED_TIME, value);
}

async function get(key){
    redisCon.expire(key, EXPRIRED_TIME);
    return await redisCon.get(key);
}

module.exports = {
    set:setWithDefaultExpires,
    get:get
}
