module.exports = function(RED) {
  function FDAddReplyNode(n) {
    RED.nodes.createNode(this,n);
    var node = this;
    node.api = RED.nodes.getNode(n.api);
    node.on('input', function(msg) {
      msg.payload.freshdesk_reply_data.user_id = msg.payload.freshdesk_reply_data.user_id || parseInt(node.api.defaultuser);
      node.warn(msg.payload.freshdesk_reply_data);
      node.api.fd.createReply(msg.payload.freshdesk_ticket.id, msg.payload.freshdesk_reply_data, function (err, data) {
        if (err) {
          node.error(err);
        } else {
          msg.payload.freshdesk_reply = data;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType('fd-add-reply', FDAddReplyNode);
}
