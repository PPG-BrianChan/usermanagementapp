//Insert code here

const cds = require('@sap/cds');
const cdsapi = require('@sapmentors/cds-scp-api');

module.exports = async function (srv) {

    const users = await cds.connect.to('ZC_USERS_CDS');

    srv.on('READ', 'users', async req => {
        return users.run(req.query);
    });

    srv.before("CREATE", "incidents", async (req) => {
        console.log(`start of hook`);
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

    srv.after('CREATE', 'incidents', async (req, msg) => {
        // createwf(msg.data);
        console.log("Start of AFTER hook");
        sendmail(msg.data);
    });
};

const sendmail = async (incident) => {
    console.log("Incident Ticket No:", incident.ticket_no);
    const mailcontent = {
        message: {
            subject: 'Approval request requiring your attention',
            body: {
                contentType: 'Text',
                content: 'Kindly login to your workflow inbox to approve or reject the User management ticket, ${incident.ticketno}'
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'cchan@ppg.com'
                    }
                }
            ],
            from: {
                emailAddress: {
                    address: 'SAPCOEBTPGeneral@ppg.com'
                }
            }

        },
        saveToSentItems: 'true'
    };

    try {

        const service = await cdsapi.connect.to("Microsoft_Graph_Mail_API");
        return await service.run({
            // url: "/v1.0/me/sendmail",
            url: "/v1.0/users/${}/sendmail",
            method: "post",
            headers: {
                'content-type': 'application/json'
            },
            data: mailcontent,
        })
    }

    catch (error) {
        console.log(error.message)
    }
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
