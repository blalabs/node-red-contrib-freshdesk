module.exports = function(RED) {
  function FDSearchNode(n) {
    RED.nodes.createNode(this,n);
    var node = this;
    node.api = RED.nodes.getNode(n.api);
    node.on('input', function(msg) {
      node.api.fd.filterTickets(msg.payload.freshdesk_query, function (err, data) {
        if (err) {
          node.error(err);
        } else {
          msg.payload.freshdesk_search = data;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType('fd-search', FDSearchNode);
}
