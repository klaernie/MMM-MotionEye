/* Magic Mirror
 * Node Helper: MotionEye
 *
 * By Cato Antonsen (https://github.com/CatoAntonsen)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting module: " + this.name);

		var self = this;
		this.expressApp.get('/motioneye/hide/:id*?', function (req, res) {
			console.log("Hide registered: " + req.params.id);
			res.send('Hide registered: ' + req.params.id);
			self.sendSocketNotification("MotionEyeHide", req.params.id);
		});
		this.expressApp.get('/motioneye/:id*?', function (req, res) {
			console.log("Motion registered: " + req.params.id);
			res.send('Motion registered: ' + req.params.id);
			self.sendSocketNotification("MotionEyeShow", req.params.id);
		});
	},

	socketNotificationReceived: function(notification, config) {
		if (notification === "CONFIG") {
			console.log("started configuring the node helper of " + this.name);
			if (config.autoHide) {
				console.log("Hiding camera: " + config.id);
				this.sendSocketNotification("MotionEyeHide", config.id);
			}

			return;
		}
	},
});
