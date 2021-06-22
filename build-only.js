const wbp = require("web-build-process");

wbp({
	source: "src",
	dist: "public",
	ignore: ["private"],
	buildOnly: true,
	forceBuild: true
});