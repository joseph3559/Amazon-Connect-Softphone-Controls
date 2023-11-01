/**
 * Extends the contact events.
*/
export default function (contact) {
    console.info("CDEBUG >> ContactEvents - New Contact contactId: " + contact.contactId);
    console.info("CDEBUG >> ContactEvents - New Contact InitialContactId(): " + contact.getInitialContactId());

    window.focus();
    // Route to the respective handler
    // contact.onIncoming(handleContactIncoming); // This does not work
    document.addEventListener('keydown', function(event) {
        // console.log(event.altKey);
        if (event.shiftKey && event.altKey && event.key === 'A') {
            contact.accept();
        }
    });

    // Declining incoming call
    document.addEventListener('keydown', function(event) {
        if (event.shiftKey && event.altKey && event.key === 'D') {
            contact.reject();
        }
    });

    contact.onAccepted(handleContactAccepted);
    contact.onConnecting(handleContactConnecting);
    contact.onConnected(handleContactConnected);
    contact.onEnded(handleContactEnded);
    contact.onDestroy(handleContactDestroyed);
    contact.onMissed(handleContactMissed);

    function handleContactIncoming(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactIncoming 2');
    }

    function handleContactAccepted(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactAccepted - Contact accepted by agent');
    }

    function handleContactConnecting(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactConnecting() - Contact connecting to agent');
    }

    // Declining incoming call
    function handleContactConnected(contact) {
        window.focus();
        console.log("Contact disconnected");
        window.addEventListener('keydown', function(event) {
        console.log(event.key);
            if (event.shiftKey && event.altKey && event.key === 'X') {
                contact.getAgentConnection().destroy();
                contact.clear();
            }
        });
        console.info('CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent');
    }

    function handleContactEnded(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully');
        // Add your custom code here
    }

    function handleContactDestroyed(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed');
        contact.clear();
    }

    function handleContactMissed(contact) {
        console.info('CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed');
    }

}
