module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", {title: "Pretty Digital"});
    });

    app.get("/prettydigital", (req, res) => {
        res.render("prettydigital", {title: "music video"});
    });
}