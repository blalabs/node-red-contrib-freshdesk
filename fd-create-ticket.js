module.exports = function(RED) {
  function FDCreateTicketNode(n) {
    RED.nodes.createNode(this,n);
    var node = this;
    node.api = RED.nodes.getNode(n.api);
    node.on('input', function(msg) {
      msg.payload.freshdesk_ticket_data.requester_id = msg.payload.freshdesk_ticket_data.requester_id || parseInt(node.api.defaultuser);
      msg.payload.freshdesk_ticket_data.group_id = msg.payload.freshdesk_ticket_data.group_id || parseInt(node.api.defaultgroup);
      node.api.fd.createTicket(msg.payload.freshdesk_ticket_data, function (err, data) {
        if (err) {
          node.error(err);
        } else {
          msg.payload.freshdesk_ticket = data;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType('fd-create-ticket', FDCreateTicketNode);
}
