const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const axios = require('axios');
const flat = require("flat");
const unflatten = flat.unflatten;
const express = require('express');
const router = express.Router();

async function getById(id) 
{
    let user
    const { data } = await axios.get('https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json')
    for (var i = 0; i < data.length; i++)
    {
        if(data[i].id == Number(id)) 
            {
                user = data[i];
            }
    }

    if(user !== undefined)
    {
        return user
    }
    else
    {         
        throw `No value found`  
      
    }
}

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/history', async(req, res, next) => {
    try
    {
    let items = (await client.lrangeAsync("UserList", 0, 19 )).map(JSON.parse);
    console.log(items);
    if(items.length == 0)
    {
        throw `No History`
    }
    res.json(items)
    }
    catch(error)
    {
        res.json(error);

    }
});

router.get('/:id', async (req, res) => {

    try 
    {
        let cacheVal = (await client.lrangeAsync("CacheList",0,-1)).map(JSON.parse);
        console.log('cacheVal: ',cacheVal.length)
        if(cacheVal.length > 0)
        {
            for (var i = 0; i < cacheVal.length; i++)
            {
                if(cacheVal[i].id == Number(req.params.id)) 
                    {
                        res.json(cacheVal[i])
                        await client.lpushAsync("UserList", JSON.stringify(cacheVal[i]))
                        return
                    }
            }
        }
                setTimeout(async() => {
                try {
                let user =  await getById(req.params.id)
                console.log(user)
                await client.lpushAsync("UserList", JSON.stringify(user))
                await client.lpushAsync("CacheList", JSON.stringify(user))
                res.json(user);
            }
                catch(error)
                {
                    res.json(error)
                }
                }, 5000);
    }   
        catch(error) {
            res.json(error);
        }
    
});


module.exports =  router;