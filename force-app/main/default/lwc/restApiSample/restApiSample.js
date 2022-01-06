import { LightningElement, api } from 'lwc';
import getSessionId from '@salesforce/apex/UserSession.getSessionId'

export default class RestApiSample extends LightningElement {
    @api recordId;
    sessionId;

    buttonClick() {
        getSessionId()
            .then(id => {
                console.log('getSessionId: ', id);
                console.log('recordId: ', this.recordId);
                this.sessionId = id;

                var request = new XMLHttpRequest();
//todo: fix
                request.open("PATCH", 'https://connect-computing-9467-dev-ed.cs97.my.salesforce.com/services/data/v52.0/sobjects/Account/'+this.recordId, true);
                request.setRequestHeader('Accept', 'application/json');
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('Authorization', "Bearer " + this.sessionId);

                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status >= 200 && request.status < 300) {
                            // handle valid response
                            console.log('success');
                        } else {
                            // handle invalid response
                            console.error('failure');
                        }
                    }
                 }

                 const payload = {
                     "AccountNumber": new Date()
                 };

                 request.send(JSON.stringify(payload));
            })
            .catch(error => {
                console.error('getSessionId error: ', error);
            });
    }
}
