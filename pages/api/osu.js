import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)
    var url = "https://osu.ppy.sh/osu/" + req.query.beatmapId;
    const fetchRes = await fetch(url);
    const map = await fetchRes.text();
    res.status(200).send(map);
}

export default handler