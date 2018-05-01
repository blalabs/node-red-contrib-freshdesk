var Freshdesk = require('freshdesk-api');

module.exports = function(RED) {
  function FDConfigurationNode(n) {
    RED.nodes.createNode(this,n);
    this.subdomain = n.subdomain;
    this.key = n.key;

    this.defaultuser = n.defaultuser;
    this.defaultgroup = n.defaultgroup;

    var node = this;
    setTimeout(function () { node.warn(n); }, 2000);

    if (this.subdomain) {
      this.fd = new Freshdesk('https://' + this.subdomain + '.freshdesk.com', this.key);
    }
  }
  RED.nodes.registerType("fd-config", FDConfigurationNode);
}
