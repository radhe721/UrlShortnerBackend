const { nanoid } = require("nanoid");
const url = require("../models/url");

async function handelCreateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    
    // Validate URL
    try {
        new URL(body.url); // This will throw if the URL is invalid
    } catch (err) {
        return res.status(400).json({ error: "Invalid URL provided" });
    }

    const shortId = nanoid(8);
    await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}

async function redirectTooriginal(req, res) {
    console.log("redirectTooriginal accessed. req.params.shortId:", req.params.shortId);
    const shortId = req.params.shortId;

    const entry = await url.findOneAndUpdate(
        { shortId: shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true } // returns the updated document
    );

    if (!entry) return res.status(404).json({ error: "Short URL not found" });

    return res.redirect(entry.redirectUrl); // Change to redirectUrl
}

module.exports = {
    handelCreateShortUrl,
    redirectTooriginal,
};
