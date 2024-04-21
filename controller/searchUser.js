const axios = require('axios')
const Constants = require('../common/Constants')
const {processHrTimeToSeconds} = require('../common/Utili')
const RedisHandler = require('../common/redisHandler')

const SearchUsers = async (searchQuery) =>{

    const redisClient = RedisHandler.getRedisClient()

    const startTime = process.hrtime();
    const data = await  redisClient.get(searchQuery+ "_users");
    if(data)
        return{
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "Redis"
        }
    else{
        const response = await axios.get(Constants.GITHUB_SEARCH_USERS_URL+searchQuery)
        await redisClient.set(searchQuery+"_users",response.data.total_count,{'EX':30})
        return {
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrtime(startTime)),
            source: "GitHub API"
        }
    }

}
module.exports={
    SearchUsers
}
