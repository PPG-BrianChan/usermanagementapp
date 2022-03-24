//Insert code here

const cds = require('@sap/cds');


module.exports = async function (srv) {

    const users = await cds.connect.to('ZC_USERS_CDS');

    srv.on('READ', 'users', async req => {
        
        return users.run(req.query);
    });

    srv.before("CREATE", "incidents", async (req) => {
        console.log(`start of hook`);
        console.log(srv.entities);
        const { incidents } = srv.entities;
        const query_get_ticketno = SELECT.one
          .from(incidents)
          .columns("max(ticket_no) as ticketno");
        const result = await cds.run(query_get_ticketno);
        const jsonobj = JSON.parse(JSON.stringify(result));
        var ticketno = `${jsonobj.ticketno} + 1`;
        req.data.ticket_no = JSON.stringify(eval(ticketno));
        req.data.status = `PENDING`;
        req.data.approverid = `K009287`;
    })
    this.on('CREATE', 'incident', async (req, msg) => {
        createwf(msg.data);
    });
};

// const createwf = async (incident) => {
// const payload = {
//     definitionId: "uidincidentapp.approvalprocess",
//     context: {
//       IncidentUUID: incident.ID,
//       request: { id: incident.ID },
//       TicketNo: incident.ticketno,
//       RaisedBy: incident.createdBy,
//       Description: incident.description,
//       Status: incident.status,
//       approvalStep: {
//         decision: "",
//       },
//       caller: "CAP",
//     },
//   };

//   const response = await executeHttpRequest(
//     {
//       destinationName: "bpmworkflowruntime_test",
//     },
//     { method: "POST", data: payload, url: "/rest/v1/workflow-instances" }
//   );

//   console.log(response.data);
// };
